import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage, ElMessageBox } from 'element-plus'
import { loginState, reset } from './authentication'
import { t } from '@/lang/index'
export default function createRequest(baseUrl: string = '') {
  //
  NProgress.configure({ showSpinner: true })
  // create an axios instance
  const request = axios.create({
    baseURL: baseUrl,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 120000
  })

  // request interceptor
  request.interceptors.request.use(
    (config) => {
      NProgress.start()
      //Add X-Token
      if (loginState.value.token) {
        config.headers['X-Token'] = loginState.value.token
      }
      //
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // response interceptor
  request.interceptors.response.use(
    (response) => {
      //
      NProgress.done()
      //
      if (response.config.fullResponse) {
        // console.log(response)
        //fullResponse means return all reponse with headers and more
        return response
      } else {
        const res = response.data
        //
        return res
      }
    },
    (error) => {
      //
      NProgress.done()

      const response = error.response

      if (response.status === 401) {
        ElMessageBox.confirm(t('_.utils.requestCreator.notLoginPrompt'), t('_._.confirm'), {
          confirmButtonText: t('_.utils.requestCreator.relogin'),
          cancelButtonText: t('_._.cancel'),
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
          //

          reset()
          //
          location.reload()
        })
      } else if (response.status === 403) {
  
        ElMessageBox.alert(
          t('_.utils.requestCreator.unAUth',[response.request.responseURL]),
          t('_._.confirm')
        )
        //
        return
      } else {
        //
        //console.log(error);
        //
        const msg =
          error.config.method +
          ' ' +
          error.config.url +
          ':' +
          (error.response?.status || 'none') +
          '<br>' +
          error.message

        //
        showErrorInfo(msg)
      }
      //
      //
      return Promise.reject(error)
    }
  )

  //显示错误信息
  function showErrorInfo(errorInfo) {
    ElMessage({
      type: 'error',
      dangerouslyUseHTMLString: true,
      message: errorInfo
    })
  }
  //
  return request
}
