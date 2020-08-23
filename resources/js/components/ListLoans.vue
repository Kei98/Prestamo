<template>
    <div class="loansList">

        <router-link class="boton" :to="{ name: 'ListClients'}">
            Ir a lista de clientes
        </router-link>
        <br>
        <router-link class="boton" :to="{ name: 'ListPayments'}">
            Ir a lista de abonos
        </router-link>
        <br>
        <router-link class="boton" :to="{ name: 'InsertLoan'}">
            Insertar Préstamo
        </router-link>
        <ol>
            <li v-for="loan in loans" :key="loan.id">
                <router-link class="link" :to="{ name: 'ViewLoan', params: { id: loan.id }}">
                    {{ loan.id }}, {{ loan.total_amount }}
                </router-link>
            </li>
        </ol>
        <div class="mensaje" v-if="!loans.length">No existen préstamos para mostrar</div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ListLoans",
    data(){
        return {
            loans: [],
        };
    },
    mounted() {
        this.loadLoans();
    },
    methods: {
        loadLoans: function () {
            axios.get("http://prestamo.test/api/loan")
                .then(response => {
                    this.loans = response.data;
                })
        }
    }
}
</script>

<style scoped lang="scss">
    $pink: #f0abae;
    $red: #bf2f50;

    .loansList {
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
</style>
