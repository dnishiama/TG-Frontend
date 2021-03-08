<template>
  <div class="card-body">
    <div class="col-lg-12">
      <h2>Atualização</h2>
    </div>
    <div id="divAtualizar" class="col-lg-12">
      <form>
        
        <div class="form-group">
          <label for="campus">Campus</label>
          <input type="text" class="form-control" id="campus" placeholder="campus" v-model="depart.campus" required />
          <label for="bloco">Bloco</label>
          <input type="text" class="form-control" id="bloco" placeholder="bloco" v-model="depart.bloco" required />
          <label for="departamento">Departamento</label>
          <input type="text" class="form-control" id="departamento" placeholder="departamento" v-model="depart.departamento" required />
          <label for="ccusto">Centro de Custos</label>
          <input type="text" class="form-control" id="ccusto" placeholder="ccusto" v-model="depart.ccusto" required />
          <label for="gestor">Gestor</label>
          <select v-model="gestor" class="form-control" id="gestor" placeholder="gestor" required>
            <option v-for="gestor in gestores" v-bind:key="gestor.id" v-bind:value="gestor.id">{{ gestor.nome }}</option>
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

export default 
{
  name: "departamento",
  props: ['dep'],
  data() 
  {
    return {
      campus: "",
      bloco: "",
      departamento: "",
      ccusto: "",
      gestor: "",
      gestores: [],
      depart:[]
    };
  },
  
  computed: 
  {
    ...mapState(["usuario", "autorizacao"])
  },

  mounted() 
  {
    if (!this.usuario)
    {
      this.$router.push({ path: "/" })
    }    
  },

  created () 
  {
    this.buscarDepartamento(this.dep)
  },

  methods: 
  {   
    atualizar() 
    {
        console.log(this.gestor)
        axios.put('/departamento/atualizar/'+this.depart.id, 
        {
          campus: this.depart.campus, 
          bloco: this.depart.bloco, 
          departamento: this.depart.departamento, 
          ccusto: this.depart.ccusto, 
          gestor: {id: this.gestor},
        })
        .then(res => {
          console.log(res);
          alert("Departamento atualizado com sucesso!!!");
          this.$router.push({ path: "/departamento" })
        })
        .catch(error => console.log(error));
    },
  
    buscarDepartamento(id) 
    {
      axios
        .get("/departamento/" + id, {
          headers: { Accept: "application/json" }
        })
        .then(res => {
          console.log(res);
          this.depart = res.data;
        })
        .catch(error => console.log(error));
    }

  }
}
</script>