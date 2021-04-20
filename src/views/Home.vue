<template>
  <div class="text-center">
    <h1>Bem vindo <strong>{{usuario | capitalize}}</strong></h1>
    <h4>
    <p v-if="usuario">Utilize os links acima para ter acesso aos recursos do sistema. </p>
    <p v-if="!usuario">Faça o login para ter acesso ao sistema.</p>
    </h4>
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
    ...mapState([
      'usuario'
    ])
  }
};
</script>