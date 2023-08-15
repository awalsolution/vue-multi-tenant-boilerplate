import '@src/assets/main.scss';
import 'vfonts/OpenSans.css';
import 'vfonts/FiraCode.css';
import 'nprogress/nprogress.css';

import pinia from '@src/pinia';
// import router from '';
import App from '@src/App.vue';

faviconLoader();
naiveUILoader();

const app = createApp(App);

app.use(i18n);
app.use(pinia);
// app.use(router);

app.mount('#app');
