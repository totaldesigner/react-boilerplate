const version = process.env.VERSION
const STORAGE_KEY = `__SERIALIZED_STATE_TREE_v${version}__`

function saveState<T = object>(storeState: T): boolean {
  if (!localStorage) {
    return false
  }

  try {
    const serializedState = JSON.stringify(storeState)
    localStorage.setItem(STORAGE_KEY, serializedState)
    return true
  } catch (error) {
    throw new Error(`store serialization failed`)
  }
}

function loadState<T = object>(): T | undefined {
  if (typeof localStorage === `undefined`) {
    return
  }

  try {
    const serializedState = localStorage.getItem(STORAGE_KEY)
    if (serializedState == null) {
      return
    }
    return JSON.parse(serializedState)
  } catch (error) {
    throw new Error(`store deserialization failed`)
  }
}

export { saveState, loadState }
