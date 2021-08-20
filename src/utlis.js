var dom = ({
  addClass: function(el, className) {
    return el.classList.add(className);
  },
  removeClass: function(el, className) {
    return el.classList.remove(className)
  },
  getAttribute: function(el, attributeName) {
    return el.getAttribute(attributeName)
  },
  removeAttribute: function(el, attributeName) {
    return el.removeAttribute(attributeName)
  },
})
var extend = function() {

  // Variables
  var extended = {};

  // Merge the object into the extended object
  var merge = function(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          extended[prop] = extend(extended[prop], obj[prop]);
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };

  // Loop through each object and conduct a merge
  for (var i = 0; i < arguments.length; i++) {
    var obj = arguments[i];
    merge(obj);
  }

  return extended;

};

export default {
  extend,
  dom
}