import utlis from './utlis.js';

var default$ = {
    target: 'app',
    duration: 1000,
    directives: {},
  }
  var create = function(){
    var $this = this;
    $this.settings = utlis.extend(default$,arguments[0] || {});
    $this.el = document.querySelector(`[pizzle-start="${$this.settings.target}"]`);
  }
  create.prototype.init = function(){
    for (const el of this.el.querySelectorAll('*')) {
      for (const name of el.getAttributeNames()) {
        if (name.startsWith('pizzle-')) {
          const ani_name = name.slice(7);
          var binds = utlis.dom.getAttribute(el, name);
          utlis.dom.addClass(el, ani_name)
          var duration = this.settings.duration;
          if (binds.includes(' ')) {
            var dur$ = binds.split(' ')[1];
            utlis.dom.addClass(el, `${ani_name}-${dur$}`);
            if (binds.split(' ')[0] === 'infinite') {
              utlis.dom.addClass(el, ani_name+'-infinite')
            }else if (binds.split(' ')[0] === 'reverse') {
              utlis.dom.addClass(el, ani_name+'-reverse')
            } else if (typeof binds.split(' ')[0] === 'number') {
              utlis.dom.addClass(el, `${ani_name}-${binds.split(' ')[0]}`);
            }
          }else{
            utlis.dom.addClass(el, `${ani_name}-${duration}`);
          }
          if (binds === 'infinite') {
            utlis.dom.addClass(el, ani_name+'-infinite')
          }else if(binds === 'reverse'){
            utlis.dom.addClass(el, ani_name+'-reverse')
          }else if(binds === ''){
            utlis.dom.addClass(el, ani_name)
          }
          
          utlis.dom.removeAttribute(el, name)
          utlis.dom.removeAttribute(this.el,'pizzle-start')
        }
        for (var keys in this.settings.directives) {
          var val = this.settings.directives[keys];
          if (typeof val === 'function') {
            var $name = keys;
            if (name === 'pizzle:'+$name) {
              var binding = utlis.dom.getAttribute(el,name);
              val(el,{bind: binding,name: name})
              utlis.dom.removeAttribute(el,name)
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