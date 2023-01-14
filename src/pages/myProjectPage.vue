<template>
    <div id="PLasm-CLS">
      <project-list
        :projects="projects"
      />
      <project-pagination
        :onNextPage="getMoreProjects"
        :isFetching="isFetchingMoreData"
        :page="currentPage"
      />
    </div>
  </template>
  
  <script>
  import ProjectList from "../components/ProjectList.vue";
  import ProjectPagination from "../components/ProjectPagination.vue";

  export default {
    components: {
      ProjectList,
      ProjectPagination,
    },
    data() {
      return {
        searchedProjectTitle: ""
      }
    },
    computed: {
      projects() {
        console.log();
        return this.$store.getters["project/filterProjects"](this.searchedProjectTitle);
      },
      isFetchingMoreData() {
        return this.$store.state.project.pagination.isFetchingData
      },
      currentPage() {
        return this.$store.getters["project/currentPage"];
      }
    },
    created() {
      this.$store.dispatch("project/getProjects");
    },
    methods: {
      getMoreProjects({page}) {
        this.$store.dispatch("project/getMoreProjects", {page});
      },
      filterProjects(searchValue) {
        this.searchedProjectTitle = searchValue;
      }
    }
  }
  </script>
  
  <style scoped>
   .counter-container {
     padding: 200px;
     font-size: 60px;
   }
  </style>
  