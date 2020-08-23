<template>
    <div>
        <form @submit="insertData()" @submit.prevent method="POST">

            <label for="id_loan">Préstamo (id del preśtamo, monto): </label>
            <select id="id_loan" name="id_loan" v-model="payment.id_loan">
                <option v-bind:value="loan.id" v-for="loan in loans">
                    {{ loan.id }}, {{ loan.total_amount }}
                </option>
            </select>

            <label for="amount">Monto a abonar: </label>
            <input id="amount" name="amount" required type="number" v-model="payment.amount">

            <label for="date">Fecha: </label>
            <input id="date" name="date" required type="date" v-model="payment.date">

            <label for="details">Detalle del pago: </label>
            <input id="details" name="details" required type="text" v-model="payment.details">

            <input class="boton" type="submit" value="Guardar">

            <router-link :to="{ name: 'ListPayments'}" class="boton">
                Regresar
            </router-link>

        </form>

        <div class="mensajes">{{ mensaje }}</div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "InsertPayment",
    data() {
        return {
            mensaje: "",
            loans: {},
            payment: {
                id_loan: 0,
                amount: 0,
                date: "",
                details: "",
            }
        }
    },
    mounted() {
        this.loadLoans();
    },
    methods: {
        loadLoans() {
            axios.get("http://prestamo.test/api/loan/")
                .then(response => {
                    this.loans = response.data;
                })
        },
        insertData() {
            console.log(this.payment);
            axios.post("http://prestamo.test/api/payment", this.payment)
                .then(response => {
                    if (response.status === 201) {
                        this.mensaje = response.data;
                        this.payment = {
                            id_loan: 0,
                            amount: 0,
                            date: "",
                            details: "",
                        }
                    }
                })
        }
    }
}
</script>

<style scoped lang="scss">
    $pink: #f0abae;
    $red: #bf2f50;

    form {
        margin: 0 auto;
        width: 500px;

        label,
        input,
        select {
            display: block;
            font-size: 30px;
            margin: 10px auto;
        }

        .boton {
            font-size: 30px;
            margin-top: 20px;
        }

        label {
            font-weight: 600;
        }

        input,
        select {
            width: 100%;
            color: $red;
            padding: 5px;

            &[type=submit] {
                margin-top: 30px;
            }
        }

        select {
            padding: 10px 5px;
        }
    }

    .mensajes {
        font-size: 20px;
        margin-top: 20px;
    }
</style>
