import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/specs",
      name: "specs",
      component: () => import("./components/SpecsList")
    },
    {
      path: "/specs/:id",
      name: "spec-details",
      component: () => import("./components/Spec")
    },
    {
      path: "/add",
      name: "add-spec",
      component: () => import("./components/AddSpec")
    }
  ]
});

export default router;