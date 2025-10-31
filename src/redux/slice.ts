import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GpaAttributes, initialSemesters, SemesterAttributes } from "@/interfaces"
import AddResults from "@/components/Table/AddResults";

const semesterSlice = createSlice({
    name: "semesters",
    initialState: initialSemesters,
    reducers: {
       addSemester: (state, action: PayloadAction<{ name: string }>) => {
        const newSemester: SemesterAttributes = {
          id: `sem ${state.length + 1}`,
          name: action.payload.name,
          results: [], 
          gpa: null, 
        };
        state.push(newSemester);
        },

        removeSemester: (state, action: PayloadAction<{ id: string }>) => {
          return state.filter(sem => sem.id !== action.payload.id);
        },

        updateSemesterName: (state, action: PayloadAction<{ id: string; name: string }>) => {
          const sem = state.find(s => s.id === action.payload.id);
          if (sem) sem.name = action.payload.name;
        },

        setSemesterGPA: (state, action: PayloadAction<{ id: string; gpa: number | null }>) => {
          const sem = state.find(s => s.id === action.payload.id);
          if (sem) sem.gpa = action.payload.gpa;
        },

        addResults: (state, action: PayloadAction<{ id: string; results: GpaAttributes }>) => {
          const sem = state.find(s => s.id === action.payload.id);

          if (sem) sem.results.push(action.payload.results);
          //if (sem) sem.results = [...sem.results, action.payload.results];
        },

        updateResults: (state, action: PayloadAction<{ id: string; index: number; results: GpaAttributes }>) => {
          const sem = state.find(s => s.id === action.payload.id);
          if (sem && sem.results[action.payload.index]) {
            sem.results[action.payload.index] = action.payload.results;
          }
        },

        removeResults: (state, action: PayloadAction<{ id: string; index: number }>) => {
          const sem = state.find(s => s.id === action.payload.id);
          if (sem) sem.results.splice(action.payload.index, 1);
        },


        updateSemesterResults: (state, action: PayloadAction<{ id: string; results: GpaAttributes[] }>) => {
          const sem = state.find(s => s.id === action.payload.id);
          if (sem) sem.results = action.payload.results;
        },

        resetSemesterResults: (state, action: PayloadAction<{ id: string }>) => {
          const sem = state.find(s => s.id === action.payload.id);
          if (sem) {
            sem.results = [];
            sem.gpa = null;  
          }
        },
    }
  }
)


export const { addSemester, updateSemesterName, setSemesterGPA, removeSemester, 
  updateSemesterResults, addResults, updateResults, removeResults, 
  resetSemesterResults } = semesterSlice.actions;
export default semesterSlice.reducer;