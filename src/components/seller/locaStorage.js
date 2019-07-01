export function saveLocal(id, key, value) {
  let store = window.localStorage.store
  if (!store) {
    store = {}
    store[id] = {}
  }else {
    store = JSON.parse(window.localStorage.store)
    if(!store[id]) {
      store[id] = {}
    }
  }
  store[id][key] = value
  window.localStorage.store = JSON.stringify(store)
}

export function getter(id, key, fn) {
  let store = localStorage.store
  if (store) {
    store = JSON.parse(store)
    if(store[id]) {
      let data = store[id][key]
      fn(data)
    } else {
      console.log('没有')
    }
  }
}