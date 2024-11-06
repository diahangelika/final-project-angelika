import HomePage from "./components/pages/HomePage.vue";
import SignupPage from "./components/pages/SignupPage.vue";
import LoginPage from "./components/pages/LoginPage.vue";
import DetailPage from "./components/pages/DetailPage.vue";
import AllItemsPage from "./components/pages/AllItemsPage.vue";
import UserPage from "./components/pages/UserPage.vue";
import PersonalInfo from "./components/user/PersonalInfo.vue";
import ChangePassword from "./components/password/ChangePasswordContent.vue";
import ChangePasswordHal from "./components/user/ChangePasswordHal.vue";
import CartPage from "./components/pages/CartPage.vue";
import NewProductPage from "./components/pages/NewProductPage.vue";
import EditProductPage from "./components/pages/EditProductPage.vue";
import CheckoutPage from "./components/pages/CheckoutPage.vue";
import TransactionHistoryPage from "./components/pages/TransactionHistoryPage.vue";

export const routes = [
  {
    path: "/",
    name: "homePage",
    component: HomePage
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupPage
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage
  },
  {
    path: "/popularproduct/:id",
    name: "detailProduct",
    component: DetailPage,
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "login" })
    }
  },
  {
    path: "/allitem",
    name: "allItem",
    component: AllItemsPage,
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "login" })
    }
  },
  {
    path: "/user/:component",
    name: "userPage",
    component: UserPage,
    // beforeEnter: (to, from, next) => {
    //   checkAuth() ? next() : next({ name: "login" });
    // },
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "login" })
    }
  },
  {
    path: "/auth/edit/:id",
    name: "ProfilInfoEdit",
    component: PersonalInfo,
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "login" })
    }
  },
  {
    path: "/cart",
    name: "cart",
    component: CartPage,
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "login" })
    }
  },
  {
    path: "/new-product",
    name: "newProductPage",
    component: NewProductPage,
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "login" })
    }
  },
  {
    path: "/popularproduct/edit/:id",
    name: "editProductPage",
    component: EditProductPage,
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "login" })
    }
  },
  {
    path: "/checkout",
    name: "CheckoutPage",
    component: CheckoutPage,
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "login" })
    }
  },
  {
    path: "/transaction-history",
    name: "TransactionHistoryPage",
    component: TransactionHistoryPage,
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "login" })
    }
  },
  // {
  //   path: "/user/change-password",
  //   name: "changePassword",
  //   component: ChangePasswordHal,
  //   beforeEnter: (to, from, next) => {
  //     checkAuth() ? next() : next({ name: "login" });
  //   }
  // },
];

import Cookies from "js-cookie";
import { store } from "./store";

const checkAuth = () => {
  const jwtCookie = Cookies.get("jwt");
  const expirationDate = Cookies.get("tokenExpirationDate");
  const userId = Cookies.get("UID");

  if (!jwtCookie || !expirationDate) return false;

  if (new Date().getTime() < +expirationDate) {
    store.commit("auth/setToken", {

      idToken: jwtCookie,
      expiresIn: expirationDate,
    });

    store.dispatch("auth/getUser", userId);
    return true;
  }

  store.commit("auth/setUserLogout");
  return false;
};