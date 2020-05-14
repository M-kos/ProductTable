import Button from '../Button'

export default function(h) {
  return h(
    'div',
    {
      class: 'pagination'
    },
    [
      h(
        Button,
        {
          style: {
            'max-width': '32px',
            'min-width': '32px',
            padding: '0'
          },
          props: {
            outline: true,
            disabled: this.disabledLeft,
            active: false
          },
          on: {
            click: () => {
              this.toggle('left')
              this.$emit('toggle', {
                start: this.start,
                end: this.end
              })
            }
          }
        },
        [
          h(
            'div',
            {
              class: {
                'pagination-arrow': true,
                'pagination-arrow--left': true,
                'pagination-arrow--disabled': this.disabledLeft
              }
            }
          )
        ]
      ),

      h(
        'div',
        {
          class: 'pagination-content'
        },
        [
          h(
            'span',
            {
              class: 'pagination-content-interval'
            },
            `${this.start}-${this.end}`
          ),
          h(
            'span',
            {
              class: 'pagination-content-dash'
            },
            'of'
          ),
          h(
            'span',
            {
              class: 'pagination-content-total'
            },
            this.allItems
          )
        ]
      ),

      h(
        Button,
        {
          style: {
            'max-width': '32px',
            'min-width': '32px',
            padding: '0'
          },
          props: {
            outline: true,
            disabled: this.disabledRight,
            active: false
          },
          on: {
            click: () => {
              this.toggle('right')
              this.$emit('toggle', {
                start: this.start,
                end: this.end
              })
            }
          }
        },
        [
          h(
            'div',
            {
              class: {
                'pagination-arrow': true,
                'pagination-arrow--right': true,
                'pagination-arrow--disabled': this.disabledRight
              }
            }
          )
        ]
      )
    ]
  )
}