import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import { buildWidgetFunc } from '@/context/globalContext/componentRepository/util/transformUtil'
import { t } from '@/lang/index'
//
const dividerConfig = {
  key: '_divider',
  name: t('_.builtIn.element.divider.name'),
  description: '',
  icon: 'mdiLineScan',
  sequence: 42,
  transform: buildWidgetFunc('el-divider', {}, (result, { config }) => {
    result['#'] = config._content
  }),
  editor: {
    basic: {
      ui: [
        uiUtil.createInput('_content', t('_.builtIn.element.divider.content')),
        uiUtil.createSelect(
          'direction',
          [
            { value: 'horizontal', label: t('_.builtIn.element.divider.direction_horizontal') },
            { value: 'vertical', label: t('_.builtIn.element.divider.direction_vertical') }
          ],
          t('_.builtIn.element.divider.direction')
        ),
        uiUtil.createSelect(t('_.builtIn.element.divider.borderStyle'), [
          'none',
          'dotted',
          'dashed',
          'solid',
          'double',
          'groove',
          'ridge',
          'inset',
          'outset'
        ]),
        uiUtil.createSelect(
          'content-position',
          [
            { value: 'left', label: t('_.builtIn.element.divider.contentPosition_left') },
            { value: 'right', label: t('_.builtIn.element.divider.contentPosition_right') },
            { value: 'center', label: t('_.builtIn.element.divider.contentPosition_center') }
          ],
          t('_.builtIn.element.divider.contentPosition')
        )
      ],
      init: {
        direction: 'horizontal',
        'border-style': 'solid',
        'content-position': 'center'
      }
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
export default dividerConfig
