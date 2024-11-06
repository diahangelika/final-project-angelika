export default {
  namespaced: true,
  state: {
    transactions: JSON.parse(localStorage.getItem("transactions")) || [],
  },
  mutations: {
    ADD_TRANSACTION(state, transaction) {
      state.transactions.push(transaction);
    },
    SET_TRANSACTIONS(state, transactions) {
      state.transactions = transactions;
    },
  },
  actions: {
    async checkout({ commit, rootState }, payload) {
      commit("ADD_TRANSACTION", payload);
      const transactions = [...state.transactions, payload];
      localStorage.setItem("transactions", JSON.stringify(transactions));
      commit("cart/clearCart", null, { root: true });
    },

    loadTransactions({ commit }) {
      const transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];
      commit("SET_TRANSACTIONS", transactions);
    },
  },
  getters: {
    getTransaction(state) {
      return state.transactions;
    },
  },
};
