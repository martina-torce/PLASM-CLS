
<template>
  <header class="header">
    <nav
      class="navbar"
      :class="$route.path === '/' ? '' : 'with-background'"
    >
      <div class="container">
        <div class="navbar-brand">
          <router-link class="navbar-item is-size-2 has-text-weight-bold" :style="{ color: 'white' }" to="/">
            {{title}}
          </router-link>
          <span
            @click="isMenuOpen = !isMenuOpen"
            :class="{'is-active': isMenuOpen}"
            role="button" tabindex="0"
            class="navbar-burger burger has-text-dark"
            data-target="navbar-menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div
          id="navbar-menu"
          :class="{'is-active': isMenuOpen}"
          class="navbar-menu"
        >
          <div class="navbar-end" >
            <div  :style="{ color: navbarColors[$route.path] }" v-if="isAuthenticated"  class="navbar-item" >
              {{user.email}}
            </div>
            <router-link
              :style="{ color: navbarColors[$route.path] }"
              v-for="item in items"
              :key="item.text"
              :to="item.link"
              class="navbar-item nav-web">
              {{item.text}}
            </router-link>
            <template v-if="isAuthenticated">
              <router-link 
                :style="{ color: navbarColors[$route.path] }"
                to="/library"
                class="navbar-item">
                Library
              </router-link>
              <router-link 
                :style="{ color: navbarColors[$route.path] }"
                to="/projects"
                class="navbar-item">
                My Projects
              </router-link>
              <router-link
                :style="{ color: navbarColors[$route.path] }"
                to="/profile"
                class="navbar-item">
                Profile
              </router-link>
              <router-link
                :style="{ color: navbarColors[$route.path] }"
                to="/"
                @click="() => $store.dispatch('user/logout')"
                class="navbar-item clickable" >
                Logout
              </router-link>
            </template>
            <template v-else>
              <router-link
                :style="{ color: navbarColors[$route.path] }"
                to="/login"
                class="navbar-item">
                Login
              </router-link>
              <router-link
                :style="{ color: navbarColors[$route.path] }"
                to="/register"
                class="navbar-item">
                Register
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import useAuth from '../composition/useAuth'
export default {
  props: {
    title: {
      type: String,
      default: "Plasm",
    },
    items: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      isMenuOpen: false,
      navbarColors: {
        '/': 'black',
        '/profile': 'white',
        '/library': 'white',
        '/library/new': 'white',
        '/login': 'white',
        '/register': 'white',
        '/library/:slug': 'white',
        '/project': 'white',
      },
    }
  },
  watch: {
    '$route': function(to) {
      if (to.name === '/') {
        this.color = 'black';
      } else {
        this.color = 'white';
      }
    }
  },
  setup() {
    return useAuth();
  },
  created() {
    window.addEventListener("resize", this.handleWindowResizing);
  },
  unmounted() {
    window.removeEventListener("resize", this.handleWindowResizing);
  },
  methods: {
    handleWindowResizing(e) {
      if (this.isMenuOpen && e.target.innerWidth > 1020) {
        this.isMenuOpen = false;
      }
    }
  }
  
}
</script>
