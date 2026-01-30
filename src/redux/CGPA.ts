import { SemesterAttributes } from "@/interfaces";
import { RootState } from "./store"; // redux store type

export const Calculate_CGPA = (state: RootState) => {
  
  const validSemesters = state.semesters.filter((sem: SemesterAttributes) => sem.gpa !== null);
  if (validSemesters.length === 0) return 0;

  const total_points = validSemesters.reduce((sum: number, sem: SemesterAttributes) => sum + (sem.totalPoints ?? 0), 0);
  const total_credit = validSemesters.reduce((sum: number, sem: SemesterAttributes) => sum + (sem.totalCredits ?? 0), 0);
  return total_points / total_credit;
};
