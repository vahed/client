import DeviceRepository from './DeviceRepository'

export default ($axios) => ({
  device: DeviceRepository($axios)
})