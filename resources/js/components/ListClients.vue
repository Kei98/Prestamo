<template>
    <div class="clientsList">

        <router-link class="boton" :to="{ name: 'ListLoans'}">
            Ir a lista de préstamos
        </router-link>
        <br>
        <router-link class="boton" :to="{ name: 'ListPayments'}">
            Ir a lista de abonos
        </router-link>
        <br>
        <router-link class="boton" :to="{ name: 'InsertClient'}">
            Insertar Cliente
        </router-link>

        <ol>
            <li v-for="client in clients" :key="client.id">
                <router-link class="link" :to="{ name: 'ViewClient', params: { id: client.id }}">
                    {{ client.id_personal }}, {{ client.name }}
                </router-link>
            </li>
        </ol>
        <div class="mensaje" v-if="!clients.length">No existen clientes para mostrar</div>
    </div>
</template>

<script>
export default {
    name: "ListClients",
    data(){
        return {
            clients: []
        };
    },
    mounted() {
        this.loadClients();
    },
    methods: {
        loadClients: function () {
            axios.get("http://prestamo.test/api/client")
                .then(response => {
                    this.clients = response.data;
                })
        }
    }
}
</script>

<style scoped lang="scss">
$pink: #f0abae;
$red: #bf2f50;

.clientsList {
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
