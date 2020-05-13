/* eslint-disable no-console */
import render from './render';

export default {
  name: 'Table',

  props: {
    columns: {
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
    },

    activeColumn: {
      type: String,
      default: ''
    },

    error: String
  },

  data() {
    return {
      selectAll: false,
      sortByIncrease: true,

      showCofirmModal: false,
      confirmModalActivator: undefined,

      checkedItems: [],

      deleteItemId: undefined
    }
  },

  computed: {
    columnsSortingBy() {
      if (this.activeColumn) {
        let activeIndex
        let sortedColumns = [ ...this.columns ]

        this.columns.forEach((column, index) => {
          if (column.value === this.activeColumn) {
            activeIndex = index
          }
        })

        sortedColumns.unshift(...sortedColumns.splice(activeIndex, 1))

        return sortedColumns
      }
    },

    columnTypes() {
      if (Array.isArray(this.columnsSortingBy) && this.columnsSortingBy.length > 0) {
        return this.columnsSortingBy.map(column => {
          return column.value
        })
      }
    },

    sortedItems() {
      if (this.items) {
        const activeColumn = this.activeColumn || this.columnTypes[0]

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

  render
};
