
<template>
  <div>
    <exchange-navbar
      :title="brandName"
      :items="menuItems"
    />
    <router-view />
  </div>
</template>

<script>
import ExchangeNavbar from "./components/ExchangeNavbar.vue";
export default {
  name: 'App',
  components: {
    ExchangeNavbar
  },
  data() {
    return {
      brandName: "PLASM",
      menuItems: [
        { text: "Home", link: "/" },
      ],
    }
  }
}
</script>

<style lang="scss">
  @import 'assets/styles/variables.scss';
  @import '~bulma/bulma.sass';
  @import 'assets/styles/main.scss';
</style>
