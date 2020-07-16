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
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes
});

export default router;
