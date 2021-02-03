<template>
  <div class="card-body">
    <div class="col-lg-12">
      <h2>Cadastro</h2>
    </div>
    <div id="divCadastro" class="col-lg-12">
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
  data() {
    return {
      Patrimonio: "",
      Ip: "",
      departamento: "",
      departamentos: []
    };
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
  computed: {
    ...mapState(["usuario", "autorizacao"])
  },
  methods: {
    cadastrar() {
        axios
          .post("/impressora/cadastrar/", 
                { patrimonio: this.patrimonio,
                  ip: this.ip,
                  departamento: {'id': this.departamento},},
                {headers: { Accept: "application/json" }
          })
          .then(res => {
            console.log(res);
            alert("Impressora cadastrada com sucesso!!!");
          })
          .catch(error => console.log(error));
      }
    }
  }
</script>
