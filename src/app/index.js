import { mapActions, mapGetters } from 'vuex'

import { COLUMN_TITLES, AMOUNT_ELEMENTS } from '../utils'

import render from './render';

const defaultActiveColumn = 'product'

export default {
  name: 'App',

  data() {
    return {
      activeColumn: defaultActiveColumn,
      defaultAmountElement: AMOUNT_ELEMENTS[0].value,

      checkedItems: [],
      selectedColumns: []
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

    ...mapGetters([ 'products', 'error', 'isLoading', 'deleteMessage' ])
  },

  mounted() {
    this.selectedColumns = this.defaultSelectedColumns
  },

  methods: {
    ...mapActions([ 'deleteProducts' ])
  },

  render
};
