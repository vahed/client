<template>
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
        <EditDevice :device = "getSingleDevie"/>
      </template>
      <!-- <EditDevice :data="myname"/> -->

    </div>
  </v-container>
</template>

<script>
import EditDevice from '../components/EditDevice'

export default {
    data() {
        return {
            props: 'device',
            component: EditDevice,
            search: "",
            name: "dashboard",
            devices: [],
        };
    },
    async fetch({ store }) {
        store.dispatch("get_devices");
    },
    methods: {
        click: function () {
            this.$refs.childComponent.setValue(2);
        },
        rowClicked(row) {
            //this.toggleSelection(row.id);
            this.$store.dispatch("get_device", row.id);
            //this.$router.push("/EditDevice");
        },
        // toggleSelection(keyID) {
        //   if (this.devices.includes(keyID)) {
        //     this.devices = this.devices.filter(
        //       selectedKeyID => selectedKeyID !== keyID
        //     );
        //   } else {
        //     this.devices.push(keyID);
        //   }
        // },
        filterOnlyCapsText(value, search, item) {
            return value != null &&
                search != null &&
                typeof value === "string" &&
                value.toString().toLocaleUpperCase().indexOf(search) !== -1;
        },
    },
    computed: {
        getAllDevices() {
            return this.$store.state.devices;
        },
        getSingleDevie() {
            return this.$store.state.device;
        },
        headers() {
            return [
                {
                    text: "Brand",
                    align: "start",
                    sortable: false,
                    value: "brand",
                },
                {
                    text: "Model",
                    value: "model",
                    filter: value => {
                        if (!this.model)
                            return true;
                        return value < parseInt(this.model);
                    },
                },
                { text: "OS", value: "os" },
                { text: "Release Date", value: "release_date" }
            ];
        },
    }
}
</script>