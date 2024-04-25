import { computed, unref } from 'vue'

import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import { buildWidgetFunc } from '@/context/globalContext/componentRepository/util/transformUtil'
import { t } from '@/lang/index'
//input config
const inputConfig = {
  key: '_input',
  name: t('_.builtIn.element.input.name'),
  description: '',
  icon: 'mdiFormTextbox',
  sequence: 12,
  transform: buildWidgetFunc('el-input', {}, (result, { config }) => {
    handleIconIfHave(result, config, 'prefix')
    handleIconIfHave(result, config, 'suffix')
  }),
  editor: {
    basic: {
      init: { type: 'text', clearable: true, size: 'default' },
      ui: function ({ config }) {
        return [
          uiUtil.createSelect(
            'type',
            [
              'text',
              'textarea',
              'password',
              'button',
              'checkbox',
              'color',
              'date',
              'datetime-local',
              'email',
              'file',
              'hidden',
              'image',
              'month',
              'number',
              'radio',
              'range',
              'reset',
              'search',
              'submit',
              'tel',
              'time',
              'url',
              'week'
            ],
            t('_.builtIn.element.input.type')
          ),
          uiUtil.createInput('placeholder', t('_.builtIn.element.input.placeholder')),
          uiUtil.createSwitch('clearable', t('_.builtIn.element.input.clearable'), {
            '~show': computed(() => unref(config).type != 'textarea')
          }),
          uiUtil.createSwitch('disabled', t('_.builtIn.element.input.disabled')),
          uiUtil.createSelect(
            'size',
            [
              { value: 'large', label: t('_.builtIn.element.input.size_large') },
              { value: 'default', label: t('_.builtIn.element.input.size_default') },
              { value: 'small', label: t('_.builtIn.element.input.size_small') }
            ],
            t('_.builtIn.element.input.size')
          ),
          uiUtil.createInputNumber('minlength', t('_.builtIn.element.input.minlength')),
          uiUtil.createInputNumber('maxlength', t('_.builtIn.element.input.maxlength')),
          uiUtil.createSwitch('show-word-limit', t('_.builtIn.element.input.show-word-limit'), {
            '~show': computed(
              () => unref(config).type == 'textarea' || unref(config).type == 'text'
            )
          }),
          uiUtil.createInputNumber('rows', t('_.builtIn.element.input.rows'), {
            '~show': computed(() => unref(config).type == 'textarea')
          }),
          uiUtil.createSwitch('show-password', t('_.builtIn.element.input.show-password')),
          uiUtil.createIconPicker('_prefix-icon', t('_.builtIn.element.input.prefix-icon')),
          uiUtil.createIconPicker('_suffix-icon', t('_.builtIn.element.input.suffix-icon'))
        ]
      }
    },
    data: {
      type: 'String',
      init: {
        mode: 'fixed',
        dataContent: 'Fixed data'
      }
    },
    event: {
      list: ['input', 'change'],
      init: []
    },
    display: {
      init: {
        style: {
          margin: '6px 0'
        },
        class: ''
      }
    }
    // demo: {
    //   icon: 'mdiAccountBoxOutline',
    //   name: 'Demo',
    //   ui: [
    //     uiUtil.createSwitch('hello'),
    //     uiUtil.createSelect('world', ['American', 'China', 'Russia'])
    //   ],
    //   init: {
    //     hello: true,
    //     world: 'China'
    //   }
    // }
  }
}

//
//
function handleIconIfHave(result: object, config: any, slotName: string) {
  const icon = config['_' + slotName + '-icon']
  // console.log('@@@:'+slotName+'==>'+icon)
  if (!icon) {
    return
  }

  result['#' + slotName] = { '~component': 'lc-icon', icon: icon, size: '1.5em' }
}

//
export default inputConfig
