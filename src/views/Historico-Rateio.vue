<template>
  <div class="card-body">
    <center>
      <div class="form-inline" id="form">
        <h2>Gerador de Rateio</h2>
        <h4>Preencha o formulario abaixo para gerar o rateio</h4><br>
        <label for="mes">Mês Ref.</label>
        <input type="text" class="form-control" id="mesRef" v-model="mesReferencia" placeholder="Mes Ref." style="width:80px;" required /> &nbsp; &nbsp;
        <label for="ano">Ano Ref.</label>
        <input type="text" class="form-control" id="anoRef" v-model="anoReferencia" placeholder="Ano Ref." style="width:80px;" required /> <br> <br>
        <button type="submit" class="btn btn-primary" v-on:click="submit()">Enviar</button>
      </div>           
    </center>

    <div id="divListar">      
      <table id="tabHistorico" class="table table-striped">
        <thead>
          <tr>            
            <th>CCusto</th>
            <th>Contador Mono</th>
            <th>Contador Color</th>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:eqp="eqp" v-for="eqp in impressoras" :key="eqp.ccusto">            
          <tr v-for="eqp in impressoras" :key="eqp.patrimonio">            
            <td>{{ eqp.ccusto }}</td>        
            <td>{{ eqp.contadorMono }}</td>
            <td>{{ eqp.contadorColor }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
  import Papa from 'papaparse'
  import Blob from 'blob'
  import FileSaver from 'file-saver'
  import axios from "axios";
  import { mapState } from "vuex";

export default {
  name: "historico",
  data() {
    return {
        Patrimonio: "",
        ContadorMono: "",
        ContadorColor: "",
        ProducaoMono: "",
        ProducaoColor: "",
        mesReferencia: "",
        anoReferencia: "",
        impressora: "",
        impressoras: [],
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
  
  methods: { 
    async submit(){
       await axios
            .get("/historico/rateio/"+ this.mesReferencia + '/' + this.anoReferencia, { headers: { Accept: "application/json" } })
            .then(rateio => { console.log(rateio);
              this.impressoras = rateio.data;
              this.save(rateio);              
            })
            .catch(error => console.log(error));
    },
    save(res){
      const blob = new Blob([this.parseJSONtoCSV(JSON.stringify(res))], { type: 'text/csv' });
      FileSaver.saveAs(blob,  this.mesReferencia + '.' + this.anoReferencia+'.csv');
    },
    parseJSONtoCSV (res) {
      return Papa.unparse(res, {delimiter: ";"})
    }
  }
};
</script>