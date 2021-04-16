export const listQuestionMapping = (data) => {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        let item = {
            key: i,
            id: data[i].question_id,
            question: data[i].question ,
            answer: data[i].answer,
        }
        arr.push(item);
    }
    return arr;
}
