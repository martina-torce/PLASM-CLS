<!--Displays Library Page for inputted papers-->
<template>
    <div id="Plasm-CLS">
      <library-hero
        :onSearch="filterPapers"
      />
      <library-list
        :papers="papers"
      />
      <library-pagination
        :onNextPage="getMorePapers"
        :isFetching="isFetchingMoreData"
        :page="currentPage"
      />
    </div>
  </template>
  
  <script>
  import LibraryList from "../components/LibraryList.vue";
  import LibraryPagination from "../components/LibraryPagination.vue";
  import LibraryHero from "../components/LibraryHero.vue";
  
  export default {
    components: {
      LibraryList,
      LibraryPagination,
      LibraryHero
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
    // Method created responsible for retrieving more papers from the database and filtering papers based on inputed search value 
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
  