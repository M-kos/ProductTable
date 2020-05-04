import Title from '../components/Title';

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
      })
    ]
  );
}
