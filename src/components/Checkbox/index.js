import render from './render'

export default {
  name: 'Checkbox',

  props: {
    check: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      checked: undefined
    }
  },

  watch: {
    check(value) {
      this.checked = value
    }
  },

  mounted() {
    this.checked = this.check
  },

  methods: {
    toggle() {
      this.checked = !this.checked
    }
  },

  render
}
