
import * as uiUtil from '@/context/globalContext/componentRepository/util/uiUtil'
import {  buildWidgetWithDefaultSlot,buildPanel } from '@/context/globalContext/componentRepository/util/transformUtil'
import {t} from '@/lang/index'
//dialog config
const dialogConfig = {
  key: '_dialog',
  name: t('_.builtIn.element.dialog.name'),
  description: '',
  icon: 'mdiDockWindow',
  sequence: 31,
  transform: function ({config,  context}) {
    if (context.mode.value == 'edit') {
      //edit - use card to simulate
      const result = buildWidgetWithDefaultSlot('el-card',{config})
      //Since dialog footer is defaully align to right
      const footerConfig=buildPanel(config, 'footer')
      footerConfig.style={'text-align': 'right'}
      result['#footer'] = footerConfig
      //Always show

      //The attribute name of card tile is header
      result.header = (result.title || 'No title') + t('_.builtIn.element.dialog.prompt')
    

      //Set style so the card can float from CSS flow
      result.style = {
        position: 'absolute',
        top: '10%',
        // right: '25%',
        // bottom: '20%',
        left: '15%',
        width:config.width||'50%',
        overflow: 'auto',
        'z-index':999
      }
      //

      //
      return result
    } else {
      const result= buildWidgetWithDefaultSlot('el-dialog',{config})
      result['#footer'] = buildPanel(config, 'footer')
      return result;
    }
  },
  editor: {
    basic: {
      ui: [
        uiUtil.createInput('title',t('_.builtIn.element.dialog.title')),
        uiUtil.createInput('width',t('_.builtIn.element.dialog.width')),
        uiUtil.createSwitch('modal', t('_.builtIn.element.dialog.modal')),
        uiUtil.createSwitch('close-on-click-modal', t('_.builtIn.element.dialog.closeOnClick')),
        uiUtil.createSwitch('close-on-press-escape', t('_.builtIn.element.dialog.closeOnEscape')),
        uiUtil.createSwitch('show-close',  t('_.builtIn.element.dialog.showClose')),
        uiUtil.createSwitch('append-to-body',  t('_.builtIn.element.dialog.appendToBody')),
        uiUtil.createSwitch('destroy-on-close',  t('_.builtIn.element.dialog.destroyOnClose')),
        uiUtil.createSwitch('fullscreen',  t('_.builtIn.element.dialog.fullscreen')),
        uiUtil.createSwitch('draggable',  t('_.builtIn.element.dialog.draggable')),
        uiUtil.createSwitch('center',  t('_.builtIn.element.dialog.center'))
      ],
      init: {
        title: 'Dialog default title',
        width: '50%',
        modal: false,
        'close-on-click-modal': false,
        'close-on-press-escape': false,
        'show-close': true,
        'append-to-body': false,
        'destroy-on-close': false,
        fullscreen: false,
        draggable: true,
        center: false
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
export default dialogConfig
