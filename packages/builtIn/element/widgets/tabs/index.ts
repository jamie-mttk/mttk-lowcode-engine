import { tabsTransform } from './transform'
import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import { t } from '@/lang/index'
//
const tabsConfig = {
  key: '_tabs',
  name: t('_.builtIn.element.tabs.name'),
  description: '',
  icon: 'mdiTab',
  sequence: 22,
  transform: tabsTransform,
  editor: {
    basic: {
      ui: [
        uiUtil.createSelect(
          'type',
          [
            { value: 'card', label: t('_.builtIn.element.tabs.type_card') },
            { value: 'border-card', label: t('_.builtIn.element.tabs.type_border-card') }
          ],
          t('_.builtIn.element.tabs.type')
        ),
        uiUtil.createSelect(
          'tab-position',
          [
            { value: 'top', label: t('_.builtIn.element.tabs.tab-position_top') },
            { value: 'right', label: t('_.builtIn.element.tabs.tab-position_right') },
            { value: 'bottom', label: t('_.builtIn.element.tabs.tab-position_bottom') },
            { value: 'left', label: t('_.builtIn.element.tabs.tab-position_left') }
          ],
          t('_.builtIn.element.tabs.tab-position')
        ),
        uiUtil.createSwitch('stretch', t('_.builtIn.element.tabs.stretch')),
        {
          '~component': 'lc-editable-list',
          '~label': t('_.builtIn.element.tabs.tabs'),
          '~prop': '_container',
          labelColumn: 'label',
          editConfig: [uiUtil.createInput('label',t('_.builtIn.element.tabs.tabs_label'))]
        }
      ],
      init: {
        type: 'border-card',
        'tab-position': 'top',
        stretch: false,
        _container: [
          {
            label: 'Tab 1'
          },
          {
            label: 'Tab 2'
          },
          {
            label: 'Tab 3'
          }
        ]
      }
    },
    data: {
      // modelValueName:'model',
      //readonly:true,
      type: 'Number'
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
export default tabsConfig
