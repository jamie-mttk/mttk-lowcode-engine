import { isNumber } from '../../../utils/tools'
import { computed } from 'vue'

export const gridWidth = computed(() => (context: any) => {
  return context.codeManager.getCode().settingAbsolute?.gridWidth || 64
})

//Floor value to grid width if needed
export function alignToGrid(styleText, context) {
  //
  const value = typeof styleText == 'number' ? styleText : parseStyleValue(styleText)
  //

  if (!value) {
    //parse failed,return raw style text directly
    return styleText
  }
  if (!context.codeManager.getCode().settingAbsolute?.alignToGrid) {
    //Here we should append px sinec the input styleText may be a number
    return value + 'px'
  }
  //
  const gw = gridWidth.value(context)

  //0.5 is the align threashold,this can avoid a small movement to trigger a gridwidth change
  return Math.floor((value + 0.5 * gw) / gw) * gw + 'px'
}

//if input is 200px,return 200;otherwise return defaultVal
//default value :number
//this means if the input is 100% or empty ,defaultVal will be returned
//this will cause 100% can be resize to xxxpz
export function parseStyleValue(styleText, defaultVal?) {
  if (
    !styleText ||
    typeof styleText != 'string' ||
    !styleText.endsWith('px') ||
    styleText.length <= 2
  ) {
    return defaultVal
  }
  //
  const value = styleText.substring(0, styleText.length - 2)
  // console.log(value,isNUmber(value),parseInt(value))
  if (!isNumber(value)) {
    //please note: parseFloat(20abc4 ) will return 20,so we should check whther it is a number first
    return defaultVal
  }
  //
  return parseFloat(value)
}
