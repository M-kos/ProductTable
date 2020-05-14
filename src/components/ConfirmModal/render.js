import { PulseLoader } from '@saeris/vue-spinners'

import Button from '../Button'

function renderContent(h) {
  return [
    'Are you sure you want to ',
    h(
      'span',
      {
        class: 'confirm-modal__modal-content--bold'
      },
      'delete item?'
    )
  ]
}

function renderConfirmOrPreloader(h) {
  if (this.loading) {
    return h(
      PulseLoader,
      {
        props: {
          size: 5
        }
      }
    )
  } else {
    return h('span', {}, 'Confirm')
  }
}

export default function(h) {
  return h(
    'div',
    {
      class: 'confirm-modal-wrapper'
    },
    [
      this.$slots.default,
      h(
        'div',
        {
          class: {
            'confirm-modal': true,
            'confirm-modal--show': this.show
          },
          style: {
            top: `${this.top}px`,
            left: `${this.left}px`,
            right: `${this.right}px`,
            bottom: `${this.bottom}px`
          },
          ref: 'modal',
          on: {
            click: event => {
              event.stopPropagation()
            }
          }
        },
        [
          h(
            'div',
            {
              class: 'confirm-modal__modal-content'
            },
            this.value || renderContent.call(this, h)
          ),
          h(
            'div',
            {
              class: 'confirm-modal__modal-buttons'
            },
            [
              h(
                Button,
                {
                  props: {
                    outline: true
                  },
                  on: {
                    click: event => {
                      event.stopPropagation()
                      this.$emit('show', false)
                    }
                  }
                },
                'Cancel'
              ),
              h(
                Button,
                {
                  props: {
                    active: true,
                    loading: this.loading
                  },
                  on: {
                    click: event => {
                      event.stopPropagation()
                      this.$emit('confirm', true)
                      this.confirmHandler()
                    }
                  }
                },
                [ renderConfirmOrPreloader.call(this, h) ]
              )
            ]
          )
        ]
      )
    ]
  )
}