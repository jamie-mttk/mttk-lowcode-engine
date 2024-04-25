import { buildPanel } from '@/context/globalContext/componentRepository/util/transformUtil'
import {t} from '@/lang/index'
//
const containerConfig = {
  key: '_container',
  name: t('_.builtIn.basic.container.name'),
  description: t('_.builtIn.basic.container.description'),
  icon: 'mdiCheckboxBlankOutline',
  sequence: 3,
  transform: function ({ config }) {
    //
    return buildPanel(config)
  },
  editor: {
    //empty init to init default slot
    basic: { init:{} },
    display: {
      init: {
        style: {
          display: 'block',
          width: '100%',
          //if height is not set,panel is automatically set to 100%,so we should set a fixed value here
          'height': '320px',
          margin: '10px'
        }
      }
    }
  }
}

export default containerConfig
