/* eslint-disable no-console */
import { COLUMN_TITLES, AMOUNT_ELEMENTS } from '../utils'

import Title from '../components/Title';
import Table from '../components/Table';
import Button from '../components/Button';
import Select from '../components/Select';

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
        {},
        [
          h(
            'span',
            {},
            'Sorting by:'
          ),
          ...COLUMN_TITLES.map(column => {
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

          h(
            Button,
            {
              props: {
                active: true,
                disabled: !this.checkedItems.length,
                loading: !!this.checkedItems.length && this.isLoading
              },
              on: {
                click: () => {
                  this.deleteProducts(this.checkedItems)
                }
              }
            },
            'Delete'
          ),

          h(
            Select,
            {
              props: {
                value: this.defaultAmountElement,
                items: AMOUNT_ELEMENTS
              }
            }
          ),
          h(
            Select,
            {
              props: {
                value: this.defaultSelectedColumns,
                selectedString: 'Hello',
                multiple: true,
                items: COLUMN_TITLES.map(column => ({
                  value: column.value,
                  title: column.title
                }))
              }
            }
          )
        ]
      ),

      h(
        Table,
        {
          props: {
            columns: COLUMN_TITLES,
            items: this.products,
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
