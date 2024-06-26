export default {
  _: {
    _: {
      key: 'Key',
      name: 'Name',
      description: 'Description',
      id: 'ID',
      icon: 'Icon',
      sequence: 'Sequence',
      add: 'Add',
      del: 'Delete',
      edit: 'Edit',
      refresh: 'Refresh',
      copy: 'Copy',
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      ok: 'OK',
      yes: 'Yes',
      no: 'No',
      back: 'Back',
      clear: 'Clear',
      operation: 'Operation',
      error:'Error',
      warning: 'Warning',
      confirm: 'Confirm',
      delPrompt:'Confirm to delete',
      copyPrompt:'Confirm to copy',
      saveSuccess: 'Save successfully',
      delSuccess: 'Delete successfully',
      copySuccess: 'Copy successfully',
      createTime: 'Create time',
      createBy: 'Create by',
      updateTime: 'Update time',
      updateBy: 'Update by',
      filterPrompt:'Input to filter',
    },
    lang: {
      notify:
        'Languange changed to {0} successfully,you may need to refresh to make it take affect!'
    },
    sys:{
      app:'Application',
      menu:'Menu',
      page:'Page',
      account:'Account',
      accountGroup:'Account group',
      accountRole:'Account role',
    },
    plugin: {
      login: {
        title: 'MTTK lowcode engine',
        username: 'Username',
        usernamePlaceholder: 'Please input username',
        password: 'Password',
        passwordPlaceholder: 'Please input password',
        login: 'Login',
        loginFail: 'Login failed, username or password error'
      },
      top: {}
    },
    components: {
      appEditor: {
        title: 'Menu and page',
        menuEditor: {
          title: 'Menus',
          add: 'Add menu',
          showAll: 'Show all pages',
          delPrompt:
            'Will you want to delte this menu?All the pages under this menu will be unlinked!',
          menuEditorDialog: {
            title: 'Menu editor'
          }
        },
        pageEditor: {
          title: 'Pages',
          add: 'Add page',
          batchExport: 'Batch export',
          import: 'Import',
          design: 'Design',
          delPrompt: 'Will you want to delte this page',
          copyPrompt: 'Will you want to copy this page',
          data: {
            menu: 'Menu',
            renderMode: 'Layout strategy',
            renderMode_flex: 'Flex',
            renderMode_absolute: 'Absolute',
            width: 'Width',
            height: 'Height'
          },
          pageEditorDialog: {
            title: 'Page editor'
          }
        }
      },
      appManager: {
        add: 'Add a new application',
        delPrompt:
          'Will you want to delte this application?All the resources under this application will be deleted!',
        appDialog: {
          title: 'Application editor',
          basic: 'Basic',
          customizePlugin: 'Customize plugin',
          customizeComponent: 'Customize component',
          mainColor: 'Main color',
          pageDefault:'Page default',
          pagePrompt:'Settings here will be apply to page style during page creating',
          backgroundColor: 'Background Color',
          style:'Style',
        },
        customizePlugin: {
          total: 'Total:',
          selected: 'Selected',
          entry: 'Entry'
        },
        customizeComponent: {
          total: 'Total:',
          selected: 'Selected',
          prompt: 'Selected count may include the automatically selected folders'
        },
        single: {
          design: 'Design',
          launch: 'Launch',
          setting: 'Setting'
        }
      },
      auth: {
        name: 'Data auth',
        dataAuthType: {
          ownerGroup: 'Owner group',
          group: 'User group',
          user: 'User'
        },
        dialog: {
          title: 'Edit Data authorization',
          data: {
            _owners: 'Owners',
            userOrUserGroup: 'User/User group',
            type: 'Type',
            access: 'Access',
            auth: 'Auth'
          },
          saveError1: 'Line {0} has not choose user or user group',
          saveError2: 'Line {0} has not choose any authorization'
        }
      },
      deployed: {
        errorNoContext:
          'App is neither provided in URL normal inejct from appContext, launch failed',
        errorNoPage: 'The app has no page, launch failed.app:{0},page:{0}'
      },
      layout: {
        fullScreen: 'Full Screen'
      },
      pageDesign: {
        ui: 'User Interface',
        propsEditor: {
          deletePrompt: 'Are you sure to delete this component?',
          duplicatePrompt: 'Are you sure to duplicate this component?',
          buildCompEditor: {
            pageConfig: 'Page config',
            error1: 'No component config is found by type:{0}',
            error2: 'Component does not define configuration of type:{0}'
          },
          buildCompEditorUtil: {
            classLabel: 'Class (Seperated by space):',
            styleLabel: 'Style:',
            pageProps: {
              renderMode: 'Layout strategy',
              renderMode_flex: 'Flex',
              renderMode_absolute: 'Absolute',
              wh: 'Width*Height',
              grid: 'Show grid and align to grid',
              grid_hide: 'Hide',
              grid_showInDesigner: 'Show in designer',
              grid_show: 'Show always',
              gridWidth: 'Grid width',
              zoomEdit: 'Zoom in edit mode',
              zoomView: 'Zoom in view mode',
              zoomView_none: 'No zoom',
              'zoomView_zoom-both': 'Zoom both width and height',
              'zoomView_zoom-width': 'Zoom width',
              'zoomView_zoom-height': 'Zoom height'
            },
            basic: 'Basic',
            data: 'Data',
            event: 'Event',
            display: 'Display',
            dataProps: {
              mode: 'Mode',
              mode_data: 'Data',
              mode_computed: 'Computed',
              mode_method: 'Method',
              mode_fixed: 'Fixed',
              dataPath: 'Data path',
              dataContent: 'Content'
            },
            eventProps: {
              mode: 'Mode',
              mode_script: 'Script',
              mode_method: 'Method',
              mode_api: 'API'
            }
          },
          formTransform: {
            hide: 'Hide '
          }
        }
      },
      top: {
        title: 'MTTK low code engine',
        setting: 'Setting',
        menu: {
          account: 'Account',
          accountRole: 'Role',
          accountGroup: 'Account group',
          app: 'App list',
          changePassword:'Change password',
          _logout: 'Logout'
        },
        account:{
          name:'Account',
          title:'Account mangement',
          changePassword:'Password',
          resetPassword:'Password',
          dialogTitle:'Edit  account',
          username:'User name',
          password:'Password',
          active:'Active',
          groups:'Account groups',
          roles:'Roles',   
          email:'Email',
          tel:'Telephone',      
          cpDialog:{
            title:'Change password',
            passwordOld:'Old password',
            password:'New password',
            passwordConfirm:'Confirmed new password',
            errorValidate:'New password and confirmed new password is not match',
            error1:'Old password is error',
            error2:'Other error,code:{0}',
            cpSuccess:'Password change successfully', 
          },
          rpDialog:{
            title:'Reset password',
            password:'New password',
            passwordConfirm:'Confirmed new password',
            errorValidate:'New password and confirmed new password is not match',
            error:'Other error,code:{0}',
            success:'Password reset successfully', 
          },
        },
        accountGroup:{
          title:'Account group management',
          dialogTitle:'Account group edit',
        },
        accountRole:{
          title:'Role management',
          dialogTitle:'Role edit',
          authorities:'Authorities',
          roleAuthorities:{
            access:'Access',
            add:'Add',
            edit:'Edit',
            del:'Delete',
            auth:'Authorize',
            all:'Full control',
            all_read:'All read',
          }
        },
      },
      wrap: {
        errorNoComponent: 'No component is found from :{0}',
        errorDataType:
          'The data content of {0} can not be translate into required data type:{1},error:{2}',
        errorBuild: 'Build component config failed<br>',
        errorTransform: 'Unsupported transform , it should be a funciton or promise',
        errorEvent: 'Unsuported event type:{0}',
        errorCheckDataType1: 'The data of {0} requires {1},but the result is not an array',
        errorCheckDataType2:
          'The data of {0} requires {1},but the result is not an object or it is array',
        errorCheckDataType3: 'The data of {0} requires {1},but the result is {2}'
      }
    },
    utils: {
      requestCreator: {
        notLoginPrompt: 'Not login or login expired, you can keep in this page or relogin',
        relogin: 'Relogin',
        unAUth: 'Unautorized to access URL: {0}'
      },
      dataTransform: {
        error1:
          'The data of {0} requires {1},but the data content can not be translate into an array',
        error2:
          'The data of {0} requires {1},but the data content can not be translate into an object or it is array'
      }
    },
    builtIn: {
      plugin: {
        apiEditor: {
          call: 'Call',
          deletePrompt: 'Will you want to delete this API',
          callPrompt: 'Will you want to call this API',
          dialogTitle: 'API editor',
          data: {
            method: 'Method',
            url: 'URL',
            requestType: 'Request type',
            requestType_none: '无',
            requestType_para: '参数',
            requestMode: 'Request content mode',
            requestMode_data: 'Data',
            requestMode_computed: 'Computed',
            responseMode: 'Response mode',
            responseMode_none: 'None',
            responseMode_data: 'Data',
            responseValue: 'Response value',
            responseExpression: 'Response expression'
          }
        },
        computedEditor: {
          value: 'Value',
          deletePrompt: 'Will you want to delte this computed',
          dialogTitle: 'Computed editor',
          code: 'Code(get)',
          codePrompt: 'Computed get code. Page context can be get from paramter c',
          codeSet: 'Code(set)',
          codeSetPrompt:
            'Computed set code. It has tow parameters,one is named  c which is page context and the other is named value which is the new value to set',
          valueDialogTitle: 'Computed value'
        },
        dataEditor: {
          type: 'Data type',
          initValue: 'Init value',
          currentValue: 'Current value',
          errorExist: 'Data key {0} is already existed',
          deletePrompt: 'Will you want to delte this data',
          dialogTitle: 'Data editor',
          dataValueTitle: 'Data value',
          resetCurrent: 'Reset current value to init value while saving',
          resetInit: 'Reset init value to current value while saving'
        },
        lifecycleEditor: {
          key: 'Life cycle',
          code: 'Code',
          deletePrompt: 'Will you want to delte this lifecycle',
          dialogTitle: 'Lifecycle editor'
        },
        methodEditor: {
          parameter: 'Parameter',
          parameter_type: 'Data type',
          drag: 'Drag',
          code: 'Code',
          codePrompt:
            'The first parameter of method is c which is page context.<br>' +
            'If the parameter names are provided above, you can use it directly.<br>' +
            'Otherwise,argument names will be set to arg0/arg1...<br>' +
            'And please also note, if method is triggered by event, warpContext will be added automatically.<br>' +
            'You need to set parameter name manually,otherwise it is arg0 as the second parameter after context.',
          dialogTitle: 'Method editor',
          paraDialogTitle: 'Method parameter editor'
        },
        pallet: {
          filter: 'Input to filter pallet item'
        },
        top: {
          return: 'Return to page list',
          save: 'Save page',
          preview: 'Peview',
          edit: 'Edit',
          previewFull: 'Preview in full screen'
        }
      },
      basic: {
        folerName: 'Basic components',
        html: {
          name: 'HTML',
          description: 'HTML',
          wrapBy: 'Wrap by',
          html: 'HTML',
          html_description: 'Input HTML fragment here to render directly'
        },
        img: {
          name: 'Image',
          description: '',
          src: 'Image URL',
          alt: 'Alternative text',
          width: 'Width',
          height: 'Height'
        },
        container: {
          name: 'Container',
          description: 'Multiple components can be put into container'
        }
      },
      element: {
        folerName: 'Element Plus components',
        button: {
          name: 'Button',
          label: 'Label',
          type: 'Type',
          size: 'Size',
          disabled: 'Disabled',
          color: 'Color'
        },
        card: {
          name: 'Card',
          shadow: 'Shadow',
          shadow_always: 'always',
          shadow_never: 'never',
          shadow_hover: 'hover',
          header: 'Show header',
          headerUseSlot: 'Set header with drag and drop',
          footer: 'Show footer',
          footerUseSlot: 'Set footer with drag and drop'
        },
        collapse: {
          name: 'Collapse',
          items: 'Items'
        },
        dialog: {
          name: 'Dialog',
          title: 'Title',
          width: 'Width',
          modal: 'Show shadowing layer/Modal',
          closeOnClick: 'Close on click modal',
          closeOnEscape: 'Close on press escape',
          showClose: 'Show close',
          appendToBody: 'Append to body',
          destroyOnClose: 'Destroy on close',
          fullscreen: 'Fullscreen',
          draggable: 'Draggable',
          center: 'Header and footer align to center',
          prompt: '[Please note: This dialog is NOT WYSIWYG]'
        },
        divider: {
          name: 'Divider',
          content: 'Content',
          direction: 'Direction',
          direction_horizontal: 'Horizontal',
          direction_vertical: 'Vertical',
          borderStyle: 'border-style',
          contentPosition: 'Content position',
          contentPosition_left: 'Left',
          contentPosition_right: 'Right',
          contentPosition_center: 'Center'
        },
        drawer: {
          name: 'Drawer',
          title: 'Title',
          size: 'Size',
          modal: 'Show shadowing layer/Modal',
          closeOnClick: 'Close on click modal',
          closeOnEscape: 'Close on press escape',
          showClose: 'Show close',
          appendToBody: 'Append to body',
          destroyOnClose: 'Destroy on close',
          withHeader: 'Show header',
          direction: 'Direction',
          prompt: '[Please note: This drawer is NOT WYSIWYG]'
        },
        form: {
          name: 'Form',
          inline: 'Inline',
          labelPosition: 'Label position',
          labelPosition_left: 'Align left',
          labelPosition_right: 'Align right',
          labelPosition_top: 'Top',
          labelWidth: 'Label width',
          items: 'Items',
          items_label: 'Label',
          items_prop: 'Prop',
          items_required: 'Required',
          items_controllerType: 'Controller type',
          items_type: 'Type',
          items_controls: 'Show controls',
          items_placeholder: 'Placeholder',
          items_clearable: 'Clearable',
          'items_active-text': 'Active text',
          'items_inactive-text': 'Inactive text',
          items_options: 'Options',
          items_options_description:
            'Multiple options are separated by commas. If the value and label of each option are different, a colon is used to separate them, with the value before the colon and the label after it'
        },
        input: {
          name: 'Input',
          type: 'Type',
          placeholder: 'Placeholder',
          clearable: 'Clearable',
          disabled: 'Disabled',
          size: 'Size',
          size_large: 'Large',
          size_default: 'Default',
          size_small: 'Small',
          minlength: 'Min length',
          maxlength: 'Max length',
          'show-word-limit': 'Show word limit',
          rows: 'Rows',
          'show-password': 'Show password',
          'prefix-icon': 'Prefix icon',
          'suffix-icon': 'Suffix icon'
        },
        layout: {
          name: 'Layout',
          description: 'Row col based layout',
          gutter: 'Gutter',
          justify: 'Justify',
          align: 'Align',
          align_top: 'Top',
          align_middle: 'Middle',
          align_bottom: 'Bottom',
          cols: 'Columns',
          cols_span: 'Span',
          cols_offset: 'Offset',
          cols_push: 'Push',
          cols_pull: 'Pull'
        },
        pagination: {
          name: 'Pagination',
          layout: 'layout',
          'pager-count': 'Number of pagers',
          small: 'Small size',
          background: 'Show background',
          'page-sizes': 'Page sizes',
          'prev-text': 'Prev text',
          'prev-icon': 'Prev icon',
          'next-text': 'Next text',
          'next-icon': 'Next icon',
          disabled: 'Disabled',
          'hide-on-single-page': 'Hide on single page',
          sync_to_data: 'Synchronize currrent page and page size to data',
          'key-current-page': 'Field name of current page in model value',
          'key-total': 'Field name of total elements in model value',
          'key-page-count': 'Field name of page count in model value',
          'key-page-size': 'Field name of page size in model value'
        },
        progress:{
          name: 'Progress',
          type:'Type',
          type_line:'Line',
          type_circle:'Circle',
          type_dashboard:'Dashboard',
          'stroke-width':'Stroke width',
          'text-inside':'Text inside',
          status:'Status',
          status_success:'Success',
          status_exception:'Exception',
          status_warning:'Warning',
          indeterminate:'Indeterminate',
          duration:'Duration',
          color:'Color',
          width:'Width',
          'show-text':'Show text',
          'stroke-linecap':'Stroke linecap',
          'stroke-linecap_butt':'butt',
          'stroke-linecap_round':'round',
          'stroke-linecap_square':'square',
          striped:'Striped',
          'striped-flow':'Striped flow',
        },
        table:{
          name: 'Table',
          stripe:'Stripe',
          border:'Border',
          'empty-text':'Empty text',
          columns:'Columns',
          columns_label:'Label',
          columns_prop:'Prop',
          columns_width:'Width',
          columns_align:'Align',
          columns_align_left:'Left',
          columns_align_center:'Center',
          columns_align_right:'Right',
          columns_type:'',
          columns_type_selection:'Selection',
          columns_type_index:'Index',
          columns_type_container:'Container',
          columns_formatter:'Formatter',
          columns_formatter_description:'The first parameter is context, the second is undefined, the third is row, the fourth is column, the fifth is value, and the sixth is index',
        },
        tabs:{
          name: 'Tabs',
          type:'Type',
          type_card:'Card',
          'type_border-card':'Border card',
          'tab-position':'Tab position',
          'tab-position_top':'Top',
          'tab-position_right':'Right',
          'tab-position_bottom':'Bottom',
          'tab-position_left':'Left',
          stretch:'Stretch',
          tabs:'Tabs',
          tabs_label:'Label',
        },
      }
    },
    install: {
      installPlugin: {
        pallet: 'Pallet',
        componentTree: 'Component Tree',
        dataEditor: 'Data Editor',
        computedEditor: 'Computed Editor',
        methodEditor: 'Method Editor',
        apiEditor: 'API Editor',
        lifecycleEditor: 'Lifecycle Editor',
        sourceCode: 'Source Code'
      }
    }
  }
}
