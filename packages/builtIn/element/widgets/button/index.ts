import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import { buildWidgetFunc } from '@/context/globalContext/componentRepository/util/transformUtil'
import {t} from '@/lang/index'

//button config
const buttonConfig = {
  key: '_button',
  name: t('_.builtIn.element.button.name'),
  description: '',
  icon: 'mdiButtonCursor',
  sequence: 11,
  transform: buildWidgetFunc('el-button',{}, (result, {config}) => {
    //Lable is the default slot content
    // console.log('@@@@@@@@@@@@@@@@@@')
    result['#default'] = config['_label'] || 'Button'


  }),
  // transform: function () {
  //   return {
  //     '~': 'el-button',
  //     '#': 'JAMIE',
  //     '^onMounted': function () {
  //       alert('333')
  //       console.log('MOUNTED IS CALLED in EL_BUTTON')
  //     }
  //   }
  // },
  editor: {
    basic: {
      init: { 'type': 'primary', _label: 'Button', size: 'default' },
      ui: [
        uiUtil.createInput('_label',t('_.builtIn.element.button.label')),
        uiUtil.createSelect('type', ['primary', 'success', 'warning', 'danger', 'info'],t('_.builtIn.element.button.type')),
        uiUtil.createSelect('size', ['large', 'default', 'small'],t('_.builtIn.element.button.size')),
        uiUtil.createSwitch('disabled',t('_.builtIn.element.button.disabled')),
        uiUtil.createColorPicker('color', undefined, {
          predefine: ['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585']
        },t('_.builtIn.element.button.color'))
      ]
    },
    data: false,
    event: {
      list: ['click'],
      init: []
    },
    display: {
      init: {
        style: {
          // display: 'inline-block',
          // margin: '4px 0 4px 0'
        },
        class: ''
      }
    }
    
  }

}
//
export default buttonConfig
