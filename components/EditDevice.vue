<template>
  <v-container>
      <v-row>
        <v-col cols="6" class="mx-auto">
            <v-card color="transparent">
                <v-card-title class="justify-center">Edit single record</v-card-title>
                
                <v-form
                ref="editDeviceform"
                v-model="valid"
                lazy-validation
                @submit.prevent="editDevice"
                > -->
                <v-text-field
                    :v-model="newModel"
                    :rules="modelRules"
                    :value="mymodel"
                    label="Model"
                    required
                ></v-text-field>
            
                <!-- <v-text-field
                    :v-model="brand"
                    :rules="brandRules"
                    :value="device.brand"
                    label="Brand"
                    required
                ></v-text-field>

                <v-text-field
                    :v-model="os"
                    :rules="osRules"
                    :value="device.os"
                    label="OS"
                    required
                ></v-text-field>

                <v-text-field
                    :v-model="release_date"
                    :rules="releaseDateRules"
                    :value="device.release_date"
                    label="Release date"
                    required
                ></v-text-field> -->
            
                <v-btn
                    color="success"
                    class="mr-4"
                    type="submit"
                >
                    Edit record
                </v-btn>
            {{mymodel}}
                </v-form>
                
            </v-card>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
props: ['device','model'],
data() {
    return {
        valid: false,
        newModel: this.mymodel,
        modelRules: [ v => !!v || 'Model is required' ],
        //brand: '',
        //brandRules: [ v => !!v || 'Brand is required' ],
        //os: '',
        //osRules: [ v => !!v || 'OS is required' ],
        //release_date: '',
        // releaseDateRules: [ 
        //     v => !!v || 'Relase date is required',
        //     v => /^\d{4}\/(0[1-9]|1[0-2])$/.test(v) || 'E-mail must be valid', 
        // ],
    }
},
//   async fetch({ store }) {
//     store.dispatch('get_devices')
//   },
  methods:{
    editDevice() {
        console.log('Model is: '+this.newModel.value)
        this.$store.dispatch("update_device", {
        id: this.device.id,
            model: this.model,
            brand: this.brand,
            os: this.os,
            received_date: this.received_date
        });
        //this.$router.push("/EditDevice");
    },
  },
  created () {
       this.newModel = this.mymodel
   },
  computed: {
    // modelData(){
    //     return this.device.model
    // }
    mymodel: {
      get() {
        return this.device.model;
      },
      set(value) {
        // just placeholder as we dont have Vuex here
        this.device.model = value;
        console.log("Updating counter", value)
      }
    },
  },
    watch: {
        // device() {
        //     this.$emit('device', this.device);
        //     this.$emit('model', this.device.model)
        // }
        // modelData() {
        //     this.modelData = this.device.model
        // }
    }
}
</script>