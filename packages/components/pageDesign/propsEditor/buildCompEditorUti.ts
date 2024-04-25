//move some util functions from buildCompEditor.ts to make it smaller

import { reactive, computed,ref } from 'vue'

import { formTransform } from './formTransform'
import StyleEditor from './styleEditor.vue'
import MyInput from './components/MyInput.vue'
import { setByPath } from '@/utils/pathUtil'
import {t} from '@/lang/index'

  // <div style="margin-bottom:8px">Classes:</div>
  // 	<MyInput v-model="configClasses"></MyInput>
  // 	<div style="margin:12px 0 4px 0">Styles:</div>
  // 	<StyleEditor v-model="configStyles" />
  function buildTabDisplay(editingComp) {
    //Should set default value first,otherwise configStyle does no work as expected
    if (!editingComp?.config?.display?.style) {
      setByPath(editingComp, 'config.display.style', {}, true)
    }
    //
    const configStyle = computed({
      get: () => {
        // console.log('111111',editingComp?.config?.display?.style ,editingComp)
        return editingComp?.config?.display?.style
      },
      set: (val) => {
        // console.log('222222',val)
        setByPath(editingComp, 'config.display.style', val, true)
      }
    })
    //
    const configClass = computed({
      get: () => {
        return editingComp?.config?.display?.class || ''
      },
      set: (val) => {
        if (!editingComp) {
          return
        }
        if (!editingComp.config) {
          editingComp.config = {}
        }
        if (!editingComp.config.display) {
          editingComp.config.display = {}
        }
        //
        editingComp.config.display.class = val
      }
    })
    //
    const config = []
    //
    // console.log(configClass.value,configStyle.value)
    //
    config.push({
      '~': 'div',
      style: { 'margin-bottom': '8px' },
      '#': t('_.components.pageDesign.propsEditor.buildCompEditorUtil.classLabel')
    })
    //
    config.push({ '~': MyInput, '~modelValue': configClass })
    //
    config.push({ '~': 'div', style: { margin: '12px 0 4px 0' }, '#': t('_.components.pageDesign.propsEditor.buildCompEditorUtil.styleLabel') })
    //
    config.push({ '~': StyleEditor, '~modelValue': configStyle })

    //
    return config
  }

