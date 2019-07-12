<template>
  <div class="redirect">
    Redirecting...
  </div>
</template>

<script>
export default {
  name: 'Navigate',
  title: 'Redirecting...',
  data () {
    return {
    }
  },
  beforeCreate () {
    document.title = 'Redirecting...'
    this.$store.dispatch('getTarget', this.$route.params.id)
      .then(() => {
        let target = decodeURIComponent(this.$store.state.current.target)
        let url = target.startsWith('http') ? target : 'http://' + target
        window.location.href = url
      })
  }
}
</script>
