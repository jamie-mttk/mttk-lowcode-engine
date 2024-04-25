import * as transformUtil from '@/context/globalContext/componentRepository/util/transformUtil'

export function layoutTransform({ config, fullConfig }) {
  //
  const result = transformUtil.buildWidget('el-row', { config })
  // result['@componentChoosed']=function(){
  //   console.log('~~~~~~~~~~~~~')
  // }
  // result.style = { 'align-content': 'flex-start' }

  //build default
  result['#'] = buildCols(config)
  //
    // console.log(result)
  //
  return result
}

function buildCols(config: any) {
  const cols = [] as object[]

  //
  for (const c of config['_container'] || []) {
    cols.push(buildCol(c))
  }
  //
  return cols
}
function buildCol(c: any) {
  //:{...c,xs:24}
  const r = transformUtil.buildWidgetWithDefaultSlot('el-col', { config: c })
  //set xs=24 so it will display better in mobile screen
  r['xs'] = 24
  // r['@componentChoosed']=function(){
  //   console.log('~~~~~~~~~~~@@@~~')
  // }
  return r
}
