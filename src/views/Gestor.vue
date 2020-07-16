<template>
  <div class="card-body">
    <div class="col-lg-12" v-if="autorizacao === '[ROLE_ADMIN]'">
      <router-link
        class="glyphicon glyphicon-plus btn-lg"
        to="/gestor/cadastrar"
        aria-label="Alinhar na esquerda"
        style="color:blue"
      >Add</router-link>
    </div>

    <div id="divListar">
      <div class="col-lg-12">
        <h2>Listar</h2>Clique no botão para visualizar o gestores cadastrados
        <button
          v-on:click="buscarTodos"
          class="glyphicon glyphicon-plus"
        ></button>
      </div>
      <table id="tabGestor" hidden="true" class="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th class="actions">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:gestor="gestor" v-for="gestor in gestores" :key="gestor.id">
            <td>{{ gestor.id }}</td>
            <td>{{ gestor.nome }}</td>
            <td>{{ gestor.email }}</td>
            <button
              v-if="autorizacao === '[ROLE_ADMIN]'"
              class="glyphicon glyphicon-trash mr-1"
              type="submit"
              style="color:red"
              v-on:click="excluir(gestor.id)"
            ></button>
            <button
              v-if="autorizacao === '[ROLE_ADMIN]'"
              class="glyphicon glyphicon-pencil mr-1"
              type="button"
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
import { mapState } from "vuex";
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
    ...mapState(["usuario", "autorizacao"])
  },
  methods: {
    buscarTodos() {
      var show = document.getElementById("tabGestor");
      if (show.hidden === true) {
        show.hidden = false;
      }
      axios
        .get("/gestor", { headers: { Accept: "application/json" } })
        .then(res => {
          console.log(res);
          this.gestores = res.data;
        })
        .catch(error => console.log(error));
    },
    excluir(id) {
      var resposta = confirm("Deseja remover esse registro?");
      if (resposta == true) {
        axios
          .delete("/gestor/deletar/" + id)
          .then(res => {
            console.log(res);
            alert("Gestor removido com sucesso!!!");
          })
          .catch(error => console.log(error));
      }
    },
    editar(emailGestor) {
      this.$router.push("/gestor/atualizar/" + emailGestor);
      alert(emailGestor);
    }
  }
};
</script>