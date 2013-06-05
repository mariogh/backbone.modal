(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,i=function(t,i){function n(){this.constructor=t}for(var s in i)e.call(i,s)&&(t[s]=i[s]);return n.prototype=i.prototype,t.prototype=new n,t.__super__=i.prototype,t},n=[].indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(e in this&&this[e]===t)return e;return-1};if("undefined"==typeof Backbone||null===Backbone)throw Error("Backbone is not defined. Please include the latest version from http://documentcloud.github.com/backbone/backbone.js");Backbone.Modal=function(e){function s(){this.triggerCancel=t(this.triggerCancel,this),this.triggerSubmit=t(this.triggerSubmit,this),this.triggerView=t(this.triggerView,this),this.clickOutside=t(this.clickOutside,this),this.checkKey=t(this.checkKey,this),this.args=Array.prototype.slice.apply(arguments),Backbone.View.prototype.constructor.apply(this,this.args),this.setUIElements(),this.delegateModalEvents()}return i(s,e),s.prototype.prefix="bb-modal",s.prototype.render=function(){var t,e,i;return t=this.serializeData(),this.$el.addClass(""+this.prefix+"-wrapper"),e=$("<div />").addClass(this.prefix),this.template&&e.html(this.template(t)),this.$el.html(e),$("body").on("keyup",this.checkKey),$("body").on("click",this.clickOutside),this.viewContainer?(this.viewContainerEl=e.find(this.viewContainer),this.viewContainerEl.addClass(""+this.prefix+"-views")):this.viewContainerEl=e,this.$el.show(),(null!=(i=this.views)?i.length:void 0)>0&&this.openAt(0),"function"==typeof this.onRender&&this.onRender(),this},s.prototype.setUIElements=function(){var t;if(this.template=this.getOption("template"),this.views=this.getOption("views"),null!=(t=this.views)&&(t.length=_.size(this.views)),this.viewContainer=this.getOption("viewContainer"),this.$el.hide(),_.isUndefined(this.template)&&_.isUndefined(this.views))throw Error("No template or views defined for Backbone.Modal");if(this.template&&this.views&&_.isUndefined(this.viewContainer))throw Error("No viewContainer defined for Backbone.Modal")},s.prototype.getOption=function(t){return t?this.options&&n.call(this.options,t)>=0&&null!=this.options[t]?this.options[t]:this[t]:void 0},s.prototype.serializeData=function(){var t;return t={},this.model&&(t=_.extend(t,this.model.toJSON())),this.collection&&(t=_.extend(t,{items:this.collection.toJSON()})),t},s.prototype.delegateModalEvents=function(){var t,e,i,n,s,o,r;this.active=!0,t=this.getOption("cancelEl"),s=this.getOption("submitEl"),s&&this.$el.on("click",s,this.triggerSubmit),t&&this.$el.on("click",t,this.triggerCancel),r=[];for(e in this.views)"length"!==e?(i=e.match(/^(\S+)\s*(.*)$/),o=i[1],n=i[2],r.push(this.$el.on(o,n,this.views[e],this.triggerView))):r.push(void 0);return r},s.prototype.undelegateModalEvents=function(){var t,e,i,n,s,o,r;this.active=!1,t=this.getOption("cancelEl"),s=this.getOption("submitEl"),s&&this.$el.off("click",s,this.triggerSubmit),t&&this.$el.off("click",t,this.triggerCancel),r=[];for(e in this.views)"length"!==e?(i=e.match(/^(\S+)\s*(.*)$/),o=i[1],n=i[2],r.push(this.$el.off(o,n,this.views[e],this.triggerView))):r.push(void 0);return r},s.prototype.checkKey=function(t){if(this.active)switch(t.keyCode){case 27:return this.triggerCancel(null,!0);case 13:return this.triggerSubmit(null,!0)}},s.prototype.clickOutside=function(t){return $(t.target).hasClass(""+this.prefix+"-wrapper")&&this.active?this.triggerCancel(null,!0):void 0},s.prototype.buildView=function(t){var e;if(t)return _.isFunction(t)?(e=new t(this.args[0]),e instanceof Backbone.View?{el:e.render().$el,view:e}:{el:t(this.args[0])}):{view:t,el:t.$el}},s.prototype.triggerView=function(t){var e,i;return null!=t&&"function"==typeof t.preventDefault&&t.preventDefault(),i=t.data,e=this.buildView(i.view),this.currentView=e.view||e.el,i.onActive&&(_.isFunction(i.onActive)?i.onActive(this):_.isString(i.onActive)&&this[i.onActive].call(this,i)),this.shouldAnimate?this.animateToView(e.el):(this.shouldAnimate=!0,this.$(this.viewContainerEl).html(e.el))},s.prototype.animateToView=function(t){var e,i,n,s,o=this;return s=$("<tester/>"),s.html(this.$el.clone().css({top:-9999,left:-9999})),0!==$("tester").length?$("tester").replaceWith(s):$("body").append(s),e=this.viewContainer?s.find(this.viewContainer):s,e.removeAttr("style"),n=e.outerHeight(),e.html(t),i=e.outerHeight(),n===i?this.$(this.viewContainerEl).html(t):(this.$(this.viewContainerEl).css({opacity:0}),this.$(this.viewContainerEl).animate({height:i},100,function(){return o.$(o.viewContainerEl).css({opacity:1}),o.$(o.viewContainerEl).html(t)}))},s.prototype.triggerSubmit=function(t,e){return null!=t&&t.preventDefault(),this.beforeSubmit&&this.beforeSubmit()===!1?void 0:("function"==typeof this.submit&&this.submit(),e&&this.trigger("modal:close"),this.close())},s.prototype.triggerCancel=function(t,e){return null!=t&&t.preventDefault(),this.beforeCancel&&this.beforeCancel()===!1?void 0:("function"==typeof this.cancel&&this.cancel(),e&&this.trigger("modal:close"),this.close())},s.prototype.close=function(){var t;return $("body").off("keyup",this.checkKey),$("body").off("click",this.clickOutside),null!=(t=this.currentView)&&"function"==typeof t.remove&&t.remove(),this.remove()},s.prototype.openAt=function(t){var e,i,n;e=0;for(i in this.views)"length"!==i&&(e===t&&(n=this.views[i]),e++);return n&&(this.currentIndex=t,this.triggerView({data:n})),this},s.prototype.next=function(){return this.currentIndex+1<this.views.length-1?this.openAt(this.currentIndex+1):void 0},s.prototype.previous=function(){return this.currentIndex-1<this.views.length-1?this.openAt(this.currentIndex-1):void 0},s}(Backbone.View)}).call(this);