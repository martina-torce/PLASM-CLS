<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="form-container">
        <form>
          <div class="field">
            <label class="label">Title*</label>
            <div class="control">
              <input
                v-model="form.title"
                class="input"
                type="text"
                placeholder="Title of the project"
              />
              <form-errors :errors="v$.form.title.$errors" />
            </div>
          </div>
          <div class="field">
            <label class="label">Other Users you would like to Invite ? (Each time you want to add another user press space)</label>
            <div class="control">
              <input
                v-model="form.invitedUsers"
                @input="handleUsers"
                class="input"
                type="ref"
                placeholder="Email (CSV)">
              <div
                v-for="user in form.users"
                :key="user"
                class="user is-primary is-medium"
              >
              <form-errors :errors="v$.form.invitedUsers.$errors" />
                {{user}}
              </div>
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
    title: "",
    users: [],
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
          title: {
            required: helpers.withMessage("Title cannot by empty!", required),
          },
          invitedUsers: { required:false }
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
      handleUsers(event) {
        const { value } = event.target;
  
        if (
          value &&
          value.trim().length > 1 &&
          (value.substr(-1) === "," || value.substr(-1) === " ")) {
  
          const _value = value.split(",")[0].trim();
  
          if (!this.form.users.includes(_value)) {
            this.form.users.push(_value);
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
  .user {
    margin: 3px;
  }
  </style>
  