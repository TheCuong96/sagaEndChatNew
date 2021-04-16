export const formatPollCreateParams = (data) => {
    return {
        poll_name: data.name || 'null',
        poll_image: data.image || 'null',
    }
}