//If not choosed, show page properties
export function pageProps(context) {
  const pageConfig = function (data) {
    // console.log(data.value)   
    if(!data.value.settingAbsolute){
      data.value.settingAbsolute={}
    } 
    return [
      {
        '~component': 'el-input',
        '~label': t('_._.name'),
        '~prop': 'name',
        clearable: true
      },
      {
        '~component': 'el-input',
        '~label': t('_._.description'),
        '~prop': 'description',
        clearable: true
      },
      {
        '~component': 'el-radio-group',
        '~label': t('_.components.pageDesign.propsEditor.buildCompEditorUtil.pageProps.renderMode'),
        '~prop': 'renderMode',
        '~options': {
          value: [
            { value: 'flex', label: t('_.components.pageDesign.propsEditor.buildCompEditorUtil.pageProps.renderMode_flex') },
            { value: 'absolute', label: t('_.components.pageDesign.propsEditor.buildCompEditorUtil.pageProps.renderMode_absolute') }
          ]
        }
      },
      {
        '~label': t('_.components.pageDesign.propsEditor.buildCompEditorUtil.pageProps.wh'),
        '~hideSwitchButton': true,
        '~component': 'div',
        '~show': computed(() => data.value.renderMode == 'absolute'),
        style: { display: 'flex', 'justify-content': 'space-between' },
        '#': [
          {
            '~': 'el-input-number',
            '~modelValue': computed({
              get() {
                return data.value.settingAbsolute.width || 1920
              },
              set(newValue) {
                data.value.settingAbsolute.width = newValue
              }
            }),
            controls: false,
            precision: 0
          },
          {
            '~': 'div',
            style: { margin: '0 6px' },
            '#': '*'
          },
          {
            '~': 'el-input-number',
            '~modelValue': computed({
              get() {
                return data.value.settingAbsolute.height || 1920
              },
              set(newValue) {
                data.value.settingAbsolute.height = newValue
              }
            }),
            controls: false,
            precision: 0
          }
        ]
      },

      {
        '~label': t('_.components.pageDesign.propsEditor.buildCompEditorUtil.pageProps.grid'),
        '~component': 'div',
        '~show': computed(() => data.value.renderMode == 'absolute'),
        '~hideSwitchButton': true,
        style: { display: 'flex', 'justify-content': 'space-between', width: '100%' },
        '#': [
          {
            '~component': 'el-select',
            style: { 'flex-basis': '50%' },
            '~modelValue': computed({
              get() {
                return data.value.settingAbsolute.showGrid
              },
              set(newValue) {
                data.value.settingAbsolute.showGrid = newValue
              }
            }),
            '#': [
              { '~': 'el-option', value: 'hide', label: t('_.components.pageDesign.propsEditor.buildCompEditorUtil.pageProps.grid_hide') },
              { '~': 'el-option', value: 'showInDesigner', label: t('_.components.pageDesign.propsEditor.buildCompEditorUtil.pageProps.grid_showInDesigner') },
              { '~': 'el-option', value: 'show', label:t('_.components.pageDesign.propsEditor.buildCompEditorUtil.pageProps.grid_show') }
            ]
          },
          {
            '~': 'div',
            style: { margin: '0 6px' },
            '#': ''
          },
          {
            '~component': 'el-switch',
            '~show': computed(() => data.value.showGrid != 'hide'),
            style: { 'flex-basis': '50%' },
            '~modelValue': computed({
              get() {
                return data.value.settingAbsolute.alignToGrid
              },
              set(newValue) {
                data.value.settingAbsolute.alignToGrid = newValue
              }
            }),
            '~prop': 'alignToGrid'
          }
        ]
      },

      {
        '~component': 'el-input-number',
        '~show': computed(
          () => data.value.renderMode == 'absolute' && data.value.showGrid != 'hide'
        ),
        '~label': t('_.components.pageDesign.propsEditor.buildCompEditorUtil.pageProps.gridWidth'),
        '~prop': 'settingAbsolute.gridWidth',
        clearable: true
      },
      //Test <el-slider v-model="value1" />
      {
        '~component': 'el-slider',
        '~show': computed(() => data.value.renderMode == 'absolute'),
        '~label': t('_.components.pageDesign.propsEditor.buildCompEditorUtil.pageProps.zoomEdit'),
        '~prop': 'settingAbsolute.zoom',
        style: { margin: '0px 12px' }
      },
      {
        '~component': 'el-select',
        '~show': computed(() => data.value.renderMode == 'absolute'),
        '~label': t('_.components.pageDesign.propsEditor.buildCompEditorUtil.pageProps.zoomView'),
        '~prop': 'settingAbsolute.zoomMode',

        '#': [
          { '~': 'el-option', value: 'none', label: t('_.components.pageDesign.propsEditor.buildCompEditorUtil.pageProps.zoomView_none') },
          { '~': 'el-option', value: 'zoom-both', label:t('_.components.pageDesign.propsEditor.buildCompEditorUtil.pageProps.zoomView_zoom-both') },
          { '~': 'el-option', value: 'zoom-width', label:t('_.components.pageDesign.propsEditor.buildCompEditorUtil.pageProps.zoomView_zoom-width')},
          { '~': 'el-option', value: 'zoom-height', label: t('_.components.pageDesign.propsEditor.buildCompEditorUtil.pageProps.zoomView_zoom-height') }
        ]
      },
    ]
  }
  //

  const basicForm= formTransform(
    pageConfig,
    computed(() => context.codeManager.getCode()),
    context
  )
  //
  const tabSel=ref('basic')
  return {'~':'el-tabs','~modelValue':tabSel,'#':[
     buildTabPanel('basic', t('_.components.pageDesign.propsEditor.buildCompEditorUtil.basic'), basicForm),
     buildTabPanel('display', t('_.components.pageDesign.propsEditor.buildCompEditorUtil.display'), buildTabDisplay(context.codeManager.getCode().ui[0])),
     

  ]}
}

//
//Return config of prompt message
export function promptMsg(msg: string) {
  return {
    '~component': 'el-empty',
    description: msg
  }
}

//
export function buildInternal(choosed, context, componentConfig, compEditor, tabIndex) {
  //1.0 Find and sort all(standard and customized) the tab panels
  const tabs = findTabs(componentConfig)
  //2.0 set proper tabIndex value
  setProperTabIndex(tabIndex, tabs)
  //3.0 build tabs and tabPanel one by one
  compEditor.value = buildTabConfig(choosed, context, componentConfig, tabIndex, tabs)
  //4.0 done
}

