import { COLUMN_TITLES } from '../utils'

import Title from '../components/Title';
import Table from '../components/Table';

const products = [
  {
    id:1,
    product:'Pork - Back Ribs',
    calories:991,
    fat:16,
    carbs:71,
    protein:18,
    iron:2
  },
  {
    id:2,
    product:'Butter Ripple - Phillips',
    calories:329,
    fat:59,
    carbs:76,
    protein:41,
    iron:9
  },
  {
    id:3,
    product:'Soup - French Onion, Dry',
    calories:223,
    fat:99,
    carbs:8,
    protein:13,
    iron:1
  },
  {
    id:4,
    product:'Beer - Camerons Auburn',
    calories:116,
    fat:85,
    carbs:61,
    protein:91,
    iron:24
  },
  {
    id:5,
    product:'Nutmeg - Ground',
    calories:816,
    fat:57,
    carbs:25,
    protein:21,
    iron:17
  }
]

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
            items: products,
            selectable: true
          }
        }
      )
    ]
  );
}
