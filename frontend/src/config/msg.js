import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    iconPack: 'fontawesome',
    duration: 3000,
})

Vue.toasted.register(
    'defaultSucess',
    'Operation success',
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Oops... Unexpected Error.' : payload.msg,
    { type: 'error', icon: 'times' }
)