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
                placeholder="Title of the paper"
              />
              <form-errors :errors="v$.form.title.$errors" />
            </div>
          </div>
          <div class="field">
            <label class="label">Author*</label>
            <div class="control">
              <input
                v-model="form.author"
                class="input"
                type="text"
                placeholder="Author of the paper"
              />
              <form-errors :errors="v$.form.author.$errors" />
            </div>
          </div>
          <div class="field">
            <label class="label">Year*</label>
            <div class="control">
              <input
                v-model="form.year"
                class="input"
                type="number"
                placeholder="Year of publishment">
              <form-errors :errors="v$.form.year.$errors" />
            </div>
          </div>
          <div class="field">
            <label class="label">Citation Key*</label>
            <div class="control">
              <input
                v-model="form.citationkey"
                class="input"
                type="text"
                placeholder="Year of publishment">
              <form-errors :errors="v$.form.citationkey.$errors" />
            </div>
          </div>

          <!-- TODO: provide tags inputs -->
          <div class="field">
            <label class="label">Tags*</label>
            <div class="control">
              <input
                @input="handleTags"
                class="input"
                type="text"
                placeholder="Add tags to paper">
              <div
                v-for="tag in form.tags"
                :key="tag"
                class="tag is-primary is-medium"
              >
                {{tag}}
              </div>
            </div>
          </div>
          <h4> Optionnal arguments </h4>
          <div class="field">
            <label class="label">Book title</label>
            <div class="control">
              <input
                v-model="form.booktitle"
                class="input"
                type="text"
                placeholder="title of the book">
              <form-errors :errors="v$.form.booktitle.$errors" />
            </div>
          </div>
          <div class="field">
            <label class="label">Journal</label>
            <div class="control">
              <input
                v-model="form.journal"
                class="input"
                type="text"
                placeholder="Journal/Publisher of the book">
              <form-errors :errors="v$.form.journal.$errors" />
            </div>
          </div>
          <div class="field">
            <label class="label">DOI</label>
            <div class="control">
              <input
                v-model="form.doi"
                class="input"
                type="text"
                placeholder="DOI of paper">
              <form-errors :errors="v$.form.doi.$errors" />
            </div>
          </div>
          <div class="field">
            <label class="label">Pages</label>
            <div class="control">
              <input
               v-model="form.pages"
                class="input"
                type="text"
                placeholder="Referencing pages">
              <form-errors :errors="v$.form.pages.$errors" />
            </div>
          </div>
          <div class="field">
            <label class="label">url</label>
            <div class="control">
              <input
                v-model="form.url"
                class="input"
                type="url"
                placeholder="url link">
              <form-errors :errors="v$.form.url.$errors" />
            </div>
          </div>
          <div class="field">
            <label class="label">Date</label>
            <div class="control">
              <input
                v-model="form.date"
                class="input"
                type="number"
                placeholder="date of publishment">
              <form-errors :errors="v$.form.date.$errors" />
            </div>
          </div>
          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <textarea
                v-model="form.description"
                class="textarea"
                placeholder="Description of the paper">
              </textarea>
              <form-errors :errors="v$.form.description.$errors" />
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button
                type="button"
                @click="createPaper"
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
  title: "",
  author: "",
  year: "",
  citationkey: "",
  booktitle: "",
  journal: "",
  doi: "",
  pages: "",
  url: "",
  date: "",
  description: "",
  tags: []
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
        author: { required },
        year: { required },
        citationkey: { required },
        booktitle: {required: false },
        journal: {required: false },
        doi: {required: false },
        pages: {required: false },
        url: {required: false },
        date: {required: false },
        description: {required: false },
      }
    }
  },
  setup () {
    return { v$: useVuelidate() }
  },
  methods: {
    async createPaper() {
      const isValid = await this.v$.$validate();

      if (isValid) {
        this.v$.$reset();
        this.$store.dispatch("paper/createPaper", {
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
