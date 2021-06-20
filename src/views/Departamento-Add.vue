<template>
  <div class="card-body">
    <div class="col-lg-12">
      <h2>Cadastro</h2>
    </div>
    <div id="divCadastro" class="col-lg-12">
      <form>
        <div class="form-group">
          <center>
          <label for="campus">Campus</label>
          <input type="text" class="form-control" id="campus" placeholder="campus" v-model="campus" style="width:300px;" required />
          <label for="bloco">Bloco</label>
          <input type="text" class="form-control" id="bloco" placeholder="bloco" v-model="bloco" style="width:300px;" required />
          <label for="departamento">Departamento</label>
          <input type="text" class="form-control" id="departamento" placeholder="departamento" v-model="departamento" style="width:300px;" required />
          <label for="ccusto">Centro de Custos</label>
          <input type="text" class="form-control" id="ccusto" placeholder="ccusto" v-model="ccusto" style="width:300px;" required />
          <label for="gestor">Gestor</label>
          <select v-model="gestor" class="form-control" id="gestor" placeholder="gestor" style="width:300px;" required>
            <option v-for="gestor in gestores" v-bind:key="gestor.id" v-bind:value="gestor.id">{{ gestor.nome }}</option>
          </select>
          </center>
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
      gestores: [],
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
  
  beforeMount() {
    axios
        .get("/gestor", { headers: { Accept: "application/json" } })
        .then(res => { console.log(res);
          this.gestores = res.data;
        })
        .catch(error => console.log(error));
  },

  methods: {    
    async cadastrar() {
        await axios
          .post("/departamento/cadastrar/", {
            campus: this.campus, 
            bloco: this.bloco, 
            departamento: this.departamento, 
            ccusto: this.ccusto, 
            gestor: {id: this.gestor},
          },{ headers: { Accept: "application/json" } 
          }).then(res => { 
            
            alert(res+ " - Departamento cadastrado com sucesso!!!")
            this.$router.push({path: "/departamento"})
          }).catch(error => {
            console.log(error)
          });
                    
    }
  }
}
</script>
