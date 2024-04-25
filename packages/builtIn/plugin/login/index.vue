<template>
  <div class="login-container">
    <dvi class="login-area">
      <div class="login-form">
        <h2 >{{ $t('_.plugin.login.title') }}
          <localeChooser style="line-height:32px;margin-left:8px;"></localeChooser>
        </h2>
        <el-form ref="loginFormRef" :model="loginData" size="large" label-position="top">
          <el-form-item prop="username" :label="$t('_.plugin.login.username')"  required>
            <el-input clearable v-model="loginData.username" :placeholder="$t('_.plugin.login.usernamePlaceholder')">
              <template #prefix>
                <lc-icon icon="mdiAccount"></lc-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" :label="$t('_.plugin.login.password')" required>
            <el-input clearable show-password v-model="loginData.password" :placeholder="$t('_.plugin.login.passwordPlaceholder')">
              <template #prefix>
                <lc-icon icon="mdiLock"></lc-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="large" type="primary" style="width: 100%" @click="handleLogin"
              >{{ $t('_.plugin.login.login') }}
            </el-button>
          </el-form-item>
          <el-form-item>
            <span style="color: var(--el-color-error)" v-if="showLoginError"
              >{{ $t('_.plugin.login.loginFail') }}</span
            >
          </el-form-item>
        </el-form>
      </div>
    </dvi>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, inject } from 'vue'
import { login } from '@/utils/authentication'
import localeChooser from '@/lang/localeChooser.vue'
//
const globalContext = inject('globalContext')
//

//Refer to form
const loginFormRef = ref()
//
const loginData = reactive({
  username: '',
  password: ''
})
//
//
const showLoginError = ref(false)
//
const router =globalContext.router
//
function handleLogin() {
    loginFormRef.value.validate((valid,) => {
        showLoginError.value = false
        //
        if (!valid) {
            return
        }
        //
        login(globalContext, loginData).then( ()=> {
            //forward to redirect from URL or root page
            router.push(globalContext.router.currentRoute.value.query?.redirect||'/')
        }).catch( (error)=> {
            console.log(error)
            showLoginError.value = true
        })



    })
}
</script>
<style type="scss" scoped>
:deep(.el-input__inner)  {
  box-shadow: 0 0 0 1000px #fff inset;
}
.login-bg {
  position: fixed;
  height: 100%;
  width: 100%;
  opacity: 0.1;
  left: 0;
  bottom: 0;
  z-index: -1;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--el-fill-color-lighter);
  .login-area {
    display: block;
    min-width: 30%;
    width:480px;
    min-height: 50vh;
    height:420px;
    margin: auto auto;
    background-color: var(--el-color-white);
    border-radius: 8px;
    .login-form {
      padding: 40px 60px 0px 60px;
    }
  }
}
</style>
