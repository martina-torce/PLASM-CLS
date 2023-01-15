import { db } from "../../db";
import {
  doc, addDoc,
  query,where,getDocs,
  collection,
} from "firebase/firestore";



export default {
  namespaced: true,
  state() {
    return {
      items: [],
    }
  },
  
  actions:{
    async getComments({commit}, ref){
      commit("setComments", []);
      const docRef = ref;
      const commentQuery = query(
        collection(db,"usercomments"),
        where("paper", "==", docRef)
      );
      const querySnap = await getDocs(commentQuery);
      const comments = querySnap.docs.map(
        doc => ({...doc.data(), id: doc.id})
      );

      commit("setComments",comments)


    },
    
    async createComment({rootState, dispatch}, { data, onSuccess }) {
        const userRef = doc(db, "users", rootState.user.data.id);
        data.user = userRef;

        console.log(userRef)
       
        await addDoc(collection(db, "usercomments"), data);
  
        dispatch("toast/success", " Comment was successfully added!", {root: true});
        onSuccess();
      
    }
  },

  mutations: {
    setComments(state, comments){
      state.items = comments;
    }
  }
 
}
