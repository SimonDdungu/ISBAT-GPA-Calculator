import * as Yup from "yup";

export const AddResultsValidation = Yup.object().shape({
  unitName: Yup.string().required("Unit name is required"),
  credit: Yup.number().required("Credit is required").min(1, "Credit must be at least 1").max(10, "Credit cannot exceed 10").integer("Credit must be a whole number"),
  iaMarks: Yup.number().required("IA Marks required").min(0, "IA Marks must be at least 0").max(30, "IA Marks cannot exceed 30 Marks").integer("IA Marks must be a whole number"),
  ueMarks: Yup.number().required("UE Marks required").min(0, "UE Marks must be at least 0").max(70, "UE Marks cannot exceed 70 Marks").integer("UE Marks must be a whole number"),
});