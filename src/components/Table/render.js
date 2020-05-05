/* eslint-disable no-console */
import { RingLoader } from '@saeris/vue-spinners'

import Checkbox from '../Checkbox'

function renderCheckbox(h, checked = false, head = true) {
  if (this.selectable) {
    return h(
      'td',
      {},
      [
        h(
          Checkbox,
          {
            props: {
              check: checked
            },
            on: {
              checked: event => {
                if (head) {
                  this.selectAll = !this.selectAll
                }
                this.$emit('checked', event)
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
      'div',
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

function renderTableHead(h) {
  if (Array.isArray(this.headers) && this.headers.length > 0) {
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

            ...this.headers.map((header, index) => {
              return h(
                'th',
                {
                  class: {
                    'table__head-cell': true,
                    'table__head-cell--active': index === 0
                  },
                  on: {
                    click: () => {
                      if (index === 0) {
                        this.sortByIncrease = !this.sortByIncrease
                      }
                    }
                  },
                  key: `${header.value || header.title}-${index}-${this._uid}`
                },
                [
                  h(
                    'span',
                    {},
                    header.title
                  ),
                  renderArrow.call(this, h, index === 0)
                ]
              )
            })
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
  if (Array.isArray(this.sortedItems) && this.sortedItems.length > 0 && Array.isArray(this.columnTypes) && !this.loading) {
    return h(
      'tbody',
      {
        class: 'table__body'
      },
      this.sortedItems.map((item, index) => {
        return h(
          'tr',
          {
            class: 'table__body-row',
            on: {
              click: () => {
                // eslint-disable-next-line no-console
                console.log('click');

              }
            },
            key: item.id || `${index}-${this._uid}`
          },
          [
            renderCheckbox.call(this, h, this.selectAll, false),

            ...this.columnTypes.map(columnType => {
              return h(
                'td',
                {
                  class: 'table__body-cell',
                  key: `${columnType}-${item.id || index}-${this._uid}`
                },
                item[columnType]
              )
            })
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
