module.exports.addition = (num1, num2) => {
    return num1 + num2
};
module.exports.subtraction = (num1, num2) => {
    return num1 - num2
};
module.exports.multiplication = (num1, num2) => {
    return num1 * num2
};
module.exports.division = (num1, num2) => {
    return num1 / num2
};

// -------------------------------------------------------------------------------------------------------

module.exports.isNull = (value) => {
    return (value == null) ? true : false
};
module.exports.isString = (value) => {
    return (value == '') ? true : false
};
module.exports.isNumber = (value) => {
    return (value == 20) ? true : false
};
module.exports.isUndefine = (value) => {
    return (value == undefined) ? true : false
};

// ---------------------------------------------------------------------------------------------------------

module.exports.isStringType = (value) => {
    return (typeof value == 'string') ? true : false
};
module.exports.isNumberType = (value) => {
    return (typeof value == 'number') ? true : false
};

// ------------------------------------------------------------------------------------------------------------
module.exports.logIn = (userName, passwd) => {
    return (userName == "cyr@gmail.com" && passwd == "cyr@1") ? true : false
}