import { combineReducers, legacy_createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './auth/reducer';
import restaurantReducer from './restaurant/reducer';
import orderReducer from './order/reducer';
import menuReducer from './menu/reducer';
import cartReducer from './cart/reducer';
import userReducer from './user/reducer';
import eventReducer from './event/reducer';
import messageReducer from './message/reducer';
import categoryReducer from './category/reducer';
import ingredientReducer from './ingredient/reducer';
import { LOGOUT } from './auth/action-types'; // import your LOGOUT type

// Combine all reducers
const appReducer = combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer,
    order: orderReducer,
    menu: menuReducer,
    cart: cartReducer,
    user: userReducer,
    event: eventReducer,
    message: messageReducer,
    category: categoryReducer,
    ingredient: ingredientReducer
});

// Wrap combined reducers to reset state on logout
const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        localStorage.removeItem('token');
        state = undefined; 
    }
    return appReducer(state, action);
};

// Create store with thunk middleware
const store = legacy_createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export { store };
