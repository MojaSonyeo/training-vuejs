function initApp() {
    const app = new Vue({
        el: '#app',
        data: {
            categories,
            countries,
            categorySelected: undefined,
            itemSelected: undefined,
            cart: {
                items: [],
            },
            contact: {}
        },
        computed: {

            categoriesSorted: function() {
                return this.categories.sort((c1, c2) => c1.name.localeCompare(c2.name));
            },

            itemsSorted: function() {
                return this.categorySelected ?
                    this.categorySelected.items.sort((c1, c2) => c1.title.localeCompare(c2.title)) : [];
            },

            cartTotal: function() {
                const total = this.cart.items && this.cart.items.length > 0 ?
                    this.cart.items.reduce((sum, current) => sum += current.unitPrice, 0) :
                    0;
                return total.toFixed(2);
            }
        },
        methods: {

            addToCart: function() {
                if (!this.cart.items.find(item => this.itemSelected.id === item.id)) {
                    this.cart.items.push(this.itemSelected);
                }
            },

            removeFromCart: function(index) {
                this.cart.items.splice(index, 1);
            },

            isPaymentEnabled: function() {
                return this.cart.items.length > 0 &&
                    this.contact.firstName !== undefined &&
                    this.contact.firstName !== '' &&
                    this.contact.lastName !== undefined &&
                    this.contact.lastName !== '' &&
                    this.contact.address !== undefined &&
                    this.contact.address !== '' &&
                    this.contact.zipCode !== undefined &&
                    this.contact.zipCode !== '' &&
                    this.contact.country !== undefined;
            },

            pay: function() {
                this.categorySelected = undefined;
                this.itemSelected = undefined;
                this.cart.items = [];
                this.contact = {
                    firstName: undefined,
                    lastName: undefined,
                    address: undefined,
                    zipCode: undefined,
                    country: undefined,
                };
            }
        }
    });
}