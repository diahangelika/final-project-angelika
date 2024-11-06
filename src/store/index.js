import { createStore } from "vuex";
import popularproduct from "./popularproduct";
import auth from "./auth";
import Vuex from "vuex";
import cart from "./cart";
import transaction from "./transaction";

export const store = createStore({
  modules: {
    popularproduct,
    auth,
    cart,
    transaction
  }
})