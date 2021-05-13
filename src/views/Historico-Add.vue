<template>
  <div class="parse">
    <h1>Cadastro da Fatura</h1>
    <br> 
    
    <center>
      <div class="form-inline" id="form">
        <h4>Anexe o arquivo CSV abaixo: </h4><br>
        <input id="fileInput" class="form-control" type="file" @change="upload"><br><br> 
        <label for="mes">Mês Ref.</label>
        <input type="text" class="form-control" id="mesRef" v-model="mesReferencia" placeholder="Mes Ref." style="width:80px;" required /> &nbsp; &nbsp;
        <label for="ano">Ano Ref.</label>
        <input type="text" class="form-control" id="anoRef" v-model="anoReferencia" placeholder="Ano Ref." style="width:80px;" required /> <br> <br>
        <button type="submit" class="btn btn-primary" v-on:click="save()">Enviar</button>
      </div>           
    </center>

    <div id="divListar">      
      <table id="tabHistorico" class="table table-striped">
        <thead>
          <tr>            
            <th>Patrimonio</th>
            <th>Contador Mono</th>
            <th>Produção Mono</th>
            <th>Contador Color</th>
            <th>Produção Color</th>          
          </tr>
        </thead>
        <tbody>
          <tr v-bind:eqp="eqp" v-for="eqp in impressoras" :key="eqp.patrimonio">            
          <tr v-for="eqp in impressoras" :key="eqp.patrimonio">            
            <td>{{ eqp.patrimonio }}</td>        
            <td>{{ eqp.contadorMono }}</td>
            <td>{{ eqp.producaoMono }}</td>
            <td>{{ eqp.contadorColor }}</td>
            <td>{{ eqp.producaoColor }}</td>                    
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
    name: 'parse',
    data () {
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
      }
    },
    computed: {
    ...mapState(['usuario', 'autorizacao'])
    },
    mounted() {
      if (!this.usuario){
        this.$router.push({ path: "/" })
      }    
    },
    methods: {
      upload () {
        const that = this
        const fileToLoad = event.target.files[0]
        const reader = new FileReader()
        reader.onload = fileLoadedEvent => {
          Papa.parse(fileLoadedEvent.target.result,  {
            skipEmptyLines: true,
            header: true,
            complete (results) {
              console.log('complete', results)
              that.impressoras = JSON.parse(JSON.stringify(results.data))
              that.impressora = JSON.stringify(results.data)
            },
            error (errors) {
              console.log('error', errors)
            }
          })
        }
        reader.readAsText(fileToLoad)
      },
      async save () {
        await axios.post('/historico/cadastrar/'+ this.mesReferencia + '/' + this.anoReferencia, 
            this.impressoras,
          { headers: { Accept: "application/json"} })
          .then(res => 
          { 
            console.log(res)
            alert("Cadastrado com sucesso!!!")
            
            axios
            .get("/historico/rateio/"+ this.mesReferencia + '/' + this.anoReferencia, { headers: { Accept: "application/json" } })
            .then(rateio => { console.log(rateio);
              const blob = new Blob([this.parseJSONtoCSV(JSON.stringify(rateio))], { type: 'text/csv' })
              FileSaver.saveAs(blob,  this.mesReferencia + '.' + this.anoReferencia+'.csv')
            })
            .catch(error => console.log(error));
            
            this.$router.push({ path: "/historico"})
          })
          .catch(error => {
            console.log(error)
            alert("Não foi possível cadastrar o historico! Erro: "+error)
            this.$router.push({ path: "/historico"})
          })   
      },

      parseJSONtoCSV (res) {
        return Papa.unparse(res, {delimiter: ";"})
      }
    }
  }
</script>
