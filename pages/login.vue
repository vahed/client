<template>
  <div id="app">
    <v-app id="inspire">
        <v-container>
          <v-row>
              <v-col cols="6" class="mx-auto">
                  <v-card flat color="transparent" title="Login">
                      <v-form ref="loginForm">
                        <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Email"
                        >
                        </v-text-field>
                        <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="passwordRules"
                        label="Password"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                        >
                        </v-text-field>
                        <v-btn color="primary" @click="login">Login</v-btn>
                      </v-form>
                  </v-card>
              </v-col>
          </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>

export default {
  data() {
    return {
      show1: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [
        (value) => !!value || 'Please type password.',
        (value) => (value && value.length >= 6) || 'minimum 6 characters',
      ],
      form: {
          email: '',
          password: ''
      }
    }
  },

  methods: {
      login() {
        this.$axios.post('/login', {
            email: this.email,
            password: this.password
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