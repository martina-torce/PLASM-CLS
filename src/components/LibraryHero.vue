<template>
  <div class="search-lookup-wrap">
    <div class="search-lookup centered">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <span>Search For</span>
          </div>
          <div class="level-item">
            <input
              @input="handleSearch"
              type="text"
              class="input"
              placeholder="Paper">
          </div>
          <div class="level-item">
            <span v-if="searchedValue">Searching "{{searchedValue}}"</span>
          </div>
        </div>
      </div>
    </div>

        <paperadd-modal
      v-if="user"
      :user ="user"

    />  <!-- <router-link to="/library/new" class="round-button" style="color: white">Add Paper</router-link> -->

    <citation-modal
        v-if="user"
        :user="user"

      />
  </div>
</template>

<script>
import useAuth from '../composition/useAuth';
import CitationModal from '../components/CitationModal.vue'
import PaperaddModal from '../components/PaperAddModal.vue'


export default {
  components: {
    CitationModal,
    PaperaddModal,
  },
  props: {
    onSearch: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      searchedValue: "",
      showExportModal: false,
      showImportModal:false
    }
  },
  methods: {
    handleSearch(e) {
      const { value } = e.target;
      this.searchedValue = value;
      this.onSearch(value);
    }
  },
  setup() {
    return useAuth();
  },
  watch: {
    isAuthenticated(isAuth) {
      if (!isAuth) { this.$router.push("/"); }
    }
  }
}
</script>

<style scoped lang="scss">
  .hero-section {
    position: relative;
    display: inline;
  }

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
      bottom: unset;
    }
    .search-lookup {
      width: 100%;
      border-radius: 0px;
    }
  }

  .search-card-find {
      width: 100%;
      height: 180px;
      position: relative;
      border-radius: 3px;
      text-decoration: none;
      box-shadow: 0 0 1px rgba(0,0,0,.05);
      background-clip: content-box;
      background-size: cover;
      background-position: 50% 20%;
      border: 1px solid rgba(0,0,0,.12);
      -webkit-tap-highlight-color: transparent;
      &-interest {
        position: absolute;
        bottom: 12px;
        right: 12px;
        > p {
          font-weight: bold;
        }
      }
      .title {
        color: white;
      }
      .subtitle {
        color: white;
      }
      &-content {
        &-date {
          margin: 10px;
          width: 70px;
          text-align: center;
          border-radius: 50%;
          .day {
            font-size: 21px;
            color: white;
            font-weight: bold;
          }
          .month {
            color: #ff5050;
            font-weight: bold;
            font-size: 23px;
            margin-bottom: -5px;
          }
        }
        &-info {
          position: absolute;
          bottom: 0;
          left: 0;
          padding: 15px;
          width: 100%;
        }
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

    .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    }

    .modal {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    }

  </style>
