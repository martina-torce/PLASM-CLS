<template>
  <!-- Create the Add project button to get redirected to the ProjectCreate Page  -->
  <div class="add-project-button">
    <router-link to="/projects/new" class="round-button" style="color: white">Create Project</router-link>
  </div>
  <!-- Create the List of projects from the project database in Firestore  -->
  <section class="list">
    <div class="container">
      <div class="list-type">Projects :</div>
      <div class="row is-multiline">
        <div
          v-for="project in myProjects"
          :key="project.id"
          class="row is-12-mobile is-6-tablet is-4-widescreen is-6-desktop">
          <div class="item post-card bottom-border">
            <router-link
              :to="{name: 'ProjectLibrary', params: {slug: project.slug}}"
              class="item-link"
            >  
            <h2
                class="title item-title is-size-4 has-text-weight-extra-bold padder">
                <a class="item-link" href="#">{{project.title}}</a>
              </h2>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    projects: {
      type: Array,
      required: true,
    },
    myProjects:{
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  .list {
    padding-top: 70px;
  }
  .list-type {
    font-size: 34px;
    margin-bottom: 10px;
    font-weight: bold;
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
  .padder {
    padding: 15px;
  }
  </style>
  