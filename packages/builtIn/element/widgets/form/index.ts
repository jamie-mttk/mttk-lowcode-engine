import { computed, unref, isRef } from 'vue'
import { elementFormTransform } from './transform'
import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import { createUniqueString } from '@/utils/tools'
import { t } from '@/lang/index'
//table config
const formConfig = {
  key: '_form',
  name: t('_.builtIn.element.form.name'),
  description: '',
  icon: 'mdiFormatColumns',
  sequence: 13,
  transform: elementFormTransform,
  editor: {
    basic: {
      ui: [
        uiUtil.createSwitch('inline', t('_.builtIn.element.form.inline')),
        uiUtil.createSelect(
          'label-position',
          [
            { value: 'left', label: t('_.builtIn.element.form.labelPosition_left') },
            { value: 'right', label: t('_.builtIn.element.form.labelPosition_right') },
            { value: 'top', label: t('_.builtIn.element.form.labelPosition_top') }
          ],
          t('_.builtIn.element.form.labelPosition')
        ),
        uiUtil.createInput('label-width',t('_.builtIn.element.form.labelWidth')),
        {
          '~component': 'lc-editable-list',
          '~label': t('_.builtIn.element.form.items'),
          '~prop': '_container',
          init: { '~controllerType': 'input',_type:'text' },
          labelColumn: 'label',
          editConfig: function (d) {
            return [
              uiUtil.createInput('label',t('_.builtIn.element.form.items_label')),
              uiUtil.createInput('prop',t('_.builtIn.element.form.items_prop')),
              uiUtil.createSwitch('required',t('_.builtIn.element.form.items_required')),
              uiUtil.createSelect('~controllerType', [
                'input',
                'input-number',
                'select',
                'switch',
                'container'
              ],t('_.builtIn.element.form.items_controllerType'),{clearable:false}),
              uiUtil.createSelect('_type', ['text', 'textarea'], undefined, {
                '~show': computed(() => unref(d)['~controllerType'] == 'input')
              },t('_.builtIn.element.form.items_type')),
              uiUtil.createSwitch('_controls',t('_.builtIn.element.form.items_controls'), {
                '~show': computed(() => unref(d)['~controllerType'] == 'input-number'),
                '~default': true
              }),
              uiUtil.createInput('_placeholder',t('_.builtIn.element.form.items_placeholder'), {
                '~show': computed(() => unref(d)['~controllerType'] == 'input'||unref(d)['~controllerType'] == 'input-number'||unref(d)['~controllerType'] == 'select')
              }),
              uiUtil.createSwitch('_clearable',t('_.builtIn.element.form.items_clearable'), {
                '~show': computed(() => unref(d)['~controllerType'] == 'input'||unref(d)['~controllerType'] == 'input-number'||unref(d)['~controllerType'] == 'select')
              }),
              uiUtil.createInput('_active-text' ,t('_.builtIn.element.form.items_active-text'), {
                '~show': computed(() => unref(d)['~controllerType'] == 'switch')
              }),
              uiUtil.createInput('_inactive-text',t('_.builtIn.element.form.items_inactive-text'), {
                '~show': computed(() => unref(d)['~controllerType'] == 'switch')
              }),
              uiUtil.createInput('~options',t('_.builtIn.element.form.items_options'), {
                '~show': computed(() => unref(d)['~controllerType'] == 'select'),
                '~description':t('_.builtIn.element.form.items_options_description')
              })
            ]
          }
        }
      ],
      init: {
        inline: false,
        'label-position': 'top',
        'label-width': '50px',
        _container: [
          { label: 'Name', prop: 'name', type: 'input', key: createUniqueString() },
          { label: 'Address', prop: 'address', type: 'input', key: createUniqueString() }
        ]
      }
    },
    data: {
      modelValueName: 'model',
      //readonly:true,
      type: 'Object',

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
export default formConfig
