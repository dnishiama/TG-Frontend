import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/gestor",
    name: "Gestor",
    component: () => import("../views/Gestor.vue")
  },
  {
    path: "/gestor/cadastrar",
    name: "Gestor-Add",
    component: () => import("../views/Gestor-Add.vue")
  },
  {
    path: "/gestor/atualizar/:gestor",
    name: "Gestor-Edit",
    component: () => import("../views/Gestor-Edit.vue"),
    props: true
  },
  {
    path: "/impressora",
    name: "Impressora",
    component: () => import("../views/Impressora.vue")
  },
  {
    path: "/impressora/cadastrar",
    name: "Impressora-Add",
    component: () => import("../views/Impressora-Add.vue")
  },
  {
    path: "/impressora/atualizar/:id",
    name: "Impressora-Edit",
    component: () => import("../views/Impressora-Edit.vue"),
    props: true
  },
  {
    path: "/departamento",
    name: "Departamento",
    component: () => import("../views/Departamento.vue")
  },
  {
    path: "/departamento/cadastrar",
    name: "Departamento-Add",
    component: () => import("../views/Departamento-Add.vue")
  },
  {
    path: "/departamento/atualizar/:id",
    name: "Departamento-Edit",
    component: () => import("../views/Departamento-Edit.vue"),
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes
});

export default router;
