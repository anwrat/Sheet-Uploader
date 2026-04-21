import ExcelJS from 'exceljs';
import type { Employee } from '../types/employee.type.js';

export async function excelParser(path: string) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(path);
    const worksheet = workbook.getWorksheet(1);
    if (!worksheet) throw new Error("Worksheet not found");
    const expectedHeaders = [
        'Emp_id', 'satisfaction_level', 'last_evaluation', 'number_project',
        'average_montly_hours', 'time_spend_company', 'Work_accident',
        'left', 'promotion_last_5years', 'Department', 'salary'
    ];
    const headerCoords: Record<string,{row: number, col: number}>={};
    worksheet.eachRow((row, rowNumber)=>{
        row.eachCell((cell, colNumber)=>{
            const cellText = cell.text.trim().toLowerCase();
            const matchedHeader = expectedHeaders.find(h=>h.toLowerCase() === cellText);
            if(matchedHeader){
                headerCoords[matchedHeader] = {row: rowNumber, col: colNumber};
            }
        });
    });
    return headerCoords;
}
