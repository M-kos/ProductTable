import render from './render';

export default {
  name: 'Title',

  functional: true,

  props: {
    value: {
      type: String,
      required: true
    }
  },

  render
};
