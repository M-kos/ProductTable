import render from './render';

export default {
  name: 'Pagination',

  props: {
    perPage: Number,
    allItems: Number
  },

  data() {
    return {
      start: undefined,
      end: undefined
    }
  },

  computed: {
    disabledLeft() {
      return this.start === 1
    },

    disabledRight() {
      return this.end === this.allItems
    }
  },

  mounted() {
    this.start = 1
    this.end = this.perPage
  },

  methods: {
    toggle(direction) {
      switch (direction) {
        case 'left':
          if (this.disabledLeft) {
            this.start =  this.start - this.perPage
            this.end =  this.end - this.perPage
          }
          break;
        case 'right':
          if (this.disabledRight) {
            this.start =  this.start + this.perPage
            this.end =  this.end + this.perPage
          }
          break;
      }
    }
  },

  render
};
