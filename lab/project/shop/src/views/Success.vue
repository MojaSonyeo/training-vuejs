<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <center><v-img src="home.jpg" class="white--text align-end" heigth ="50%" width="50%"></v-img></center>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <span class="display-3"><center>Merci pour votre achat !</center></span>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <router-link to="/"><span id="textFinal"><center>Cliquer ici pour retourner sur la page d'acceuil</center></span></router-link>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {};
</script>

<style>

#textFinal{
    color: #BAB166;
    font-size: 25px;
}

a:link{text-decoration:none};

</style>