<template>
    <v-container>
      <v-row>
          <v-col cols="6" class="mx-auto">
              <v-card color="transparent" title="Login">
                  <v-btn color="primary" @click.prevent="login">Login</v-btn>
              </v-card>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      name: 'login',
      valid: false,
      form: {
          email: 'vahed@yahoo.com',
          password: 'sara123'
      }
    }
  },

  methods: {
      login() {
          this.$axios.post('http://127.0.0.1:8000/api/login', {
              data: this.form
          })
          .then(function (response) {
              if(response.data === 1) {
                console.log('redirect...')
                window.location = "/dashboard"
              }
          })
          .catch(function (error) {
              if(error) {
                alert("Not valid credentials")
              }
          });
        
      }
  }
}
</script>