export const formatAddQuestionData = (data) => {
    return {
        poll_id: data.poll_id,
        question: data.question || 'null',
        answer: data.answer || 'null',
    }
}