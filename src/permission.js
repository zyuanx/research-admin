import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({
  showSpinner: false,
});

const whiteList = ["/login", "/survey/open/[0-9]+"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to.meta.title);
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({
        path: "/",
      });
      NProgress.done();
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          let { roles } = await store.dispatch("user/getInfo");
          roles = roles.map(function(item) {
            return item.title;
          });
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            roles
          );
          router.addRoutes(accessRoutes);
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({
            ...to,
            replace: true,
          });
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch("user/resetToken");
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/
    let pass = false;
    for (let i = 0; i < whiteList.length; i++) {
      if (to.path.search(whiteList[i]) !== -1) {
        pass = true;
        break;
      }
    }
    if (pass) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
