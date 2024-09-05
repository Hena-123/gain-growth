import { configureStore } from '@reduxjs/toolkit'
import connectReducer from "../redux/reducers/index";

export default configureStore({
    reducer: {
        connectReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})