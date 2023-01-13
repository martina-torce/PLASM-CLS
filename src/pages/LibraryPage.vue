<template>
    <div id="exchangario">
      <library-hero
        :onSearch="filterExchanges"
      />
      <library-list
        :exchanges="exchanges"
      />
      <library-pagination
        :onNextPage="getMoreExchanges"
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
        searchedExchangeTitle: ""
      }
    },
    computed: {
      exchanges() {
        console.log();
        return this.$store.getters["exchange/filterExchanges"](this.searchedExchangeTitle);
      },
      isFetchingMoreData() {
        return this.$store.state.exchange.pagination.isFetchingData
      },
      currentPage() {
        return this.$store.getters["exchange/currentPage"];
      }
    },
    created() {
      this.$store.dispatch("exchange/getExchanges");
    },
    methods: {
      getMoreExchanges({page}) {
        this.$store.dispatch("exchange/getMoreExchanges", {page});
      },
      filterExchanges(searchValue) {
        this.searchedExchangeTitle = searchValue;
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
  