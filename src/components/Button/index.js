import render from './render'

export default {
  name: 'Button',

  functional: true,

  props: {
    loading: Boolean,
    disabled: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true
    }
  },

  render
}
