<template>
    <div v-if="client !== null">
        <form @submit="modifyData()" @submit.prevent method="POST">

            <label for="id_personal">Cédula: </label>
            <input id="id_personal" name="id_personal" required type="number" v-model="client.id_personal">

            <label for="name">Nombre: </label>
            <input id="name" name="name" required type="text" v-model="client.name">

            <label for="last_name">Apellido: </label>
            <input id="last_name" name="last_name" required type="text" v-model="client.last_name">

            <label for="address">Dirección: </label>
            <input id="address" name="address" required type="text" v-model="client.address">

            <label for="tel_number">Número de teléfono: </label>
            <input id="tel_number" name="tel_number" required type="number" v-model="client.tel_number">

            <label for="email">Email: </label>
            <input id="email" name="email" required type="email" v-model="client.email">

            <input class="boton" type="submit" value="Guardar">

            <router-link :to="{ name: 'ViewClient', params: { id: client.id }}" class="boton">
                Regresar
            </router-link>

        </form>

        <div class="mensajes">{{ mensaje }}</div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ModifyClient",
    props: {
        id: [String, Number]
    },
    data() {
        return {
            client: null,
            mensaje: ""
        }
    },
    mounted() {
        this.loadClient();
    },
    methods: {
        loadClient() {
            axios.get("http://prestamo.test/api/client/" + this.id)
                .then(response => {
                    this.client = response.data;
                })
        },
        modifyData() {
            axios.patch("http://prestamo.test/api/client/" + this.id, this.client)
                .then(response => {
                    if (response.status === 200) {
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
