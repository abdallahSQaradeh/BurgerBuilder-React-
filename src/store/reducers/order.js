import * as actionTypes from "../actions/actionTypes";
import { updateobject } from "../../shared/utility";
const initialState = {
  orders: [],
  loading: false,
  purcased: false,
};
const purchaseInit = (state, action) => {
  return updateobject(state, { purchased: false });
};
const purchaseBurgerStart = (state, action) => {
  return updateobject(state, { loading: true });
};
const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateobject(action.orderData, { id: action.orderId });
  return updateobject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true,
  });
};
const purchaseBurgerFail = (state, action) => {
  return updateobject(state, { loading: false });
};
const fetchOrdersStart = (state, action) => {
  return updateobject(state, { loading: true });
};
const fetchOrdersSuccess = (state, action) => {
  return updateobject(state, { orders: action.orders, loading: false });
};
const fetchOrdersFail = (state, action) => {
  return updateobject(state, { loading: false });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    default:
      return state;
  }
};
export default reducer;
