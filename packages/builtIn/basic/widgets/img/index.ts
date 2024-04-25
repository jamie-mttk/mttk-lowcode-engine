import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import {t} from '@/lang/index'
//button config
 const imgConfig = {
  key: '_img',
  name: t('_.builtIn.basic.img.name'),
  description: t('_.builtIn.basic.img.description'),
  icon: 'mdiImageArea',
  sequence: 2,
  transform: function ({config}) {
    const result = {
      '~':  'img' ,
    }
    //
    for (const k of Object.keys(config) || []) {
        result[k] = config[k]
    }
    //
    return result
  },
  editor: {
    basic: {
      init: {
        alt: 'No picture'
      },
      ui: [
        uiUtil.createInput('src',t('_.builtIn.basic.img.src')),
        uiUtil.createInput('alt', t('_.builtIn.basic.img.alt')),
        uiUtil.createInputNumber('width', t('_.builtIn.basic.img.width'),{min:0}),
        uiUtil.createInputNumber('height',t('_.builtIn.basic.img.height'),{min:0}),

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
export default imgConfig