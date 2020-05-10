import { mapActions, mapGetters } from 'vuex'

import render from './render';

const defaultActiveColumn = 'product'

export default {
  name: 'App',

  data() {
    return {
      activeColumn: defaultActiveColumn,

      checkedItems: []
    }
  },

  computed: {
    ...mapGetters([ 'products', 'error', 'isLoading', 'deleteMessage' ])
  },

  methods: {
    ...mapActions([ 'deleteProducts' ])
  },

  render
};
