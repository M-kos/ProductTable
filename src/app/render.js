import { COLUMN_TITLES } from '../utils'

import Title from '../components/Title';
import Table from '../components/Table';
import Button from '../components/Button';

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
          })
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
            }
          }
        }
      )
    ]
  );
}
