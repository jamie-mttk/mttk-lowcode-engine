
import {computed} from 'vue'
import { locale } from "mttk-lowcode-engine";
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
//

 export const aaa=computed(()=> locale.i18n.global.t('_.components.top.title'))