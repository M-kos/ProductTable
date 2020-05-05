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
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      selectAll: false,
      sortByIncrease: true,
      checkedItems: [],
      deleteItemId: undefined
    }
  },

  computed: {
    columnTypes() {
      if (Array.isArray(this.headers) && this.headers.length > 0) {
        return this.headers.map(header => {
          return header.value
        })
      }
    },

    sortedItems() {
      if (this.items) {
        const activeColumn = this.columnTypes[0]

        return this.items.sort((a, b) => {
          let result = a[activeColumn] > b[activeColumn] ? 1 : -1

          if (!this.sortByIncrease) {
            result *= -1
          }

          return result
        })
      }
    }
  },

  methods: {
  },

  render
};
