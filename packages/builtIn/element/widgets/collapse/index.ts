import { collapseTransform } from './transform'
import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import {t} from '@/lang/index'
//
const collapseConfig = {
  key: '_collapse',
  name: t('_.builtIn.element.collapse.name'),
  description: '',
  icon: 'mdiArrowCollapseVertical',
  sequence: 23,
  transform: collapseTransform,
  editor: {
    basic: {
      ui: [
        //If accordion is true,the modelValue is a String
        //So far only one data type is supported
        // {
        //   '~component': 'el-switch',
        //   '~label': 'Accordion',
        //   '~prop': 'accordion'
        // },
        {
          '~component': 'lc-editable-list',
          '~label': t('_.builtIn.element.collapse.items'),
          '~prop': '_container',
          labelColumn: 'title',
          editConfig: [uiUtil.createInput('title'), uiUtil.createSwitch('disabled')]
        }
      ],
      init: {
        accordion: false,
        _container: [
          {
            title: 'Collapse 1'
          },
          {
            title: 'Collapse 2'
          },
          {
            title: 'Collapse 3'
          }
        ]
      }
    },
    data: {
      // modelValueName:'model',
      //readonly:true,
      type: 'Array'
    },
    display: {
      init: {
        style: {
          display: 'block',
          width: '100%',
          margin: '4px 0 4px 0'
        }
      }
    }
  }
}
//
export default collapseConfig
