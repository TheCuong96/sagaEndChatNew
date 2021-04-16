export const listProjectMapping = (data) => {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        let item = {
            key: i,
            projectType: data[i].project_type,
            projectRole: data[i].project_role,
            projectId: data[i].project_id,
            projectName: data[i].project_name,
            projectStatus: data[i].project_status,
        }
        arr.push(item);
    }
    return arr;
}
