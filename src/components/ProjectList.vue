<template>
    <div class="add-project-button">
      <router-link to="/projects/new" class="round-button" style="color: white">Create Project</router-link>
    </div>
    <section class="posts">
    <div class="container">
      <div class="posts-type">Posts</div>
      <div class="row is-multiline">
        <div
          v-for="paper in papers"
          :key="paper.id"
          class="row is-12-mobile is-6-tablet is-4-widescreen is-6-desktop">
          <div class="item post-card bottom-border">
            <div class="item-tags">
              <a
                v-for="tag in paper.tags"
                :key="tag"
                class="button is-rounded"
                href="#">
                #{{tag}}
              </a>
            </div>
            <router-link
              :to="{name: 'PaperDetail', params: {slug: paper.slug}}"
              class="item-link"
            >
              <h2
                class="title item-title is-size-4 has-text-weight-extra-bold">
                <a class="item-link" href="#">{{paper.title}}</a>
              </h2>
            </router-link>
            <div class="level">
              <div class="level-left">
                <div class="item-author">{{paper.type}}</div>
              </div>
              <div class="level-right">
                {{paper.createdAt.toDate().toDateString()}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    papers: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style scoped lang="scss">
  .posts {
    padding-top: 70px;
  }
  .posts-type {
    font-size: 34px;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .paper-icon {
    color: #ffbc8c;
    height: 25px;
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
    .add-project-button {
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
  </style>
  