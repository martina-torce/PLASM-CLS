// start of reference template - https://github.com/Jerga99/exchangario
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  namespaced: true,
  actions: {
    success(_, message) {
      toast.success(message);
    },
    error(_, message) {
      toast.error(message);
    }
  }
}
// end of reference
