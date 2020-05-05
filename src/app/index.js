import { mapActions, mapGetters } from 'vuex'

import render from './render';

export default {
  name: 'App',

  components: {
  },

  computed: {
    ...mapGetters([ 'products', 'error', 'isLoading', 'deleteMessage' ])
  },

  methods: {
    ...mapActions([ 'deleteProducts' ])
  },

  render
};
