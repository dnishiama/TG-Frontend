<template>
  <div id="app" class="container">
    <div id="nav" class="row text-center">
      <router-link to="/login" v-if="!usuario">Login | </router-link>
      <router-link to="/">Home </router-link>
      <router-link to="/gestor" v-if="usuario"> | Gestor </router-link>
      <router-link to="/departamento" v-if="usuario"> | Departamento </router-link>
      <router-link to="/impressora" v-if="usuario"> | Impressora </router-link>
      <router-link to="/historico" v-if="usuario"> | Historico </router-link>
      <router-link to="/usuario" v-if="usuario"> | Usuario</router-link>
      <a v-if="usuario" @click="logout"  href="/login"> | Logout</a>      
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapState([
      'usuario'
    ])
  },
  methods: {
    ...mapMutations([
      'logout'
    ])
  }
}
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
