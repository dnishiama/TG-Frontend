<template>

    <div class="card-body">
    <div class="col-lg-12">
      <router-link
        class="glyphicon glyphicon-plus btn-lg"
        to="/impressora/cadastrar"
        aria-label="Alinhar na esquerda"
        style="color:blue"
      >Add</router-link>
    </div>

    <div id="divListar">
      <div class="col-lg-12">
        <h2>Listar</h2>Clique no botão para visualizar as impressoras cadastradas
        <button v-on:click="buscarTodos" class="glyphicon glyphicon-plus"></button>
      </div>
      <table id="tabImpressoras" hidden="true" class="table table-striped">
        <thead>
          <tr>
            
            <th>Patrimonio</th>
            <th>Departamento</th>
            <th>Fabricante</th>
            <th>Modelo</th>
            <th>Serial</th>
            <th>Conexão</th>
            <th>Cont. Mono</th>
            <th>Cont. Color</th>
            <th>Ultimo Update</th>
            
            <th class="actions">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:impressora="impressora" v-for="impressora in impressoras" :key="impressora.id">
            
            <td>{{ impressora.patrimonio }}</td>
            <td>{{ impressora.departamento.campus }} - 
                {{ impressora.departamento.bloco }} - 
                {{ impressora.departamento.departamento }}</td>
            <td>{{ impressora.fabricante }}</td>
            <td>{{ impressora.modelo }}</td>
            <td>{{ impressora.serial }}</td>
            <td>{{ impressora.ip }}</td>
            <td>{{ impressora.contadorMono }}</td>
            <td>{{ impressora.contadorColor }}</td>
            <td>{{ impressora.ultimoUpdate }}</td>
            
            <button
              class="glyphicon glyphicon-trash mr-1"
              type="submit"
              style="color:red"
              v-on:click="excluir(impressora.id)"
            ></button>
            <button
              class="glyphicon glyphicon-pencil mr-1"
              type="button"
              v-on:click="editar(impressora.id)"
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
  name: "impressora",
  data() {
    return {
      id: "",
      Patrimonio: "",
      Fabricante: "",
      Modelo: "",
      Serial: "",
      Ip: "",
      ContadorMono: "",
      ContadorColor: "",
      ultimoUpdate: "",
      impressoras: []
    };
  },
  computed: {
    ...mapState(["usuario", "autorizacao"])
  },
  methods: {
    buscarTodos() {
      var show = document.getElementById("tabImpressoras");
      if (show.hidden === true) {
        show.hidden = false;
      }
      axios
        .get("/impressora", { headers: { Accept: "application/json" } })
        .then(res => {
          console.log(res);
          this.impressoras = res.data;
        })
        .catch(error => console.log(error));
    },
    excluir(id) {
      var resposta = confirm("Deseja remover esse registro?");
      if (resposta == true) {
        axios
          .delete("/impressora/deletar/" + id)
          .then(res => {
            console.log(res);
            alert("Impressora removida com sucesso!!!");
          })
          .catch(error => console.log(error));
      }
    },
    editar(id) {
      this.$router.push("/impressora/atualizar/" + id);
    }
  }
};
</script>