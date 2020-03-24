module.exports = (data) => {
  var error = [];

  Object.keys(data).map((item, index) => {
    console.log(typeof(data[item].type()))
    if(data[item].required === true && (data[item].value === null || data[item].value === undefined || data[item].value.length === 0)) {
      error.push({ name: item, code: 1, msg: 'Value is required' });
    } else if(data[item].identify && data[item].identify === 'email') {
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var isEmail = regex.test(String(data[item].value).toLowerCase());
      if(!isEmail) {
        error.push({ name: item, code: 2, msg: `Email not valid for ${item}` });
      }
    } else if(data[item].min && data[item].value.toString().length < data[item].min) {
      error.push({ name: item, code: 3, msg: `Min length is ${data[item].min} for ${item}` });
    } else if(data[item].max && data[item].value.toString().length > data[item].max) {
      error.push({ name: item, code: 3, msg: `Max length is ${data[item].max} for ${item}` });
    } else if(data[item].type && typeof(data[item].type()) === 'number') {
      var regex = /^\d+$/;
      var isNumber = regex.test(data[item].value);
      if(!isNumber) {
        error.push({ name: item, code: 4, msg: `Invalid data type ${data[item].value} for ${item}` });
      }
    }
  })

  return {
    isValid: error.length > 0 ? false : true,
    items: error
  }

}