//Find and sort all the tabs of the editor
//cc-componentConfig
function findTabs(cc) {
  //
  // console.log(JSON.stringify(cc,null,2))
  const tabs = []
  //Standard tabs
  //basic
  if (cc.editor.basic && cc.editor.basic.ui) {
    tabs.push({ sequence: cc.editor.basic.sequence || 10, key: 'basic' })
  }
  //data
  if (cc.editor.data && cc.editor.data.type && !cc.editor.data.hide) {
    tabs.push({ sequence: cc.editor.data.sequence || 20, key: 'data' })
  }
  //event
  if (!(cc.editor?.event == false)) {
    tabs.push({ sequence: cc.editor?.event?.sequence || 30, key: 'event' })
  }
  //display
  if (cc.editor.display && !cc.editor.display.hide) {
    tabs.push({ sequence: cc.editor?.display?.sequence || 40, key: 'display' })
  }
  //customized
  for (const k of Object.keys(cc.editor)) {
    if (k == 'basic' || k == 'data' || k == 'event' || k == 'display') {
      continue
    }
    //
    tabs.push({ sequence: cc.editor[k].sequence || 100, key: k })
  }

  //
  return tabs.sort((item1, item2) => item1.sequence - item2.sequence)
}

//Set proper value of tabIndex
//If there are keys of the current tab index,do not change tabIndex  value;
//Otherwise change tabIndex to the first key of the tabs
function setProperTabIndex(tabIndex, tabs) {
  //
  if (tabs.length <= 0) {
    return
  }
  //Is current tabIndex value existed in tabs
  //If yes, return directly
  for (const t of tabs) {
    if (t.key == tabIndex.value) {
      return
    }
  }
  //
  tabIndex.value = tabs[0].key
}

