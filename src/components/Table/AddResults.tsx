"use client"
import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Formik, Form } from 'formik';
import InputField from '../forms/InputField';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { AddGPA, GpaAttributes, GpaAttributesForm } from '@/interfaces';
import { initialResults } from '@/interfaces';
import { AddResultsValidation } from '../Validations/AddResultsValidation';
import InputNumericField from '../forms/InputNumericField';


const AddResults = ({setResults, results}: AddGPA) => {
    const [showDialog, setShowDialog] = useState(false);
    const [newResults, setNewResults] = useState<GpaAttributesForm>(initialResults)

    

    const handleSubmit = (values: GpaAttributesForm) => {
        const credit = parseInt(values.credit, 10) || 0;
        const ia = parseInt(values.iaMarks, 10) || 0;
        const ue = parseInt(values.ueMarks, 10) || 0;

        const totalScore = ia + ue;

        let grade = "";
        let points = 0

        if (totalScore >= 90) {
            grade = "A+";
            points = 5;
        } else if (totalScore >= 80) {
            grade = "A";
            points = 5;
        } else if (totalScore >= 75) {
            grade = "B+";
            points = 4.5;
        } else if (totalScore >= 70) {
            grade = "B";
            points = 4;
        } else if (totalScore >= 65) {
            grade = "C+";
            points = 3.5;
        }else if (totalScore >= 60) {
            grade = "C";
            points = 3;
        }  else if (totalScore >= 55) {
            grade = "D+";
            points = 2.5;
        }else if (totalScore >= 50) {
            grade = "D";
            points = 2;
        } else if (totalScore >= 45) {
            grade = "E";
            points = 1.5;
        } else if (totalScore >= 40) {
            grade = "E-";
            points = 1;
        } else {
            grade = "F";
            points = 0;
        }

        const weightedGradePoints = points * credit



        const validResults: GpaAttributes = {
            unitName: values.unitName,
            credit,
            iaMarks: ia,
            ueMarks: ue,
            totalScore,
            grade,
            points,
            weightedGradePoints,
        };

        setResults([...results, validResults]);
        setNewResults(initialResults);
        setShowDialog(false);
    };

  return (
    <div>

        <button onClick={() => setShowDialog(true)} className="text-xs md:text-sm flex items-center gap-x-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition w-max cursor-pointer">
            <i className="pi pi-plus  md:text-sm text-xs"></i>
            <span>Add Results</span>
        </button>


        <Dialog
            header="Add Course Unit Result"
            visible={showDialog}
            className='w-[90vw] md:w-120'
            modal
            onHide={() => setShowDialog(false)}
        >
        <div className="flex flex-col gap-3">
            <Formik initialValues={newResults} validationSchema={AddResultsValidation} onSubmit={handleSubmit}>
                {({  }) => (
                    <Form className="space-y-2">
                        <InputField name="unitName" label="Unit Name" placeholder="Enter Course Unit Name"/>
                        <InputNumericField name="credit" label="Credit" placeholder="Enter Credit for Course Unit" type="text" inputMode="numeric"  maxLength={1} />
                        <InputNumericField name="iaMarks" label="IA Marks" placeholder="Enter IA Marks Scored" type="text" inputMode="numeric" maxLength={2} />
                        <InputNumericField name="ueMarks" label="UE Marks" placeholder="Enter UE Marks Scored" type="text" inputMode="numeric"  maxLength={2} />
                        <div className="flex justify-end mt-3 text-sm gap-x-3">
                            <div onClick={() => setShowDialog(false)} className="text-blue-600 px-5 py-2  cursor-pointer">
                                Cancel
                            </div>
                            <button type='submit' className="flex items-center gap-x-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                                <i className='pi pi-check'></i>
                                <span>Add Results</span>
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

        </div>
      </Dialog>
    </div>
  )
}

export default AddResults