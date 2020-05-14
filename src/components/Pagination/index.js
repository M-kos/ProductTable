import render from './render'

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
      return this.end >= this.allItems
    }
  },

  mounted() {
    this.start = 1
    this.end = this.perPage
  },

  watch: {
    perPage() {
      this.start = 1
      this.end = this.perPage

      this.$emit('toggle', {
        start: this.start,
        end: this.end
      })
    }
  },

  methods: {
    toggle(direction) {
      switch (direction) {
        case 'left':
          if (!this.disabledLeft) {
            this.start =  this.start - this.perPage
            this.end =  this.end - this.perPage

            if (this.start < 1) {
              this.start = 1
            }
          }
          break
        case 'right':
          if (!this.disabledRight) {
            this.start =  this.start + this.perPage
            this.end =  this.end + this.perPage

            if (this.end > this.allItems) {
              this.end = this.allItems
            }
          }
          break
      }
    }
  },

  render
}
