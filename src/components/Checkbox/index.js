import render from './render';

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
      checked: false
    }
  },

  watch: {
    check(value) {
      this.checked = value
    }
  },

  methods: {
    toggle() {
      this.checked = !this.checked
    }
  },

  render
};
