<template>
  <div class="card-body">
    <div class="col-lg-12">
      <h2>Atualização</h2>
    </div>
    <div id="divAtualizar" class="col-lg-12">
      <form>
        <center>
        <div class="form-group">
          <label for="nome">Nome</label>
          <input type="text" class="form-control" id="nome" aria-describedby="emailHelp" placeholder="Seu nome" v-model="gestor.nome" style="width:300px;" required />
        </div>
        <div class="form-group">
          <label for="email">Endereço de email</label>
          <input type="email" class="form-control" id="email" placeholder="emailAsProps" v-model="gestor.email" style="width:300px;" required readonly/>
        </div>
        <button type="submit" class="btn btn-primary" v-on:click="editar()">Enviar</button>
        </center>
      </form>      
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "gestor",
    props: ['gestor'],
  data() {
    return {
      id: "",
      nome: "",
      email: ""
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

  created () {
    this.buscarEmail(this.gestor)
  },

  methods: {
    async editar() {
      await axios
        .put('gestor/atualizar/'+this.gestor.id, {
            nome: this.gestor.nome,
            email: this.gestor.email,
        })
        .then(res => { console.log(res);
            this.gestor.nome = '';
            this.gestor.email = '';
            alert("Gestor alterado com sucesso!!!");
            this.$router.push("/gestor");            
        })
        .catch(error => console.log(error));    
    },

    buscarEmail(email) {
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
  }
}
</script>
