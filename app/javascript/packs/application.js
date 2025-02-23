import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import axios from 'axios';
// Global Components
import hljs from 'highlight.js';
import Multiselect from 'vue-multiselect';
import VueFormulate from '@braid/vue-formulate';
import WootSwitch from 'components/ui/Switch';
import WootWizard from 'components/ui/Wizard';
import { sync } from 'vuex-router-sync';
import Vuelidate from 'vuelidate';
import VTooltip from 'v-tooltip';
import WootUiKit from '../dashboard/components';
import App from '../dashboard/App';
import i18n from '../dashboard/i18n';
import createAxios from '../dashboard/helper/APIHelper';
import commonHelpers, { isJSONValid } from '../dashboard/helper/commons';
import router, { initalizeRouter } from '../dashboard/routes';
import store from '../dashboard/store';
import constants from 'dashboard/constants/globals';
import * as Sentry from '@sentry/vue';
import '../apm';
import 'vue-easytable/libs/theme-default/index.css';
import {
  initializeAnalyticsEvents,
  initializeChatwootEvents,
} from '../dashboard/helper/scriptHelpers';
import FluentIcon from 'shared/components/FluentIcon/DashboardIcon';
import VueDOMPurifyHTML from 'vue-dompurify-html';
import { domPurifyConfig } from '../shared/helpers/HTMLSanitizer';
import AnalyticsPlugin from '../dashboard/helper/AnalyticsHelper/plugin';

Vue.config.env = process.env;

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    Vue,
    dsn: process.env.VUE_APP_SENTRY_DSN_DASHBOARD,
    environment: process.env.NODE_ENV,
    release: process.env.VUE_APP_VERSION,
    denyUrls: [
      // Chrome extensions
      /^chrome:\/\//i,
      /chrome-extension:/i,
      /extensions\//i,

      // Locally saved copies
      /file:\/\//i,

      // Safari extensions.
      /safari-web-extension:/i,
      /safari-extension:/i,
    ],
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),
    ],
    tracesSampleRate: 0.3,
  });
}

Vue.use(VueDOMPurifyHTML, domPurifyConfig);
Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(WootUiKit);
Vue.use(Vuelidate);
Vue.use(VueFormulate, {
  rules: {
    JSON: ({ value }) => isJSONValid(value),
  },
});
Vue.use(VTooltip, {
  defaultHtml: false,
});
Vue.use(hljs.vuePlugin);
Vue.use(AnalyticsPlugin);

Vue.component('multiselect', Multiselect);
Vue.component('woot-switch', WootSwitch);
Vue.component('woot-wizard', WootWizard);
Vue.component('fluent-icon', FluentIcon);

const i18nConfig = new VueI18n({
  locale: 'en',
  messages: i18n,
});

sync(store, router);
// load common helpers into js
commonHelpers();

window.WootConstants = constants;
window.axios = createAxios(axios);
window.bus = new Vue();
initializeChatwootEvents();
initializeAnalyticsEvents();
initalizeRouter();

window.onload = () => {
  window.WOOT = new Vue({
    router,
    store,
    i18n: i18nConfig,
    components: { App },
    template: '<App/>',
  }).$mount('#app');
};

window.addEventListener('load', () => {
  window.playAudioAlert = () => {};
});
