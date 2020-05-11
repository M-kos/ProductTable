/* eslint-disable no-console */
import render from './render';

export default {
  name: 'ConfirmModal',

  props: {
    value: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    },
    confirmHandler: {
      type: Function,
      default: v => v
    },
    activator: null
  },

  data() {
    return {
      app: undefined,
      top: undefined,
      left: undefined
    }
  },

  watch: {
    activator(value) {
      if (value && this.show) {
        const coordinates = this.activator.getBoundingClientRect()
        this.top = coordinates.top + coordinates.height - 8
        this.left = coordinates.left - coordinates.width
      }
    }
  },

  mounted() {
    this.app = document.getElementById('app')

    if (this.app) {
      if (!this.$slots.default) {
        this.app.append(this.$refs.modal)
      }
      this.app.addEventListener('click', this.clickHandler)
    }
  },

  beforeDestroy() {
    if (this.app) {
      if (!this.$slots.default) {
        this.$refs.modal.remove()
      }
      this.app.removeEventListener('click', this.clickHandler)
    }
  },

  methods: {
    clickHandler() {
      this.$emit('show', false)
    }
  },

  render
};
