import '@/assets/styles/main.scss';
import { createApp } from 'vue';
import App from '@/App.vue';
import { faviconLoader } from '@/constants/faviconLoader';
import { setupDirectives } from '@/directives/directives';
import { setupStore } from '@/store';
import { setupRouter } from '@/router';

//
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import StyleClass from 'primevue/styleclass';
import FocusTrap from 'primevue/focustrap';
import Tooltip from 'primevue/tooltip';
import Ripple from 'primevue/ripple';

const app = createApp(App);

faviconLoader();

setupStore(app);
//
app.use(PrimeVue, { unstyled: true });
app.use(ToastService);
app.use(ConfirmationService);
app.directive('styleclass', StyleClass);
app.directive('focustrap', FocusTrap);
app.directive('tooltip', Tooltip);
app.directive('ripple', Ripple);
//
setupDirectives(app).then(() => {});

setupRouter(app);

app.mount('#app');
