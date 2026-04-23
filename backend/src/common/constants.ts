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

export {expectedHeadersSet, headersMap, headersDataMap};