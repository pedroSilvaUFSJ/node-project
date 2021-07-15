import Vue from 'vue'
import Toasted from 'vue-toasted'

const sucessSettings = [
    'defaultSuccess',
    payload => payload.msg || 'Operation performed successfully!',
    { type: 'success', icon: 'check' }
]

const errorSettings = [
    'defaultError',
    payload => payload.msg || 'Oops.. unexpected error.',
    { type: 'error', icon: 'times' }
]

Vue.use(Toasted, { iconPack: 'fontawesome', duration: 3000 })
Vue.toasted.register(...sucessSettings)
Vue.toasted.register(...errorSettings)