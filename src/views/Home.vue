<template>
  <div class="text-center">
    <h1>Bem vindo! {{usuario}}</h1>
    <p>Esta é uma aplicação desenvolvida para gerenciamento da conta de outsourcing de impressão</p>
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