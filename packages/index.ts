import createGlobalContext from '@/context/globalContext/index'
import createAppContext from '@/context/appContext/index'
import createContext from '@/context/pageContext/index'

import lcPageRender from '@/components/pageRender/index.vue'
import lcDeployed from '@/components/deployed/index.vue'
import lcDeployedNoRouter from '@/components/deployed/deployedNoRouter.vue'
import lcLayout from '@/components/layout/index.vue'
import lcPanel from '@/components/panel/index.vue'
import lcIcon from '@/components/icon/index.vue'
import lcFullHeight from '@/components/fullHeight/index.vue'
import lcFormItem from '@/components/pageDesign/propsEditor/components/FormItem.vue'



//Below are for designer
import * as install from '@/install/index'
import * as locale from '@/lang/index'
import lcWorkspaceManager from '@/components/workspaceManager/index.vue'
import lcAppEditorWithRouter from '@/components/appEditor/appEditorWithRouter.vue'
import * as widgetUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import * as widgetTransformUtil from '@/context/globalContext/componentRepository/util/transformUtil'
import * as tools from '@/utils/tools'
import * as download from '@/utils/download'
import lcDataAuthButton from '@/components/auth/DataAuthButton.vue'
import {vFullHeight} from '@/components/fullHeight/directive'
import * as authentication from './utils/authentication'


//
export {
  install,
  lcPageRender,
  createGlobalContext,
  createAppContext,
  createContext,
  lcDeployed,
  lcDeployedNoRouter,
  lcLayout,
  lcPanel,
  lcIcon,
  lcFullHeight,
  lcFormItem,
  lcDataAuthButton,
  vFullHeight,
  authentication,
  tools,
  download,
  locale,

  lcWorkspaceManager,
  lcAppEditorWithRouter,
  widgetUtil,
  widgetTransformUtil
}
