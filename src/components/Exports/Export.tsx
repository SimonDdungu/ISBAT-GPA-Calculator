'use client'
import React from 'react'
import { exportResults } from '@/interfaces';
import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable'
import ExcelJS from 'exceljs';

const Export = ({semester ,results, gpa, totalCredit, totalGradePoints}: exportResults) => {

    let invalidResults = true;

    if(results.length < 4){
        invalidResults = true
    }else{
        invalidResults = false
    }


    const cols =['Unit Name', 'IA Marks', 'UE Marks', 'Total Score', 'Grade', 'Points', 'Credit', 'Grade Points']
    const body = results.map((item: any) => [
        item.unitName,
        item.iaMarks,
        item.ueMarks,
        item.totalScore,
        item.grade,
        item.points,
        item.credit,
        item.weightedGradePoints,
    ]);


    

    const exportPdf = () => {
        const doc = new jsPDF('p', 'pt');

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(`ISBAT University ${semester} GPA Results`, 40, 40); 

        autoTable(doc, {
            head: [cols],
            body,
            startY: 60,
            headStyles: {
                fillColor: [139, 0, 0], // dark red (RGB) #8B0000
                textColor: 255,         // white text
                fontStyle: 'bold',
                halign: 'center',
            },
        })

        const BelowTable = (doc as any).lastAutoTable.finalY;

        doc.setFontSize(10);
        doc.text(`GPA: ${gpa.toFixed(2)}`, 40, BelowTable + 40);
        doc.text(`Total Credits: ${totalCredit}`, 40, BelowTable + 60);
        doc.text(`Total Grade Points: ${totalGradePoints.toFixed(2)}`, 40, BelowTable + 80);
        doc.save('ISBAT GPA results.pdf');
    }




    const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('ISBAT GPA Results');

    // --- Title Row ---
    const titleRow = worksheet.addRow(['ISBAT University GPA Results']);
    titleRow.font = { size: 16, bold: true };
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' };
   

    // Merge the title across all columns
    worksheet.mergeCells(1, 1, 1, cols.length);

    // Apply border to each cell in the merged range
    for (let i = 1; i <= cols.length; i++) {
    const cell = titleRow.getCell(i);
    cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
    };
    }

    // --- Header Row ---
    const headerRow = worksheet.addRow(cols);

    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF8B0000' }, // light green
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // --- Data Rows ---
    results.forEach((r: any) => {
      const row = worksheet.addRow([
        r.unitName,
        r.iaMarks,
        r.ueMarks,
        r.totalScore,
        r.grade,
        r.points,
        r.credit,
        r.weightedGradePoints,
      ]);

      // Center numeric columns
     row.eachCell((cell, colNumber) => {
        if (colNumber === 1 || colNumber === 5) {
          cell.alignment = { horizontal: 'left' };
        } else {
          cell.alignment = { horizontal: 'center' };
        }

        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
      });

    });

    // Adjust column widths
    worksheet.columns = cols.map(() => ({ width: 15 }));
    worksheet.getColumn(1).width = 25;



    worksheet.addRow([]); // blank row
    const gpaRow = worksheet.addRow(['GPA', gpa.toFixed(2)])
    const totalCreditRow = worksheet.addRow(['Total Credit', totalCredit])
    const totalGradePointsRow = worksheet.addRow(['Total Grade Points', totalGradePoints.toFixed(2)])

    gpaRow.getCell(1).font = { bold: true };

    totalCreditRow.getCell(1).font = { bold: true };

    totalGradePointsRow.getCell(1).font = { bold: true };

    

    // --- Generate and Download File ---
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);

    link.download = 'ISBAT GPA Results.xlsx';

    link.click();

    URL.revokeObjectURL(link.href);
  };


   

  return (
    <div className="flex items-center md:justify-content-end gap-2 text-xs md:text-sm">
            <button disabled={invalidResults} onClick={exportPdf} className='disabled:cursor-not-allowed  rounded-lg bg-red-800 text-white flex items-center px-2 md:px-5 py-2 font-semibold cursor-pointer hover:bg-red-900 transition-colors'>
                <span>Download as a PDF</span>
                <i className='pi pi-file-pdf ml-2'></i>
            </button>
            <button disabled={invalidResults} onClick={exportExcel} className='disabled:cursor-not-allowed rounded-lg bg-green-700 text-white flex items-center px-2 md:px-5 py-2 font-semibold cursor-pointer hover:bg-green-800 transition-colors'>
                <span>Download as Excel</span>
                <i className='pi pi-file-excel ml-2'></i>
            </button>
    </div>
  )
}

export default Export


















//OLD EXCEL EXPORT CODE


// const dataForExcel = results.map((item: any) => ({
//     'Unit Name': item.unitName,
//     'IA Marks': item.iaMarks,
//     'UE Marks': item.ueMarks,
//     'Total Score': item.totalScore,
//     'Grade': item.grade,
//     'Points': item.points,
//     'Credit': item.credit,
//     'Grade Points': item.weightedGradePoints,
// }));


//  const exportExcel = () => {
//         import('xlsx').then((xlsx) => {
//         const titleRow: any = {};
//         cols.forEach(col => titleRow[col] = '');

//         const gpaRow: any = {};
//         const totalCreditRow: any = {};
//         const totalGradePointsRow: any = {};

//         cols.forEach(col => {
//         gpaRow[col] = '';
//         totalCreditRow[col] = '';
//         totalGradePointsRow[col] = '';
//         });

//         // Place label in first column, value in the correct column
//         gpaRow['Unit Name'] = 'GPA';
//         gpaRow['IA Marks'] = gpa.toFixed(2);

//         totalCreditRow['Unit Name'] = 'Total Credit';
//         totalCreditRow['IA Marks'] = totalCredit;

//         totalGradePointsRow['Unit Name'] = 'Total Grade Points';
//         totalGradePointsRow['IA Marks'] = totalGradePoints;

//         const sheetData = [titleRow, ...dataForExcel, gpaRow, totalCreditRow, totalGradePointsRow];

//         // Generate worksheet without automatic headers
//         const worksheet = xlsx.utils.json_to_sheet(sheetData, { skipHeader: true });

//         // Set the actual title in A1 and merge across all columns
//         worksheet['A1'].v = 'ISBAT University GPA Results';
//         worksheet['!merges'] = [
//             { s: { r: 0, c: 0 }, e: { r: 0, c: cols.length - 1 } }
//         ];

//         // Add your column headers manually in row 2
//         cols.forEach((header, i) => {
//             const cell = xlsx.utils.encode_cell({ r: 1, c: i }); // row 2 = r:1
//             worksheet[cell] = { t: 's', v: header };
//         });

            

//             // Auto-width columns using existing cols
//             worksheet['!cols'] = cols.map(header => {
//             const maxLength = Math.max(
//                 header.length,
//                 ...dataForExcel.map((row: any) => row[header]?.toString().length)
//             );
//             return { wch: maxLength + 2 };
//             });

//         const workbook = { Sheets: { "GPA Results": worksheet }, SheetNames: ["GPA Results"] };
//         const excelBuffer = xlsx.write(workbook, {
//             bookType: 'xlsx',
//             type: 'array'
//         });

//             saveAsExcelFile(excelBuffer, 'GPA results');
//         });
//     };

//     const saveAsExcelFile = (buffer: any, fileName: string) => {
//         import('file-saver').then((module) => {
//             if (module && module.default) {
//                 let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//                 let EXCEL_EXTENSION = '.xlsx';
//                 const data = new Blob([buffer], {
//                     type: EXCEL_TYPE
//                 });

//                 module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
//             }
//         });
//     };
