/* eslint-disable no-console */
import { COLUMN_TITLES, AMOUNT_ELEMENTS } from '../utils'

import Title from '../components/Title';
import Table from '../components/Table';
import Button from '../components/Button';
import Select from '../components/Select';
import Pagination from '../components/Pagination';
import ConfirmModal from '../components/ConfirmModal';

export default function(h) {
  return h(
    'article',
    {
      class: 'app',
      attrs: {
        id: 'app'
      }
    },
    [
      h(Title, {
        props: {
          value: 'Table UI'
        }
      }),

      h(
        'div',
        {
          class: 'app-filters'
        },
        [
          h(
            'span',
            {
              class: 'app-sorting'
            },
            'Sorting by:'
          ),
          ...this.columns.map(column => {
            return h(
              Button,
              {
                props: {
                  outline: false,
                  active: column.value === this.activeColumn
                },
                on: {
                  click: () => {
                    this.activeColumn = column.value
                  }
                }
              },
              column.title
            )
          }),

          h('div', { class: 'fill' }),

          h(
            ConfirmModal,
            {
              style: {
                'margin-right': '12px'
              },
              props: {
                show: this.showConfirmModal
              },
              on: {
                show: event => {
                  this.showConfirmModal = event
                },
                confirm: () => {
                  this.deleteProducts(this.checkedItems)
                  this.showConfirmModal = false
                }
              }
            },
            [
              h(
                Button,
                {
                  props: {
                    active: !!this.checkedItems.length,
                    disabled: !this.checkedItems.length,
                    loading: !!this.checkedItems.length && this.isLoading
                  },
                  on: {
                    click: () => {
                      event.stopPropagation()
                      this.showConfirmModal = !this.showConfirmModal
                    }
                  }
                },
                `Delete (${this.checkedItems.length})`
              )
            ]
          ),

          h(
            Select,
            {
              props: {
                value: this.amountElement,
                items: AMOUNT_ELEMENTS
              },
              on: {
                input: event => {
                  this.amountElement = event[0]
                }
              }
            }
          ),

          h(
            Pagination,
            {
              props: {
                perPage: this.amountElement,
                allItems: this.products ? this.products.length : 0
              },
              on: {
                toggle: event => {
                  this.startIndex = event.start - 1
                  this.endIndex = event.end
                }
              }
            }
          ),

          h(
            Select,
            {
              props: {
                value: this.defaultSelectedColumns,
                selectedString: this.selectedString,
                multiple: true,
                items: COLUMN_TITLES.map(column => ({
                  value: column.value,
                  title: column.title
                }))
              },
              on: {
                input: event => {
                  this.selectedColumns = event
                }
              }
            }
          )
        ]
      ),

      h(
        Table,
        {
          props: {
            columns: this.columns,
            items: this.computedProducts,
            selectable: true,
            loading: this.isLoading,
            activeColumn: this.activeColumn
          },
          on: {
            delete: event => {
              this.deleteProducts(event)
            },
            checked: event => {
              this.checkedItems = event
            }
          }
        }
      )
    ]
  );
}
