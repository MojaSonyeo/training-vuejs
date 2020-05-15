<template>
    <v-app-bar app dark>
        <router-link to="/" text class="logo">
            <span class="display-1">Clothes</span>
        </router-link>

        <div v-for="category in categories" :key="category.id">
            <v-btn class="ml-5" @click="goToCatalog(category.id)">{{ category.label }}</v-btn>
        </div>
        <v-spacer></v-spacer>
        <v-menu v-if="this.$route.name !== 'Commande'" min-width="1000" :close-on-content-click="false">
            <template v-slot:activator="{ on }">
                <v-btn class="ml-5" v-on="on">
                    <span class="mr-3">Mon panier ({{ itemInCart }})</span>
                    <v-icon>mdi-shopping</v-icon>
                </v-btn>
            </template>
            <v-card v-if="itemInCart === 0">
                <v-card-title>Mon panier</v-card-title>
                <span class="ml-3 vider">Il n'y a aucun article dans votre panier.</span>
            </v-card>
            <v-card v-else>
                <v-card-title>Mon panier</v-card-title>
                <v-row v-for="item in cart.items" :key="item.size">
                    <v-col cols="0"></v-col>
                    <v-col cols="6" class="articles">{{ item.label }} - {{ item.brand }} ({{ item.size }}) à {{item.unitPrice}} €  x{{ item.quantity }}</v-col>
                    <v-col cols="3" class="articles">
                        <v-btn text icon>
                            <v-icon @click="rajouter(item)">mdi-arrow-up</v-icon>
                        </v-btn>
                        <v-btn text icon>
                            <v-icon @click="enlever(item)">mdi-arrow-down</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col cols="2" class="articles">{{(item.unitPrice * item.quantity).toFixed(2)}}€</v-col>
                </v-row>
                <v-row>
                    <v-col cols="8"></v-col>
                        <span>Prix Total : {{ prixTotal.toFixed(2) }} €</span>
                </v-row>
                <v-row>
                    <v-col cols="0"></v-col>
                    <v-col cols="4"><v-btn color="#FFF7B7" @click="vider">VIDER LE PANIER</v-btn></v-col>
                    <v-col cols="0"><v-btn color="#FFF7B7" @click="goToCommande()">COMMANDER</v-btn></v-col>
                    <v-col cols="0"></v-col>
                </v-row>
            </v-card>
        </v-menu>
    </v-app-bar>
</template>

<script>
import serviceCatalog from '../services/catalog';
import cartService from '../services/cart';
export default {
    data() {
        return {
            categories: [],
            cart: [],
        };
    },
    methods: {
        goToCatalog(categoryId) {
            this.$router.push({ name: 'Catalog', params: { categoryId } });
        },
        goToCommande() {
            this.$router.push({ name: 'Commande' });
        },
        rajouter(item) {
            cartService.incrementCartItem(item.id);
        },
        enlever(item) {
            cartService.decrementCartItem(item.id);
        },
        vider() {
            cartService.emptyCart();
        },
    },
    computed: {
        itemInCart() {
            let res = 0;
            if (this.cart.items === undefined) {
                res = 0;
            } else {
                for (let i = 0; i < this.cart.items.length; i++) {
                    res += this.cart.items[i].quantity;
                }
            }
            return res;
        },
        prixTotal() {
            let res = 0;
            for (let i = 0; i < this.cart.items.length; i++) {
                res +=
                    this.cart.items[i].unitPrice * this.cart.items[i].quantity;
            }
            return res;
        },
    },
    async beforeCreate() {
        const categories = await serviceCatalog.getCategories();
        this.categories = categories.sort((c1, c2) => c1.label.localeCompare(c2.label),);
        this.cart = cartService.cart;
    },
};
</script>