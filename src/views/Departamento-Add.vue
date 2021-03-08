<template>
  <div class="card-body">
    <div class="col-lg-12">
      <h2>Cadastro</h2>
    </div>
    <div id="divCadastro" class="col-lg-12">
      <form>
        <div class="form-group">
          <label for="campus">Campus</label>
          <input type="text" class="form-control" id="campus" placeholder="campus" v-model="campus" required />
          <label for="bloco">Bloco</label>
          <input type="text" class="form-control" id="bloco" placeholder="bloco" v-model="bloco" required />
          <label for="departamento">Departamento</label>
          <input type="text" class="form-control" id="departamento" placeholder="departamento" v-model="departamento" required />
          <label for="ccusto">Centro de Custos</label>
          <input type="text" class="form-control" id="ccusto" placeholder="ccusto" v-model="ccusto" required />
          <label for="gestor">Gestor</label>
          <select v-model="gestor" class="form-control" id="gestor" placeholder="gestor" required>
            <option v-for="gestor in gestores" v-bind:key="gestor.id" v-bind:value="gestor.id">{{ gestor.nome }}</option>
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
  name: "departamento",
  data() {
    return {
      campus: "",
      bloco: "",
      departamento: "",
      ccusto: "",
      gestor: "",
      gestores: []
    };
  },

  computed: {
    ...mapState(["usuario", "autorizacao"])
  },

  mounted() {
    if (!this.usuario) {
      this.$router.push({ path: "/" })
    }    
  },

  methods: {    
    cadastrar() {
        axios
          .post("/departamento/cadastrar/", {
            campus: this.campus, 
            bloco: this.bloco, 
            departamento: this.departamento, 
            ccusto: this.ccusto, 
            gestor: {id: this.gestor},
          },
          { headers: { Accept: "application/json" } })
          .then(res => { console.log(res)
            alert("Departamento cadastrado com sucesso!!!");       
          })
          .catch(error => console.log(error));
        this.$router.push({ path: "/departamento" })   
    }
  }
}
</script>
