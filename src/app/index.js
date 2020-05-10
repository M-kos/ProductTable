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

      checkedItems: []
    }
  },

  computed: {
    defaultSelectedColumns() {
      return COLUMN_TITLES.map(column => column.value)
    },

    ...mapGetters([ 'products', 'error', 'isLoading', 'deleteMessage' ])
  },

  methods: {
    ...mapActions([ 'deleteProducts' ])
  },

  render
};
