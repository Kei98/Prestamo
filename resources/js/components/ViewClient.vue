<template>
    <div v-if="client !== null" class="infoClient">

        <h4>ID: <span>{{ client.id }}</span></h4>
        <h4>Cédula: <span>{{ client.id_personal }}</span></h4>
        <h4>Nombre: <span>{{ client.name }}</span></h4>
        <h4>Apellido: <span>{{ client.last_name }}</span></h4>
        <h4>Dirección: <span>{{ client.address }}</span></h4>
        <h4>Número de teléfono: <span>{{ client.tel_number }}</span></h4>
        <h4>Email: <span>{{ client.email }}</span></h4>

        <h4>Préstamo: </h4>
        <div v-for="loan in loans" :key="loan.id">
            <div v-if="loan.id_client === client.id">
                <router-link class="link" :to="{ name: 'ViewLoan', params: { id: loan.id }}">
                    {{ loan.id }}
                </router-link>
            </div>
            <div class="mensaje" v-else>No hay préstamos asociados a este cliente</div>
        </div>
        <div class="mensaje" v-if="!loans.length">No hay préstamos asociados a este cliente</div>

        <router-link class="boton" :to="{ name: 'ModifyClient', params: { id: client.id }}">Modificar</router-link>
        <button class="boton" @click="deleteData">Eliminar</button>
        <router-link class="boton" :to="{ name: 'ListClients' }">Regresar</router-link>
    </div>

</template>

<script>
export default {
    name: "ViewClient",
    props: {
        id: [String, Number]
    },
    data() {
        return {
            client: null,
            loans: []
        }
    },
    mounted() {
        this.loadClient();
        this.loadLoans();
    },
    methods: {
        loadClient() {
            axios.get("http://prestamo.test/api/client/" + this.id)
                .then(response => {
                    this.client = response.data;
                })
        },
        loadLoans() {
            axios.get("http://prestamo.test/api/loan/")
                .then(response => {
                    this.loans = response.data;
                })
        },
        deleteData() {
            axios.delete("http://prestamo.test/api/client/" + this.id)
                .then(response => {
                    if (response.status === 200) {
                        this.$router.push("/home");
                    }
                })
        },
    }
}
</script>

<style scoped lang="scss">
$pink: #f0abae;
$red: #bf2f50;

.infoClient {
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
