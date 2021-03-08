<template>
  <div class="text-center">
    <h1>Bem vindo {{usuario | capitalize}}</h1>
    <p v-if="!usuario">Faça o login para ter acesso ao sistema.</p>

  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
},

computed: {
    ...mapState(["usuario", "autorizacao"])
  }
};
</script>