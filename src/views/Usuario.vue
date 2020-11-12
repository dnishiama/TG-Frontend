<template>
  <div class="card-body">
    <div class="col-lg-12">
      <router-link
        class="glyphicon glyphicon-plus btn-lg"
        to="/usuario/cadastrar"
        aria-label="Alinhar na esquerda"
        style="color:blue"
      >Add</router-link>
    </div>

    <div id="divListar">
      <table id="tabUsuarios" class="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th class="actions">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:usuario="usuario" v-for="usuario in usuarios" :key="usuario.id">
            <td>{{ usuario.id }}</td>
            <td>{{ usuario.nome }}</td>
            <td>{{ usuario.email }}</td>
            <button
              class="glyphicon glyphicon-trash mr-1"
              type="submit"
              style="color:red"
              v-on:click="excluir(usuario.id)"
            ></button>
            <button
              class="glyphicon glyphicon-pencil mr-1"
              type="button"
              v-on:click="editar(usuario.email)"
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
  name: "emailUsuario",
  data() {
    return {
      id: "",
      nome: "",
      email: "",
      usuarios: []
    };
  },
  computed: {
    ...mapState(["usuario", "autorizacao"])
  },
  beforeMount() {
    axios
        .get("/usuario", { headers: { Accept: "application/json" } })
        .then(res => {
          console.log(res);
          this.usuarios = res.data;
        })
        .catch(error => console.log(error));
  },
  methods: {
    excluir(id) {
      var resposta = confirm("Deseja remover esse registro?");
      if (resposta == true) {
        axios
          .delete("/usuario/deletar/" + id)
          .then(res => {
            console.log(res);
            alert("Usuario removido com sucesso!!!");
          })
          .catch(error => console.log(error));
      }
    },
    editar(id) {
      this.$router.push("/usuario/atualizar/" + id);
    }
  }
};
</script>