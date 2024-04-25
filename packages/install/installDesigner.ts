import { defineAsyncComponent, computed, watch } from 'vue'

//Bin editor
import Editor from 'bin-editor-next'
import * as ace from 'brace'
import 'brace/ext/emmet'
import 'brace/ext/language_tools'
import 'brace/mode/json'
import 'brace/mode/javascript'
import 'brace/snippets/javascript'
import 'brace/snippets/json'
import 'brace/theme/chrome'

//
import { vAuth, vDataAuth } from '@/utils/auth'
//
export function installDesigner(globalContext) {
  //
  const app = globalContext.vueApp
  //Install bin-editor
  app.component(Editor.name, Editor)

  //Some components
  app.component(
    'lc-editable-list',
    defineAsyncComponent(() => import('@/components/pageDesign/propsEditor/editableList.vue'))
  )
  app.component(
    'lc-icon-picker',
    defineAsyncComponent(() => import('@/components/iconPicker/index.vue'))
  )
  //
  app.directive('dataAuth', vDataAuth)
  app.directive('auth', vAuth)
}
