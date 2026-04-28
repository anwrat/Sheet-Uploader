import ExcelJS from 'exceljs';
// import type { EmployeeData } from '../types/employee.type.js'; 

const expectedHeadersSet = new Set<string>([
    'Emp_id', 'satisfaction_level', 'last_evaluation', 'number_project',
    'average_montly_hours', 'time_spend_company', 'Work_accident',
    'left', 'promotion_last_5years', 'Department', 'salary'
].map(h=>h.toLowerCase()));

const headersMap = new Map<string, {row: number, col: number}>();
const headersDataMap = new Map<string, (string | null)[]>();
expectedHeadersSet.forEach(header=>{
    headersDataMap.set(header, []);
})

export class ExcelParser{
    // expectedHeadersSet: Set<string>;
    // headersMap: Map<string, {}>;
    // headersDataMap: Map<string, (string | null)[]>;
    
    // constructor(expectedHeadersSet: Set<string>, headersMap: Map<string, {row: number, col: number}>, headersDataMap: Map<string, (string | null)[]>){
    //     this.expectedHeadersSet = expectedHeadersSet;
    //     this.headersMap = headersMap;
    //     this.headersDataMap = headersDataMap;
    // }

    
    async headersFinder(path: string){
        const workbook = new ExcelJS.stream.xlsx.WorkbookReader(path,{});
        const totalheaders = expectedHeadersSet.size;
        for await (const worksheet of workbook){
            for await (const row of worksheet){
                row.eachCell({includeEmpty: false},(cell, colNumber)=>{
                    const cellText = cell.text.trim().toLowerCase();
                    if(expectedHeadersSet.has(cellText)){
                        headersMap.set(cellText, {row: row.number, col: colNumber});
                    }
                });
                if(headersMap.size === totalheaders) break; // All headers found
            }
            break; // For only the first worksheet 
        }
        return headersMap;
    }
    
    async extractData(path: string, headersMap: Map<string, {row: number, col: number}>){
        for (const key of headersDataMap.keys()) {
            headersDataMap.set(key, []);
        }
        const workbook = new ExcelJS.stream.xlsx.WorkbookReader(path,{});
        const employees = [];
        for await (const worksheet of workbook){
            for await (const row of worksheet){
                for(const [header, pos] of headersMap){
                    if(row.number <= pos.row) continue; // Skip header row and rows before it
                    const cell = row.getCell(pos.col);
                    const val = cell.value?.toString().trim() ?? null;
                    if(val){
                        headersDataMap.get(header)!.push(val);
                    }
                }
            }
            break;
        }
        //Look on readable streams for better way to handle this
        const totalEntries = headersDataMap.get('emp_id')?.length!;
        for(let i=0; i<totalEntries; i++){
            const employee= {
                emp_id: headersDataMap.get('emp_id')![i] ?? null,
                satisfaction_level: headersDataMap.get('satisfaction_level')![i] ?? null,
                last_evaluation: headersDataMap.get('last_evaluation')![i] ?? null,
                number_project: headersDataMap.get('number_project')![i] ?? null,
                average_montly_hours: headersDataMap.get('average_montly_hours')![i] ?? null,
                time_spend_company: headersDataMap.get('time_spend_company')![i] ?? null,
                work_accident: headersDataMap.get('work_accident')![i] ?? null,
                left: headersDataMap.get('left')![i] ?? null,
                promotion_last_5years: headersDataMap.get('promotion_last_5years')![i] ?? null,
                department: headersDataMap.get('department')![i] ?? null,
                salary: headersDataMap.get('salary')![i] ?? null
            };
            employees.push(employee);
        }
        return employees;
    }
}

