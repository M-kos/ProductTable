import Button from '../Button';

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
          props: {
            outline: true,
            disabled: this.disabledLeft,
            active: false
          },
          on: {
            click: () => {
              this.toggle('left')
              this.$emmit('toggle', {
                start: this.start,
                end: this.end
              })
            }
          }
        },
        [
          h(
            'span',
            {
              class: {
                'pagination-arrow': true,
                'pagination-arrow--disabled': this.disabledLeft
              }
            },
            [
              h(
                'img',
                {
                  attrs: {
                    src: './arrow-left.svg'
                  }
                }
              )
            ]
          )
        ]
      ),

      h(
        'div',
        {
          class: 'pagination-content'
        },
        `${this.start}-${this.end} of ${this.allItems}`
      ),

      h(
        Button,
        {
          props: {
            outline: true,
            disabled: this.disabledRight,
            active: false
          },
          on: {
            click: () => {
              this.toggle('right')
              this.$emmit('toggle', {
                start: this.start,
                end: this.end
              })
            }
          }
        },
        [
          h(
            'span',
            {
              class: {
                'pagination-arrow': true,
                'pagination-arrow--disabled': this.disabledRight
              }
            },
            [
              h(
                'img',
                {
                  attrs: {
                    src: './arrow-right.svg'
                  }
                }
              )
            ]
          )
        ]
      )
    ]
  )
}