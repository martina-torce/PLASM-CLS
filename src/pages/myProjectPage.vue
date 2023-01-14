<template>
    <div id="PLasm-CLS">
      <project-list
        :papers="papers"
      />
      <project-pagination
        :onNextPage="getMorePapers"
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
        searchedPaperTitle: ""
      }
    },
    computed: {
      papers() {
        console.log();
        return this.$store.getters["paper/filterPapers"](this.searchedPaperTitle);
      },
      isFetchingMoreData() {
        return this.$store.state.paper.pagination.isFetchingData
      },
      currentPage() {
        return this.$store.getters["paper/currentPage"];
      }
    },
    created() {
      this.$store.dispatch("paper/getPapers");
    },
    methods: {
      getMorePapers({page}) {
        this.$store.dispatch("paper/getMorePapers", {page});
      },
      filterPapers(searchValue) {
        this.searchedPaperTitle = searchValue;
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
  