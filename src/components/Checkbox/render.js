export default function(h) {
  return h(
    'div',
    {
      class: {
        checkbox: true,
        'checkbox--checked': this.checked
      },
      on: {
        click: () => {
          this.toggle()
          this.$emit('checked', this.checked)
        }
      }
    },
    [
      h(
        'div',
        {
          class: {
            checkbox__checkmark: true,
            'checkbox__checkmark--checked': this.checked
          }
        },
        [
          h(
            'svg',
            {
              attrs: {
                width: '10',
                height: '6',
                viewBox: '0 0 10 6',
                xmlns: 'http://www.w3.org/2000/svg'
              }
            },
            [
              h(
                'path',
                {
                  attrs: {
                    d: 'M1.56354 2.61235L0.666992 3.41618L3.54877 5.99991L9.33366 0.803736L8.43711 -9.15527e-05L3.54877 4.39225L1.56354 2.61235Z',
                    fill: 'white'
                  }
                }
              )
            ]
          )
        ]
      )
    ]
  );
}
