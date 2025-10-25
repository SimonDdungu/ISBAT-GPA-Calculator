import React from 'react'
import { exportResults } from '@/interfaces';
import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable'

const Export = ({results, gpa, totalCredit, totalGradePoints}: exportResults) => {

     

    const cols =['Unit Name', 'IA Marks', 'UE Marks', 'Total Score', 'Grade', 'Points', 'Credit', 'Grade Points']
    const body = results.map((item: any) => [
        item.unitName,
        item.iaMarks,
        item.ueMarks,
        item.total,
        item.grade,
        item.points,
        item.credit,
        item.gradePoints,
    ]);

    const dataForExcel = results.map((item: any) => ({
        'Unit Name': item.unitName,
        'IA Marks': item.iaMarks,
        'UE Marks': item.ueMarks,
        'Total Score': item.total,
        'Grade': item.grade,
        'Points': item.points,
        'Credit': item.credit,
        'Grade Points': item.gradePoints,
    }));

    

    const exportPdf = () => {
        const doc = new jsPDF('p', 'pt');

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('ISBAT University GPA Results', 40, 40); 

        autoTable(doc, {
            head: [cols],
            body,
            startY: 60 
        })

        const BelowTable = (doc as any).lastAutoTable.finalY;

        doc.setFontSize(10);
        doc.text(`GPA: ${gpa.toFixed(2)}`, 40, BelowTable + 20);
        doc.text(`Total Credits: ${totalCredit}`, 40, BelowTable + 40);
        doc.text(`Total Grade Points: ${totalGradePoints.toFixed(2)}`, 40, BelowTable + 60);
        doc.save('ISBAT GPA results.pdf');
    }


    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
        const titleRow: any = {};
        cols.forEach(col => titleRow[col] = '');

        const gpaRow: any = {};
        const totalCreditRow: any = {};
        const totalGradePointsRow: any = {};

        cols.forEach(col => {
        gpaRow[col] = '';
        totalCreditRow[col] = '';
        totalGradePointsRow[col] = '';
        });

        // Place label in first column, value in the correct column
        gpaRow['Unit Name'] = 'GPA';
        gpaRow['IA Marks'] = gpa.toFixed(2);

        totalCreditRow['Unit Name'] = 'Total Credit';
        totalCreditRow['IA Marks'] = totalCredit;

        totalGradePointsRow['Unit Name'] = 'Total Grade Points';
        totalGradePointsRow['IA Marks'] = totalGradePoints;

        const sheetData = [titleRow, ...dataForExcel, gpaRow, totalCreditRow, totalGradePointsRow];

        // Generate worksheet without automatic headers
        const worksheet = xlsx.utils.json_to_sheet(sheetData, { skipHeader: true });

        // Set the actual title in A1 and merge across all columns
        worksheet['A1'].v = 'ISBAT University GPA Results';
        worksheet['!merges'] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: cols.length - 1 } }
        ];

        // Add your column headers manually in row 2
        cols.forEach((header, i) => {
            const cell = xlsx.utils.encode_cell({ r: 1, c: i }); // row 2 = r:1
            worksheet[cell] = { t: 's', v: header };
        });

            

            // Auto-width columns using existing cols
            worksheet['!cols'] = cols.map(header => {
            const maxLength = Math.max(
                header.length,
                ...dataForExcel.map((row: any) => row[header]?.toString().length)
            );
            return { wch: maxLength + 2 };
            });

        const workbook = { Sheets: { "GPA Results": worksheet }, SheetNames: ["GPA Results"] };
        const excelBuffer = xlsx.write(workbook, {
            bookType: 'xlsx',
            type: 'array'
        });

            saveAsExcelFile(excelBuffer, 'GPA results');
        });
    };

    const saveAsExcelFile = (buffer: any, fileName: string) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };


  return (
    <div className="flex items-center md:justify-content-end gap-2 text-xs md:text-sm">
            <button onClick={exportPdf} className='rounded-lg bg-red-800 text-white flex items-center px-2 md:px-5 py-2 font-semibold cursor-pointer hover:bg-red-900 transition-colors'>
                <span>Download as a PDF</span>
                <i className='pi pi-file-pdf ml-2'></i>
            </button>
            <button onClick={exportExcel} className='rounded-lg bg-green-700 text-white flex items-center px-2 md:px-5 py-2 font-semibold cursor-pointer hover:bg-green-800 transition-colors'>
                <span>Download as Excel</span>
                <i className='pi pi-file-excel ml-2'></i>
            </button>
    </div>
  )
}

export default Export
