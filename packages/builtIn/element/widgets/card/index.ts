import { computed, unref } from 'vue'
import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import {
  buildWidgetWithDefaultSlotFunc,
  buildPanel
} from '@/context/globalContext/componentRepository/util/transformUtil'
import { t } from '@/lang/index'

//card config
const cardConfig = {
  key: '_card',
  name: t('_.builtIn.element.card.name'),
  description: '',
  icon: 'mdiCardBulletedOutline',
  sequence: 21,
  transform: buildWidgetWithDefaultSlotFunc('el-card', {}, function (result, { config, context }) {
    // console.log('card rendered@',context.mode.value)
    //Set body style to 100% height, so it will automatically resized
    result['body-style'] = 'height:100%;'
    //
    if (config._headerUseSlot) {
      result['#header'] = buildPanel(config, 'header')
    } else {
      delete result['#header']
    }
    //
    if (config._footerUseSlot) {
      result['#footer'] = buildPanel(config, 'footer')
    } else {
      delete result['#footer']
    }

    //
     console.log(result)
  }),
  editor: {
    basic: {
      ui: function (data: any) {
        return [
          uiUtil.createSelect(
            'shadow',
            [
              { label: t('_.builtIn.element.card.shadow_always'), value: 'always' },
              { label: t('_.builtIn.element.card.shadow_never'), value: 'never' },
              { label: t('_.builtIn.element.card.shadow_hover'), value: 'hover' }
            ],
            t('_.builtIn.element.card.shadow')
          ),
          uiUtil.createInput(
            'header',
            t('_.builtIn.element.card.header'),
            {
              '~show': computed(() => !unref(data)._headerUseSlot)
            }          
          ),
          uiUtil.createSwitch('_headerUseSlot', t('_.builtIn.element.card.headerUseSlot')),
          uiUtil.createInput(
            'footer',
            t('_.builtIn.element.card.footer'),
            {
              '~show': computed(() => !unref(data)._footerUseSlot)
            }           
          ),
          uiUtil.createSwitch('_footerUseSlot', t('_.builtIn.element.card.footerUseSlot'))
        ]
      },
      init: {
        header: 'Card default title',
        shadow: 'always'
      }
    },
    display: {
      init: {
        style: {
          // margin: '4px 0 4px 0',
          width: '100%'
        }
      }
    }
  }
}
//
export default cardConfig
