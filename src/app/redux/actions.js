import {UPDATE_FDS, GET_FDS, UPDATE_INVESTMENTS, GET_INVESTMENTS, CLEANUP_ALL, GET_DATA_AVAILABILITY, SET_DATA_AVAILABILITY, GET_INVALIDSHEET, SET_INVALIDSHEET} from './actionTypes'

export const updateFDs = content => ({
    type: UPDATE_FDS,
    payload: content
})

export const getFDs = () => ({
    type: GET_FDS
})

export const updateInvestments = content => ({
    type: UPDATE_INVESTMENTS,
    payload: content
})

export const getInvestments = () => ({
    type: GET_INVESTMENTS
})

export const cleanUpAll = () => ({
    type: CLEANUP_ALL
})

export const getDataAvailability = () => ({
    type: GET_DATA_AVAILABILITY
})

export const setDataAvailability = content => ({
    type: SET_DATA_AVAILABILITY,
    payload: content
})

export const getInvalidSheet = () => ({
    type: GET_INVALIDSHEET
})

export const setInvalidSheet = content => ({
    type: SET_INVALIDSHEET,
    payload: content
})