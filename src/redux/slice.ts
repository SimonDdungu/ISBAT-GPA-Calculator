import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GpaAttributes, initialSemesters, SemesterAttributes } from "@/interfaces"
import AddResults from "@/components/Table/AddResults";

const semesterSlice = createSlice({
    name: "semesters",
    initialState: initialSemesters,
    reducers: {
       addSemester: (state) => {
        const index = state.length + 1
        const newSemester: SemesterAttributes = {
          id: `sem ${index}`,
          name: `Semester ${index}`,
          results: [], 
          gpa: null, 
        };
        state.push(newSemester);
        },

        removeSemester: (state, action: PayloadAction<{ index: number }>) => {
          // Remove the semester at the specified index
          state.splice(action.payload.index, 1);

          // Renumber and Rename semesters after removing
          state.forEach((sem, i) => {
            sem.id = `sem ${i + 1}`;
            sem.name = `Semester ${i + 1}`;
          });
        },

        resetAllSemesters: (state) => {
          state.forEach(sem => {
            sem.results = [];
            sem.gpa = null;
          });
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
  resetSemesterResults, resetAllSemesters } = semesterSlice.actions;
export default semesterSlice.reducer;