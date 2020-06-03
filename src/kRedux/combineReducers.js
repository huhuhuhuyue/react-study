// 接收一个对象作为参数createStore(combineReducers({counterReducer, numReducer, toggleReducer}))，参数的每一项都是reducer
export default function combineReducers (reducers) {
  // console.log(reducers)
  // combination的第一个参数是一个总的state，所以默认值是一个对象
  return function combination(state = {}, action) {
    let nextState = {}
    let hasChanged = false
    for (let key in reducers) {
      const reducer = reducers[key]
      const prevState = state[key]
      const nextStateVal = reducer(prevState, action)
      nextState[key] = nextStateVal
      hasChanged = hasChanged || nextStateVal !== prevState
    }
    hasChanged = hasChanged || Object.keys(reducers).length !== Object.keys(state).length
    return hasChanged ? nextState : state
  };
}