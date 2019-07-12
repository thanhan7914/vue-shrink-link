export const STORAGE_KEY = 'shrink-vuejs'

export const mutations = {
  addShrink (state, shrink) {
    state.current = shrink
    state.container.push(shrink)
  },
  setCurrent (state, shrink) {
    state.current = shrink
  }
}
