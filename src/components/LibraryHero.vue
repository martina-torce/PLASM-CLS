  <template>
    <!-- Creating the Search component for the library page -->
    <div class="search-lookup-wrap">
      <div class="search-lookup centered">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <span>Search For</span>
            </div>
            <!-- Add the input space to allow user to search -->
            <div class="level-item">
              <input
                @input="handleSearch"
                type="text"
                class="input"
                placeholder="Tags">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Create the "Add Paper" buttonto the page to allow to add new paper (willredirect you to AddPaperPage) -->
    <div class="add-paper-button">
      <router-link to="/library/new" class="round-button" style="color: white">Add Paper</router-link>
    </div>
  </template>

  <script>

  export default {
    props: {
      onSearch: {
        type: Function,
        required: true
      }
    },
    // Set the reserachvalue to an empty string
    data() {
      return {
        searchedValue: ""
      }
    },
    // Create the method to allow the research to find the paper tags/name
    methods: {
      handleSearch(e) {
        const { value } = e.target;
        this.searchedValue = value;
        this.onSearch(value);
      }
    }
  }
  </script>


  <style scoped lang="scss">

    .search-lookup {
      width: 550px;
      margin: 0 auto;
      background-color: #262d32;
      padding: 20px;
      color: white;
      border-radius: 10px;
    }
    .search-lookup-wrap {
      width: 100%;
      z-index: 2;
      position: relative;
      bottom: -80px;
    }

    @media only screen and (max-width: 769px) {
      .search-lookup-wrap {
        position: inherit;
        bottom: -80px;
      }
      .search-lookup {
        width: 100%;
        border-radius: 0px;
        bottom: unset;
      }
    }
    .add-paper-button {
      right: 75px;
      top: 100px;
      position: absolute;
      z-index: 999;
      background-color:hsl(0deg, 0%, 29%);
      border: none;
      padding: 10px 22px;
      border-radius: 12px;
      text-align: center;
      display: inline-block;
      font-size: 16px;
    }

    @media only screen and (max-width: 769px) {
      .add-paper-button {
        position: inherit;
        bottom: unset;
      }
    }
  </style>
