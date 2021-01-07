<template>
  <div id="app" class="container">
    <div id="nav" class="row text-center">
      <router-link to="/login" v-if="!usuario">Login | </router-link>
      <router-link to="/">Home </router-link>
      <router-link to="/gestor"> | Gestor </router-link>
      <router-link to="/departamento"> | Departamento </router-link>
      <router-link to="/impressora"> | Impressora </router-link>
      <router-link to="/historico"> | Historico </router-link>
      <router-link to="/usuario"> | Usuario</router-link>
      <a v-if="usuario" @click="logout"> | Logout</a> 
      
    </div>
    <router-view />
  </div>
</template>



<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
   computed: {
    ...mapState(["usuario", "autorizacao"])
  },
  methods: {
    ...mapMutations(['logout'])
  }
};
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
