<template>
  <div>
    <table>
      <tr>
        <td>
          <h1>{{user.displayName}}さんようこそ！</h1>
        </td>
        <td>
          <h1>残高:{{loginUser}}</h1>
        </td>
        <td>
          <button @click="logout">ログアウト</button>
        </td>
      </tr>
    </table>
    <h1>ユーザー一覧</h1>
    <table>
      <tbody>
        <tr v-for="item in wipItems" :key="item.username">
          <td>{{item.username}}</td>
          <td>
            <div class="example-modal-window">
              <button @click="openModal(item)">wallteを見る</button>
              <MyModal class="mymodal" @close="closeModal(item)" v-if="item.openModal">
                <p>{{item.username}}さんの残高</p>
                <p>{{item.balance}}</p>
                <template slot="footer">
                  <button @click="closeModal(item)">閉じる</button>
                </template>
              </MyModal>
            </div>
          </td>

          <td>
            <div class="example-modal-window">
              <button @click="openSendModal(item)">送る</button>
              <MyModal @close="closeSendModal(item)" v-if="item.sendModal">
                <p>あなたの残高:{{item.balance}}</p>
                <p>送る金額</p>
                <div>
                  <input v-model="message" />
                </div>
                <template slot="footer">
                  <button @click="doSend">送る</button>
                </template>
              </MyModal>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { firebaseApp } from "../main";
import MyModal from "./MyModal";
export default {
  components: { MyModal },
  name: "Home",
  data() {
    return {
      userInfo: "",
      balance: "",
      items: [],
      filteredItems: [],
      wipItems: [],
      sendItems: [],
      loginUsers: "",
      loginUser: "",
      modal: false,
      message: "",
      snapshot:[]
    };
  },
  methods: {
    ...mapActions(["setUser"]),
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // this.$router.push("/login");
        })
        .catch(error => {
          alert(error.message);
        });
    },
    openModal(item) {
      item.openModal = true;
    },
    closeModal(item) {
      item.openModal = false;
    },
    openSendModal(item) {
      item.sendModal = true;
    },
    closeSendModal(item) {
      item.sendModal = false;
    },
    doSend() {
      let db = firebase.firestore();
      const usersRef = db.collection("users");
      usersRef
        .doc("3ZKSPc3SbJhPcuInaLVDRcHtICT2")
        .update({ balance: "100" })
        .then(usersRef => {
          if (usersRef) {
            console.log("Success edit user.");
          }
        })
        .catch(error => {
          console.error("Error edit user: ", error);
        });
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.$nextTick(function() {
      const self = this;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          const userInfo = user;
          self.setUser(userInfo);

          firebaseApp
            .firestore()
            .collection("users")
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                self.items.push(doc.data());
              });
              console.log('querySnapshot',self.items)

              
              let db = firebase.firestore();
              db.collection("users")
              .onSnapshot(snapshot => {
                snapshot.docs.forEach(doc => {
                    self.items.push(doc.data());
                });
              });

              //  console.log(self.snapshot);

              // console.log(self.items);

              self.filteredItems = self.items.filter(function(item) {
                return (
                  item.username !== firebase.auth().currentUser.displayName
                );
              });
              self.filteredItems.forEach(elm => {
                self.wipItems.push({
                  username: elm.username,
                  balance: elm.balance,
                  openModal: false,
                  sendModal: false
                });
              });

              self.filteredItems.forEach(elm => {
                self.sendItems.push({
                  username: elm.username,
                  balance: elm.balance,
                  modal: false
                });
              });
              self.loginUsers = self.items.filter(function(item) {
                return (
                  item.username === firebase.auth().currentUser.displayName
                );
              });
              self.loginUser = self.loginUsers[0].balance;
            });


        } else {
          self.$router.push("/login");
        }
      });
    });
  }
};
</script>