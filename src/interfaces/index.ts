export interface GpaAttributes {
  unitName: string;
  credit: number;
  iaMarks: number;
  ueMarks: number;
  totalScore?: number;
  grade: string;
  points: number;
  weightedGradePoints: number;
}

export interface GpaAttributesForm {
  unitName: string;
  credit: string ;
  iaMarks: string ;
  ueMarks: string ;
  totalScore?: number;
  grade?: string;
  points?: number;
  weightedGradePoints?: number;
}

export interface AddGPA {
    setResults: (results: any) => void
    results: any
}

export interface EditGPA {
    id: string; 
    rowIndex: number;
    rowData: any
}

export interface OldEditGPA {
    setResults: (results: any) => void;
    rowIndex: number;
    rowData: any
}

export interface resetGPA {
    id: string;
}

export interface OldresetGPA {
    setResults: (results: any) => void
}


export interface exportResults {
    results: any;
    gpa: number;
    totalCredit: number;
    totalGradePoints: number;
}





export const initialResults = {
    unitName: "",
    credit: "",
    iaMarks: "",
    ueMarks: "",
    totalScore: 0,
    grade: "",
    points: 0,
    weightedGradePoints: 0,
}


export interface SemesterAttributes {
  id: string;
  name: string;
  results: any[];
  gpa: number | null;
}

export interface SemesterTableData{
  id: string;
  results: GpaAttributes[];
}





export const dummyResults = [
  {
    unitName: "Computer Programming",
    credit: 3,
    iaMarks: 25,
    ueMarks: 60,
    totalScore: 85,
    grade: "A",
    weightedGradePoints: 12, // 4.0 * 3 credits
  },
  {
    unitName: "Database Systems",
    credit: 4,
    iaMarks: 22,
    ueMarks: 55,
    totalScore: 77,
    grade: "B+",
    weightedGradePoints: 14, // 3.5 * 4 credits
  },
  {
    unitName: "Web Development",
    credit: 3,
    iaMarks: 18,
    ueMarks: 50,
    totalScore: 68,
    grade: "B",
    weightedGradePoints: 9, // 3.0 * 3 credits
  },
  {
    unitName: "Data Structures",
    credit: 3,
    iaMarks: 20,
    ueMarks: 45,
    totalScore: 65,
    grade: "C+",
    weightedGradePoints: 7.5, // 2.5 * 3 credits
  },
];


export const initialSemesters: SemesterAttributes[] = [
  {id: "sem 1", name: "Semester 1", results: [], gpa: null},
  {id: "sem 2", name: "Semester 2", results: [], gpa: null},
  {id: "sem 3", name: "Semester 3", results: [], gpa: null},
  {id: "sem 4", name: "Semester 4", results: [], gpa: null},
  {id: "sem 5", name: "Semester 5", results: [], gpa: null},
  {id: "sem 6", name: "Semester 6", results: [], gpa: null},
  {id: "sem 7", name: "Semester 7", results: [], gpa: null},
  {id: "sem 8", name: "Semester 8", results: [], gpa: null},
  {id: "sem 9", name: "Semester 9", results: [], gpa: null},
  {id: "sem 10", name: "Semester 10", results: [], gpa: null},
]