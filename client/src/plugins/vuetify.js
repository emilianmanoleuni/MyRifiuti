import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/util/colors'

export default createVuetify({
    components,
    directives,
    theme: {
        themes: {
          light: {
            dark: false,
            colors: {
              background: colors.green.lighten5, //#E8F5E9
              basic: colors.green.lighten3, 
              buttons: colors.green.darken1, 
              buttonsLight: colors.green.lighten3
            }
          },
        },
      },
})