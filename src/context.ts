let currentContext: ComponentIns | undefined = undefined

export function setCurrentContext (context: ComponentIns) {
  currentContext = context

}

export function unsetCurrentContext () {
  currentContext = undefined
}

export function getCurrentContext () {
  return currentContext
}
