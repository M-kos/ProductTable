export default function(h, ctx) {
  return h(
    'div',
    {
      class: 'title',
      style: ctx.data.style
    },
    ctx.props.value
  );
}
