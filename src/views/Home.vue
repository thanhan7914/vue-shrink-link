<template>
  <section class="container shrinkapp">
    <!-- header -->
    <header class="header">
      <h1>Shrink your link</h1>
      <div>
        <input
          id="inp-target"
          v-model="target"
          class="shrink"
          :style="styleObj"
          autofocus
          autocomplete="off"
          placeholder="Paste your long url"
          @keydown.enter="createShrink"
          @input="targetChange"
        >
        <div
          v-if="shrinked"
          class="tooltip"
          style="display: inline-block; opacity: 1;"
        >
          <i
            class="fa fa-clipboard shrink-enter"
            aria-hidden="true"
            @click="copyShrinkLink"
          >
            <span
              id="myTooltip"
              class="tooltiptext"
            >Copy to clipboard</span>
          </i>
        </div>
        <i
          v-else
          class="fa fa-link shrink-enter"
          aria-hidden="true"
          @click="createShrink"
        />
      </div>
    </header>
    <footer class="info">
      <p>Press enter to shrink a link</p>
    </footer>
  </section>
</template>

<script>
import { BASE_URL } from '../common/config.js'

export default {
  data () {
    return {
      wait: false,
      shrinked: false,
      target: ''
    }
  },
  computed: {
    styleObj () {
      return {
        width: this.isMobile() ? '96%' : '68%',
        'border-bottom-color': 'rgba(187, 173, 173, 0.2)',
        'border-bottom-width': '5px'
      }
    }
  },
  methods: {
    async createShrink () {
      if (this.shrinked || this.wait) return
      if (this.target.trim() === '') return
      await this.$store.dispatch('shrinkLink', this.target)
      this.target = BASE_URL + '/' + this.$store.state.current.short_url
      this.shrinked = true
      this.wait = false
    },
    copyShrinkLink () {
      var copyText = document.getElementById('inp-target')
      copyText.select()
      document.execCommand('copy')
    },
    targetChange () {
      if (this.target === '') return
      this.shrinked = false
    }
  }
}
</script>
