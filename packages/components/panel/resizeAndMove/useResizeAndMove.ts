import { computed, ref, inject, unref } from 'vue'
import { alignToGrid, parseStyleValue } from '../absolute/util'
import { useElementBounding } from '@vueuse/core'

import { useMouse } from '@vueuse/core'

export default function useResizeAndMove(modelValue) {
  //
  const context = inject('context')
  //
  const contextWrap = inject('contextWrap')

  //Choosed item
  const choosed = computed(() => context.choosedManager.get())
  //Whether it is editable
  const editable = computed(() => context.mode.value == 'edit')
  //Record mouse position
  const { x: mouseX, y: mouseY } = useMouse()
  //
  //action flag ''/move/resize-xxx
  const actionFlag = ref('')

  //Record the initial position of sizing or moving(x/y does not make sense)
  const orginRecord = {
    startX: 0,
    startY: 0,
    left: 0,
    top: 0,
    width: 0,
    height: 0
  }
  //Record the event add into document during trigger move/resize, so it can be released/removed while mouse up
  let eventListenerMouseMove = undefined
  let eventListenerMouseUp = undefined
  //Return true if the choosed component is the firt level child of this panel
  function isThisPanelChoosed() {
    if (!choosed.value) {
      return false
    }
    for (const component of unref(modelValue) || []) {
      if (component.key == choosed.value.key) {
        return true
      }
    }
    return false
  }
  function initEventListener() {
    // eventListenerMouseMove =  useDebounceFn(() => {
    //   handleMouseMove()
    // }, 10)

    eventListenerMouseMove = () => {
      handleMouseMove()
    }
    //
    eventListenerMouseUp = function () {
      document.removeEventListener('mousemove', eventListenerMouseMove)
      document.removeEventListener('mouseup', eventListenerMouseUp)
      //
      trggerDone()
    }
    //
    document.addEventListener('mousemove', eventListenerMouseMove, true)
    document.addEventListener('mouseup', eventListenerMouseUp, true)
  }

  //Start move
  function triggerMove() {
    //
    if (!editable.value) {
      //Not allow to move
      return
    }
    //
    actionFlag.value = 'move'
    initEventListener()
    //
    //Record move start position
    orginRecord.startX = mouseX.value
    orginRecord.startY = mouseY.value
    //
    orginRecord.left = parseStyleValue(choosed.value.config?.display?.style.left) || 0
    orginRecord.top = parseStyleValue(choosed.value.config?.display?.style.top) || 0
  }

  //resize-lt/resize-lc/resize-lb/resize-rt/resize-rc/resize-rb/resize-ct/resize-cb
  function trggerResize(type) {
    //
    if (!editable.value) {
      //Not allow to resize
      return
    }

    //set running mode
    actionFlag.value = type
    initEventListener()
    //Current mouse position
    orginRecord.startX = mouseX.value
    orginRecord.startY = mouseY.value
    //Component original position
    orginRecord.left = parseStyleValue(choosed.value.config?.display?.style.left, 0)
    orginRecord.top = parseStyleValue(choosed.value.config?.display?.style.top, 0)
    orginRecord.width = parseStyleValue(
      choosed.value.config?.display?.style.width,
      choosedBounding.value.width.value
    )
    orginRecord.height = parseStyleValue(
      choosed.value.config?.display?.style.height,
      choosedBounding.value.height.value
    )
  }

  //Mouse move
  function handleMouseMove() {
    if (!actionFlag.value) {
      return
    }
    if (!choosed.value || choosed.value.type == '_container') {
      return
    }
    if (actionFlag.value == 'move') {
      //This means the user is trying to move the component
      //  Calculuate the moving distance from current position to start moving position
      const dx = mouseX.value - orginRecord.startX || 0,
        dy = mouseY.value - orginRecord.startY || 0

      //
      const x = orginRecord.left + dx,
        y = orginRecord.top + dy
      //
      context.choosedManager.get().config.display.style.left = x + 'px'
      context.choosedManager.get().config.display.style.top = y + 'px'
      //
      // console.log(dx,dy,x,y)
    } else if (actionFlag.value.includes('resize')) {
      //This means user is trying to resize
      //The current position of the mouse

      // Calcuate distance moved from start position
      let dx = mouseX.value - orginRecord.startX || 0,
        dy = mouseY.value - orginRecord.startY || 0
      //
      // console.log(flag.value,pageX, pageY,orginRecord.startX,orginRecord.startY,dx,dy)
      //Calcuate position based on resize type
      switch (actionFlag.value) {
        // left/top
        case 'resize-lt':
          //Please note: all the calculation are based on the start moving position
          //orginRecord.left /y is the current position, context.choosedManager.get().config.display.style.left/y is the position after moved
          context.choosedManager.get().config.display.style.top = orginRecord.top + dy + 'px'
          context.choosedManager.get().config.display.style.left = orginRecord.left + dx + 'px'
          dx = -dx
          dy = -dy
          break

        // top/center
        case 'resize-ct':
          context.choosedManager.get().config.display.style.top = orginRecord.top + dy + 'px'
          dx = 0
          dy = -dy
          break

        //top/right
        case 'resize-rt':
          context.choosedManager.get().config.display.style.top = orginRecord.top + dy + 'px'
          dy = -dy
          break

        // center/left
        case 'resize-lc':
          console.log(dy)
          context.choosedManager.get().config.display.style.left = orginRecord.left + dx + 'px'
          dy = 0
          dx = -dx
          break

        // center/right
        case 'resize-rc':
          // console.log(dx);
          dy = 0
          break

        // bottom/center
        case 'resize-cb':
          dx = 0
          break
        // bottom/left
        case 'resize-lb':
          context.choosedManager.get().config.display.style.left = orginRecord.left + dx + 'px'
          dx = -dx
          break
      }
      // Calculate the width and height
      //orginRecord.width or orginRecord.height is undefined, that means width/height is not like 20px, it may be 100% ,so keep it

      if (Math.abs(dx) > 20) {
        context.choosedManager.get().config.display.style.width = orginRecord.width + dx + 'px'
      }
      if (Math.abs(dy) > 20) {
        context.choosedManager.get().config.display.style.height = orginRecord.height + dy + 'px'
      }
    }
  }

  function trggerDone() {
    //
    if (!choosed.value || choosed.value.type == '_container') {
      return false
    }
    //
    if (actionFlag.value == 'move') {
      //align x and y
      context.choosedManager.get().config.display.style.left = alignToGrid(
        context.choosedManager.get().config.display.style.left,
        context
      )
      context.choosedManager.get().config.display.style.top = alignToGrid(
        context.choosedManager.get().config.display.style.top,
        context
      )
    } else if (actionFlag.value.includes('resize')) {
      const widthTemp = alignToGrid(
        context.choosedManager.get().config.display.style.width,
        context
      )
      if (widthTemp) {
        //to avoid set a empty width
        context.choosedManager.get().config.display.style.width = widthTemp
      }
      const heightTemp = alignToGrid(
        context.choosedManager.get().config.display.style.height,
        context
      )
      if (heightTemp) {
        context.choosedManager.get().config.display.style.height = heightTemp
      }
    }
    //clear flags
    actionFlag.value = ''
  }
  //
  //choose component real width and height
  const choosedBounding = computed(() => {
    const el = contextWrap.getRef(choosed.value.key)
    //Here useElementBounding is better than useElementSize because the width/height returned includes the padding/margin
    return useElementBounding(el)
  })
  //
  return {
    choosed,
    triggerMove,
    trggerResize,
    handleMouseMove,
    trggerDone,
    choosedBounding,
    isThisPanelChoosed
  }
}
