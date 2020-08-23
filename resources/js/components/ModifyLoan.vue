<template>
    <div v-if="loan != null">
        <form @submit="modifyData()" @submit.prevent method="POST">

            <label for="id_client">Cliente: </label>
            <select id="id_client" name="id_client" v-model="loan.id_client">
                <option v-bind:value="client.id">
                    {{ client.id_personal }}, {{ client.name }}
                </option>
            </select>

            <label for="date">Fecha: </label>
            <input id="date" name="date" required type="date" v-model="loan.date">

            <label for="total_amount">Monto total: </label>
            <input id="total_amount" name="total_amount" required type="number" v-model="loan.total_amount">

            <label for="payment_method">Forma de pago: </label>
            <input id="payment_method" name="payment_method" required type="text" v-model="loan.payment_method">

            <input class="boton" type="submit" value="Guardar">

            <router-link :to="{ name: 'ViewLoan', params: { id: loan.id }}" class="boton">
                Regresar
            </router-link>

        </form>

        <div class="mensajes">{{ mensaje }}</div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ModifyLoan",
    props: {
        id: [String, Number]
    },
    data() {
        return {
            loan: null,
            client: null,
            mensaje: ""
        }
    },
    mounted() {
        this.loadLoan();
    },
    methods: {
        loadLoan() {
            axios.get("http://prestamo.test/api/loan/" + this.id)
                .then(response => {
                    this.loan = response.data.loan;
                    this.client = response.data.client;
                })
        },
        loadClients() {
            axios.get("http://prestamo.test/api/client/")
                .then(response => {
                    this.clients = response.data;
                })
        },
        modifyData() {
            axios.patch("http://prestamo.test/api/loan/" + this.id, this.loan)
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
