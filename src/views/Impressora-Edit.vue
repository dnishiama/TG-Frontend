<template>
  <div class="card-body">
    <div class="col-lg-12">
      <h2>Atualização</h2>
    </div>
    <div id="divAtualizar" class="col-lg-12">
      <form>
        <div class="form-group">
          <label for="nome">Nome</label>
          <input type="text" class="form-control" id="nome" aria-describedby="emailHelp" placeholder="Seu nome" v-model="gestor.nome" required />
        </div>
        <div class="form-group">
          <label for="email">Endereço de email</label>
          <input type="email" class="form-control" id="email" placeholder="emailAsProps" v-model="gestor.email" required readonly/>
        </div>
        <button type="submit" class="btn btn-primary" v-on:click="editar()">Enviar</button>
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
  methods: {
    editar() {
        axios.put('gestor/atualizar/'+this.gestor.id,
        {
            nome: this.gestor.nome,
            email: this.gestor.email,
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
created () {
    this.buscarEmail(this.gestor)
  }
}
</script>
