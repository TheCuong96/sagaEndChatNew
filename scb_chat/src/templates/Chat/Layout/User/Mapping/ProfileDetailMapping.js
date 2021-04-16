// import { convertDateYYYYMMDD } from 'functions/Utils'
export const formatProfile = (data) => {
    return {
        fullName: data.name || '_',
        username: data.username || '_',
        email: data.email || '_',
        mobile: data.mobile || '_',
    }
}

export const formatProfileUpdateParams = (data) => {
    return {
        staff_name: data.fullName,
        staff_mobile: data.mobile,
    }
}