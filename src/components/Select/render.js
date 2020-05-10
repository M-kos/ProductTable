/* eslint-disable no-console */
import Checkbox from '../Checkbox'

function renderArrow(h) {
  return h(
    'span',
    {
      class: 'select-arrow',
      on: {
        click: () => {
          this.opened = !this.opened
        }
      }
    },
    [
      h(
        'img',
        {
          attrs: {
            src: './arrow_down.svg'
          }
        }
      )
    ]
  )
}

function renderSelectedItems(h) {
  if (this.computedSelectedItems) {
    return this.computedSelectedItems.map(selectedItem => {
      return h(
        'span',
        {
          class: 'select__selected-item'
        },
        selectedItem
      )
    })
  } else {
    return h(
      'span',
      {
        class: 'select_select-placeholder'
      },
      this.placeholder
    )
  }
}

function renderCheckbox(h, item) {
  if (this.multiple) {
    return h(
      'div',
      {
        class: 'select_select-checkbox'
      },
      [
        h(
          Checkbox,
          {
            props: {
              check: this.selectedItems.includes(item.value) || this.selectAll
            }
          }
        )
      ]
    )
  }
}

function renderListItem(h, item) {
  return h(
    'div',
    {
      class: 'select__select-list-item',
      on: {
        click: () => {
          this.toggle(item)
          this.$emit('input', this.selectedItems)
        }
      }
    },
    [
      renderCheckbox.call(this, h, item),
      h(
        'span',
        {
          class: 'select__select-list-item__item-title'
        },
        item.title
      )
    ]
  )
}

function renderList(h) {
  if (this.opened) {
    return h(
      'div',
      {
        class: 'select__select-list'
      },
      this.computedListItems.map(item => renderListItem.call(this, h, item))
    )
  }
}

export default function(h) {
  return h(
    'div',
    {
      class: 'select'
    },
    [
      h(
        'div',
        {
          class: 'select__selected-items'
        },
        renderSelectedItems.call(this, h)
      ),
      renderArrow.call(this, h),
      renderList.call(this, h)
    ]
  )
}
