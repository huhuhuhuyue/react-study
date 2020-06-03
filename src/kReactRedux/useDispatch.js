import useStore from './useStore'
export default function useDispatch() {
  const {dispatch} = useStore()  // useStore()的返回值是对象：{dispatch: ƒ, getState: ƒ, subscribe: ƒ}
  return dispatch
}
