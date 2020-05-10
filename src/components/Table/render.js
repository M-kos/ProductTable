/* eslint-disable no-console */
import { RingLoader, PulseLoader } from '@saeris/vue-spinners'

import Checkbox from '../Checkbox'

function renderCheckbox(h, checked = false, head = true) {
  if (this.selectable) {
    return h(
      'td',
      {
        style: {
          width: 'auto',
          'padding-left': '32px',
          'padding-right': '24px'
        }
      },
      [
        h(
          Checkbox,
          {
            props: {
              check: checked
            },
            on: {
              checked: () => {
                if (head) {
                  this.selectAll = !this.selectAll
                  this.checkedItems.length = 0

                  if (this.selectAll) {
                    this.checkedItems.push(...this.sortedItems.map(item => item.id))
                  }

                  this.$emit('checked', this.checkedItems)
                }
              }
            }
          }
        )
      ]
    )
  }
}

function renderArrow(h, show = false) {
  if (show) {
    return h(
      'span',
      {
        class: {
          'table__head-arrow': true,
          'table__head-arrow--down': !this.sortByIncrease
        }
      },
      [
        h(
          'img',
          {
            attrs: {
              src: './arrow.svg'
            }
          }
        )
      ]
    )
  }
}

function renderBinOrPreloader(h, item) {
  if (this.loading && this.deleteItemId === item.id) {
    return h(
      PulseLoader,
      {
        props: {
          size: 5
        }
      }
    )
  } else {
    return [
      h(
        'img',
        {
          attrs: {
            src: './bin.svg'
          }
        }
      ),
      h(
        'span',
        {
          style: {
            'margin-left': '4px'
          }
        },
        'delete'
      )
    ]
  }
}

function renderDeleteCell(h, item) {
  return h(
    'td',
    {
      class: 'table__body-bin',
      on: {
        click: event => {
          event.stopPropagation()

          if (this.checkedItems.length > 0 && this.checkedItems.includes(item.id)) {
            this.checkedItems.splice(this.checkedItems.indexOf(item.id), 1)
          }

          this.deleteItemId = item.id

          this.$emit('delete', item.id)
        }
      }
    },
    [ renderBinOrPreloader.call(this, h, item) ]
  )
}

function renderTableHead(h) {
  if (Array.isArray(this.columns) && this.columns.length > 0) {
    return h(
      'thead',
      {
        class: 'table__head'
      },
      [
        h(
          'tr',
          {
            class: 'table__head-row'
          },
          [
            renderCheckbox.call(this, h),

            ...this.columnsSortingBy.map((column, index) => {
              return h(
                'th',
                {
                  class: {
                    'table__head-row-cell': true,
                    'table__head-row-cell--active': index === 0
                  },
                  on: {
                    click: () => {
                      if (index === 0) {
                        this.sortByIncrease = !this.sortByIncrease
                      }
                    }
                  },
                  key: `${column.value || column.title}-${index}-${this._uid}`
                },
                [
                  h(
                    'span',
                    {},
                    column.title
                  ),
                  renderArrow.call(this, h, index === 0)
                ]
              )
            }),

            h(
              'th',
              {
                style: {
                  width: '90px'
                }
              }
            )
          ]
        )
      ]
    )
  }
}

function renderPreloaderOrEmpty(h) {
  if (!this.sortedItems || this.sortedItems.length === 0) {
    if (this.loading) {
      return h(RingLoader, { props: { color: '#00A11E' } })
    } else {
      return h('div', {}, 'Empty')
    }
  }
}

function renderTableBody(h) {
  if (Array.isArray(this.sortedItems) && this.sortedItems.length > 0 && Array.isArray(this.columnTypes)) {
    return h(
      'tbody',
      {
        class: 'table__body'
      },
      this.sortedItems.map((item, index) => {
        const includeId = this.checkedItems.includes(item.id)

        return h(
          'tr',
          {
            class: 'table__body-row',
            on: {
              click: () => {
                if (!this.selectable) {
                  return
                }

                if (includeId) {
                  this.checkedItems.splice(this.checkedItems.indexOf(item.id), 1)
                } else {
                  this.checkedItems.push(item.id)
                }

                this.$emit('checked', this.checkedItems)
              }
            },
            key: item.id || `${index}-${this._uid}`
          },
          [
            renderCheckbox.call(this, h, this.selectAll || includeId, false),

            ...this.columnTypes.map((columnType, index) => {
              return h(
                'td',
                {
                  class: {
                    'table__body-row-cell': true,
                    'table__body-row-cell--active': index === 0,
                    'table__body-row-cell--checked': includeId
                  },
                  key: `${columnType}-${item.id || index}-${this._uid}`
                },
                item[columnType]
              )
            }),

            renderDeleteCell.call(this, h, item)
          ]
        )
      })
    )
  }
}

export default function(h) {
  return h(
    'table',
    {
      class: 'table'
    },
    [ renderTableHead.call(this, h), renderPreloaderOrEmpty.call(this, h), renderTableBody.call(this, h) ]
  )
}
