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
          <label for="email">E-mail</label>
          <input type="email" class="form-control" id="email" placeholder="Seu email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="email">Senha</label>
          <input type="password" class="form-control" id="senha" placeholder="Sua senha" v-model="senha" required />
        </div>
        <label for="autorizacao">Autorização</label>
          <select v-model="autorizacao" class="form-control" id="autorizacao" placeholder="autorizacao" required>
            <option v-for="autorizacao in autorizacoes" v-bind:key="autorizacao.id" v-bind:value="autorizacao.nome">{{ autorizacao.nome }}</option>
          </select>
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
      nome: "",
      email: "",
      senha: "",
      autorizacao: "",
      autorizacoes: []
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
        .get("/autorizacao", { headers: { Accept: "application/json" } })
        .then(res => {
          console.log(res);
          this.autorizacoes = res.data;
        })
        .catch(error => console.log(error));
  },
  methods: {
    cadastrar() {
        axios
          .post("/usuario/cadastrar/", {nome: this.nome,email: this.email,senha: this.senha,autorizacao: this.autorizacao,},
                 {headers: { Accept: "application/json" }          
        })
          .then(res => {
            this.$router.push("/usuario");
            console.log(res);
            this.id = "";
            this.nome = "";
            this.email = "";
            this.senha = "";
            this.autorizacao = "";
            alert("Usuario cadastrado com sucesso!!!");
          })
          .catch(error => console.log(error));
      }
    }
  }
</script>
