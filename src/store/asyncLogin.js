export const asyncLoginReducer = (state = false, {type, payload = ''}) => {
  switch (type) {
    case "REQUEST":
      return {isLogin: false, loading: true}
    case "ASYNCLOGINSUCESS":
      return {isLogin: true,  ...payload}
    case "ASYNCLOGINFAILURE":
      return {isLogin: false, ...payload}
    default:
      return {isLogin: false}
  }
};