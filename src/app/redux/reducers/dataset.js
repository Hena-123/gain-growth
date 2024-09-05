import {GET_FDS, UPDATE_FDS} from '../actionTypes';
import {GET_INVESTMENTS, UPDATE_INVESTMENTS} from '../actionTypes';
import {GET_PATH, UPDATE_PATH} from '../actionTypes';
import {initialStateFDMetadata} from '../../../utils/const/FDConst';
import {initialStateInvestmentMetadata} from '../../../utils/const/InvestmentConst';

const initialState = {
    'sheets': [],
    'fdData': [],
    'fdMetadata': {"widgets": initialStateFDMetadata, "fields": []},
    'investmentData': [],
    'investmentMetadata': {'widgets': initialStateInvestmentMetadata, 'fields': []}
}


export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PATH:
            return action.payload !== undefined ? action.payload : state;
        case UPDATE_PATH:
            return {...state, 'sheets': action.payload.sheets};
        case GET_FDS:
            return action.payload !== undefined ? action.payload : state;
        case UPDATE_FDS:
            return {
                ...state,
                'fdData': action.payload.data,
                'fdMetadata': {
                    'widgets': initialStateFDMetadata,
                    'fields': action.payload.fields
                }
            };
        case GET_INVESTMENTS:
            return action.payload !== undefined ? action.payload : state;
        case UPDATE_INVESTMENTS:
            return {
                ...state,
                'investmentData': action.payload.data,
                'investmentMetadata': {
                    'widgets': initialStateInvestmentMetadata,
                    'fields': action.payload.fields
                }
            };
        default:
            return state
    }
}