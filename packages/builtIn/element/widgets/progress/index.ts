import { computed, unref } from 'vue'
import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import { buildWidgetFunc } from '@/context/globalContext/componentRepository/util/transformUtil'
import { t } from '@/lang/index'
//progress config
const progressConfig = {
  key: '_progress',
  name: t('_.builtIn.element.progress.name'),
  description: '',
  icon: 'mdiBeakerOutline',
  sequence: 43,
  transform: buildWidgetFunc('el-progress', {}, (result, { data }) => {
    // console.log('PROGRESS!',data.value,result)
    //value is set to percentage
    result.percentage = data
    //If color is null, it will cause progress to load fail if type=line
    //So we do not generate this property
    //color=null if caused by clearing the color picker
    if (result.color == null) {
      delete result.color
    }
  }),
  editor: {
    basic: {
      ui: function ({ config }) {
        return [
          uiUtil.createSelect(
            'type',
            [
              { value: 'line', label: t('_.builtIn.element.progress.type_line') },
              { value: 'circle', label: t('_.builtIn.element.progress.type_circle') },
              { value: 'dashboard', label: t('_.builtIn.element.progress.type_dashboard') }
            ],
            t('_.builtIn.element.progress.type')
          ),
          uiUtil.createInputNumber('stroke-width', t('_.builtIn.element.progress.stroke-width')),
          uiUtil.createSwitch('text-inside', t('_.builtIn.element.progress.text-inside'), {
            '~show': computed(() => unref(config).type == 'line')
          }),
          uiUtil.createSelect(
            'status',
            [
              { value: 'success', label: t('_.builtIn.element.progress.status_success') },
              { value: 'exception', label: t('_.builtIn.element.progress.status_exception') },
              { value: 'warning', label: t('_.builtIn.element.progress.status_warning') }
            ],
            t('_.builtIn.element.progress.status')
          ),
          uiUtil.createSwitch('indeterminate', t('_.builtIn.element.progress.indeterminate')),
          uiUtil.createInputNumber('duration', t('_.builtIn.element.progress.duration')),
          uiUtil.createColorPicker('color', t('_.builtIn.element.progress.color')),
          uiUtil.createInputNumber('width', t('_.builtIn.element.progress.width'), {
            '~show': computed(
              () => unref(config).type == 'circle' || unref(config).type == 'dashboard'
            )
          }),
          uiUtil.createSwitch('show-text', t('_.builtIn.element.progress.show-text')),
          uiUtil.createSelect(
            'stroke-linecap',
            [
              { value: 'butt', label: t('_.builtIn.element.progress.stroke-linecap_butt') },
              { value: 'round', label: t('_.builtIn.element.progress.stroke-linecap_round') },
              { value: 'square', label: t('_.builtIn.element.progress.stroke-linecap_square') }
            ],
            t('_.builtIn.element.progress.stroke-linecap'),
            {
              '~show': computed(
                () => unref(config).type == 'circle' || unref(config).type == 'dashboard'
              )
            }
          ),
          uiUtil.createSwitch('striped', t('_.builtIn.element.progress.striped'), {
            '~show': computed(() => unref(config).type == 'line')
          }),
          uiUtil.createSwitch('striped-flow', t('_.builtIn.element.progress.striped-flow'), {
            '~show': computed(() => unref(config).type == 'line')
          })
        ]
      },
      init: {
        type: 'circle',
        'stroke-width': 6,
        'text-inside': false,
        indeterminate: false,
        duration: 3,
        width: 126,
        'show-text': true,
        'stroke-linecap': 'round',
        striped: false,
        'striped-flow': false
      }
    },
    data: {
      //readonly:true,
      type: 'Number',
      init: {
        mode: 'fixed',
        dataContent: '65'
      }
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
export default progressConfig
