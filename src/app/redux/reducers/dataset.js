import {GET_FDS, UPDATE_FDS, GET_INVESTMENTS, UPDATE_INVESTMENTS, CLEANUP_ALL, GET_DATA_AVAILABILITY, SET_DATA_AVAILABILITY, GET_INVALIDSHEET, SET_INVALIDSHEET} from '../actionTypes';
import {initialStateFDMetadata} from '../../../utils/const/FDConst';
import {initialStateInvestmentMetadata} from '../../../utils/const/InvestmentConst';

const initialState = {
    'fds': {
        'fdData': [],
        'fdMetadata': {"widgets": initialStateFDMetadata, "fields": []}
    },
    'investments': {
        'investmentData': [],
        'investmentMetadata': {'widgets': initialStateInvestmentMetadata, 'fields': []}
    },
    'isDataAvailable': false,
    'invalidSheet': false
}


export default function dataset(state = initialState, action) {
    switch(action.type) {
        case GET_FDS:
            return action.payload !== undefined ? action.payload : state;
        case GET_DATA_AVAILABILITY:
            return action.payload !== undefined ? action.payload : state;
        case SET_DATA_AVAILABILITY:
            return {
                ...state,
                'isDataAvailable': action.payload
            };
        case GET_INVALIDSHEET:
            return action.payload !== undefined ? action.payload : state;
        case SET_INVALIDSHEET:
            return {
                ...state,
                'invalidSheet': action.payload
            };
        case UPDATE_FDS:
            return {
                ...state,
                'fds': {
                    'fdData': action.payload.data,
                    'fdMetadata': {
                        'widgets': initialStateFDMetadata,
                        'fields': action.payload.fields
                    }
                }
            };
        case GET_INVESTMENTS:
            return action.payload !== undefined ? action.payload : state;
        case UPDATE_INVESTMENTS:
            return {
                ...state,
                'investments': {
                    'investmentData': action.payload.data,
                    'investmentMetadata': {
                        'widgets': initialStateInvestmentMetadata,
                        'fields': action.payload.fields
                    }
                }
            };
        case CLEANUP_ALL:
            return {
                'fds': initialState.fds,
                'investments': initialState.investments,
                'isDataAvailable': false
            };
        default:
            return state
    }
}