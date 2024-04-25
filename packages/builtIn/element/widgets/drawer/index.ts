import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import {  buildWidgetWithDefaultSlot,buildPanel } from '@/context/globalContext/componentRepository/util/transformUtil'
import {t} from '@/lang/index'

//drawer config
const drawerConfig = {
  key: '_drawer',
  name: t('_.builtIn.element.drawer.name'),
  description: '',
  icon: 'mdiPauseBoxOutline',
  sequence: 32,
  transform: function ({config,  context}) {
    if (context.mode.value == 'edit') {
      //edit - use card to simulate
      const result = buildWidgetWithDefaultSlot('el-card',{config})
      //
      const footerConfig=buildPanel(config, 'footer')
      footerConfig.style={'text-align': 'right'}
      result['#footer'] = footerConfig
      //Always show

      //The attribute name of card tile is header
      result.header = (result.title || 'No title') + t('_.builtIn.element.drawer.prompt')
      

      //Set style so the card can float from CSS flow
      const styleBase = {
        position: 'absolute',
        overflow: 'auto',
        'z-index':999
      }
     //Set position depends on direction
     const direction=config.direction||'rtl'
     if(direction=='rtl'){
      result.style={
        right:0,
        top:0,
        height:'100%',
        width:config.size||'30%',
        ...styleBase
      }
     }else if(direction=='ltr'){
      result.style={
        left:0,
        top:0,
        height:'100%',
        width:config.size||'30%',
        ...styleBase
      }
    }else if(direction=='ttb'){
      result.style={
        left:0,
        top:0,
        width:'100%',
        height:config.size||'30%',
        ...styleBase
      }
    }else if(direction=='btt'){
      result.style={
        left:0,
        bottom:0,
        width:'100%',
        height:config.size||'30%',
        ...styleBase
      }
    }
      

      //
      return result
    } else {
      const result= buildWidgetWithDefaultSlot('el-drawer',{config})
      result['#footer'] = buildPanel(config, 'footer')
      return result;
    }
  },
  editor: {
    basic: {
      ui: [
        uiUtil.createInput('title',t('_.builtIn.element.drawer.title')),
        uiUtil.createInput('size',t('_.builtIn.element.drawer.size')),
        uiUtil.createSwitch('modal', t('_.builtIn.element.drawer.modal')),
        uiUtil.createSwitch('close-on-click-modal', t('_.builtIn.element.drawer.closeOnClick')),
        uiUtil.createSwitch('close-on-press-escape', t('_.builtIn.element.drawer.closeOnEscape')),
        uiUtil.createSwitch('show-close',  t('_.builtIn.element.drawer.showClose')),
        uiUtil.createSwitch('append-to-body',  t('_.builtIn.element.drawer.appendToBody')),
        uiUtil.createSwitch('destroy-on-close',  t('_.builtIn.element.drawer.destroyOnClose')),
        uiUtil.createSwitch('with-header',t('_.builtIn.element.drawer.withHeader')),
        uiUtil.createSelect('direction', ['rtl' , 'ltr' , 'ttb' , 'btt' ],t('_.builtIn.element.drawer.direction')),
      ],
      init: {
        title: 'Drawer default title',
        size: '30%',
        modal: false,
        'close-on-click-modal': false,
        'close-on-press-escape': false,
        'show-close': true,
        'append-to-body': false,
        'destroy-on-close': false,
        'with-header': true,
        direction: 'rtl',
      }
    },
    data: {
      type: 'Boolean',
      init: {
        mode: 'fixed',
        dataContent: 'true'
      }
    },
    display: {}
  }
}
//
export default drawerConfig
