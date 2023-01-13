<template>
  <div
    v-if="exchange && exchange.slug"
    class="page-wrapper">
    <section
      class="hero is-black">
      <div class="hero-body">
        <div class="hero-img"></div>
        <div class="container">
          <div style="padding-top: 10px;" class="columns">
            <div class="column is-100">
              <h1 class="title">
                {{exchange.title}}
              </h1>
              <h2 class="subtitle">
                {{exchange.type}}
              </h2>
              <!-- Exchange User Start -->
              <div v-if="!!exchangeUser" class="user-tile">
                <div class="user-tile-image">
                  <figure class="image is-64x64">
                    <img
                      class="is-rounded"
                      :src="exchangeUser.avatar"
                    >
                  </figure>
                </div>
                <div class="user-tile-author left">
                  <h3 class="user-tile-author-name">by {{exchangeUser.username}}</h3>
                </div>
              </div>
              <!-- Exchange User End -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- HEADER -->
    <div class="container">
      <div class="columns">
        <div class="column is-9">
          <div class="section">
            <div class="more-details">
              <div class="more-details-title">
                Details
              </div>
              <div class="more-details-item">Title: {{exchange.title}}</div>
              <div class="more-details-item">Auhtor: {{exchange.author}}</div>
              <div class="more-details-item">Year: {{exchange.year}}</div>
              <div class="more-details-item">CitationKey: {{exchange.citationkey}}</div>
              <div class="more-details-item">Book Title: {{exchange.booktitle}}</div>
              <div class="more-details-item">Journal: {{exchange.journal}}</div>
              <div class="more-details-item">URL: {{exchange.url}}</div>
              <div class="more-details-item">DOI: {{exchange.doi}}</div>
              <div class="more-details-item">Date: {{exchange.date}}</div>
              <div class="more-details-item">Description: {{exchange.description}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  components: {
  },
  created() {
    const { slug } = this.$route.params;
    this.$store.dispatch("exchange/getExchangeBySlug", slug);
  },
  computed: {
    user() {
      return this.$store.state.user.data;
    },
    isAuth() {
      return this.$store.getters["user/isAuthenticated"];
    },
    exchange() {
      return this.$store.state.exchange.item;
    },
    exchangeUser() {
      return this.exchange.user;
    },
    userExchanges() {
      return this.user?.exchanges || [];
    },
    isExchangeOwner() {
      return this.$store.getters["user/isExchangeOwner"](this.exchangeUser.id);
    },
    canCreateExchange() {
      return this.isAuth && !this.isExchangeOwner
    }
  }
}
</script>

<style scoped lang="scss">
  // CARD
  .card {
    z-index: 9999;
    min-width: 330px;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0 0 1px 1px rgba(20,23,28,.1), 0 3px 1px 0 rgba(20,23,28,.1);
    .title {
      color: gray;
    }
    .subtitle {
      color: gray;
    }
    .product-features {
      font-size: 17px;
    }
    .main-price {
      font-size: 17px;
      color: #7d7d7d;
      text-decoration: line-through;
    }
  }
  // CARD
  // WHOLE HEADER
  .hero-body {
    position: relative;
  }
  .hero-img {
    opacity: 0.8;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    filter: sepia(.1) grayscale(.1) saturate(.8);
  }
  .column-right {
    position: absolute;
  }
   @media screen and (max-width: 770px) {
    .column-right {
      position: inherit;
    }
  }
  .user-avatar {
    display: inline-block;
  }
  .is-black {
    background-color: black;
    background: linear-gradient(#29303B,#29303B,#29303B);
  }
  .title {
    font-weight: normals;
    font-size: 25px;
  }
  .subtitle {
    /*font-weight: bold;*/
    font-size: 25px;
  }
  .author-name {
    font-size: 20px;
    font-weight: bold;
  }
  .rate {
    font-size: 29px;
    font-style: italic;
  }
  // WHOLE HEADER END
  .more-details {
    background-color: #f9f9f9;
    border: 1px solid #dedfe0;
    padding: 10px 15px;
    &-title {
      font-size: 26px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    &-items {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    &-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      font-size: 19px;
      width: 45%;
    }
  }
  .product-description {
    padding-top: 0;
    &-title {
      font-size: 26px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    &-details {
      font-size: 18px;
      ul {
        list-style: disc;
        margin-left: 20px;
      }
      ol {
        margin-left: 20px;
      }
      strong {
        font-size: 20px;
      }
      p {
        min-height: 30px;
      }
    }
  }
  // USERS
  .user-tile {
    display: flex;
    &-author {
      align-self: center;
      margin-left: 10px;
      &-name {
        font-size: 17px;
      }
    }
    .date {
      font-size: 14px;
    }
  }
</style>
