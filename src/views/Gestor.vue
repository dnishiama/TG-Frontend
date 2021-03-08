<template>
  <div class="card-body">
    <div class="col-lg-12" v-if="usuario">
      <router-link
        class="glyphicon glyphicon-plus btn-lg"
        to="/gestor/cadastrar"
        aria-label="Alinhar na esquerda"
        v-if="usuario"
        style="color:blue"
      >Add</router-link>
    </div>
    <div id="divListar">
      <table id="tabGestor" class="table table-striped">
        <thead>
          <tr>            
            <th>Nome</th>
            <th>E-mail</th>
            <th class="actions" v-if="usuario">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:gestor="gestor" v-for="gestor in gestores" :key="gestor.id">            
            <td>{{ gestor.nome }}</td>
            <td>{{ gestor.email }}</td>
            <button              
              class="glyphicon glyphicon-trash mr-1"
              type="submit"
              style="color:red"
              v-if="usuario"
              v-on:click="excluir(gestor.id)"
            ></button>
            <button              
              class="glyphicon glyphicon-pencil mr-1"
              type="button"
              v-if="usuario"
              v-on:click="editar(gestor.email)"
              style="color:blue"
            ></button>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";

export default {
  name: "emailGestor",
  data() {
    return {
      id: "",
      nome: "",
      email: "",
      gestores: []
    };
  },

  computed: {
    ...mapState(["usuario", "autorizacao"]),
    ...mapMutations
  },

  mounted() {
    if (!this.usuario){
      this.$router.push({ path: "/" })
    }    
  },

  beforeMount() {
    axios
        .get("/gestor", { headers: { Accept: "application/json" } })
        .then(res => { console.log(res);
          this.gestores = res.data;
        })
        .catch(error => console.log(error));
  },
  
  methods: {
    excluir(id) {
      var resposta = confirm("Deseja remover esse registro?");
      if (resposta == true) {
        axios
          .delete("/gestor/deletar/" + id)
          .then(res => { console.log(res);
            alert("Gestor removido com sucesso!!!");
            this.$router.go(0);
          })
          .catch(error => console.log(error));
      }
    },

    editar(emailGestor) {
      this.$router.push("/gestor/atualizar/" + emailGestor);
    }
    
  }
};
</script>