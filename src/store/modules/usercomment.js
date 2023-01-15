import { db } from "../../db";
import {
  doc, addDoc,
  collection,
} from "firebase/firestore";



export default {
  namespaced: true,
  
  actions:{
    async createComment({rootState, dispatch}, { data, onSuccess }) {
        const userRef = doc(db, "users", rootState.user.data.id);
        data.user = userRef;
       
  
        await addDoc(collection(db, "usercomments"), data);
  
        dispatch("toast/success", " Comment was successfully added!", {root: true});
        onSuccess();
      
    }
  },
}
