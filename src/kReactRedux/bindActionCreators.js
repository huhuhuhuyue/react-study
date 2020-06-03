export default function bindActionCreators (creators, dispatch) {
  let obj = {}
  for (let key in creators) {
    obj[key] = (...args) => dispatch(creators[key](...args))
  }
  return obj
}