<template>
  <div id="app">
    <v-app id="inspire">
        <v-container>
          <v-row>
              <v-col cols="6" class="mx-auto">
                  <v-card flat color="transparent" title="Register">
                      <v-form ref="registerForm">
                        <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        label="Fullname"
                        >
                        </v-text-field>
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
                        <v-btn color="primary" @click="register">Rgister</v-btn>
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
  data: () => ({
      show1: false,
      name: '',
      nameRules: [ v => !!v || 'Fullname is required' ],
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
          name: '',
          email: '',
          password: ''
      }
  }),

  methods: {
    register() {
        this.$axios.post('register', {
            name: this.name,
            email: this.email,
            password: this.password
        })
        .then(function (response) {
            console.log(response.data)
              if(response.data) {
                console.log('redirect...')
                window.location = "/login"
              }
          })
          .catch(function (error) {
              if(error) {
                alert("Register error")
              }
          });  
    }
  },
}
</script>