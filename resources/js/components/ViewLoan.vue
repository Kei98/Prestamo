<template>
    <div v-if="loan !== null" class="infoLoan">

        <h4>ID: <span>{{ loan.id }}</span></h4>
        <h4>ID del cliente: <span> <router-link class="boton" :to="{ name: 'ViewClient', params: { id: loan.id_client }}">
            {{ loan.id_client }}</router-link></span></h4>
        <h4>Fecha: <span>{{ loan.date }}</span></h4>
        <h4>Monto total: <span>{{ loan.total_amount }}</span></h4>
        <h4>Forma de pago: <span>{{ loan.payment_method }}</span></h4>

        <router-link class="boton" :to="{ name: 'ModifyLoan', params: { id: loan.id }}">Modificar</router-link>
        <button class="boton" @click="deleteData">Eliminar</button>
        <router-link class="boton" :to="{ name: 'ListLoans' }">Regresar</router-link>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "ViewLoan",
    props: {
        id: [String, Number]
    },
    data() {
        return {
            loan: null,
            client: null,
        }
    },
    mounted() {
        this.loadLoan();
    },
    methods: {
        loadLoan() {
            axios.get("http://prestamo.test/api/loan/" + this.id)
                .then(response => {
                    console.log(response);
                    this.loan = response.data.loan;
                    this.client = response.data.client;
                })
        },
        deleteData() {
            axios.delete("http://prestamo.test/api/loan/" + this.id)
                .then(response => {
                    if (response.status === 200) {
                        this.$router.push("/prestamo");
                    }
                })
        },
    }
}
</script>

<style scoped lang="scss">
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
