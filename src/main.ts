import '@src/assets/styles/main.scss';

import { createApp } from 'vue';
import App from '@src/App.vue';
import { faviconLoader } from '@src/constants/faviconLoader';
import { naiveUILoader } from '@src/constants/naiveUILoader';
import { setupNaive } from '@src/plugins/naive';
import { setupDirectives } from '@src/plugins/directives';
import { setupNaiveDiscreteApi } from '@src/plugins/naiveDiscreteApi';
import { setupStore } from '@src/store';
import { setupRouter } from '@src/router';

//
import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import StyleClass from 'primevue/styleclass';

const app = createApp(App);

faviconLoader();
naiveUILoader();

setupNaive(app);

setupStore(app);
//
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.app-dark'
    }
  }
});
app.use(ToastService);
app.use(ConfirmationService);
app.directive('styleclass', StyleClass);
//
setupDirectives(app).then(() => {});

setupNaiveDiscreteApi();

setupRouter(app);

app.mount('#app');
