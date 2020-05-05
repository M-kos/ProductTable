import { COLUMN_TITLES } from '../utils'

import Title from '../components/Title';
import Table from '../components/Table';

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
        Table,
        {
          props: {
            headers: COLUMN_TITLES,
            items: this.products,
            selectable: true,
            loading: this.isLoading
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
