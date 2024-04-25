import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import {t} from '@/lang/index'
//button config
const htmlConfig = {
  key: '_html',
  name: t('_.builtIn.basic.html.name'),
  description: t('_.builtIn.basic.html.description'),
  icon: 'mdiLanguageHtml5',
  sequence: 1,
  transform: function ({ config }) {
    return {
      '~': config.wrapBy || 'div',
      '#': config.html || ''
    }
  },
  editor: {
    basic: {
      init: {
        wrapBy: 'div',
        html: 'HTML  here'
      },
      ui: [
        uiUtil.createSelect('wrapBy', ['div', 'span'],t('_.builtIn.basic.html.wrapBy')),
        uiUtil.createInput('html',t('_.builtIn.basic.html.html'), {
          '~description': t('_.builtIn.basic.html.html_description'),
          type: 'textarea',
          rows: 6
        })

      ]
    },
    display: {
      init: {
        style: {
          'min-height': '10px',
          'min-width': '10px'
        }
      }
    }
  }
  // dataConfig:{
  //   //readonly:true,
  //   type:'String',
  // },
}
export default htmlConfig
