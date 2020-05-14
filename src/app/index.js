import { mapActions, mapGetters } from 'vuex'

import { COLUMN_TITLES, AMOUNT_ELEMENTS } from '../utils'

import render from './render'

const defaultActiveColumn = 'product'

export default {
  name: 'App',

  data() {
    return {
      activeColumn: defaultActiveColumn,
      amountElement: AMOUNT_ELEMENTS[0].value,

      checkedItems: [],
      selectedColumns: [],
      startIndex: undefined,
      endIndex: undefined,

      showConfirmModal: false
    }
  },

  computed: {
    defaultSelectedColumns() {
      return COLUMN_TITLES.map(column => column.value)
    },

    selectedString() {
      return `${this.selectedColumns.length} columns selected`
    },

    columns() {
      return COLUMN_TITLES.filter(column => this.selectedColumns.includes(column.value))
    },

    computedProducts() {
      if (this.products) {
        return this.products.slice(this.startIndex, this.endIndex)
      }
    },

    ...mapGetters([ 'products', 'error', 'isLoading', 'deleteMessage' ])
  },

  mounted() {
    this.selectedColumns = this.defaultSelectedColumns

    this.startIndex = 0
    this.endIndex = this.amountElement
  },

  methods: {
    ...mapActions([ 'deleteProducts' ])
  },

  render
}
