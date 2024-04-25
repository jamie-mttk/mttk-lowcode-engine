import { layoutTransform } from './transform'
import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import { createUniqueString } from '@/utils/tools'
import { t } from '@/lang/index'
//
const layoutConfig = {
  key: '_layout',
  name: t('_.builtIn.element.layout.name'),
  description: t('_.builtIn.element.layout.description'),
  icon: 'mdiViewGridOutline',
  sequence: 1,
  transform: layoutTransform,
  editor: {
    basic: {
      ui: [
        uiUtil.createInputNumber('gutter', t('_.builtIn.element.layout.gutter')),
        uiUtil.createSelect(
          'justify',
          ['start', 'end', 'center', 'space-around', 'space-between', 'space-evenly'],
          t('_.builtIn.element.layout.justify')
        ),
        uiUtil.createSelect(
          'align',
          [
            {value:'top',label:t('_.builtIn.element.layout.align_top')}, 
            {value:'middle',label:t('_.builtIn.element.layout.align_middle')},
            {value:'bottom',label:t('_.builtIn.element.layout.align_bottom')}
          ],
          t('_.builtIn.element.layout.align')
        ),
        {
          '~component': 'lc-editable-list',
          '~label': t('_.builtIn.element.layout.cols'),
          '~prop': '_container',
          init: { span: 24 },
          labelColumn: 'span',
          editConfig: [
            uiUtil.createInputNumber('span', t('_.builtIn.element.layout.cols_span')),
            uiUtil.createInputNumber('offset', t('_.builtIn.element.layout.cols_offset')),
            uiUtil.createInputNumber('push', t('_.builtIn.element.layout.cols_push')),
            uiUtil.createInputNumber('pull', t('_.builtIn.element.layout.cols_pull'))
          ]
        }
      ],
      init: {
        gutter: 0,
        justify: 'start',
        align: 'top',
        _container: [
          { span: 12, offset: 0, push: 0, pull: 0, key: createUniqueString() },
          { span: 12, offset: 0, push: 0, pull: 0, key: createUniqueString() },
          { span: 24, offset: 0, push: 0, pull: 0, key: createUniqueString() }
        ]
      }
    },
    display: {
      init: {
        style: {
          width: '100%'
        },
        class: ''
      }
    }
  }
}
//
export default layoutConfig
