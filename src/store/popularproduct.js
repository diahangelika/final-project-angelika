import axios from "axios";

export default{
  namespaced: true,
  state() {
    return {
      popularproducts: [],
      popularproductsDetail: null,
    };
  },
  getters: {},
  mutations: {
    setPopularProduct(state, payload) {
      state.popularproducts = payload;
      console.log(state);
    },
    setPopularProductsDetail(state, payload) {
      state.popularproductsDetail = payload;
    },
    setNewProduct(state, payload) {
      state.popularproducts.push(payload);
    }
  },
  actions: {
    async getPopularProductData({ commit }) {
      try {
        console.log("yyyyyyyy");
        const { data } = await axios.get(
          "https://final-exam-project-b2ced-default-rtdb.firebaseio.com/popularproducts.json"
        );
        // console.log(data); 
        const arr = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        commit("setPopularProduct", arr);

        return arr
      } catch (err) {
        console.log(err);
      }
    },

    async getPopularProductDetail({commit}, payload) {
      try {
        const uid = isNaN(Number(payload));

        const {data} = await axios.get(
          `https://final-exam-project-b2ced-default-rtdb.firebaseio.com/popularproducts/${uid ? `${payload}` : payload}.json`
        );
        commit("setPopularProductsDetail", data);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    async addNewProduct({ commit, rootState }, payload) {
      // const uid = nanoid(10)
      const newData = {
        ...payload,
        // id: uid,
        username: rootState.auth.userLogin.username,
        createAt: new Date().getTime(),
        likes: ["null"],
        userId: rootState.auth.userLogin.userId,
      };
      try {
        const { data } = await axios.post(
          `https://final-exam-project-b2ced-default-rtdb.firebaseio.com/popularproducts.json?auth=${rootState.auth.token}`,
          newData
        );

        commit("setNewProduct", { id: data.name, ...newData });
      } catch (err) {
        console.log(err);
      }
    },

    async deleteProduct({ dispatch, rootState }, payload) {
      try {
        await axios.delete(
          `https://final-exam-project-b2ced-default-rtdb.firebaseio.com/popularproducts/${payload}.json?auth=${rootState.auth.token}`
        );
        await dispatch("getPopularProductData");
      } catch (err) {
        console.log(err);
      }
    },

    async updateProduct({ dispatch, rootState }, { id, newProduct }) {
      try {
        await axios.put(
          `https://final-exam-project-b2ced-default-rtdb.firebaseio.com/popularproducts/${id}.json?auth=${rootState.auth.token}`,
          newProduct
        );

        await dispatch("getPopularProductData");
      } catch (err) {
        console.log(err);
      }
    },
  },
}