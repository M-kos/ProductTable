import render from './render'

export default {
  name: 'Button',

  functional: true,

  props: {
    outline: Boolean,
    loading: Boolean,
    disabled: Boolean,
    active: {
      type: Boolean,
      default: true
    }
  },

  render
}
