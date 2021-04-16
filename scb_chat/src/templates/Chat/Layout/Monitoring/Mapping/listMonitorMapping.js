import {contantStatus} from "contant";

export const listMonitorMapping = (data) => {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        let item = {
            key: i,
            agent: data[i].agent,
            duration: toHHMMSS(data[i].current_time - data[i].created_at),
            projectId: data[i].project_id,
            roomId: data[i].room_id,
            staffId: data[i].staff_id,
            statusId: data[i].status,
            visitor: data[i].visitor,
            message: data[i].message_body,
            project: data[i].project_name
        }
        arr.push(item);
    }
    return arr;
}

const toHHMMSS = (secs) => {
    const sec_num = parseInt(secs, 10)
    const days = Math.floor(sec_num / (3600 * 24));
    const hours = Math.floor(sec_num % (3600 * 24) / 3600);
    const minutes = Math.floor(sec_num % 3600 / 60);
    const seconds = Math.floor(sec_num % 60);

    return days + ' Days ' + [hours, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v, i) => v || i > 0)
        .join(":")
}