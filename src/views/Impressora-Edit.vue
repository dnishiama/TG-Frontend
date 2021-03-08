<template>
  <div class="card-body">
    <div class="col-lg-12">
      <h2>Atualização</h2>
    </div>
    <div id="divAtualizar" class="col-lg-12">
      <form>
        <div class="form-group">
          <label for="patrimonio">Patrimônio</label>
          <input type="text" class="form-control" id="patrimonio" placeholder="Patrimônio" v-model="patrimonio" required />
          <label for="ip">IP</label>
          <input type="text" class="form-control" id="ip" placeholder="IP" v-model="ip" required />
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
    props: ['impressora'],
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

  created () {
    this.buscarEmail(this.gestor)
  },

  methods: {
    editar() {
        axios.put('impressora/atualizar/'+this.impressora.patrimonio,
        {
            patrimonio: this.impressora.patrimonio,
            ip: this.impressora.ip,
        })
        .then(res => {
            console.log(res);
            this.gestor.nome = '';
            this.gestor.email = '';
            alert("gestor alterado com sucesso!!!");
    })
      .catch(error => console.log(error))
    },

    buscarEmail(email) {
      console.log(email);
      axios
        .get("/gestor/email/" + email, {
          headers: { Accept: "application/json" }
        })
        .then(res => {
          console.log(res);
          this.gestor = res.data;
        })
        .catch(error => console.log(error));
    }
  },

  
}
</script>
