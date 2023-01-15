import { createStore } from "vuex";
import exchange from "./modules/exchange";
import user from "./modules/user";
import toast from "./modules/toast";
import paper from "./modules/paper";
import project from "./modules/project";

// Vuex built-in method to create a new store, split into different modules
export default createStore({
  modules: {
    exchange,
    user,
    toast,
    paper,
    project
  }
})
