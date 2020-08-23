<template>
    <div>
        <form @submit="insertData()" @submit.prevent method="POST">

            <label for="id_client">Cliente: </label>
            <select id="id_client" name="id_client" v-model="loan.id_client">
                <option v-bind:value="client.id" v-for="client in clients">
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

            <router-link :to="{ name: 'ListLoans'}" class="boton">
                Regresar
            </router-link>

        </form>

        <div class="mensajes">{{ mensaje }}</div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "InsertLoan",
    data() {
        return {
            mensaje: "",
            clients: {},
            loan: {
                id_client: 0,
                date: "",
                total_amount: 0,
                payment_method: "",
            }
        }
    },
    mounted() {
        this.loadClients();
    },
    methods: {
        loadClients() {
            axios.get("http://prestamo.test/api/client/")
                .then(response => {
                    this.clients = response.data;
                })
        },
        insertData() {

            axios.post("http://prestamo.test/api/loan", this.loan)
                .then(response => {
                    if (response.status === 201) {
                        this.mensaje = response.data;
                        this.loan = {
                            id_client: 0,
                            date: "",
                            total_amount: 0,
                            payment_method: "",
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
