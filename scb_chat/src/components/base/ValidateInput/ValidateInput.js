
const phoneRex = /^([+]39)?((3[\d]{2})([ ,\-,\/]){0,1}([\d, ]{6,9}))|(((0[\d]{1,4}))([ ,\-,\/]){0,1}([\d, ]{5,10}))$/
const emailRex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passRex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/

export {
    validateSignup,
    validateLogin,
    validateVisit,
    validateContact,
    validateRequest
}

function validateRequest (request){
    let requestErrors = {}
    if(!request.requestName){
        requestErrors.requestName = "Missing information require"
    }

    if(!request.requestContent){
        requestErrors.requestContent = "Missing information require"
    }

    if(!request.requestEmail){
        requestErrors.requestEmail = "Missing information require"
    }else if (!request.requestEmail.match(emailRex)){
        requestErrors.requestEmail ="Please enter a email valid and retry"
    }
    return requestErrors
}

 function validateSignup(values) {
    let errors = {};
   
    if (!values.fullName) {
        errors.fullName = 'Missing information is required';
    }
    if(!values.rePass){
        errors.rePass = 'Missing information require'
    }else if(!values.rePass.match(passRex)){
        errors.rePass = 'Password dont match'
    }
    else if (values.rePass != values.passwordSignup){
        errors.rePass = 'Password dont match'
    }
    if(!values.emailSignup){
        errors.emailSignup ="Missing information require"
    }else if(!values.emailSignup.match(emailRex)){
        errors.emailSignup ="Please enter a email valid and retry! "
    }

    if(!values.passwordSignup){
        errors.passwordSignup = "Missing information require"
    }else if(!values.passwordSignup.match(passRex)){
        errors.passwordSignup = "Wrong format for password require"
    }

    return errors;
  };

function validateLogin (signInValue){
    let signErrors = {}
    if(!signInValue.emailSignIn){
        signErrors.emailSignIn ="Missing information require"
    }else if (!signInValue.emailSignIn.match(emailRex)){
        signErrors.emailSignIn ="Please enter a email valid and retry"
    }
    if(!signInValue.passwordSignIn){
        signErrors.passwordSignIn = "Missing information require"
    }else if (!signInValue.passwordSignIn.match(passRex)){
        signErrors.passwordSignIn ="Wrong format for password require"
    }

    return signErrors
}

function validateVisit (visitValue){
    let visitErrors = {}
 if(!visitValue.visitName){
    visitErrors.visitName ="Missing information require"
 } 
 if(!visitValue.visitSelect){
    visitErrors.visitSelect = "Missing information require"
 } 
 if(!visitValue.visitContent){
    visitErrors.visitContent = "Missing information require"
 }
 
 if(!visitValue.visitMobile){
    visitErrors.visitMobile ="Missing information require"
 }else if (!visitValue.visitMobile.match(phoneRex)){
    visitErrors.visitMobile ="Wrong format for phone number require"
 }
 return visitErrors
}

function validateContact (contactValue){
    let contactErrors = {}
    if(!contactValue.contactName){
        contactErrors.contactName = "Missing information require"
    }

    if(!contactValue.contactContent){
        contactErrors.contactContent = "Missing information require"
    }
    if(!contactValue.contactMobile){
        contactErrors.contactMobile = "Missing information require"
    }else if (!contactValue.contactMobile.match(phoneRex)){
        contactErrors.contactMobile ="Wrong format for phone number require"
     }
    if(!contactValue.contactEmail){
        contactErrors.contactEmail = "Missing information require"
    }else if (!contactValue.contactEmail.match(emailRex)){
        contactErrors.contactEmail ="Please enter a email valid and retry"
    }
    return contactErrors
}