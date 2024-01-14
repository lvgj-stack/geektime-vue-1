import Vue from "vue";
import VueI18n from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import enUS from "./locale/enUS";
import zhCN from "./locale/zhCN";
import queryString from "query-string";
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
  Select,
  LocaleProvider,
  Dropdown,
  DatePicker,
} from "ant-design-vue";
import Authorized from "@/components/Authorized.vue";
import Auth from "./directives/auth";

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(LocaleProvider);
Vue.use(Dropdown);
Vue.use(DatePicker);
Vue.use(Auth);
Vue.component("Authorized", Authorized);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: queryString.parse(location.search).locale || "zhCN",
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS },
  },
});

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4410290_4lq6bhaursc.js",
});

Vue.component("IconFont", IconFont);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
