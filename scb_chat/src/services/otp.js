import { hotp } from 'otplib';

function getOTP()
{
    var d = new Date();
    var current_second = d.getSeconds();
    var current_time_no_second = Math.trunc(d.getTime() / 1000) - current_second;
    if ( current_second < 30 ){
        current_time_no_second += 29
    } else {
        current_time_no_second += 59
    }

    var token = hotp.generate('najvj5u2sd5svty', current_time_no_second)
//    console.log("hotp " + token);
    return token
}

export { getOTP } ;
