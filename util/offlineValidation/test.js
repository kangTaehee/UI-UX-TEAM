const { validateHTML } = require('@adplata/html-validate-offline')
console.log(validateHTML('<html>'))
    //# return { status, message }

// status: true/false - Boolean
// message: Description of validation - String
