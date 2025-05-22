const redux = require('redux');
const createStore = redux.createStore; // older one was createStore, newer configureStore
const bindActionCreators = redux.bindActionCreators;


const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

//this is an action creator, creates an action required for a redux/react application, action is an object with a property type which has string value as its value
function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

function orderIceCream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function restockIceCream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

//this is a reducer, which takes into account the previous state, sees what the action is doing and then returns a new state

// (prevState, action) => newState
const initialCakeState = {
    numOfCakes: 10
}
const initialIceCreamState = {
    numOfIceCreams: 10
}
const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state, // (spread operator),this creates a copy of the OG object and only chnges the property that needs to be changed, kind of like when we update an entity in .net
                numOfCakes: state.numOfCakes - 1
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state
    }
};

const icecreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state, // (spread operator),this creates a copy of the OG object and only chnges the property that needs to be changed, kind of like when we update an entity in .net
                numOfIceCreams: state.numOfIceCreams - 1
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
        default:
            return state
    }
};

const rootReducer = redux.combineReducers({
    cake:cakeReducer,
    icecream:icecreamReducer
})
//following is the store, which holds the state of the application

const store = createStore(rootReducer);

console.log('initial state', store.getState())

const unsubscribe = store.subscribe(() => console.log("updated state", store.getState()));
//dispatching the action, using the store as it stores the application's state
const action = bindActionCreators({ orderCake, restockCake,orderIceCream,restockIceCream }, store.dispatch)
action.orderCake()
action.orderCake()
action.orderCake()
action.orderIceCream(3)
action.orderIceCream(2)

action.restockCake(2)
action.restockCake(2)
action.restockCake(2)
action.restockCake(2)
action.restockIceCream(4)


unsubscribe()
