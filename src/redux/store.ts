import {configureStore} from "@reduxjs/toolkit"
import semestersReducer from "./slice"

function loadFromLocalStorage() {
  try {
    const saved_Data = localStorage.getItem("ISBAT_GPA_calculator_results"); 
    if (!saved_Data) return undefined;  
    const loaded_Data = JSON.parse(saved_Data)         
    return {semesters: loaded_Data}; 
  } catch {
    return undefined;  
  }
}

export const store = configureStore({
    reducer: {
        semesters: semestersReducer,
    },
    preloadedState: loadFromLocalStorage(),
})


store.subscribe(() => {
  localStorage.setItem("ISBAT_GPA_calculator_results", JSON.stringify(store.getState().semesters) );
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;