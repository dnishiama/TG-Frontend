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
         
          <label for="ip">IP</label>
          <input type="text" class="form-control" id="ip" placeholder="IP" v-model="impressoras.ip" required />

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
        .put('/impressora/atualizarOnline/'+this.impressoras.id, 
        {
          patrimonio: this.impressoras.patrimonio,
          ip: this.impressoras.ip,
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