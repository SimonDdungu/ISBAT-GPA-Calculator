import {configureStore} from "@reduxjs/toolkit"
import semestersReducer from "./slice"

export const store = configureStore({
    reducer: {
        semesters: semestersReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;