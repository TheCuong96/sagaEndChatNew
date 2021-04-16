export const listPollMapping = (data) => {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        let item = {
            key: i,
            id: data[i].poll_id,
            image: data[i].poll_image || "https://via.placeholder.com/150",
            name: data[i].poll_name,
            total_question: data[i].total_question || 0,
        }
        arr.push(item);
    }
    return arr;
}
