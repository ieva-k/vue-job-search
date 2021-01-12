import { createApp } from 'vue';
import App from './App.vue';
import 'flexboxgrid';
import './main.scss';
import './registerServiceWorker';
import router from './router';

const headers = new Headers();
headers.append('GET', 'POST');
// headers.append('Content-Type', 'application/json');
// headers.append('Accept', 'application/json');
// headers.append('Origin', 'http://localhost:8080');

createApp(App)
  .use(router)
  .mount('#app');
