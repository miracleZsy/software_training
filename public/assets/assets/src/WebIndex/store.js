import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { enableBatching } from 'redux-batched-actions';
import hideSideReducer from './views/Side/reducers/hideSideReducer';
import customerReducer from './views/Customer/reducers/customerReducer';

const reducers = combineReducers({
    hideSideReducer,
    customerReducer
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