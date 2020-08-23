/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

import router from "./routes";

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

Vue.component('list-clients', require('./components/ListClients').default);
Vue.component('modify-client', require('./components/ModifyClient').default);
Vue.component('view-client', require('./components/ViewClient').default);
Vue.component('insert-client', require('./components/InsertClient').default);

Vue.component('list-loans', require('./components/ListLoans').default);
Vue.component('modify-loan', require('./components/ModifyLoan').default);
Vue.component('view-loan', require('./components/ViewLoan').default);
Vue.component('insert-loan', require('./components/InsertLoan').default);

Vue.component('list-payments', require('./components/ListPayments').default);
Vue.component('modify-payment', require('./components/ModifyPayment').default);
Vue.component('view-payment', require('./components/ViewPayment').default);
Vue.component('insert-payment', require('./components/InsertPayment').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
