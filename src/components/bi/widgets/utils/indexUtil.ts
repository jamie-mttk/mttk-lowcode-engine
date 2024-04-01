import { computed } from 'vue'
import DataModelHolder from '../../components/DataModelHolder.vue'
import DataModelFieldDrop from '../../components/DataModelFieldDrop.vue'

import { displayInit } from '../../utils/biTool'
import { filterIndexOptions } from '../filter/index'
import { lcFormItem, widgetUtil } from 'mttk-lowcode-engine'

export function buildModelFull(initConfig = {}, rawConfig = [] as any[]) {
  return {
    name: '数据模型',
    sequence: 1,
    init: initConfig,
    ui: buildModel(rawConfig)
  }
}

export function buildModel(rawConfig) {
  return function ({ config, context, key, fullConfig }) {
    const result = {
      '~': DataModelHolder,
      '~modelValue': fullConfig,

      '#': []
    }
    //
    parse()

    //
    return result

    function parse() {
      for (const raw of rawConfig || []) {
        if (typeof raw == 'string') {
          //String means it it a sort/filter/dimension/metric/drilling/refresh,otherwise raise exception
          const r = parseString(raw)
          if (Array.isArray(r)) {
            for (const item of r) {
              result['#'].push(item)
            }
          } else {
            result['#'].push(r)
          }
        } else if (typeof raw == 'object') {
          //
          const r = parseObject(raw)
          if (Array.isArray(r)) {
            for (const item of r) {
              result['#'].push(item)
            }
          } else {
            result['#'].push(r)
          }
        } else if (typeof raw == 'function') {
          result['#'].push(raw({ config, context, key, fullConfig }))
        } else {
          result['#'].push(raw)
        }
      }
    }
    function parseString(raw: string = '') {
      //
      if (raw == 'filter') {
        const result = {
          '~': lcFormItem,
          '~modelValue': config,
          config: {
            '~component': DataModelFieldDrop,
            '~modelValue': config,
            '~label': '过滤',
            '~description': '针对本图表设置过滤条件',
            '~hideSwitchButton': true,
            prop: raw,
            ...filterIndexOptions
          }
        }
        //Set mode to true so the edit dialog UI will be a little different between filter in model and it is a pure filter
        result.config.option.mode=true
        //
        return result
      } else if (raw.startsWith('dimension')) {
        return {
          '~': lcFormItem,
          '~modelValue': config,
          config: {
            '~component': DataModelFieldDrop,
            '~modelValue': config,
            '~label': '维度' + raw.substring(raw.length),
            '~description': '维度一般显示在x轴,当存在度量后台计算时会自动分组',
            '~hideSwitchButton': true,
            prop: raw,
            option: { maxRow: 1 }
          }
        }
      } else if (raw.startsWith('metric')) {
        //
        // return {
        //   '~': 'el-form-item',
        //   label: '度量',
        //   prop: raw,
        //   '#': {
        //     '~': DataModelFieldDrop,
        //     '~modelValue': config,
        //     prop: raw,
        //     option: {}
        //     // checkDrop: checkAllowDropMetric
        //   }
        // }
        return {
          '~': lcFormItem,
          '~modelValue': config,
          config: {
            '~component': DataModelFieldDrop,
            '~modelValue': config,
            '~label': '度量' + raw.substring(raw.length),
            '~description': '度量一般显示在y轴,往往需要在界面上设置聚合方式',
            '~hideSwitchButton': true,
            prop: raw,
            option: {}
          }
        }
      } else if (raw.startsWith('drilling')) {
        //
        // return {
        //   '~': 'el-form-item',
        //   label: '钻取',
        //   prop: raw,
        //   '#': {
        //     '~': DataModelFieldDrop,
        //     '~modelValue': config,
        //     prop: raw,
        //     option: { maxRow: 10 }
        //   }
        // }
        return {
          '~': lcFormItem,
          '~modelValue': config,
          config: {
            '~component': DataModelFieldDrop,
            '~modelValue': config,
            '~label': '钻取' + raw.substring(raw.length),
            '~description': '钻取顺序需要从上到下设置,而且第一项与钻取的维度完全相同',
            '~hideSwitchButton': true,
            prop: raw,
            option: { maxRow: 10 }
          }
        }
      } else if (raw.startsWith('rowLimit')) {
        //
        // return {
        //   '~': 'el-form-item',
        //   label: '返回行数~空/负数代表不限',
        //   prop: raw,
        //   '#': {
        //     '~': 'el-input-number',
        //     '~modelValue': computed({
        //       get: () => config[raw],
        //       set: (val) => {
        //         config[raw] = val
        //       }
        //     }),
        //     controls: false
        //   }
        // }

        return {
          '~': lcFormItem,
          '~modelValue': config,
          config: {
            '~component': 'el-input-number',
            '~prop': raw,
            '~label': '返回行数',
            '~description': '空/负数代表不限',
            '~hideSwitchButton': true,
            controls: false
          }
        }
      } else if ('pagination' == raw) {
        //
        return [
          {
            '~': 'el-form-item',
            label: '分页方式',
            prop: 'pagination_mode',
            '#': {
              '~': 'el-select',
              '~modelValue': computed({
                get: () => config.pagination?.mode || 'NONE',
                set: (val) => {
                  if (!config.pagination) {
                    config.pagination = {}
                  }
                  config.pagination.mode = val
                }
              }),
              '#': [
                { '~': 'el-option', value: 'NONE', label: '不分页' },
                { '~': 'el-option', value: 'CLIENT', label: '客户端分页' },
                { '~': 'el-option', value: 'SERVER', label: '服务器端分页' }
              ]
            }
          },
          {
            '~': 'el-form-item',
            label: '每页行数',
            prop: 'pagination_size',
            controls: false,
            '#': {
              '~': 'el-input-number',
              '~modelValue': computed({
                get: () => config.pagination?.size || 10,
                set: (val) => {
                  if (!config.pagination) {
                    config.pagination = {}
                  }
                  config.pagination.size = val
                }
              })
            }
          }
        ]
      } else if (raw.startsWith('interval')) {
        return [
          {
            '~': 'el-form-item',
            label: '自动刷新(再次进入生效)',
            prop: 'interval',
            '#': [
              {
                '~': 'div',
                style: { display: 'flex', 'justify-content': 'space-between' },
                '#': [
                  {
                    '~': 'el-switch',

                    //Use string as value because it is easy to change this controller to select to support CRON later
                    'active-value': 'simple',
                    'inactive-value': 'none',
                    size: 'small',
                    min: 1,
                    '~modelValue': computed({
                      get: () => config.interval?.mode || 'none',
                      set: (val) => {
                        if (!config.interval) {
                          config.interval = {}
                        }
                        config.interval.mode = val
                      }
                    })
                  },
                  {
                    '~': 'el-input-number',
                    '~show': computed(() => config.interval?.mode == 'simple'),
                    controls: false,
                    style: { padding: ' 0px 4px' },
                    size: 'small',
                    '~modelValue': computed({
                      get: () => config.interval?.value || 10,
                      set: (val) => {
                        if (!config.interval) {
                          config.interval = {}
                        }
                        config.interval.value = val
                      }
                    })
                  },
                  {
                    '~': 'el-select',
                    '~show': computed(() => config.interval?.mode == 'simple'),
                    size: 'small',
                    '~modelValue': computed({
                      get: () => config.interval?.unit || 'SECOND',
                      set: (val) => {
                        if (!config.interval) {
                          config.interval = {}
                        }
                        config.interval.unit = val
                      }
                    }),
                    '#': [
                      { '~': 'el-option', value: 'SECOND', label: '秒' },
                      { '~': 'el-option', value: 'MINUTE', label: '分' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      } else if (raw.startsWith('refresh')) {
        //
        return {
          '~': 'el-button',
          type: 'primary',
          '#': '刷新图表',
          // Set margin-eft is beacause element will auto add 12px if there is a button before
          style: { width: '100%', 'margin-left': '0px', 'margin-top': '10px' },
          '@click': function () {
            context.mitt.emit('bi-chart-reload-' + key, { reset: true, showError: true })
          }
        }
      } else if (raw.startsWith('showSQL')) {
        //
        return {
          '~': 'el-button',
          type: '',
          '#': '查看SQL',
          style: { width: '100%', 'margin-left': '0px', 'margin-top': '4px' },
          '@click': function () {
            context.mitt.emit('bi-chart-action-' + key, { action: 'showSQL' })
          }
        }
      } else if (raw.startsWith('showData')) {
        //
        return {
          '~': 'el-button',
          type: '',
          '#': '查看数据',
          style: { width: '100%', 'margin-left': '0px', 'margin-top': '4px' },
          '@click': function () {
            context.mitt.emit('bi-chart-action-' + key, { action: 'showData' })
          }
        }
      } else {
        //DO nOT THROW ERROR
        console.log('Unspoported config:' + raw)
      }
    }
    //
    function parseObject(raw: any = {}) {
      //
      const type = raw['_type']
      if (!type) {
        //no _type attribute, assume it is an normal configuration,return directly
        return raw
      }
      //
      if (type == 'sort') {
        //TBD,not implement yet
      } else if (type == 'filter') {
        //TBD,not implement yet
      } else if (type == 'dimension') {
        //
        // return {
        //   '~': 'el-form-item',
        //   label: raw.label || '维度',
        //   prop: raw.prop || 'dimension',
        //   '#': {
        //     '~': DataModelFieldDrop,
        //     '~modelValue': config,
        //     prop: raw.prop || 'dimension',
        //     checkDrop: raw.checkDrop || undefined,
        //     option: raw.option || { maxRow: 1 }
        //   }
        // }
        return {
          '~': lcFormItem,
          '~modelValue': config,
          config: {
            '~component': DataModelFieldDrop,
            '~label': raw.label || '维度',
            '~description': raw.description || '维度一般显示在x轴,当存在度量后台计算时会自动分组',
            '~hideSwitchButton': true,
            prop: raw.prop || 'dimension',
            checkDrop: raw.checkDrop || undefined,
            option: raw.option || { maxRow: 1 }
          }
        }
      } else if (type == 'metric') {
        //
        // return {
        //   '~': 'el-form-item',
        //   label: raw.label || '度量',
        //   prop: raw.prop || 'metric',
        //   '#': {
        //     '~': DataModelFieldDrop,
        //     '~modelValue': config,
        //     prop: raw.prop || 'metric',
        //     checkDrop: raw.checkDrop || undefined,
        //     option: raw.option || {}
        //   }
        // }
        return {
          '~': lcFormItem,
          '~modelValue': config,
          config: {
            '~component': DataModelFieldDrop,

            '~label': raw.label || '度量',
            '~description': raw.description || '度量一般显示在y轴,往往需要在界面上设置聚合方式',
            '~hideSwitchButton': true,
            prop: raw.prop || 'metric',
            checkDrop: raw.checkDrop || undefined,
            option: raw.option || {}
          }
        }
      } else if (type == 'drilling') {
        //
        // return {
        //   '~': 'el-form-item',
        //   label: raw.label || '钻取',
        //   prop: raw.prop || 'drilling',
        //   checkDrop: raw.checkDrop || undefined,
        //   '#': {
        //     '~': DataModelFieldDrop,
        //     '~modelValue': config,
        //     prop: raw.prop || 'drilling',
        //     option: raw.option || { maxRow: 10 }
        //   }
        // }
        return {
          '~': lcFormItem,
          '~modelValue': config,
          config: {
            '~component': DataModelFieldDrop,

            '~label': raw.label || '钻取',
            '~description':
              raw.description || '钻取顺序需要从上到下设置,而且第一项与钻取的维度完全相同',
            '~hideSwitchButton': true,
            prop: raw.prop || 'drilling',
            checkDrop: raw.checkDrop || undefined,
            option: raw.option || { maxRow: 10 }
          }
        }
      } else if (type == 'normal') {
        //  normal item

        return {
          '~': lcFormItem,
          '~modelValue': config,
          config: {
            '~label': raw.label || '',
            '~prop': raw.prop,
            ...(raw.item || { '~': 'el-input' })
          }
        }
      }
    }
  }
}

export function buildOtherProp({ initDisplay = true, initStyle = {} } = {}) {
  return {
    data: {
      type: 'Object',
      hide: true,
      skip: true,
      init: function ({ key }) {
        return {
          mode: 'data',
          dataKey: 'data_bi_charts_' + key
        }
      }
    },
    event: false,
    display: {
      hide: false,
      init: initDisplay ? displayInit({ initStyle }) : {}
    }
  }
}

export function buildEchartsBaseUI() {
  return [
    widgetUtil.createBase('lc-theme-select', 'echarts-theme', 'Echarts主题'),
    widgetUtil.createInput('title-text', '标题'),
    widgetUtil.createInput('title-subtext', '副标题')
  ]
}
