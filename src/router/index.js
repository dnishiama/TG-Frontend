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
    path: "/historico",
    name: "Historico",
    component: () => import("../views/Historico.vue")
  },
  {
    path: "/historico/cadastrar",
    name: "Historico-Add",
    component: () => import("../views/Historico-Add.vue")
  }, 
  {
    path: "/historico/rateio",
    name: "Historico-Rateio",
    component: () => import("../views/Historico-Rateio.vue")
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
    path: "/impressora/cadastraroffline",
    name: "Impressora-Add-Offline",
    component: () => import("../views/Impressora-Add-Offline.vue")
  },
  {
    path: "/impressora/atualizarOnline/:imp",
    name: "Impressora-Edit-Online",
    component: () => import("../views/Impressora-Edit-Online.vue"),
    props: true
  },
  {
    path: "/impressora/atualizarOffline/:imp",
    name: "Impressora-Edit-Offline ",
    component: () => import("../views/Impressora-Edit-Offline.vue"),
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
    path: "/departamento/atualizar/:dep",
    name: "Departamento-Edit",
    component: () => import("../views/Departamento-Edit.vue"),
    props: true
  },
  {
    path: "/usuario",
    name: "Usuario",
    component: () => import("../views/Usuario.vue")
  },
  {
    path: "/usuario/cadastrar",
    name: "Usuario-Add",
    component: () => import("../views/Usuario-Add.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes
});

export default router;
