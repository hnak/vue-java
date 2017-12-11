import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from "@/components/pages/HomePage.vue";
import LoginPage from "@/components/pages/LoginPage.vue";
import MemberDetail from "@/components/pages/member/MemberDetail.vue";
import MemberList from "@/components/pages/member/MemberList.vue";
import MemberPage from "@/components/pages/MemberPage.vue";
import SubjectPage from "@/components/pages/SubjectPage.vue";

import store from "@/store/store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  // base: "/vue-test/",
  routes: [
    {
      path: "/",
      component: LoginPage,
    },
    {
      path: "/home",
      component: HomePage,
    },
    {
      path: "/subject",
      component: SubjectPage,
    },

    {
      path: "/member",
      component: MemberPage,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/",
          component: MemberList,
        },
        {
          path: ":id",
          name: "member-detail",
          component: MemberDetail,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth) && !store.getters.isLogin) {
    next({ path: "/", query: { redirect: to.fullPath }});
  } else {
    next();
  }
});

export default router;
