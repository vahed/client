<template>
  <v-container>
      <v-row>
        <v-col cols="6" class="mx-auto">
            <v-card color="transparent">
                <v-card-title class="justify-center">Edit single record</v-card-title>
                
                <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                > -->
                <v-text-field
                    :v-model="device.model"
                    :rules="modelRules"
                    :value="device.model"
                    label="Model"
                    required
                ></v-text-field>
            
                <v-text-field
                    :v-model="device.brand"
                    :rules="brandRules"
                    :value="device.brand"
                    label="Brand"
                    required
                ></v-text-field>

                <v-text-field
                    :v-model="device.os"
                    :rules="osRules"
                    :value="device.os"
                    label="OS"
                    required
                ></v-text-field>

                <v-text-field
                    :v-model="device.release_date"
                    :rules="releaseDateRules"
                    :value="device.release_date"
                    label="Release date"
                    required
                ></v-text-field>
            
                <v-btn
                    color="success"
                    class="mr-4"
                    @click="editDevice(device)"
                >
                    Edit record
                </v-btn>
            
                </v-form>
                {{device}}
            </v-card>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
props: ['device'],
data() {
    return {
        valid: false,
        model:[],
        modelRules: [ v => !!v || 'Model is required' ],
        brand: [],
        brandRules: [ v => !!v || 'Brand is required' ],
        os: [],
        osRules: [ v => !!v || 'OS is required' ],
        release_date: [],
        releaseDateRules: [ 
            v => !!v || 'Relase date is required',
            v => /^\d{4}\/(0[1-9]|1[0-2])$/.test(v) || 'E-mail must be valid', 
        ],
    }
},
  async fetch({ store }) {
    store.dispatch('get_devices')
  },
  methods:{
    editDevice(device) {
        console.log(device)
            this.$store.dispatch("update_device", {
                id: device.id,
                device: device
            });
            //this.$router.push("/EditDevice");
        },
  },
}
</script>