import { echartsSimpleTransform } from './transform'
import { computed, unref } from 'vue'
//button config
 const echartsSimpleConfig = {
  key: '_echartsSimple',
  name: 'Echarts simple',
  description: '',
  icon: 'mdiChartBar',
  sequence: 2,
  transform: echartsSimpleTransform,
  editor: {
    basic: {
      init: { 'series-type': 'bar' },
      ui: function ({config}) {
        return [
          // {
          //   '~component': 'el-input',
          //   '~label': 'Width',
          //   '~prop': 'wdith',
          //   '~default': '640px',
          //   clearable: true
          // },
          // {
          //   '~component': 'el-input',
          //   '~label': 'Height',
          //   '~prop': 'height',
          //   '~default': '480px',
          //   clearable: true
          // },
          {
            '~component': 'el-select',
            '~label': 'Series type',
            '~prop': 'series-type',
            '~default': 'pie',
            clearable: true,
            '~options': ['line', 'bar', 'pie']
          },
          {
            '~component': 'el-input',
            '~label': 'Title text',
            '~prop': 'title-text'
          },
          {
            '~component': 'el-input',
            '~label': 'Title subtext',
            '~prop': 'title-subtext'
          },
          //line
          {
            '~component': 'el-switch',
            '~label': 'Series smooth',
            '~prop': 'series-smooth',
            '~show': computed(() => unref(config)['series-type'] == 'line')
          },
          //pie
          {
            '~component': 'el-select',
            '~label': 'Pie rose type',
            '~prop': 'series-roseType',
            clearable: true,
            '~options': ['radius', 'area'],
            '~show': computed(() => unref(config)['series-type'] == 'pie')
          },
          {
            '~component': 'el-input',
            '~label': 'Pie radius',
            '~prop': 'series-radius',
            clearable: true,
            '~show': computed(() => unref(config)['series-type'] == 'pie')
          },
          {
            '~component': 'el-input',
            '~label': 'Dimensions',
            '~prop': 'dimensions'
          },
          {
            '~component': 'el-input',
            '~label': 'Other option',
            '~prop': 'optionOther',
            type: 'textarea',
            rows: 4
          }
        ]
      }
    },
    data: {
      //readonly:true,
      type: 'Array',
      init: {
        mode: 'fixed',
        dataContent: `[
        ["product", "2015", "2016", "2017"],
        ["Milk", 43.3, 85.8, 93.7],
        ["Computer", 83.1, 73.4, 55.1],
        ["TV", 86.4, 65.2, 82.5],
        ["Mobie", 72.4, 53.9, 39.1]
      ]`
      }
    },
    display: {
      init: { style: { width: '100%', height: '480px' } }
    }
  }
}

//
export default echartsSimpleConfig