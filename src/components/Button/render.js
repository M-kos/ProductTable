import { PulseLoader } from '@saeris/vue-spinners'

function renderPreLoader(h, ctx) {
  if (ctx.props.loading) {
    return h(
      PulseLoader,
      {
        props: {
          size: 5
        }
      }
    )
  }
}

export default function(h, ctx) {
  return h(
    'button',
    {
      attrs: Object.assign(
        {
          disabled: ctx.props.disabled
        },
        ctx.data.attrs
      ),
      class: {
        button: true,
        'button--outline': ctx.props.outline,
        'button--disabled': ctx.props.disabled,
        'button--loading': ctx.props.loading,
        'button--active': ctx.props.active
      },
      style: ctx.data.style,
      on: ctx.data.on,
      key: ctx.data.key
    },
    [
      h(
        'div',
        {
          class: 'button__content'
        },
        [ ctx.children ]
      ),

      renderPreLoader.call(this, h, ctx)
    ]
  )
}
