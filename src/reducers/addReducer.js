import types from '../action/actionType'
const initialState = {
    counter: ''
}
const addReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_COUNTER:
            return { ...state, counter: action.payload }
        default: return state.counter
    }

}

export default addReducer;