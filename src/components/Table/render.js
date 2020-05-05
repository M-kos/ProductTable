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
                  class: 'table__head-cell',
                  on: {
                    click: () => {}
                  },
                  key: `${header.value || header.title}-${index}-${this._uid}`
                },
                header.title
              )
            })
          ]
        )
      ]
    )
  }
}

function renderTableBody(h) {
  if (Array.isArray(this.items) && this.items.length > 0 && Array.isArray(this.columnTypes)) {
    return h(
      'tbody',
      {
        class: 'table__body'
      },
      this.items.map((item, index) => {
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
    [ renderTableHead.call(this, h), renderTableBody.call(this, h) ]
  );
}
