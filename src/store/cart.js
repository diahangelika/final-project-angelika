import axios from "axios";
export default {
    namespaced: true,
    state() {
        return {
            // Mengambil data dari localStorage atau inisialisasi dengan array kosong
            cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
            totalPrice: 0, // Akan dihitung ulang di getter
            checkOutTotalPrice: 0,
        };
    },
    // GETTERS NI FUNGSINYA BUAT PERHITUNGAN
    getters: {
        cartItems(state) {
            return state.cartItems; // Mengambil semua item dari keranjang
        },
        cartTotal(state) {
            // Menghitung total harga keranjang
            return state.cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
        },
        itemCount(state) {
            // Menghitung total jumlah item dalam keranjang
            return state.cartItems.reduce((count, item) => count + item.qty, 0);
        },
        checkoutTotal(state) {
            return state.cartItems.reduce((total, item) => {
                const shippingCost = isNaN(item.shipping) ? 0 : Number(item.shipping);
                return total + (item.price * item.qty) + shippingCost;
            }, 0);
        },
    },
    mutations: {
        addToCart(state, product) {
            // Memastikan qty memiliki nilai valid
            const quantity = product.qty || 1;

            const itemIndex = state.cartItems.findIndex(item => item.id === product.id);
            if (itemIndex >= 0) {
                // Jika item sudah ada, tambahkan qty-nya
                state.cartItems[itemIndex].qty += quantity;
            } else {
                // Jika item belum ada, tambahkan item baru ke keranjang
                state.cartItems.push({ ...product, qty: quantity });
            }
            // Simpan data ke localStorage dan perbarui total harga
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart(state, productId) {
            // Menghapus item dari keranjang berdasarkan ID
            state.cartItems = state.cartItems.filter(item => item.id !== productId);
            // Simpan perubahan ke localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        updateQuantity(state, { productId, qty }) {
            const itemIndex = state.cartItems.findIndex(item => item.id === productId);
            if (itemIndex >= 0) {
                if (qty <= 0) {
                    // Jika qty <= 0, hapus item dari keranjang
                    state.cartItems.splice(itemIndex, 1);
                } else {
                    // Jika qty valid, update qty dari item tersebut
                    state.cartItems[itemIndex].qty = qty;
                }
            }
            // Simpan perubahan ke localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        clearCart(state) {
            // Mengosongkan keranjang
            state.cartItems = [];
            // Hapus data keranjang dari localStorage
            localStorage.removeItem('cartItems');
        }
    },
    actions: {
        addToCart({ commit }, product) {
            commit("addToCart", product);
        },
        removeFromCart({ commit }, productId) {
            commit("removeFromCart", productId); 
        },
        updateQuantity({ commit }, { productId, qty }) {
            commit("updateQuantity", { productId, qty }); 
        },
        clearCart({ commit }) {
            commit("clearCart"); 
        }
    },
};