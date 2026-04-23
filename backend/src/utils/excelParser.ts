import ExcelJS from 'exceljs';
// import type { EmployeeData } from '../types/employee.type.js'; 

export class ExcelParser{
    expectedHeadersSet: Set<string>;
    headersMap: Map<string, {}>;
    headersDataMap: Map<string, (string | null)[]>;
    
    constructor(expectedHeadersSet: Set<string>, headersMap: Map<string, {row: number, col: number}>, headersDataMap: Map<string, (string | null)[]>){
        this.expectedHeadersSet = expectedHeadersSet;
        this.headersMap = headersMap;
        this.headersDataMap = headersDataMap;
    }

    
    async headersFinder(path: string){
        const workbook = new ExcelJS.stream.xlsx.WorkbookReader(path,{});
        const totalheaders = this.expectedHeadersSet.size;
        for await (const worksheet of workbook){
            for await (const row of worksheet){
                row.eachCell({includeEmpty: false},(cell, colNumber)=>{
                    const cellText = cell.text.trim().toLowerCase();
                    if(this.expectedHeadersSet.has(cellText)){
                        this.headersMap.set(cellText, {row: row.number, col: colNumber});
                    }
                });
                if(this.headersMap.size === totalheaders) break; // All headers found
            }
            break; // For only the first worksheet 
        }
        return this.headersMap;
    }
    
    async extractData(path: string, headersMap: Map<string, {row: number, col: number}>){
        const workbook = new ExcelJS.stream.xlsx.WorkbookReader(path,{});
        const employees = [];
        for await (const worksheet of workbook){
            for await (const row of worksheet){
                for(const [header, pos] of headersMap){
                    if(row.number <= pos.row) continue; // Skip header row and rows before it
                    const cell = row.getCell(pos.col);
                    const val = cell.value?.toString().trim() ?? null;
                    if(val){
                        this.headersDataMap.get(header)!.push(val);
                    }
                }
            }
            break;
        }
        //Look on readable streams for better way to handle this
        const totalEntries = this.headersDataMap.get('emp_id')?.length!;
        for(let i=0; i<totalEntries; i++){
            const employee= {
                emp_id: this.headersDataMap.get('emp_id')![i] ?? null,
                satisfaction_level: this.headersDataMap.get('satisfaction_level')![i] ?? null,
                last_evaluation: this.headersDataMap.get('last_evaluation')![i] ?? null,
                number_project: this.headersDataMap.get('number_project')![i] ?? null,
                average_montly_hours: this.headersDataMap.get('average_montly_hours')![i] ?? null,
                time_spend_company: this.headersDataMap.get('time_spend_company')![i] ?? null,
                work_accident: this.headersDataMap.get('work_accident')![i] ?? null,
                left: this.headersDataMap.get('left')![i] ?? null,
                promotion_last_5years: this.headersDataMap.get('promotion_last_5years')![i] ?? null,
                department: this.headersDataMap.get('department')![i] ?? null,
                salary: this.headersDataMap.get('salary')![i] ?? null
            };
            employees.push(employee);
        }
        return employees;
    }
}

