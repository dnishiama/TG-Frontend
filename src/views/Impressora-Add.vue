<template>
  <div class="card-body">
    <div class="col-lg-12">
      <h2>Cadastro</h2>
    </div>
    <div id="divCadastro" class="col-lg-12">
      <form>
        <div class="form-group">
          <label for="nome">Nome</label>
          <input type="text" class="form-control" id="nome" aria-describedby="emailHelp" placeholder="Seu nome" v-model="nome" required />
        </div>
        <div class="form-group">
          <label for="email">Endereço de email</label>
          <input type="email" class="form-control" id="email" placeholder="Seu email" v-model="email" required />
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
  name: "gestor",
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
      departamento: []
    };
  },
  computed: {
    ...mapState(["usuario", "autorizacao"])
  },
  methods: {
    cadastrar() {
        axios
          .post("/impressora/cadastrar/", 
                {patrimonio: this.patrimonio,ip: this.ip,departamento: this.departamento},
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
