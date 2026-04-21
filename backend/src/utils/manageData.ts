export function manageData(data: Record<string,(string | number | null)[]>){
    const ids = data['Emp_id'];
    const managedRecords = ids?.map((id,index)=>{
        return{
            emp_id: String(id),
            satisfaction_level: String(data['satisfaction_level']?.[index] || null),
            last_evaluation: String(data['last_evaluation']?.[index] || null),
            number_project: Number(data['number_project']?.[index] || null),
            average_montly_hours: Number(data['average_montly_hours']?.[index] || null),
            time_spend_company: Number(data['time_spend_company']?.[index] || null),
            work_accident: Number(data['Work_accident']?.[index] || null),
            left: Number(data['left']?.[index] || null),
            promotion_last_5years: Number(data['promotion_last_5years']?.[index] || null),
            department: String(data['Department']?.[index] || null),
            salary: String(data['salary']?.[index] || null),
        }
    });
    return managedRecords;
}