<template>
    <div v-if="payment != null">
        <form @submit="modifyData()" @submit.prevent method="POST">

            <label for="id_loan">Préstamo (id del preśtamo, cédula del cliente): </label>
            <select id="id_loan" name="id_loan" v-model="payment.id_loan">
                <option v-bind:value="loan.id">
                    {{ loan.id }}, {{ loan.id_client }}
                </option>
            </select>

            <label for="amount">Monto a abonar: </label>
            <input id="amount" name="amount" required type="number" v-model="payment.amount">

            <label for="date">Fecha: </label>
            <input id="date" name="date" required type="date" v-model="payment.date">

            <label for="details">Detalle del pago: </label>
            <input id="details" name="details" required type="text" v-model="payment.details">

            <input class="boton" type="submit" value="Guardar">

            <router-link :to="{ name: 'ViewPayment', params: { id: payment.id }}" class="boton">
                Regresar
            </router-link>

        </form>

        <div class="mensajes">{{ mensaje }}</div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ModifyPayment",
    props: {
        id: [String, Number]
    },
    data() {
        return {
            payment: null,
            loan: null,
            mensaje: ""
        }
    },
    mounted() {
        this.loadPayment();
    },
    methods: {
        loadPayment() {
            axios.get("http://prestamo.test/api/payment/" + this.id)
                .then(response => {
                    this.payment = response.data.payment;
                    this.loan = response.data.loan;
                })
        },
        modifyData() {
            axios.patch("http://prestamo.test/api/payment/" + this.id, this.payment)
                .then(response => {
                    if(response.status === 200) {
                        this.mensaje = response.data;
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
        width: 500px;
        margin: 0 auto;

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
        margin-top: 20px;
        font-size: 20px;
    }
</style>
