var default$ = {
    target: 'app',
    duration: 1000,
    directives: {},
  }
  var dom = ({
    addClass: function(el,className){
      return el.classList.add(className);
    },
    removeClass: function(el,className){
      return el.classList.remove(className)
    },
    getAttribute: function(el,attributeName){
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

  
  var create = function(){
    var $this = this;
    $this.settings = extend(default$,arguments[0] || {});
    $this.el = document.querySelector(`[pizzle-start="${$this.settings.target}"]`);
  }
  create.prototype.init = function(){
    for (const el of this.el.querySelectorAll('*')) {
      for (const name of el.getAttributeNames()) {
        if (name.startsWith('pizzle-')) {
          const ani_name = name.slice(7);
          var binds = dom.getAttribute(el, name);
          dom.addClass(el, ani_name)
          var duration = this.settings.duration;
          if (binds.includes(' ')) {
            var dur$ = binds.split(' ')[1];
            dom.addClass(el, `${ani_name}-${dur$}`);
            if (binds.split(' ')[0] === 'infinite') {
              dom.addClass(el, ani_name+'-infinite')
            }else if (binds.split(' ')[0] === 'reverse') {
              dom.addClass(el, ani_name+'-reverse')
            } else if (typeof binds.split(' ')[0] === 'number') {
              dom.addClass(el, `${ani_name}-${binds.split(' ')[0]}`);
            }
          }else{
            dom.addClass(el, `${ani_name}-${duration}`);
          }
          if (binds === 'infinite') {
            dom.addClass(el, ani_name+'-infinite')
          }else if(binds === 'reverse'){
            dom.addClass(el, ani_name+'-reverse')
          }else if(binds === ''){
            dom.addClass(el, ani_name)
          }
          
          dom.removeAttribute(el, name)
          dom.removeAttribute(this.el,'pizzle-start')
        }
        for (var keys in this.settings.directives) {
          var val = this.settings.directives[keys];
          if (typeof val === 'function') {
            var $name = keys;
            if (name === 'pizzle:'+$name) {
              var binding = dom.getAttribute(el,name);
              val(el,{bind: binding,name: name})
              dom.removeAttribute(el,name)
            }
          }
        }
      }
    }  
  }
  var pizzle  = /*# PURE #*/ ({
    create
  })
export default pizzle;
export { create }