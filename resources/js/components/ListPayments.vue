<template>
    <div class="paymentsList">

        <router-link class="boton" :to="{ name: 'ListLoans'}">
            Ir a lista de préstamos
        </router-link>
        <br>
        <router-link class="boton" :to="{ name: 'ListClients'}">
            Ir a lista de clientes
        </router-link>
        <br>
        <router-link class="boton" :to="{ name: 'InsertPayment'}">
            Insertar Abono
        </router-link>
        <br>
        <span class="note" v-if="payments.length">Los datos son: id del préstamo, cantidad abonada</span>
        <ol>
            <li v-for="payment in payments" :key="payment.id">
                <router-link class="link" :to="{ name: 'ViewPayment', params: { id: payment.id }}">
                    {{ payment.id_loan }}, {{ payment.amount }}
                </router-link>
            </li>
        </ol>
        <div class="mensaje" v-if="!payments.length">No existen abonos para mostrar</div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "ListPayments",
    data(){
        return {
            payments: []
        };
    },
    mounted() {
        this.loadPayments();
    },
    methods: {
        loadPayments: function () {
            axios.get("http://prestamo.test/api/payment")
                .then(response => {
                    this.payments = response.data;
                })
        }
    }
}
</script>

<style scoped lang="scss">
    $pink: #f0abae;
    $red: #bf2f50;

    .paymentsList {
        border: 2px solid $red;
        width: 500px;
        margin: 0 auto;
        text-align: left;
        font-size: 30px;
        padding: 30px;
        color: $red;

        ol {
            li {
                margin: 20px auto;
            }
        }
    }

    .link {
        color: $red;
    }
    .note {
        font-size: 15px;
    }
    //.mensaje {
    //    font-size: 20px;
    //}
</style>
