import { getProductData } from "../services/product";

export default {
  namespace: "example", // namespace值要是唯一的，因为在外面使用effect时需要加上它的namespace，如{type: 'example/getProductData'}

  state: {
    data: [],
    pageSize: 10,
    current: 1,
    total: 0
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // console.log('example')
      // eslint-disable-line
    }
  },

  effects: {
    // *fetch({ payload }, { call, put }) {
    //   // eslint-disable-line
    //   yield put({ type: "save" });
    // },
    *getProductData({ payload }, { call, put }) {
      //
      const res = yield call(getProductData, payload);
      yield put({ type: "productData", payload: res.data });
    }
  },

  reducers: {
    // save(state, action) {
    //   return { ...state, ...action.payload };
    // }
    productData(state, action) {
      return { ...state, data: action.payload.data };
    }
  }
};
