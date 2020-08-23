import Vue from "vue";
import Router from "vue-router";

import ListClients from "./components/ListClients";
import ViewClient from "./components/ViewClient";
import InsertClient from "./components/InsertClient";
import ModifyClient from "./components/ModifyClient";
import ListLoans from "./components/ListLoans";
import ViewLoan from "./components/ViewLoan";
import InsertLoan from "./components/InsertLoan";
import ModifyLoan from "./components/ModifyLoan";
import ListPayments from "./components/ListPayments";
import ViewPayment from "./components/ViewPayment";
import InsertPayment from "./components/InsertPayment";
import ModifyPayment from "./components/ModifyPayment";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/cliente",
            name: "ListClients",
            component: ListClients
        },
        {
            path: "/modificarcliente/:id",
            name: "ModifyClient",
            component: ModifyClient,
            props: true
        },
        {
            path: "/insertarcliente",
            name: "InsertClient",
            component: InsertClient
        },
        {
            path: "/cliente/:id",
            name: "ViewClient",
            component: ViewClient,
            props: true
        },
        {
            path: "/home",
            name: "ListLoans",
            component: ListLoans
        },
        {
            path: "/modificarprestamo/:id",
            name: "ModifyLoan",
            component: ModifyLoan,
            props: true
        },
        {
            path: "/insertarprestamo",
            name: "InsertLoan",
            component: InsertLoan
        },
        {
            path: "/prestamo/:id",
            name: "ViewLoan",
            component: ViewLoan,
            props: true
        },
        {
            path: "/abono",
            name: "ListPayments",
            component: ListPayments
        },
        {
            path: "/modificarabono/:id",
            name: "ModifyPayment",
            component: ModifyPayment,
            props: true
        },
        {
            path: "/insertarabono",
            name: "InsertPayment",
            component: InsertPayment
        },
        {
            path: "/abono/:id",
            name: "ViewPayment",
            component: ViewPayment,
            props: true
        }
    ]
});
