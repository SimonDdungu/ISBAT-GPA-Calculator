"use client"
import React, { useRef, useState } from 'react'
import { OverlayPanel } from 'primereact/overlaypanel';
import { EditGPA, GpaAttributes, GpaAttributesForm } from '@/interfaces';
import { Dialog } from 'primereact/dialog';
import { Formik, Form } from 'formik';
import InputField from '../forms/InputField';
import InputNumericField from '../forms/InputNumericField';
import { AddResultsValidation } from '../Validations/AddResultsValidation';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';


const ActionButton = ({setResults, rowIndex, rowData}: EditGPA) => {
    const op =  useRef<OverlayPanel>(null);
     const [showDialog, setShowDialog] = useState(false);

    const deleteResult = () => {
        setResults((prev: GpaAttributes[]) => prev.filter((_, i) => i !== rowIndex));
    };

    const deleteDialog = () => {
            op.current?.hide();
            confirmDialog({
                message: 'Are you sure you want to delete this result?',
                header: 'Delete Results',
                icon: 'pi pi-trash',
                acceptClassName: 'p-button-danger',
                rejectClassName: 'text-gray-700 bg-white border-none',
                accept: deleteResult,
            });
            
    };

    const EditData = () => {
        setShowDialog(true)
        op.current?.hide();
    }

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
    
            setResults((prev: GpaAttributes[]) => {
                const newResults = [...prev];   
                newResults[rowIndex] = validResults;
                return newResults;
            });
            setShowDialog(false);
        };

  return (
    <div className="card flex justify-content-center">
        <button className="text-blue-500 py-2" onClick={(e) => op.current?.toggle(e)} >
            <i className='pi pi-pen-to-square'></i>
        </button>

        <OverlayPanel ref={op}>
            <ul className='space-y-3 text-white text-xs md:text-sm'>
                <li className='bg-blue-500 px-5 py-2 rounded-lg flex flex-row items-center cursor-pointer' onClick={() => EditData()}>
                    <i className='pi pi-pencil mr-2 md:text-sm text-xs'></i>
                    <span>Edit</span>
                </li>
                <li className='bg-red-500 px-5 py-2 rounded-lg flex flex-row items-center cursor-pointer' onClick={deleteDialog}>
                    <i className='pi pi-trash mr-2 md:text-sm text-xs'></i>
                    <span>Delete</span>
                </li>
            </ul>
         </OverlayPanel>


         


         <Dialog
                     header="Edit Course Unit Result"
                     visible={showDialog}
                     className='w-[90vw] md:w-120'
                     modal
                     onHide={() => setShowDialog(false)}
                 >
                 <div className="flex flex-col gap-3 pt-4">
                     <Formik initialValues={rowData} validationSchema={AddResultsValidation} onSubmit={handleSubmit}>
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
                                         <span>Update Results</span>
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

export default ActionButton