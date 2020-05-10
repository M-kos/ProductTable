import { mapActions, mapGetters } from 'vuex'

import render from './render';

const defaultActiveColumn = 'product'

export default {
  name: 'App',

  components: {
  },

  data() {
    return {
      activeColumn: defaultActiveColumn
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
