import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { enableBatching } from 'redux-batched-actions';
import hideSideReducer from './views/Side/reducers/hideSideReducer';
import customerReducer from './views/Customer/reducers/customerReducer';
import phaseAndTimeReducer from './views/Customer/reducers/phaseAndTimeReducer';
import customerTypeCountReducer from './views/Customer/reducers/customerTypeCountReducer';
import customerDetailReducer from './views/Customer/reducers/customerDetailReducer';
import saleManageReducer from './views/Sale/reducers/saleManageReducer';
import staffReducer from './views/Staff/reducers/staffReducer';

const reducers = combineReducers({
    hideSideReducer,
    customerReducer,
    phaseAndTimeReducer,
    customerTypeCountReducer,
    customerDetailReducer,
    saleManageReducer,
    staffReducer,
});
const store = createStore(
    enableBatching(reducers), /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ ?
        compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__(),
        ) :
        applyMiddleware(thunk),
);

export default store;