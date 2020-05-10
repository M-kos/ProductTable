import render from './render'

export default {
  name: 'Select',

  props: {
    value: null,
    selectedString: String,

    multiple: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      requiered: true
    },
    placeholder: {
      type: String,
      default: 'Empty'
    }
  },

  data() {
    return {
      opened: false,
      selectAll: false,

      selectedItems: []
    }
  },

  computed: {
    computedTitles() {
      if (this.items) {
        return this.items.reduce((result, item) => Object.assign(result, { [item.value]: item.title }), {})
      }
    },

    computedSelectedItems() {
      if (this.selectedItems.length) {
        if (this.multiple && this.selectedString) {
          return [ this.selectedString ]
        }
        return this.selectedItems.map(item => this.computedTitles[item])
      }
    },

    computedListItems() {
      let items = []

      if (this.multiple) {
        items.push({
          value: 'all',
          title: 'Select All'
        })
      }
      items.push(...this.items)

      return items
    }
  },

  mounted() {
    if (this.value) {
      let value = this.value
      if (!Array.isArray(this.value)) {
        value = [ value ]
      }

      this.selectedItems = [ ...value ]
    }
  },

  render
}
