<template>
  <div class="text-center">
    <h1>Bem vindo! {{usuario}}</h1>
    <p>Esta é uma aplicação exemplo que utiliza autenticação com JWT</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
   computed: {
    ...mapState(["usuario", "autorizacao"])
  }
};
</script>