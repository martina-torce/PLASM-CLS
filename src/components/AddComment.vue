<!-- This page allows the user to create a new shared database -->
<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="form-container">
        <form>
          <div class="field">
            <label class="label">NewComment*</label>
            <div class="control">
              <input
                v-model="form.NewComment"
                class="input"
                type="text"
                placeholder="input new comments"
              />
              <form-errors :errors="v$.form.NewComment.$errors" />
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button
                type="button"
                @click="createComment"
                class="button is-link">Submit</button>
            </div>
            <div class="control">
              <router-link to="/projects" class="button is-text">Cancel</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script>
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import FormErrors from "../components/FormErrors.vue";

const setupInitialData = () => ({
  NewComment: "",
})


export default {
  components: {
    FormErrors
  },
  data() {
    return {
      form: setupInitialData()
    }
  },

  // helps ensure the fields are entered correctly
  validations() {
    return {
      form: {
        NewComment: {
          required: helpers.withMessage("cannot upload empty comment!", required),
        },
      }
    }
  },
  setup () {
    return { v$: useVuelidate() }
  },
  // if the fields are entered correctly it dispatches project information to store and reset fields
  methods: {
    async createComment() {
      const isValid = await this.v$.$validate();

      if (isValid) {
        this.v$.$reset();
        this.$store.dispatch("usercomment/createComment", {
          data: this.form,
          onSuccess: () => {
            this.form = setupInitialData();}
          }
        )
      }
    },
    
   } 
  }
</script>

<style scoped>
.form-container {
  max-width: 960px;
  margin: 0 auto;
  margin-top: 40px;
}
.user {
  margin: 3px;
}
</style>
  