<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Finaliser votre commande</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card id="cartComm">
                    <v-card-text>
                        <v-card-title>Mon panier</v-card-title>
                        <v-row  v-for="item in cart.items" :key="item.size">
                            <v-col cols="7"> {{ item.label }} - {{ item.brand }} ({{ item.size }}) à {{item.unitPrice}} €  x{{ item.quantity }}</v-col>
                            <v-col cols="3"></v-col>
                            <v-col cols="0">{{ (item.unitPrice * item.quantity).toFixed(2) }} €</v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="10"></v-col>
                            <v-col>Prix Total : {{ prixTotal.toFixed(2) }} €</v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-card id="cartComm"> 
                    <v-card-text>
                        <v-card-title>Livraison</v-card-title>
                        <v-text-field placeholder="Nom" v-model="client.nom" outlined dense></v-text-field>
                        <v-text-field placeholder="Prénom" v-model="client.prenom" outlined dense></v-text-field>
                        <v-text-field placeholder="Adresse" v-model="client.adresse" outlined dense></v-text-field>
                        <v-text-field placeholder="Code postale" v-model="client.codePostale" outlined dense></v-text-field>
                        <v-text-field placeholder="Ville" v-model="client.ville" outlined dense></v-text-field>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card id="cartComm">
                    <v-card-text>
                        <v-card-title>Paiement</v-card-title>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field label="Numéro de Carte" v-model="carteBleue.numCarte" counter="19" outlined dense></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field  label="Date d'expiration" v-model="carteBleue.dateExp" counter="5" outlined dense></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Cryptogramme" v-model="carteBleue.cryptogramme" counter="3" outlined dense></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col><v-btn :disabled="!renseignements" block color="inherit" @click="succes()">VALIDER VOTRE COMMANDE</v-btn></v-col>
        </v-row>
    </v-container>
</template>

<script>
import cartService from '../services/cart';
export default {
    data() {
        return {
            cart: cartService.cart,
            client: {
                nom: undefined,
                prenom: undefined,
                adresse: undefined,
                codePostale: undefined,
                ville: undefined,
            },
            carteBleue: {
                numCarte: undefined,
                dateExp: undefined,
                cryptogramme: undefined,
            },
        };
    },
    methods: {
        succes() {
            cartService.emptyCart();
            this.$router.push({ name: 'Success' });
        },
    },
    computed: {
        prixTotal() {
            let total = 0;
            for (let i = 0; i < this.cart.items.length; i++) {
                total = total + this.cart.items[i].unitPrice * this.cart.items[i].quantity;
            }
            return total;
        },
        renseignements() {
            let payer = true;
            for (const property in this.client) {
                if (this.client[property] === undefined) {
                    payer = false;
                }
            }
            for (const property in this.carteBleue) {
                if (this.carteBleue[property] === undefined || this.carteBleue.numCarte.length != 19 || this.carteBleue.dateExp.length != 5 || this.carteBleue.cryptogramme.length != 3) {
                    payer = false;
                }
            }
            return payer;
        },
    },
};
</script>

<style>
#cartComm {
    height: auto;
    width: auto;
    background-color: #FFF7B7;
    border-radius: 90px 10px 90px 10px;
    border-bottom: 1px solid #BAB166;
}
</style>