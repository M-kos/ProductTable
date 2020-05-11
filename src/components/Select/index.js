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
      selectAll: true,

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
      if (this.selectedItems.length || this.selectedString) {
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

  methods: {
    toggle(item) {
      if (item.value === 'all') {
        this.selectAll = !this.selectAll
        this.selectedItems.splice(0)

        if (this.selectAll) {
          this.selectedItems.push(...this.computedListItems
            .map(item => item.value)
            .filter(item => item !== 'all'))
        }
      } else {
        if (this.selectAll) {
          this.selectAll = false
        }

        this.addValue(item)
      }
    },

    addValue(item) {
      if (this.multiple) {
        if (this.selectedItems.includes(item.value)) {
          this.selectedItems.splice(this.selectedItems.indexOf(item.value), 1)
        } else {
          this.selectedItems.push(item.value)
        }
      } else {
        this.selectedItems.splice(0)
        this.selectedItems.push(item.value)
      }
    }
  },

  render
}
