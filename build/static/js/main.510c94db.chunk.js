(this.webpackJsonpfront=this.webpackJsonpfront||[]).push([[0],{17:function(e,n,t){e.exports=t(41)},22:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(14),l=t.n(c),u=(t(22),t(2)),o=t.n(u),s=t(15),i=t(3),m=(t(5),t(16)),p=t.n(m),f=function(e){var n=e.pack,t=e.showPack,a=function(e){return e.map((function(e,n){return r.a.createElement("div",{key:n,onClick:function(){t(e)}},e)}))};return r.a.createElement(r.a.Fragment,null,r.a.createElement("h4",null,n.name),r.a.createElement("p",null,n.description),n.dependencies?r.a.createElement(r.a.Fragment,null,r.a.createElement("b",null,"Dependencies: "),a(n.dependencies)):null,n.supports?r.a.createElement(r.a.Fragment,null,r.a.createElement("b",null,"Reverse Dependencies: "),a(n.supports)):null)},E=function(){var e=Object(a.useState)(),n=Object(i.a)(e,2),t=n[0],c=n[1],l=Object(a.useState)(),u=Object(i.a)(l,2),m=u[0],E=u[1],d=function(){var e=Object(s.a)(o.a.mark((function e(){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("/packages");case 2:(n=e.sent).data.sort((function(e,n){return e.name.localeCompare(n.name)})),c(n.data),console.log("Packs: ",t);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(a.useEffect)((function(){d()}),[]);return t?r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},"Packages Info"),m?r.a.createElement(r.a.Fragment,null,r.a.createElement(f,{pack:m,showPack:function(e){var n=t.filter((function(n){return n.name===e}));1===n.length&&E(n[0])}}),r.a.createElement("button",{onClick:function(){return E(null)}},"Home")):t.map((function(e,n){return r.a.createElement("div",{key:n},r.a.createElement("h4",{onClick:function(){E(e)}},e.name),r.a.createElement("hr",null))}))):null};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null)),document.getElementById("root"))},5:function(e,n,t){}},[[17,1,2]]]);
//# sourceMappingURL=main.510c94db.chunk.js.map