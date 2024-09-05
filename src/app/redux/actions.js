import {UPDATE_PATH, GET_PATH, UPDATE_FDS, GET_FDS, UPDATE_INVESTMENTS, GET_INVESTMENTS} from './actionTypes'


export const updatePath = content => ({
    type: UPDATE_PATH,
    payload: content
})

export const getPath = (content) => ({
    type: GET_PATH
})

export const updateFDs = content => ({
    type: UPDATE_FDS,
    payload: content
})

export const getFDs = (content) => ({
    type: GET_FDS
})

export const updateInvestments = content => ({
    type: UPDATE_INVESTMENTS,
    payload: content
})

export const getInvestments = (content) => ({
    type: GET_INVESTMENTS
})