function buildTabConfig(choosed, context, componentConfig, tabIndex, tabs) {
  //all data list
  const dataList = computed(() =>
    context.codeManager.getCode().data.map((item: Object) => {
      return { value: item.key, label: item.description }
    })
  )

  //Computed list
  const computedList = computed(() =>
    context.codeManager.getCode().computed.map((item: Object) => {
      return { value: item.key, label: item.description }
    })
  )
  //API list
  const apiList = computed(() =>
    context.codeManager.getCode().apis.map((item: Object) => {
      return { value: item.key, label: item.description }
    })
  )
  //Method list
  const methodList = computed(() =>
    context.codeManager.getCode().methods.map((item: Object) => {
      return { value: item.key, label: item.description }
    })
  )

  //
  const config = {
    '~': 'el-tabs',
    '~modelValue': tabIndex,
    '#': []
  }
  //
  for (const tab of tabs) {
    config['#'].push(buildTabSingle(tab.key))
  }
  //
  // console.log(config)
  //
  return config
  //
  function buildTabSingle(key) {
    if (key == 'basic') {
      return buildTabPanel('basic', t('_.components.pageDesign.propsEditor.buildCompEditorUtil.basic'), buildTabBasic())
    } else if (key == 'data') {
      return buildTabPanel('data', t('_.components.pageDesign.propsEditor.buildCompEditorUtil.data'), buildTabData())
    } else if (key == 'event') {
      return buildTabPanel('event', t('_.components.pageDesign.propsEditor.buildCompEditorUtil.event'), buildTabEvent())
    } else if (key == 'display') {
      return buildTabPanel('display', t('_.components.pageDesign.propsEditor.buildCompEditorUtil.display'), buildTabDisplay(choosed))
    } else {
      return buildTabPanel(
        key,
        componentConfig.editor[key].name,
        buildUI(key, componentConfig, choosed, context)
      )
    }
  }
  function buildTabBasic() {
    return buildUI('basic', componentConfig, choosed, context)
  }
  function buildTabData() {
    //Dynamically generate data config
    const config = [] as object[]
    const data = reactive(choosed.config?.data || {})
    config.push({
      '~component': 'el-select',
      '~label': t('_.components.pageDesign.propsEditor.buildCompEditorUtil.dataProps.mode'),
      '~prop': 'mode',
      clearable: true,
      '~options': [
        { value: 'data', label: t('_.components.pageDesign.propsEditor.buildCompEditorUtil.dataProps.mode_data') },
        { value: 'computed', label: t('_.components.pageDesign.propsEditor.buildCompEditorUtil.dataProps.mode_computed') },
        { value: 'method', label: t('_.components.pageDesign.propsEditor.buildCompEditorUtil.dataProps.mode_method') },
        { value: 'fixed', label: t('_.components.pageDesign.propsEditor.buildCompEditorUtil.dataProps.mode_fixed') }
        //{ code: 'expression', name: 'Expression' },//Not implemented so far
      ]
    })

    config.push({
      '~component': 'el-select',
      '~label': t('_.components.pageDesign.propsEditor.buildCompEditorUtil.dataProps.mode_data'),
      '~prop': 'dataKey',
      '~show': computed(() => data.mode == 'data'),
      clearable: true,
      //options is not a standard el-select prop,the transform will handle it
      '~options': dataList
    })
    //Sub part of data,optional
    config.push({
      '~component': 'el-input',
      '~label': t('_.components.pageDesign.propsEditor.buildCompEditorUtil.dataProps.dataPath'),
      '~prop': 'dataPath',
      '~show': computed(() => data.mode == 'data'),
      clearable: true
    })

    config.push({
      '~component': 'el-select',
      '~label': t('_.components.pageDesign.propsEditor.buildCompEditorUtil.dataProps.mode_computed'),
      '~prop': 'computedKey',
      '~show': computed(() => data.mode == 'computed'),
      clearable: true,
      //options is not a standard el-select prop,the transform will handle it
      '~options': computedList
    })

    config.push({
      '~component': 'el-select',
      '~label': t('_.components.pageDesign.propsEditor.buildCompEditorUtil.dataProps.mode_method'),
      '~prop': 'methodKey',
      '~show': computed(() => data.mode == 'method'),
      clearable: true,
      //options is not a standard el-select prop,the transform will handle it
      '~options': methodList
    })

    //Sub part of data,optional
    config.push({
      '~component': 'el-input',
      '~label':t('_.components.pageDesign.propsEditor.buildCompEditorUtil.dataProps.dataContent'),
      '~prop': 'dataContent',
      '~show': computed(() => data.mode == 'fixed'),
      type: 'textarea',
      rows: 10,
      clearable: true
    })
    //
    return formTransform(config, data, context)
  }
  //
  //
  function buildTabEvent() {
    //
    const data = reactive(choosed.config || [])
    //

    const c = {
      '~component': 'lc-editable-list',
      '~label': '',
      '~prop': 'event',
      '~hideSwitchButton': true,
      labelColumn: 'name',
      editConfig: function (d) {
        return [
          {
            '~component': 'el-select',
            '~label': t('_._.name'),
            '~prop': 'name',
            'allow-create': true,
            '~options': componentConfig.editor?.event?.list || []
          },
          {
            '~component': 'el-select',
            '~label': t('_.components.pageDesign.propsEditor.buildCompEditorUtil.eventProps.mode'),
            '~prop': 'mode',
            '~default': 'script',
            '~options': [
              { value: 'script', label: t('_.components.pageDesign.propsEditor.buildCompEditorUtil.eventProps.mode_script') },
              { value: 'method', label: t('_.components.pageDesign.propsEditor.buildCompEditorUtil.eventProps.mode_method') },
              { value: 'api', label: t('_.components.pageDesign.propsEditor.buildCompEditorUtil.eventProps.mode_api') }
            ]
          },
          {
            '~component': 'el-select',
            '~label': t('_.components.pageDesign.propsEditor.buildCompEditorUtil.eventProps.mode_api'),
            '~prop': 'api',
            '~show': computed(() => d.value.mode == 'api'),
            clearable: true,

            //options is not a standard el-select prop,the transform will handle it
            '~options': apiList
          },
          {
            '~component': 'el-select',
            '~label': t('_.components.pageDesign.propsEditor.buildCompEditorUtil.eventProps.mode_method'),
            '~prop': 'method',
            '~show': computed(() => d.value.mode == 'method'),
            clearable: true,
            //options is not a standard el-select prop,the transform will handle it
            '~options': methodList
          },
          {
            '~component': 'b-ace-editor',
            '~label': t('_.components.pageDesign.propsEditor.buildCompEditorUtil.eventProps.mode_script'),
            '~prop': 'code',
            '~show': computed(() => d.value.mode == 'script')
          }
        ]
      }
    }
    if(!data.event){
      data.event=[]
    }
    //
    return formTransform([c], data, context)
  }

}

//
//<el-tab-pane label="Basic" name="basic">
function buildTabPanel(key, label, config) {
  return {
    '~': 'el-tab-pane',
    label: label,
    name: key,
    '#': {
      '~': 'div',
      style: { 'margin-right': '4px' },

      '#': config
    }
  }
}
//Here based on the ui type ,build proper UI config
//So far only form items is supported(ui is an array)
function buildUI(key, componentConfig, choosed, context) {
  // console.log('buildUI',arguments)
  //
  let ui = componentConfig.editor[key].ui || {}
  //

  const config = choosed.config[key] || {}
  // console.log(key,data,choosed)
  //
  if (typeof ui == 'function') {
    ui = ui({ config, context, componentConfig, fullConfig: choosed, key: choosed.key })
  }
  if (Array.isArray(ui)) {
    //If it is array ,assume they are form items
    return formTransform(ui, config, context, true)
  } else {
    //Otherwise consider it can be rendered by MttkCompWrap
    return ui
  }
}
