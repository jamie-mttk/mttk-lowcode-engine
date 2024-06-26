import {computed} from 'vue'
import { useWindowSize } from '@vueuse/core'

//Deep copy
export function deepCopy(obj) {
  //防止为undefined
  if (obj == undefined) {
    return obj
  }
  if (!(typeof obj === 'object')) {
    return obj
  }
  //
  if (Array.isArray(obj)) {
    //console.log('2:'+JSON.stringify(obj))
    const result = []
    obj.map((item) => {
      result.push(deepCopy(item))
    })
    //
    return result
  } else {
    // Create the cloned object
    const result = {}
    Object.keys(obj).map((key) => {
      result[key] = deepCopy(obj[key])
    })
    return result
  }
}

/**Create unique string
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536 + '')
  return (+(randomNum + timestamp)).toString(32)
}

//Format mongodb returned date
export function formatMongoDate(raw) {
  if (raw && typeof raw == 'object') {
    const d: string = raw['$date']
    if (d) {
      //format 2023-05-10T13:42:09.617Z
      return d.substring(0, 10) + ' ' + d.substring(11, 19)
    }
  }
  //
  return raw
}

export function generateRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16)
  return '#' + randomColor
}

//JSON.parse smart version
//Sicne JSON.parse paramters should be 100% restricted to JSON spec, the key should be wrapped with double quotation mark;
//This function support JS script like JSON parse
export function smartJsonParse(str: string) {
  return new Function('return ' + str)()
}


//Check whether the input is a Promise
export function isPromise(value: any) {
  return typeof value.then == "function" && typeof value.catch == "function";
}
//whether the input is a number/float
export function isNumber(str) {
	return /^[0-9]+.?[0-9]*$/.test(str);
}

//Check whether it is running inside mobile
export function isMobile(maxWidth=768){
  const { width } = useWindowSize()
  return computed(()=>width.value<maxWidth)
}