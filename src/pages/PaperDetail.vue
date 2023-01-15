<!-- This page allows the user to view details about a paper -->
<template>
  <div
    v-if="paper && paper.slug"
    class="page-wrapper">
    <!-- Display title and type of paper -->
    <section
      class="hero is-black">
      <div class="hero-body">
        <div class="hero-img"></div>
        <div class="container">
          <div style="padding-top: 10px;" class="columns">
            <div class="column is-100">
              <h1 class="title">
                {{paper.title}}
              </h1>
                <!-- Display user who added paper -->
                <div v-if="!!paperUser" class="user-tile">
                <div class="user-tile-image">
                  <figure class="image is-64x64">
                    <img
                      class="is-rounded"
                      :src="paperUser.avatar"
                    >
                  </figure>
                </div>
                <div class="user-tile-author left">
                  <h3 class="user-tile-author-name">by {{paperUser.username}}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Display the reference attributes of a paper -->
    <div class="container">
      <div class="columns">
        <div class="column is-9">
          <div class="section">
            <div class="more-details">
              <div class="more-details-title">
                Details
              </div>
              <div class="more-details-item">Title: {{paper.title}}</div>
              <div class="more-details-item">Auhtor: {{paper.author}}</div>
              <div class="more-details-item">Year: {{paper.year}}</div>
              <div class="more-details-item">CitationKey: {{paper.citationkey}}</div>
              <div class="more-details-item">Book Title: {{paper.booktitle}}</div>
              <div class="more-details-item">Journal: {{paper.journal}}</div>
              <div class="more-details-item">URL: {{paper.url}}</div>
              <div class="more-details-item">DOI: {{paper.doi}}</div>
              <div class="more-details-item">Date: {{paper.date}}</div>
              <div class="more-details-item">Description: {{paper.description}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="comment-space">
        <p>Comment (1)</p>
      </div>
      <div>
        <user-comment class="message" />
      </div>
      <add-comment />
    </div>
  </div>
</template>


<script>
import AddComment from "../components/AddComment.vue";
import UserComment from "../components/UserComment.vue"

export default {
  components: {
    AddComment,
    UserComment
  },
  created() {
    const { slug } = this.$route.params;
    this.$store.dispatch("paper/getPapersBySlug", slug);
  },
  computed: {
    user() {
      return this.$store.state.user.data;
    },
    isAuth() {
      return this.$store.getters["user/isAuthenticated"];
    },
    paper() {
      return this.$store.state.paper.item;
    },
    paperUser() {
      return this.paper.user;
    },
    userPapers() {
      return this.user?.papers || [];
    },
    isPaperOwner() {
      return this.$store.getters["user/isPaperOwner"](this.paperUser.id);
    },
    canCreatePaper() {
      return this.isAuth && !this.isPaperOwner
    }
  }
}
</script>

<style scoped lang="scss">
    .title {
      color: gray;
    }
    .subtitle {
      color: gray;
    }
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
  }
</style>
