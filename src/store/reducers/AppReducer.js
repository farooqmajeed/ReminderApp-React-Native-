import {
    ADD_ITEM,
    ITEM_NAME,
    ITEM_PLACE,
    VEIW_ITEMS
} from '../actions/types';
const INTIAL_STATE = {
    loading: false
};

export default AppReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case ITEM_NAME:
            return { ...state, name: action.payload };
        case ITEM_PLACE:
            return { ...state, place: action.payload };
        case ADD_ITEM:
            return { ...state, loading: true, addItem: action.payload };
        case VEIW_ITEMS:
            return { ...state, viewItem: action.payload };
        default:
            return state;
    }
};