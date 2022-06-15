export const state = () => ({
    devices: [],
    device: []
  })
  
  export const mutations = {
    SET_DEVICES(state, devices) {
      state.devices = devices
    },
    SET_DEVICE(state, device) {
      state.device = device
    }
  }
  
  export const actions = {
    async get_devices({ commit }) {
      const res = await this.$repositories.device.all()
      if (res.status === 200 && res.data) {
        commit('SET_DEVICES', res.data)
      } else {
        // Handle error here
        console.error()
      }
    },
  
    async get_device({ commit }, device) {
        console.log('get single device...')
      const res = await this.$repositories.device.show(device)
      // const { status, data } = res
      if (res.status === 200 && res.data) {
        //   const { data } = data
        commit('SET_DEVICE', res.data)
      } else {
        // Handle error here
      }
    },
  
    async create_device({ commit }, id, device) {
      const res = await this.$repositories.device.create(id, device)
      // const { status, data } = res
      if (res.status === 200 && res.data) {
        //   const { data } = data
        commit('SET_DEVICE', res.data)
      } else {
        // Handle error here
      }
    },
  
    async update_device({ commit }, id, device) {
      const res = await this.$repositories.device.update(id, device)
      // const { status, data } = res
      if (res.status === 200 && res.data) {
        //   const { data } = data
        commit('SET_DEVICE', res.data)
      } else {
        // Handle error here
      }
    },
  
    async delete_device({ commit }, id) {
      const res = await this.$repositories.device.delete(id)
      // const { status, data } = res
      if (res.status === 200 && res.data) {
        // Remove from store
      } else {
        // Handle error here
      }
    }
  }