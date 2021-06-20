<template>
  <div class="card-body">
    <div class="col-lg-12">
      <h2>Cadastro</h2>
    </div>
    <div id="divCadastro" class="col-lg-12">
      <form>

        <div class="form-group">
          <label for="patrimonio">Patrimônio</label>
          <input type="text" class="form-control" id="patrimonio" placeholder="Patrimônio" v-model="patrimonio" required />
          <label for="fabricante">Fabricante</label>
          <input type="text" class="form-control" id="fabricante" placeholder="Fabricante" v-model="fabricante" required />
          <label for="modelo">Modelo</label>
          <input type="text" class="form-control" id="modelo" placeholder="Modelo" v-model="modelo" required />
          <label for="serial">Serial</label>
          <input type="text" class="form-control" id="serial" placeholder="Serial" v-model="serial" required />
          <label for="contadorMono">Contador Mono</label>
          <input type="text" class="form-control" id="contadorMono" placeholder="Contador Mono" v-model="contadorMono" required />
          <label for="contadorColor">Contador Mono</label>
          <input type="text" class="form-control" id="contadorColor" placeholder="Contador Color" v-model="contadorColor" required />
          <label for="departamento">Departamento</label>
          <select v-model="departamento" class="form-control" id="departamento" required>
            <option v-for="departamento in departamentos" v-bind:key="departamento.id" v-bind:value="departamento.id">{{ departamento.campus }} - {{ departamento.bloco }} - {{ departamento.departamento }}</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary" v-on:click="cadastrar()">Enviar</button>

      </form>
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
      Patrimonio: "",
      Ip: "",
      departamento: "",
      departamentos: []
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
        .get("/departamento", { headers: { Accept: "application/json" } })
        .then(res => {
          console.log(res);
          this.departamentos = res.data;
        })
        .catch(error => console.log(error));
  },

  methods: {
    cadastrar() {
        axios       
          .post("/impressora/cadastraroffline/", 
                {
                  patrimonio: this.patrimonio,
                  ip: "USB",
                  fabricante: this.fabricante,
                  modelo: this.modelo,
                  serial: this.serial,
                  contadorMono: this.contadorMono,
                  contadorColor: this.contadorColor,                
                  departamento: {'id': this.departamento},
                },
                {headers: { Accept: "application/json" }
          })
          .then(res => {
            console.log(res);
            this.patromonio = "";
            this.ip = "";
            this.departamento = "";
            alert("Impressora cadastrada com sucesso!!!");
          })
          .catch(error => console.log(error));
      }
    }
  }
</script>
