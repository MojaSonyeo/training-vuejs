<template>
    <v-card class="mr-4 mb-3" height= "450" width= "250">
        <span class="title_article">{{ item.label }}</span>
        <br />
        <span class="article_stitle">{{ item.brand }}</span>
        <v-img class="image" :src="item.image" height="240" width="240"></v-img>
        <br />
        <v-row>
            <v-col cols="5" class="pb-0">
                <v-select :items="item.sizes" label="Taille" outlined dense v-model="sizes"></v-select>
            </v-col>
            <v-col>
                <span class="price">{{ item.unitPrice.toFixed(2) }} €</span>
            </v-col>
        </v-row>
        <v-btn class="vbutton" color="inherit" :disabled="!sizes" @click="addToBasket(item)">AJOUTER AU PANIER</v-btn
        >
    </v-card>
</template>

<script>
import cartService from '../services/cart';
export default {
    props: {
        item: Object,
    },
    data() {
        return {
            sizes: undefined,
        };
    },
    methods: {
        addToBasket: function(itemSelected) {
            itemSelected.size = this.sizes;
            cartService.addToCart(itemSelected);
        },
    },
};
</script>