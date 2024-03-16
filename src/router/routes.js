const routes = [
  {
    path: "/",
    meta: { requiresAuth: true },
    component: () => import("../layouts/MainLayout.vue"),
    name: "MainLayout",
    children: [
      {
        name: "main",
        path: "",
        redirect: "/main",
      },
      {
        path: "/main",
        name: "MainPage",
        component: () => import("../components/MainPage.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../layouts/LoginLayout.vue"),
    name: "Auth",
    children: [
      {
        name: "AuthPage",
        path: "",
        component: () => import("pages/AuthPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
