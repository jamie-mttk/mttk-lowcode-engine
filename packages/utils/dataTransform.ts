import { ElMessage } from 'element-plus'
import {smartJsonParse} from './tools'
import {t} from '@/lang/index'
//Try to conver dataContent to the required dataType
export function tryConvertDataType(dataKey:string,dataType: string, dataContent: string) {
    if (dataType == 'Array') {
      const result =smartJsonParse(dataContent)
      if (Array.isArray(result)) {
        return result;
      }

      ElMessage.error(t('_.utils.dataTransform.error1',[dataKey,dataType]))
      return undefined
    } else if (dataType == 'Object') {
      const result = smartJsonParse(dataContent)
      if (typeof result == 'object' && !Array.isArray(result)) {
        return result;
      }
      //
      ElMessage.error(t('_.utils.dataTransform.error2',[dataKey,dataType]))
      return undefined
    } else if (dataType == 'String') {
      return dataContent
    } else if (dataType == 'Number') {
      return Number(dataContent)
    } else if (dataType == 'Boolean') {
      //
      // console.log(typeof dataContent,dataContent,Boolean(dataContent))
      return dataContent!=undefined  && dataContent!='false'
    } else {
      return undefined;
  
    }
  }