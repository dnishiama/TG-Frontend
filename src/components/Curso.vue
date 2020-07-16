<template>
  <div class="Container">
    <h1>Cursos</h1>
    <div class="form-todo form-group">
      <p>
        <input placeholder="course" type="text" name="nomeCurso" class="form-control" v-model="nome" />
      </p>
      <p>
        <button type="submit" class="btn btn-primary" v-on:click="adicionar">Adicionar Curso</button>
      </p>
      <p></p>
      <div class="list-group">
        <div class="list-group-item" v-bind:key="curso" v-for='(curso, index) in todosCursos'>
          <span class="curso">
            <p>
              Index: <strong>{{index}}</strong>
              <br />
              Curso: <strong>{{curso.nome}}</strong>
            </p>
          </span>
          <div>
            <a href="#" title="excluir" v-on:click.prevent="remover(index)">Excluir</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cursos: [],
      nome: ''
    }
  },
  methods: {
    adicionar () {
      if (this.nome.trim() === '') {
        alert('Campo nome vazio!')
      }

      this.cursos.push({ nome: this.nome })
      this.nome = ''
    },
    remover (index) {
      this.cursos.splice(index, 1)
    }
  },
  computed: {
    todosCursos () {
      return this.cursos.map(curso => ({
        ...curso,
        nome: curso.nome.trim() === '' ? 'Curso não especificado' : curso.nome
      }))
    }
  }
}
</script>
