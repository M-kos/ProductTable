import { PulseLoader } from '@saeris/vue-spinners'

function renderPreLoaderOrContent(h, ctx) {
  if (ctx.props.loading) {
    return h(
      PulseLoader,
      {
        props: {
          size: 5
        }
      }
    )
  } else {
    return h(
      'div',
      {
        class: 'button__content'
      },
      [ ctx.children ]
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
    [ renderPreLoaderOrContent.call(this, h, ctx) ]
  )
}
