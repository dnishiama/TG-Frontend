<template>

  <div class="card-body">

    <div class="btn-group" role="group" aria-label="...">
      <button class="glyphicon glyphicon-plus" type="button" v-on:click="cadastrar()">Online</button><br>
      <button class="glyphicon glyphicon-plus" type="button" v-on:click="cadastrarOffline()">USB</button><br>
      <button class="glyphicon glyphicon-repeat" type="button" v-on:click="obterContadores()">Get</button>
    </div>

    <div id="divListar">      
      <table id="tabImpressoras" class="table table-striped">
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
              v-on:click="editar(impressora.patrimonio)"
              style="color:blue"
            ></button>
            <button
              class="glyphicon glyphicon-repeat"
              type="button"
              v-on:click="contar(impressora.serial)"
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
  beforeMount() {
    axios
        .get("/impressora", { headers: { Accept: "application/json" } })
        .then(res => {
          console.log(res);
          this.impressoras = res.data;
        })
        .catch(error => console.log(error));
    },
  computed: {
    ...mapState(["usuario", "autorizacao"])
  },
  methods: {
    cadastrar(){
      this.$router.push("/impressora/cadastrar/");
    },
    cadastrarOffline(){
      this.$router.push("/impressora/cadastraroffline/");
    },
    obterContadores() {
    axios
        .get("/impressora/agente", { headers: { Accept: "application/json" } })
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
    editar(patrimonio) {
      this.$router.push("/impressora/atualizar/" + patrimonio);
    },
    contar(serial) {
      axios
        .put("/impressora/contador/" + serial)
        .then(res => {
          console.log(res);
          this.impressoras = res.data;
        })
        .catch(error => console.log(error));
    }
  }
};
</script>