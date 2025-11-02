'use client'
import React from 'react'
import { exportAllResults, SemesterAttributes } from '@/interfaces';
import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable'
import ExcelJS from 'exceljs';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Calculate_CGPA } from '@/redux/CGPA';

const ExportAllSemesters = ({semesters}: exportAllResults) => {

  const validSemesters = semesters.filter((sem: SemesterAttributes) => sem.gpa !== null);
   const CGPA = useSelector((state: RootState) => Calculate_CGPA(state));

   const invalidResults = validSemesters.length < 1;


    let yOffset =100;
    const cols =['Unit Name', 'IA Marks', 'UE Marks', 'Total Score', 'Grade', 'Points', 'Credit', 'Grade Points']
    // const body = validSemesters.flatMap((semester: any) =>
    //             semester.results.map((item: any) => [
    //               item.unitName,
    //               item.iaMarks,
    //               item.ueMarks,
    //               item.totalScore,
    //               item.grade,
    //               item.points,
    //               item.credit,
    //               item.weightedGradePoints,
    //             ])
    //           );



    
     

    const exportPdf = () => {
      console.log("Exporting all Semesters... ")
      
       const doc = new jsPDF('p', 'pt');

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(`ISBAT University CGPA Results`, 40, 40); 

        


        doc.setFontSize(12);
        doc.text(`CGPA: ${CGPA.toFixed(2)}`, 40, 60); 


        validSemesters.forEach((semester: any, index: number) => {
        
          doc.setFontSize(14);
          doc.text(`${semester.name} Results`, 40, yOffset);

          // Prepare table body
          const body = semester.results.map((item: any) => [
            item.unitName,
            item.iaMarks,
            item.ueMarks,
            item.totalScore,
            item.grade,
            item.points,
            item.credit,
            item.weightedGradePoints,
          ]);

          console.log("Semester results:", semester);
          console.log("Body:", body);

          // Add table
          autoTable(doc, {
            startY: yOffset + 10, 
            head: [cols],
            body: body,
            headStyles: {
                fillColor: [139, 0, 0], // dark red (RGB) #8B0000
                textColor: 255,         // white text
                fontStyle: 'bold',
                halign: 'center',
            },
            theme: 'grid',
          });

          const BelowTable = (doc as any).lastAutoTable.finalY;

          doc.setFontSize(10);
          doc.text(`GPA: ${semester.gpa.toFixed(2)}`, 40, BelowTable + 20);

          yOffset = BelowTable + 60;

          },
        );

        doc.save("ISBAT CGPA Semester Results.pdf")
        }




  //   const exportExcel = async () => {
  //   const workbook = new ExcelJS.Workbook();
  //   const worksheet = workbook.addWorksheet('ISBAT GPA Results');

  //   // --- Title Row ---
  //   const titleRow = worksheet.addRow(['ISBAT University GPA Results']);
  //   titleRow.font = { size: 16, bold: true };
  //   titleRow.alignment = { vertical: 'middle', horizontal: 'center' };
   

  //   // Merge the title across all columns
  //   worksheet.mergeCells(1, 1, 1, cols.length);

  //   // Apply border to each cell in the merged range
  //   for (let i = 1; i <= cols.length; i++) {
  //   const cell = titleRow.getCell(i);
  //   cell.border = {
  //       top: { style: 'thin' },
  //       left: { style: 'thin' },
  //       bottom: { style: 'thin' },
  //       right: { style: 'thin' },
  //   };
  //   }

  //   // --- Header Row ---
  //   const headerRow = worksheet.addRow(cols);

  //   headerRow.eachCell((cell) => {
  //     cell.font = { bold: true };
  //     cell.alignment = { vertical: 'middle', horizontal: 'center' };
  //     cell.fill = {
  //       type: 'pattern',
  //       pattern: 'solid',
  //       fgColor: { argb: 'FF8B0000' }, // light green
  //     };
  //     cell.border = {
  //       top: { style: 'thin' },
  //       left: { style: 'thin' },
  //       bottom: { style: 'thin' },
  //       right: { style: 'thin' },
  //     };
  //   });

  //   // --- Data Rows ---
  //   results.forEach((r: any) => {
  //     const row = worksheet.addRow([
  //       r.unitName,
  //       r.iaMarks,
  //       r.ueMarks,
  //       r.totalScore,
  //       r.grade,
  //       r.points,
  //       r.credit,
  //       r.weightedGradePoints,
  //     ]);

  //     // Center numeric columns
  //    row.eachCell((cell, colNumber) => {
  //       if (colNumber === 1 || colNumber === 5) {
  //         cell.alignment = { horizontal: 'left' };
  //       } else {
  //         cell.alignment = { horizontal: 'center' };
  //       }

  //       cell.border = {
  //           top: { style: 'thin' },
  //           left: { style: 'thin' },
  //           bottom: { style: 'thin' },
  //           right: { style: 'thin' },
  //       };
  //     });

  //   });

  //   // Adjust column widths
  //   worksheet.columns = cols.map(() => ({ width: 15 }));
  //   worksheet.getColumn(1).width = 25;



  //   worksheet.addRow([]); // blank row
  //   const gpaRow = worksheet.addRow(['GPA', gpa.toFixed(2)])
  //   const totalCreditRow = worksheet.addRow(['Total Credit', totalCredit])
  //   const totalGradePointsRow = worksheet.addRow(['Total Grade Points', totalGradePoints.toFixed(2)])

  //   gpaRow.getCell(1).font = { bold: true };

  //   totalCreditRow.getCell(1).font = { bold: true };

  //   totalGradePointsRow.getCell(1).font = { bold: true };

    

  //   // --- Generate and Download File ---
  //   const buffer = await workbook.xlsx.writeBuffer();
  //   const blob = new Blob([buffer], {
  //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //   });
  //   const link = document.createElement('a');

  //   link.href = URL.createObjectURL(blob);

  //   link.download = 'ISBAT GPA Results.xlsx';

  //   link.click();

  //   URL.revokeObjectURL(link.href);
  // };


   

  return (
    <div className="flex items-center md:justify-content-end gap-2 text-xs md:text-sm">
            <button disabled={invalidResults} onClick={exportPdf} className='disabled:cursor-not-allowed  rounded-lg bg-red-800 text-white flex items-center px-2 md:px-5 py-2 font-semibold cursor-pointer hover:bg-red-900 transition-colors'>
                <span>Download all Semester Results as a PDF</span>
                <i className='pi pi-file-pdf ml-2'></i>
            </button>
            {/* <button disabled={invalidResults} onClick={exportExcel} className='disabled:cursor-not-allowed rounded-lg bg-green-700 text-white flex items-center px-2 md:px-5 py-2 font-semibold cursor-pointer hover:bg-green-800 transition-colors'>
                <span>Download as Excel</span>
                <i className='pi pi-file-excel ml-2'></i>
            </button> */}
    </div>
  )
}

export default ExportAllSemesters


