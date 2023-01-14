<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="form-container">
        <form>
          <div class="field">
            <label class="label">Title*</label>
            <div class="control">
              <input
                v-model="form.projectTitle"
                class="input"
                type="text"
                placeholder="Title of the project"
              />
              <form-errors :errors="v$.form.projectTitle.$errors" />
            </div>
          </div>
          <div class="field">
            <label class="label">Other Users (email)</label>
            <div class="control">
              <input
                v-model="form.authUsers"
                class="input"
                type="text"
                placeholder="Emails (CSV)"
              />
              <form-errors :errors="v$.form.authUsers.$errors" />
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button
                type="button"
                @click="createProject"
                class="button is-link">Submit</button>
            </div>
            <div class="control">
              <button class="button is-text">Cancel</button>
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
    projectTitle: "",
    authUsers: ""
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
    validations() {
      return {
        form: {
          projectTitle: {
            required: helpers.withMessage("Title cannot by empty!", required),
          },
          authUsers: { required:false }
        }
      }
    },
    setup () {
      return { v$: useVuelidate() }
    },
    methods: {
      async createProject() {
        const isValid = await this.v$.$validate();
  
        if (isValid) {
          this.v$.$reset();
          this.$store.dispatch("project/createProject", {
            data: this.form,
            onSuccess: () => {
              this.form = setupInitialData();
            }
          })
        }
      },
      handleTags(event) {
        const { value } = event.target;
  
        if (
          value &&
          value.trim().length > 1 &&
          (value.substr(-1) === "," || value.substr(-1) === " ")) {
  
          const _value = value.split(",")[0].trim();
  
          if (!this.form.tags.includes(_value)) {
            this.form.tags.push(_value);
          }
  
          event.target.value = "";
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .form-container {
    max-width: 960px;
    margin: 0 auto;
    margin-top: 40px;
  }
  .tag {
    margin: 3px;
  }
  </style>
  