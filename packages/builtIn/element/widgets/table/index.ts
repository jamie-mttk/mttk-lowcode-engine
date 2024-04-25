import { computed, unref } from 'vue'
import { tableTransform } from './transform'
import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import { createUniqueString } from '@/utils/tools'
import { t } from '@/lang/index'

//table config
const tableConfig = {
  key: '_table',
  name: t('_.builtIn.element.table.name'),
  description: '',
  icon: 'mdiTable',
  sequence: 14,
  transform: tableTransform,
  editor: {
    basic: {
      ui: [
        uiUtil.createSwitch('stripe', t('_.builtIn.element.table.stripe')),
        uiUtil.createSwitch('border', t('_.builtIn.element.table.border')),
        uiUtil.createInput('empty-text', t('_.builtIn.element.table.empty-text')),
        {
          '~component': 'lc-editable-list',
          '~label': t('_.builtIn.element.table.columns'),
          '~prop': '_container',
          labelColumn: 'label',
          editConfig: function (d) {
            return [
              uiUtil.createInput('label', t('_.builtIn.element.table.columns_label')),
              uiUtil.createInput('prop', t('_.builtIn.element.table.columns_prop')),
              uiUtil.createInput('width', t('_.builtIn.element.table.columns_width')),
              uiUtil.createSelect(
                'align',
                [
                  { value: 'left', label: t('_.builtIn.element.table.columns_align_left') },
                  { value: 'center', label: t('_.builtIn.element.table.columns_align_center') },
                  { value: 'right', label: t('_.builtIn.element.table.columns_align_right') }
                ],
                t('_.builtIn.element.table.columns_align')
              ),
              uiUtil.createSelect(
                'type',
                [
                  {
                    value: 'selection',
                    label: t('_.builtIn.element.table.columns_type_selection')
                  },
                  { value: 'index', label: t('_.builtIn.element.table.columns_type_index') },
                  { value: 'container', label: t('_.builtIn.element.table.columns_type_container') }
                ],
                t('_.builtIn.element.table.columns_type')
              ),
              uiUtil.createSelect(
                '_formatter',
                '#method',
                t('_.builtIn.element.table.columns_formatter'),
                {
                  '~show': computed(() => !unref(d)['type']),
                  '~description': t('_.builtIn.element.table.columns_formatter_description')
                }
              )
            ]
          }
        }
      ],
      init: {
        border: true,
        'empty-text': 'No data is found!',
        _container: [
          {
            type: 'selection',
            key: createUniqueString()
          },
          {
            type: 'index',
            label: '#',
            key: createUniqueString()
          },
          {
            prop: 'date',
            label: 'Date',
            key: createUniqueString()
          },
          {
            prop: 'name',
            label: 'Name',
            key: createUniqueString()
          },
          {
            prop: 'address',
            label: 'Address',
            key: createUniqueString()
          }
        ]
      }
    },
    event: {
      list: ['row-click', 'row-dblclick', 'cell-click', 'cell-dblclick', 'select']
    },
    data: {
      modelValueName: 'data',
      //readonly:true,
      type: 'Array',
      init: {
        mode: 'fixed',
        dataContent:
          '[{"date":"2023-12-23","name":"Tom","address":"Who know it?"},\n{"date":"2023-01-02","name":"Jack","address":"May be in the city?"},\n{"date":"2021-11-12","name":"Alice","address":"In castle?"}\n]'
      }
    },
    display: {
      init: {
        style: {
          // display: 'block',
          // width: '100%',
          // margin: '4px 0 4px 0'
        }
      }
    }
  }
}
//
export default tableConfig
