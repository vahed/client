<!-- <template>
  <v-container>
      <v-row>
          <v-col cols="6" class="mx-auto">
              <v-card color="transparent">
                <v-card-title class="justify-center">Welcome to dashboard</v-card-title>
              </v-card>
          </v-col>
      </v-row>

    <div>
       <v-data-table
        :headers="headers"
        :items="getAllDevices"
        item-key="id"
        class="elevation-1"
        :search="search"
        :custom-filter="filterOnlyCapsText"
        :sort-by="['os']"
        :sort-desc="[false, true]"
        v-model="devices"
      >
        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Search (UPPER CASE ONLY)"
            class="mx-4"
          ></v-text-field>
        </template>
        <template v-slot:item="{ item }">
          <tr :class="devices.indexOf(item.id)>-1?'cyan':''" @click="rowClicked(item)">
            <td>{{ item.brand }}</td>
            <td>{{ item.model }}</td>
            <td>{{ item.os }}</td>
            <td>{{ item.release_date }}</td>
          </tr>
        </template>
      </v-data-table>
      <template v-if="getSingleDevie">
        <EditDevice 
          :device="getSingleDevie"
          @interface="handleFcAfterDateBack"
        />
      </template> -->
      <!-- <v-btn
      color="success"
      class="mr-4"
      >
      Edit record
      </v-btn> -->

    <!-- </div>
  </v-container>
</template> -->
<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="getAllDevices"
        item-key="id"
        class="elevation-1"
        :search="search"
        :custom-filter="filterOnlyCapsText"
        :sort-by="['os']"
        :sort-desc="[false, true]"
        v-model="devices"
      >
        <template v-slot:top>
          <v-text-field
          v-model="search"
          label="Search (UPPER CASE ONLY)"
          class="mx-4"
        ></v-text-field>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Welcome to dashboard</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
    
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.model"
                          :rules="modelRules"
                          label="Model"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.brand"
                          :rules="brandRules"
                          label="Brand"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.os"
                          label="OS"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.release_date"
                          :rules="releaseDateRules"
                          label="Release date"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
    
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">The selected record is deleted successfully</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>
<script>
export default {
  data: () => ({
    search: "",
    model:'',
    modelRules: [ v => !!v || 'Model is required' ],
    brand: '',
    brandRules: [ v => !!v || 'Brand is required' ],
    os: '',
    release_date: '',
    releaseDateRules: [ 
        v => !!v || 'Relase date is required',
        v => /^\d{4}\/(0[1-9]|1[0-2])$/.test(v) || 'E-mail must be valid', 
    ],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
          text: "Brand",
          align: "start",
          sortable: false,
          value: "brand",
      },
      {
          text: "Model",
          value: "model",
      },
      { text: "OS", value: "os" },
      { text: "Release Date", value: "release_date" },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    devices: [],
    editedIndex: -1,
    editedItem: {
      model: '',
      brand: '',
      os: '',
      release_date: '',
    },
    defaultItem: {
      model: '',
      brand: '',
      os: '',
      release_date: '',
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    getAllDevices() {
        return this.$store.state.devices;
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  async fetch({ store }) {
      store.dispatch("get_devices")
  },
  methods: {
    filterOnlyCapsText(value, search, item) {
        return value != null &&
            search != null &&
            typeof value === "string" &&
            value.toString().toLocaleUpperCase().indexOf(search) !== -1;
    },
    editItem (item) {
      this.editedIndex = this.devices.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.$store.dispatch('delete_device', item.id)
      this.editedIndex = this.devices.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.devices.splice(this.editedIndex, 1)
      this.closeDelete()
      window.location.reload()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        this.$store.dispatch('update_device', {
          device: this.device
        })
        Object.assign(this.devices[this.editedIndex], this.editedItem)
      } else {
        console.log('Save data here'+this.editedItem.model)
        this.$store.dispatch('create_device', {
          model: this.editedItem.model,
          brand: this.editedItem.brand,
          os: this.editedItem.os,
          release_date: this.editedItem.release_date
        })
        this.devices.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>