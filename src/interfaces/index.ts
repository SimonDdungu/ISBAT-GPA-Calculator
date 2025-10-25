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
    setResults: (results: any) => void;
    rowIndex: number;
    rowData: any
}

export interface resetGPA {
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