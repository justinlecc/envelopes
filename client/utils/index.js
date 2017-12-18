const objectForEach = (obj, func) => {

  if (!obj) throw {message: 'ERROR: objectForEach passed a bad obj param', obj: obj};

  if (Array.isArray(obj)) {
    obj.forEach(function (el, index) {
      func(el, index);
    });
  } else {
    Object.keys(obj).forEach(function(key) {
      func(obj[key], key);
    });        
  }

  
};

const formatDollars = (cents) => {
  const isNegative = parseInt(cents) < 0;
  const dollars = parseInt(Math.abs(cents) / 100);
  const remainingCents = Math.abs(cents) % 100;
  const remainingCentsStr = remainingCents < 10 ? ('0' + remainingCents) : remainingCents.toString();
  return '$' + (isNegative ? '-' : '') + dollars + '.' + remainingCentsStr;
};

export {
  objectForEach,
  formatDollars
};