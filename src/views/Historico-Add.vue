<template>
  <div class="card-body">
    <div class="col-lg-12">
      <h2>Cadastro</h2>
    </div>
    <div id="divCadastro" class="col-lg-12">
      <form>
        <center>
        <div class="form-group"> 
          <label for="nome">Nome</label>
          <input type="text" class="form-control" id="nome" aria-describedby="emailHelp" placeholder="Seu nome" v-model="nome" style="width:300px;" required />
        </div>
        <div class="form-group">
          <label for="email">Endereço de email</label>
          <input type="email" class="form-control" id="email" placeholder="Seu email" v-model="email" style="width:300px;" required />
        </div>
        <button type="submit" class="btn btn-primary" v-on:click="cadastrar()">Enviar</button>
        </center>
      </form>
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
      ultimoUpdate: "",
      historicos: []
    };
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
    cadastrar() {
        axios
          .post("/historico/cadastrar/", {
            nome: this.nome,
            email: this.email,
          },
          { headers: { Accept: "application/json"} })
          .then(res => { console.log(res);
            alert("Historico cadastrado com sucesso!!!");            
          })
          .catch(error => console.log(error))         
          .finally(() => this.$router.push({ path: "/Historico" })) 
      }
  }
}
</script>
