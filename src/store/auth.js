import axios from "axios";
import Cookies from "js-cookie";
export default {
  namespaced: true,
  state() {
    return {
      token: Cookies.get("jwt") || null,
      tokenExpirationDate: null,
      userLogin: null,
      isLogin: false,
    };
  },
  mutations: {
    setToken(state, { idToken, expiresIn }) {
      state.token = idToken;
      state.tokenExpirationDate = expiresIn;
      Cookies.set("tokenExpirationDate", expiresIn);
      Cookies.set("jwt", idToken);
    },
    setUserLogin(state, { userData, loginStatus }) {
      state.userLogin = userData;
      state.isLogin = loginStatus;
    },
    setUserLogout(state) {
      state.token = null;
      state.userLogin = {};
      state.isLogin = false;
      state.tokenExpirationDate = null;
      Cookies.remove("jwt");
      Cookies.remove("tokenExpirationDate");
    },
  },
  actions: {
    async getRegisterData({ commit, dispatch }, payload) {
      const APIkey = "AIzaSyBTYHrer8paa2JqMZF78cAv92i9sVI2D1I";

      const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIkey}`;
      try {
        const { data } = await axios.post(authUrl, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        });

        /// DISINI BISA KAMU TAMBAHIN CONDITION PAKE RESPONSE.STATUS === 200

        commit("setToken", {
          idToken: data.idToken,
          expiresIn:
            new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
        });

        const newUserData = {
          userId: data.localId,
          fullname: payload.fullname,
          username: payload.username,
          email: payload.email,
          imageLink: payload.imageLink,
        };
        Cookies.set("UID", newUserData.userId);
        await dispatch("addNewUser", newUserData);

        return data;
      } catch (err) {
        console.error({ err });
      }
    },

    async addNewUser({ commit, state }, payload) {
      try {
        const { data } = await axios.put(
          `https://final-exam-project-b2ced-default-rtdb.firebaseio.com/user/${payload.userId}.json?auth=${state.token}`,
          payload
        );
        commit("setUserLogin", { userData: payload, loginStatus: true });
      } catch (Err) {
        console.log(Err);
      }
    },

    // async getLoginData({ commit, dispatch }, payload) {
    //   const APIkey = "AIzaSyBTYHrer8paa2JqMZF78cAv92i9sVI2D1I";
    //   const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`;

    //   try {
    //     const { data } = await axios.post(authUrl + APIkey, {
    //       email: payload.email,
    //       password: payload.password,
    //       returnSecureToken: true,
    //     });

    //     if (!data) return null;

    //     commit("setToken", {
    //       idToken: data.idToken,
    //       expiresIn:
    //         new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
    //     });

    //     Cookies.set("UID", data?.localId);
    //     await dispatch("getUser", data.localid);

    //     return data;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    async getLoginData({ commit, dispatch }, payload) {
      const APIkey = "AIzaSyBTYHrer8paa2JqMZF78cAv92i9sVI2D1I";
      const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`;
    
      try {
        const { data } = await axios.post(authUrl + APIkey, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        });
    
        if (!data) return null;
    
        commit("setToken", {
          idToken: data.idToken,
          expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
        });
    
        Cookies.set("UID", data.localId);
        await dispatch("getUser", data.localId); // Make sure to pass the localId
    
        return data;
      } catch (err) {
        console.log(err);
      }
    },

    // async getUser({ commit }, payload) {
    //   try {
    //     const { data } = await axios.get(
    //       `https://final-exam-project-b2ced-default-rtdb.firebaseio.com/user.json`
    //     );
    //     console.log({ payload, data });
    //     for (let key in data) {
    //       console.log({ 1: data[key].userId, key });
    //       if (data[key].userId === payload) {
    //         Cookies.set("UID", data[key].userId);

    //         commit("setUserLogin", {
    //           userData: data[key],
    //           loginStatus: true,
    //         });
    //       }
    //     }
    //     // console.log(data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    async getUser({ commit }, userId) {
      try {
        const { data } = await axios.get(
          `https://final-exam-project-b2ced-default-rtdb.firebaseio.com/user.json`
        );
    
        for (let key in data) {
          if (data[key].userId === userId) {
            Cookies.set("UID", data[key].userId);
    
            commit("setUserLogin", {
              userData: data[key],  // This will include imageLink
              loginStatus: true,
            });

            
          }
          return data[key];
        }
       
      } catch (err) {
        console.log(err);
      }
    }, 
    
    // async updateProfile({ dispatch, rootState }, { id, newProfile }) {
    //   console.log(id)
    //   try {
    //     await axios.put(
    //       `https://final-exam-project-b2ced-default-rtdb.firebaseio.com/user/${id}.json?auth=${rootState.auth.token}`,
    //       newProfile
    //     );

    //     await dispatch("getUser");
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },

    async updateUserEmail({ state, dispatch }, payload) {
      const APIkey = "AIzaSyBTYHrer8paa2JqMZF78cAv92i9sVI2D1I"
      const authUrl =
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key='

      console.log(payload);
      try {
        const { data } = await axios.post(authUrl + APIkey, {
          idToken: state.token,
          email: payload.email,
          returnSecureToken: true,
        })
        console.log(data);
        const newUpdateData = {
          userId: data.localId,
          fullname: payload.fullname,
          username: payload.username,
          email: payload.email,
          imageLink:
            payload.imageLink ||
            'https://www.dreamstime.com/illustration/user-profile.html',
        }

        await dispatch('updateUser', { newUpdateData })
      } catch (err) {
        console.log('Error updating email:', err)
      }
    },
    async updateUser({ dispatch, rootState }, { newUpdateData }) {
        try {
          const { data } = await axios.put(
            `https://final-exam-project-b2ced-default-rtdb.firebaseio.com/user/${newUpdateData.userId}.json?auth=${rootState.auth.token}`,
            newUpdateData,
          )

          await dispatch('getUser', data.userId)
        } catch (err) {
          console.log(err)
        }
        console.log(newUpdateData);
    },


    async changePassword({ state }, { oldPassword, newPassword }) {
      try {
        const response = await axios.post(
          `https://final-exam-project-b2ced-default-rtdb.firebaseio.com/user/${id}.json?auth=${rootState.auth.token}`,
          {
            userId: state.userLogin.userId,
            oldPassword,
            newPassword,
          },
          {
            headers: { Authorization: `Bearer ${state.token}` },
          }
        );
        return response.data;
      } catch (error) {
        throw new Error("Failed to change password");
      }
    },
  
  },
};
