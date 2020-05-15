<template>
    <v-container align="center" justify="center">
        <h1>{{ category.label }}</h1>
        <div class="filter">
            <v-container>
                <v-row>
                    <v-col cols="3">
                        <v-select :items="category.items" item-text="brand" label="Marque" v-model="brands"></v-select>
                    </v-col>
                    <v-col cols="3">
                        <v-select :items="sizeDispo" label="Taille" v-model="sizes"></v-select>
                    </v-col>
                    <v-col cols="1">
                        <v-btn text icon>
                            <v-icon @click="sort = 'asc'">mdi-arrow-up</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col cols="1">
                        <v-btn text icon>
                            <v-icon @click="sort = 'dsc'">mdi-arrow-down</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <div class="itemDispo">La recherche contient {{ itemDispo }} articles</div>
        <div v-if="itemDispo === 0">
            Aucun article ne correspond à votre recherche.
        </div>
        <v-flex id="flex">
            <div v-for="item in final" :key="item.label" :value="item">
                <item :item="item"></item>
            </div>
        </v-flex>
    </v-container>
</template>

<script>

import serviceCatalog from '../services/catalog';
import Item from '../components/Item.vue';

export default {

    data() {
        return {
            category: {
                items: [],
            },
            brands: undefined,
            sizes: undefined,
            sort: undefined,
        };
    },

    components: {
        Item,
    },

    methods: {},

    computed: {

        sizeDispo: function() {
            let res = this.category.items.map(item => item.sizes).flat();
            if (Number.parseFloat(res[0])) {
                res.sort();
            } else {
                res = ['S', 'M', 'L', 'XL', 'XXL'];
            }
            return res;
        },

        itemDispo: function() {
            return this.final.length;
        },

        final() {
            let final = this.category.items;

            if (this.brands) {
                final = final.filter(
                    item => item.brand === this.brands,
                );
            }
            if (this.sizes) {
                final = final.filter(item => item.sizes.includes(this.sizes),
                );
            }

            if (this.sort) {
                if (this.sort === 'asc') {
                    final.sort((item1, item2) => item1.unitPrice - item2.unitPrice,
                    );
                } else if (this.sort === 'dsc') {
                    final.sort((item1, item2) => item2.unitPrice - item1.unitPrice,
                    );
                }
            }
            return final;
        },
    },

    async beforeCreate() {
        const category = await serviceCatalog.getCategory(
            this.$route.params.categoryId,
        );
        this.category = category;
    },
    async beforeRouteUpdate(to, from, next) {
        const category = await serviceCatalog.getCategory(to.params.categoryId);
        this.category = category;
        next();
    },
};
</script>

<style>
h1 {
    padding-left: 70px;
    color: #BAB166;
}

#flex {
    display: flex;
    flex-wrap: wrap;
}

.title_article {
    color: #BAB166;
    font-weight: bold;
    margin-left: 10px;
}

.article_stitle{
    color: black;
    margin-left: 10px;
}

.image{
    transition: transform .9s;
    margin-left: 5px;
    border-radius: 25px;
}

.image:hover {
    z-index: 5;
    -ms-transform: scale(1.5); 
    -webkit-transform: scale(1.5); 
    transform: scale(1.5);
}

fieldset {
    margin-left: 10px;
}

.price {
    font-weight: bold;
    color: black;
    margin-right : 10px;
}

.vbutton {
    width: auto;
    margin-top: 10px;
    margin-left: 30px;
}

.filter {
    height: 100px;
    width: 1050px;
    background-color: #FFF7B7;
    border-radius: 100px 10px 100px 10px;
    border-bottom: 1px solid #BAB166;
    padding-left: 25%;
}

.itemDispo {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 725px;
    color: #BAB166;
}
</style>