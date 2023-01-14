<template>
  <div></div>
</template>
  
  <script>
  import useVuelidate from '@vuelidate/core'
  import { required, helpers } from '@vuelidate/validators'
  //import FormErrors from "../components/FormErrors.vue";
  
  const setupInitialData = () => ({
    projectTitle: "",
    authUsers: [""]
  })
  
  export default {
    components: {
      //FormErrors
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
  