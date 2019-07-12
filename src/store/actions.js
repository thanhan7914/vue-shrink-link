import { addShrink, getRecord } from '../common/api.firebase.service'

export default {
  shrinkLink ({
    commit
  }, target) {
    return addShrink(target)
      .then(data => {
        return commit('addShrink', data)
      })
  },
  getTarget ({
    commit
  }, id) {
    return getRecord(id)
      .then(snap => {
        return commit('setCurrent', snap)
      })
  }
}
