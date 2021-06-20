<template>
  <div class="card-body">
    <div class="col-lg-12">
      <h2>Atualização</h2>
    </div>
    <div id="divAtualizar" class="col-lg-12">
      <form>
        <div class="form-group">
          <label for="patrimonio">Patrimônio</label>
          <input type="text" class="form-control" id="patrimonio" placeholder="patrimonio" v-model="impressoras.patrimonio" required />

          <label for="fabricante">Fabricante</label>
          <input type="text" class="form-control" id="fabricante" placeholder="Fabricante" v-model="impressoras.fabricante" required />
         
          <label for="ip">IP</label>
          <input type="text" class="form-control" id="ip" placeholder="IP" v-model="impressoras.ip" required />
          
          <label for="modelo">Modelo</label>
          <input type="text" class="form-control" id="modelo" placeholder="Modelo" v-model="impressoras.modelo" required />
          
          <label for="serial">Serial</label>
          <input type="text" class="form-control" id="serial" placeholder="Serial" v-model="impressoras.serial" required />
          
          <label for="contadorMono">Contador Mono</label>
          <input type="text" class="form-control" id="contadorMono" placeholder="Contador Mono" v-model="impressoras.contadorMono" required />
          
          <label for="contadorColor">Contador Color</label>
          <input type="text" class="form-control" id="contadorColor" placeholder="Contador Color" v-model="impressoras.contadorColor" required />
          
          <label for="departamento">Departamento</label>
          <select v-model="impressoras.departamento.id" class="form-control" id="departamento" required>
            <option v-for="departamento in departamentos" v-bind:key="departamento.id" v-bind:value="departamento.id">{{ departamento.campus }} - {{ departamento.bloco }} - {{ departamento.departamento }}</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary" v-on:click="atualizar()">Enviar</button>
      </form>    
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "impressora",
    props: ['imp'],
  data() {
    return {
      id: "",
      patrimonio: "",
      fabricante: "",
      modelo: "",
      serial: "",
      ip: "",
      contadorMono: "",
      contadorColor: "",
      ultimoUpdate: "",
      departamento: "",
      departamentos: [],
      impressoras: [],
    };
  },

  computed: {
    ...mapState(["usuario", "autorizacao"])
  },

  beforeMount() {
      if (!this.usuario){
        this.$router.push({ path: "/home" })
      } 
      axios
          .get("/departamento", { headers: { Accept: "application/json" } })
          .then(res => {
            console.log(res);
            this.departamentos = res.data;
          })
          .catch(error => console.log(error));
    },

  created () 
  {
    this.buscarImpressora(this.imp)
  },

  methods: {
    async atualizar() 
    {
        await axios
        .put('/impressora/atualizarOffline/'+this.impressoras.id, 
        {
          id: this.impressoras.id,
          patrimonio: this.impressoras.patrimonio,
          ip: this.impressoras.ip,
          fabricante: this.impressoras.fabricante,
          modelo: this.impressoras.modelo,
          serial: this.impressoras.serial,
          contadorMono: this.impressoras.contadorMono,
          contadorColor: this.impressoras.contadorColor,
          departamento: {id: this.impressoras.departamento.id},
        })
        .then(res => {
          console.log(res);
          alert("Impressora atualizado com sucesso!!!");
          this.$router.push({ path: "/impressora" })
        })
        .catch(error => console.log(error));
    },
    buscarImpressora(id) {
      axios
        .get("/impressora/" + id, {
          headers: { Accept: "application/json" }
        })
        .then(res => {
          console.log(res);
          this.impressoras = res.data;
        })
        .catch(error => console.log(error));
    }
  },

  
}
</script>
