import render from './render';

export default {
  name: 'Table',

  props: {
    headers: {
      type: Array,
      default: () => []
    },

    items: {
      type: Array,
      default: () => []
    },

    selectable: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      selectAll: false
    }
  },

  computed: {
    columnTypes() {
      if (Array.isArray(this.headers) && this.headers.length > 0) {
        return this.headers.map(header => {
          return header.value
        })
      }
    }
  },

  render
};
