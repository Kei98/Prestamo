<template>
    <div v-if="payment !== null" class="infoLoan">

        <h4>ID: <span>{{ payment.id }}</span></h4>
        <h4>ID del préstamo: <span> <router-link class="boton" :to="{ name: 'ViewLoan', params: { id: payment.id_loan }}">
            {{ payment.id_loan }}</router-link></span></h4>
        <h4>Monto: <span>{{ payment.amount }}</span></h4>
        <h4>Fecha: <span>{{ payment.date }}</span></h4>
        <h4>Detalles: <span>{{ payment.details }}</span></h4>

        <router-link class="boton" :to="{ name: 'ModifyPayment', params: { id: payment.id }}">Modificar</router-link>
        <button class="boton" @click="deleteData">Eliminar</button>
        <router-link class="boton" :to="{ name: 'ListPayments' }">Regresar</router-link>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "ViewPayment",
    props: {
        id: [String, Number]
    },
    data() {
        return {
            payment: null,
            loan: null,
        }
    },
    mounted() {
        this.loadLoan();
    },
    methods: {
        loadLoan() {
            axios.get("http://prestamo.test/api/payment/" + this.id)
                .then(response => {
                    this.payment = response.data.payment;
                    this.loan = response.data.loan;
                })
        },
        deleteData() {
            axios.delete("http://prestamo.test/api/payment/" + this.id)
                .then(response => {
                    if (response.status === 200) {
                        this.$router.push("/abono");
                    }
                })
        },
    }
}
</script>

<style lang="scss" scoped>
    $pink: #f0abae;
    $red: #bf2f50;

    .infoLoan {
        border: 2px solid $red;
        padding: 50px 30px;
        width: 500px;
        margin: 0 auto;
        font-size: 30px;
        text-align: left;

        span {
            font-weight: normal;
        }

        button {
            width: 100%;
            font-size: 30px;
        }

        .boton {
            margin-top: 20px;
        }
        .mensaje{
            font-size: 20px;
        }
    }
</style>
