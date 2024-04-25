export default {
  _: {
    _: {
      key: '键',
      name: '名称',
      description: '描述',
      id: '唯一标识',
      icon: '图标',
      sequence: '序号',
      add: '增加',
      del: '删除',
      edit: '修改',
      refresh: '刷新',
      copy: '拷贝',
      save: '保存',
      cancel: '取消',
      close: '关闭',
      ok: '确定',
      yes: '是',
      no: '否',
      back: '返回',
      clear: '清除',
      operation: '操作',
      error:'错误',
      warning: '警告',
      confirm: '确认',
      delPrompt:'确定删除吗',
      copyPrompt:'确定复制吗',
      saveSuccess: '保存成功',
      delSuccess: '删除成功',
      copySuccess: '拷贝成功',
      createTime: '创建时间',
      createBy: '创建人',
      updateTime: '更新时间',
      updateBy: '更新人',
      filterPrompt:'输入过滤',
    },
    lang: {
      notify: '语言切换到 {0} 成功,你可能需要刷新界面后让修改起效!'
    },
    sys:{
      app:'应用',
      menu:'菜单',
      page:'页面',
      account:'用户',
      accountGroup:'用户组',
      accountRole:'角色',
    },
    plugin: {
      login: {
        title: 'MTTK低代码引擎',
        username: '用户名',
        usernamePlaceholder: '请输入用户名',
        password: '密码',
        passwordPlaceholder: '请输入密码',
        login: '登录',
        loginFail: '登录失败,用户名或密码错误'
      }
    },
    components: {
      appEditor: {
        title: '菜单和页面',
        menuEditor: {
          title: '菜单',
          add: '增加菜单',
          showAll: '显示所有页面',
          delPrompt: '确定删除菜单?此菜单下所有页面会取消与菜单的关联!',
          menuEditorDialog: {
            title: '菜单编辑'
          }
        },
        pageEditor: {
          title: '页面',
          add: '增加页面',
          batchExport: '导出',
          import: '导入',
          design: '设计',
          delPrompt: '确定删除此页面?',
          copyPrompt: '确定拷贝此页面?',
          data: {
            menu: '菜单',
            renderMode: '布局策略',
            renderMode_flex: '流式布局',
            renderMode_absolute: '绝对位置',
            width: '宽度',
            height: '高度'
          },
          pageEditorDialog: {
            title: '页面编辑'
          }
        }
      },
      appManager: {
        add: '增加应用',
        delPrompt: '确定删除应用?应用下所有资源,如菜单页面等都会被删除!',
        appDialog: {
          title: '编辑应用',
          basic: '基础',
          customizePlugin: '配置插件',
          customizeComponent: '配置组件',
          mainColor: '主颜色',
          pageDefault:'页面缺省值',
          pagePrompt:'此设置会在创建页面时生成到页面样式中',
          backgroundColor: '背景色',
          style:'样式',
        },
        customizePlugin: {
          total: '总数',
          selected: '选择',
          entry: '插入点'
        },
        customizeComponent: {
          total: '总数:',
          selected: '选择',
          prompt: '选中数量可能包含自动选中的组件分组'
        },
        single: {
          design: '设计',
          launch: '启动',
          setting: '设置'
        }
      },
      auth: {
        name: '数据权限',
        dataAuthType: {
          ownerGroup: '所有者组',
          group: '用户组',
          user: '用户'
        },
        dialog: {
          title: '数据权限编辑',
          data: {
            _owners: '所有者',
            userOrUserGroup: '用户/用户组',
            type: '类型',
            access: '访问',
            auth: '授权'
          },
          saveError1: '第{0}行没有选择用户或用户组',
          saveError2: '第{0}行没有选择任何权限'
        }
      },
      deployed: {
        errorNoContext: 'app既不在URL里也不能从appContext inject到, 应用启动失败',
        errorNoPage: '应用没有任何页面或没关联到菜单, 启动失败.应用:{0},页面:{0}'
      },
      layout: {
        fullScreen: '全屏'
      },
      pageDesign: {
        ui: '用户界面',
        propsEditor: {
          deletePrompt: '确定删除当前选中组件?',
          duplicatePrompt: '确定复制当前选中组件?',
          buildCompEditor: {
            pageConfig: '页面配置',
            error1: '根据组件类型{0}没有找到组件配置',
            error2: '据组件类型{0}没有找到属性定义'
          },
          buildCompEditorUtil: {
            classLabel: '类 (空格分割):',
            styleLabel: '样式:',
            pageProps: {
              renderMode: '布局策略',
              renderMode_flex: '流式布局',
              renderMode_absolute: '绝对位置',
              wh: '宽*高',
              grid: '网格显示和对齐',
              grid_hide: '不显示',
              grid_showInDesigner: '设计时显示',
              grid_show: '一直显示',
              gridWidth: '网格宽度',
              zoomEdit: '设计时缩放',
              zoomView: '预览发布时缩放',
              zoomView_none: '不缩放',
              'zoomView_zoom-both': '高度和宽度同时缩放',
              'zoomView_zoom-width': '宽度缩放',
              'zoomView_zoom-height': '高度缩放'
            },
            basic: '基本',
            data: '数据',
            event: '事件',
            display: '显示',
            dataProps: {
              mode: '模式',
              mode_data: '数据',
              mode_computed: '计算属性',
              mode_method: '方法',
              mode_fixed: '固定值',
              dataPath: '子路径',
              dataContent: '内容'
            },
            eventProps: {
              mode: '模式',
              mode_script: '脚本',
              mode_method: '方法',
              mode_api: 'API'
            }
          },
          formTransform:{
            hide:'隐藏'
          }
        }
      },
      top: {
        title: '欢迎使用MTTK低代码引擎',
        setting: '设置',
        menu: {
          account: '用户管理',
          accountRole: '角色管理',
          accountGroup: '用户组管理',
          app: '应用列表',
          changePassword:'修改密码',
          _logout: '登出'
        },
        account:{
          title:'用户管理',
          changePassword:'修改密码',  
          resetPassword:'重置密码',  
          dialogTitle:'编辑  用户',
          username:'用户名',
          password:'密码',
          active:'激活',
          groups:'用户组',
          roles:'角色',       
          cpDialog:{
            title:'修改密码',
            passwordOld:'旧密码',
            password:'新密码',
            passwordConfirm:'确认新密码',
            errorValidate:'新密码和确认密码不相等',
            error1:'旧密码错误',
            error2:'其他错误,错误代码:{0}',
            cpSuccess:'密码修改成功', 
          },
          rpDialog:{
            title:'重置密码',
            password:'新密码',
            passwordConfirm:'确认新密码',
            errorValidate:'新密码和确认密码不相等',
            error:'其他错误,错误代码:{0}',
            success:'密码重置成功', 
          },
        },
        accountGroup:{
          title:'用户组管理',
          dialogTitle:'编辑 用户组',
        },
        accountRole:{
          title:'角色管理',
          dialogTitle:'编辑 角色',
          authorities:'权限',
          roleAuthorities:{
            access:'访问',
            add:'增加',
            edit:'编辑',
            del:'删除',
            auth:'授权',
            all:'完全控制',
            all_read:'全部访问',
          },
        },
      },
      wrap: {
        errorNoComponent: '没有找到组件 :{0}',
        errorDataType: '数据内容 {0} 无法转换成期望的数据类型:{1},错误:{2}',
        errorBuild: '构建组件配置失败<br>',
        errorTransform: '不支持的转换,必须是funciton 或 promise',
        errorEvent: '不支持的事件类型:{0}',
        errorCheckDataType1: '数据 {0} 需要 {1},但是结果不是数组',
        errorCheckDataType2: '数据 {0} 需要 {1},但结果不是对象或是一个数组',
        errorCheckDataType3: '数据 {0} 需要 {1},但结果是 {2}'
      }
    },
    utils: {
      requestCreator: {
        notLoginPrompt: '未登录或登录已过期,可以取消继续留在当前页面，或者重新登录',
        relogin: '重新登录',
        unAUth: '你未授权访问此URL: {0}'
      },
      dataTransform: {
        error1: '数据 {0} 需要 {1},但是数据内容无法转换成数组',
        error2: '数据 {0} 需要 {1},但是数据内容无法转换成对象或他是一个数组'
      }
    },
    builtIn: {
      plugin: {
        apiEditor: {
          call: '调用',
          deletePrompt: '确定删除此API',
          callPrompt: '确定调用此API',
          dialogTitle: 'API 编辑',
          data: {
            method: '方法',
            url: 'URL',
            requestType: '请求方法',
            requestMode: '请求内容模式',
            requestMode_data: '数据',
            requestMode_computed: '计算属性',
            responseMode: '反馈内容模式',
            responseMode_none: '无',
            responseMode_data: '数据',
            responseValue: '反馈值',
            responseExpression: '子路径'
          }
        },
        computedEditor: {
          value: '值',
          deletePrompt: '确定删除此计算属性',
          dialogTitle: '编辑 计算属性',
          code: '代码(get)',
          codePrompt: '计算属性 get 代码. 页面上下文可以从参数 c 获取',
          codeSet: '代码(set)',
          codeSetPrompt:
            '计算属性 set 代码. 有两个参数,第一个参数为 c 代表页面上下文,第二个参数为value,是新设置的值',
          valueDialogTitle: '计算属性值'
        },
        dataEditor: {
          type: '数据类型',
          initValue: '初始值',
          currentValue: '当前值',
          errorExist: '数据键 {0} 已经存在',
          deletePrompt: '确定删除此数据',
          dialogTitle: '编辑 数据',
          dataValueTitle: '数据值',
          resetCurrent: '保存时设置当前值为初始值',
          resetInit: '保存时设置初始值为当前值'
        },
        lifecycleEditor: {
          key: '生命周期',
          code: '代码',
          deletePrompt: '确定删除此生命周期',
          dialogTitle: '编辑 生命周期'
        },
        methodEditor: {
          parameter: '参数',
          parameter_type: '数据类型',
          drag: '拖拽',
          code: '代码',
          codePrompt:
            '方法的第一个参数是c,它是页面上下文<br>' +
            '如果上面提供了参数名称，您可以直接使用它<br> ' +
            '否则,参数名称将设置为arg0/arg1…<br> ' +
            '还请注意，如果方法是由事件触发的,warpContext将自动添加<br> ' +
            '您需要手动设置参数名称,否则为arg0 作为上下文之后的第二个参数.',
          dialogTitle: '编辑 方法',
          paraDialogTitle: '编辑 方法参数'
        },
        pallet: {
          filter: '输入过滤面板项目'
        },
        top: {
          return: '返回页面列表',
          save: '保存页面',
          preview: '预览',
          edit: '编辑',
          previewFull: '全屏预览'
        }
      },
      basic:{
        folerName:'基本',
        html:{
          name: 'HTML',
          description: 'HTML',
          wrapBy:'包裹',
          html:'HTML',
          html_description:'输入的HTML代码会被直接渲染'
        },
        img: {
          name: '图片',
          description: '',
          src: '图片URL',
          alt: '备选文本',
          width: '宽度',
          height: '高度'
        },
        container: {
          name: '容器',
          description: '容器可以包含多个组件'
        },
      },
      element:{
        button:{
          name: '按钮',
          label:'按钮文字',
          type:'类型',
          size:'尺寸',
          disabled:'禁用',
          color:'颜色',
        },
        card:{
          name: '卡片',
          shadow:'阴影',
          shadow_always:'一直显示', 
          shadow_never:'不显示', 
          shadow_hover:'鼠标移动上去时显示',
          header:'显示标题',
          headerUseSlot:'通过拖拉组件方式生成标题',
          footer:'显示页脚',
          footerUseSlot: '过拖拉组件方式生成页脚',
        },
        collapse:{
          name: '折叠面板',
          items:'项目',
        },
        dialog:{
          name: '对话框',
          title:'标题',
          width:'宽度',
          modal:'显示阴影层/模态',
          closeOnClick:'点击阴影层关闭',
          closeOnEscape:'按ESC关闭',
          showClose:'显示关闭按钮',
          appendToBody: '加入到HTML body中',
          destroyOnClose: '关闭时销毁所有元素',
          fullscreen:'全屏',
          draggable:'可拖拽',
          center:'头和底部中央对齐',
          prompt:'[注意: 此对话框不完全是所见即所得]',
        },
        divider:{
          name: '分割线',
          content:'分割线文字',
          direction:'方向',
          direction_horizontal:'水平',
          direction_vertical:'垂直',
          borderStyle:'分隔符样式',
          contentPosition:'文字位置',
          contentPosition_left:'左',
          contentPosition_right:'右',
          contentPosition_center:'居中',
        },
        drawer:{
          name: '抽屉',
          title:'标题',
          size:'尺寸',
          modal:'显示阴影层/模态',
          closeOnClick:'点击阴影层关闭',
          closeOnEscape:'按ESC关闭',
          showClose:'显示关闭按钮',
          appendToBody: '加入到HTML body中',
          destroyOnClose: '关闭时销毁所有元素',
          withHeader:'显示头',
          direction:'方向',
          prompt:'[注意: 此抽屉不完全是所见即所得]',
        },
        form:{
          name: '表单',
          inline:'行内表单',
          labelPosition:'标签位置',
          labelPosition_left:'左对齐',
          labelPosition_right:'右对齐',
          labelPosition_top:'顶部',
          labelWidth:'标签宽度',
          items:'项目',
          items_label:'标签',
          items_prop:'Prop键名',
          items_required:'必须',
          items_controllerType:'控件类型',
          items_type:'类型',
          items_controls: '显示控制按钮',
          items_placeholder:'占位文本',
          items_clearable:'显示清除按钮',
          'items_active-text':'打开时的文字',
          'items_inactive-text':'关闭时的文字',
          items_options:'选择项',      
          items_options_description:'多个选择项用逗号分割.每个选择项如果选择项值和标签不同,则用冒号分割,冒号前是值,后面是标签.',    
        },
        input:{
          name: '输入框',
          type:'类型',
          placeholder:'占位文本',
          clearable:'显示清除按钮',
          disabled:'禁用',
          size:'尺寸',
          size_large:'大',
          size_default:'缺省',
          size_small:'小',
          minlength:'最小长度',
          maxlength:'最大长度',
          'show-word-limit':'显示统计字数',
          rows:'行数',
          'show-password':'显示密码',
          'prefix-icon':'前缀图标',
          'suffix-icon':'后缀图标',
        },
        layout:{
          name: '栅格布局',
          description: '基于Flex的行/列方式的栅格布局',
          gutter:'栅格间隔',
          justify:'水平排列方式',
          align:'垂直排列方式',
          align_top:'顶部',
          align_middle:'中间',
          align_bottom:'底部',
          cols:'列',
          cols_span:'占据的列数',
          cols_offset:'左侧的间隔格数',
          cols_push:'栅格向右移动格数',
          cols_pull:'向左移动格数',
        },
        pagination:{
          name: '分页',
          layout:'组件布局',
          'pager-count':'最大页码按钮数',
          small:'型分页样式',
          background:'添加背景色',
          'page-sizes':'分页选择器选项',
          'prev-text':'上一页文本',
          'prev-icon':'上一页图标',
          'next-text':'下一页文本',
          'next-icon':'下一页图标',
          disabled:'禁用',
          'hide-on-single-page':'只有一页时不显示',  
          sync_to_data: '同步当前页和分页信息到数据',
          'key-current-page': '数据中当前页键值',
          'key-total': '数据中总数键值',
          'key-page-count': '数据中总页数键值',
          'key-page-size': '数据中每页数量键值'        
        },
        progress:{
          name: '进度条',
          type:'类型',
          type_line:'线形',
          type_circle:'圆形',
          type_dashboard:'仪表盘盘',
          'stroke-width':'进度条宽度',
          'text-inside':'文字显示在内部',
          status:'状态',
          status_success:'成功',
          status_exception:'异常',
          status_warning:'警告',
          indeterminate:'动画进度条',
          duration:'流动速度',
          color:'颜色',
          width:'环形进度条画布宽度',
          'show-text':'显示进度条文字',
          'stroke-linecap':'路径两端的形状',
          'stroke-linecap_butt':'平接',
          'stroke-linecap_round':'圆形',
          'stroke-linecap_square':'方形',
          striped:'增加条纹',
          'striped-flow':'条纹流动',
        },
        table:{
          name: '表格',
          stripe:'斑马线',
          border:'边框',
          'empty-text':'空文字',
          columns:'列',
          columns_label:'标签',
          columns_prop:'键prop',
          columns_width:'宽度',
          columns_align:'对齐',
          columns_align_left:'靠左',
          columns_align_center:'居中',
          columns_align_right:'靠右',
          columns_type:'类型',
          columns_type_selection:'多选',
          columns_type_index:'行号',
          columns_type_container:'容器',
          columns_formatter:'格式函数',
          columns_formatter_description:'第一个参数时context,第二个为undefined,第三个为row,第四个为column,第五个为值,第六个为index',
        },
        tabs:{
          name: '标签页',
          type:'类型',
          type_card:'卡片',
          'type_border-card':'边框卡片',
          'tab-position':'位置',
          'tab-position_top':'顶部',
          'tab-position_right':'右边',
          'tab-position_bottom':'底部',
          'tab-position_left':'左边',
          stretch:'自动撑开',
          tabs:'标签页',
          tabs_label:'标签',
        },
      },
    },
    install: {
      installPlugin: {
        pallet: '面板',
        componentTree: '组件树',
        dataEditor: '数据',
        computedEditor: '计算属性',
        methodEditor: '方法',
        apiEditor: 'API',
        lifecycleEditor: '生命周期',
        sourceCode: '源代码'
      }
    }
  }
}
