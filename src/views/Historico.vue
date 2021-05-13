<template>
  <div class="card-body">
    <div class="btn-group" role="group" aria-label="...">
      <button class="glyphicon glyphicon-plus" type="button" v-on:click="cadastrar()">Cadastrar Fatura</button><br>  
      <button class="glyphicon glyphicon-plus" type="button" v-on:click="rateio()">Rateio Fatura</button><br>  
    </div>
    <div id="divListar">      
      <table id="tabHistorico" class="table table-striped">
        <thead>
          <tr>            
            <th>Patrimonio</th>
            <th>Departamento</th>
            <th>Contador Mono</th>
            <th>Contador Color</th>
            <th>Produção Mono</th>
            <th>Produção Color</th>
            <th>Mes Ref.</th>
            <th>Ano Ref.</th>
            <th>Data do Insert</th>            
          </tr>
        </thead>
        <tbody>
          <tr v-bind:historico="historico" v-for="historico in historicos" :key="historico.id">            
            <td>{{ historico.patrimonio }}</td>
            <td>{{ historico.impressora.departamento.campus }} - 
                {{ historico.impressora.departamento.bloco }} - 
                {{ historico.impressora.departamento.departamento }}</td>              
            <td>{{ historico.contadorMono }}</td>
            <td>{{ historico.contadorColor }}</td>
            <td>{{ historico.producaoMono }}</td>
            <td>{{ historico.producaoColor }}</td>
            <td>{{ historico.mes }}</td>
            <td>{{ historico.ano }}</td>
            <td>{{ historico.data }}</td>                      
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
  name: "historico",
  data() {
    return {
      id: "",
      Patrimonio: "",
      MesReferencia: "",
      AnoReferencia: "",
      ContadorMono: "",
      ContadorColor: "",
      ProducaoMono: "",
      ProducaoColor: "",
      ultimoUpdate: "",
      historicos: []
    };
  },
  
  computed: {
    ...mapState(["usuario", "autorizacao"])
  },

  mounted() {
    if (!this.usuario){
      this.$router.push({ path: "/" })
    }    
  },

  beforeMount() {
    axios
      .get("/historico", { headers: { Accept: "application/json" } })
      .then(res => { console.log(res);
        this.historicos = res.data;
      })
      .catch(error => console.log(error));
  },
  
  methods: { 
    cadastrar(){
      this.$router.push("/historico/cadastrar/");
    },
    rateio(){
      this.$router.push("/historico/rateio/");
    }
  }
};
</script>