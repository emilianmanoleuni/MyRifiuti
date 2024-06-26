import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/util/colors'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
    components,
    directives,
    theme: {
        themes: {
          light: {
            dark: false,
            colors: {
              //PARTS
              background: colors.green.lighten5, //#E8F5E9
              basic: colors.green.lighten3, 
              footer: colors.green.darken4,
              //BUTTONS
              buttons: colors.green.darken1, 
              buttonsLight: colors.green.lighten3,
              //WASTE
              organic: colors.brown.darken4,
              plastic: colors.lightBlue.darken2,
              paper: colors.yellow.darken1,
              residue: colors.green.darken4,
              glass: colors.green.darken1,
              //STATUS
              red: colors.red.base,
              yellow: colors.yellow.base,
              green: colors.green.base,
            }
          },
        },
      },
})