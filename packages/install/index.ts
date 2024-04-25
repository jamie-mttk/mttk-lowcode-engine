import {installBasis} from './installBasis'
 import {installDesigner} from './installDesigner'
 import {installPlugin} from './installPlugin'
 import {installRouter} from './installRouter'

 import {installBuiltIn} from '../builtIn/index'

 function installAll(app,router?, option?){

   router=installRouter(app, router)

    const { globalContext } =installBasis(app,router, option)
    installDesigner(globalContext)
   // installI18n(globalContext)
   installPlugin(globalContext,option)
   installBuiltIn(globalContext)
   //
   return {globalContext}
}
 //
 export {installBasis,installDesigner,installPlugin,installRouter,installBuiltIn,installAll}
