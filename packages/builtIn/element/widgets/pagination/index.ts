import { paginationTransform } from './transform'
import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import {t} from '@/lang/index'
//pagination config
const paginationConfig = {
  key: '_pagination',
  name: t('_.builtIn.element.pagination.name'),
  description: '',
  icon: 'mdiBookOpenPageVariantOutline',
  sequence: 41,
  transform: paginationTransform,
  editor: {
    basic: {
      ui: [
        uiUtil.createInput('layout',t('_.builtIn.element.pagination.layout')),
        uiUtil.createInputNumber('pager-count',t('_.builtIn.element.pagination.pager-count')),
        uiUtil.createSwitch('small',t('_.builtIn.element.pagination.small')),
        uiUtil.createSwitch('background',t('_.builtIn.element.pagination.background')),
        uiUtil.createInput('page-sizes',t('_.builtIn.element.pagination.page-size')),
        uiUtil.createInput('prev-text',t('_.builtIn.element.pagination.prev-text')),
        // uiUtil.createIconPicker('_prev-icon'),
        uiUtil.createInput('next-text',t('_.builtIn.element.pagination.next-text')),
        // uiUtil.createIconPicker('_next-icon'),
        uiUtil.createSwitch('disabled',t('_.builtIn.element.pagination.disabled')),
        uiUtil.createSwitch('hide-on-single-page',t('_.builtIn.element.pagination.hide-on-single-page')),
        uiUtil.createSwitch('_sync_to_data', t('_.builtIn.element.pagination.sync_to_data')),
        uiUtil.createInput('_key-current-page',t('_.builtIn.element.pagination.key-current-page')),
        uiUtil.createInput('_key-total', t('_.builtIn.element.pagination.key-total')),
        uiUtil.createInput('_key-page-count', t('_.builtIn.element.pagination.key-page-count')),
        uiUtil.createInput('_key-page-size', t('_.builtIn.element.pagination.key-page-size'))
      ],
      init: {
        layout: 'prev, pager, next, jumper, total',
        'pager-count': 7,
        small: false,
        background: false,
        'page-sizes': '[10, 20, 30, 40, 50, 100]',
        //'default-page-size':10,
        disabled: false,
        'hide-on-single-page': false,
        _sync_to_data: true,
        '_key-current-page': 'page',
        '_key-total': 'total',
        '_key-page-count':'page-count',
        '_key-page-size': 'size'
      }
    },
    data: {
      //readonly:true,
      type: 'Object'
    },
    event: {
      list:['size-change','current-change','prev-click','next-click'],
      init:[]
    },
    display: {
      init: {
        style: {
          margin: '6px 0'
        }
      }
    }
  }
}
//
export default paginationConfig
