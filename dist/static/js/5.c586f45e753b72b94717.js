webpackJsonp([5],{"0YNm":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,s=a("ib+B"),i=(n=s)&&n.__esModule?n:{default:n};e.default={data:function(){return{countNum:900,showAlert:!1,alertText:""}},props:["time"],created:function(){this.countNum-=this.time,this.computeTime()},components:{alertTip:i.default},computed:{remainTime:function(){var t=Math.floor(this.countNum/60),e=this.countNum%60;return t<10&&(t="0"+t),e<10&&(e="0"+e),"去支付(还剩"+t+"分"+e+"秒)"}},methods:{computeTime:function(){var t=this;this.timer=setInterval(function(){t.countNum--,0==t.countNum&&(t.showAlert=!0,t.alertText="支付超时",clearInterval(t.timer),t.$emit("changePayment"))},1e3)},pay:function(){this.showAlert=!0,this.alertText="暂不开放支付接口"}}}},"0xdQ":function(t,e,a){"use strict";var n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"compute_time"},[a("span",{staticClass:"remain_time",on:{click:t.pay}},[t._v("\n        "+t._s(t.remainTime)+"\n    ")]),t._v(" "),t.showAlert?a("alert-tip",{attrs:{alertText:t.alertText},on:{closeTip:function(e){t.showAlert=!1}}}):t._e()],1)},staticRenderFns:[]};e.a=n},"6Q/n":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("0YNm"),s=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);var r=a("0xdQ");var o=function(t){a("omth")},u=a("VU/8")(s.a,r.a,!1,o,"data-v-364a9287",null);e.default=u.exports},"9zw/":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("zeXb"),s=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);var r=a("IS37");var o=function(t){a("hbpx")},u=a("VU/8")(s.a,r.a,!1,o,null,null);e.default=u.exports},IS37:function(t,e,a){"use strict";var n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"order"}},[a("head-top",{attrs:{"go-back":"true","head-title":"订单列表"}}),t._v(" "),a("ul",{staticClass:"order_ul"},t._l(t.orderlist,function(e,n){return a("li",{key:n,staticClass:"order_li"},[a("img",{attrs:{src:t.imgBaseUrl+e.restaurant_image_url}}),t._v(" "),a("div",{staticClass:"detail",on:{click:function(a){t.showDetail(e)}}},[a("div",{staticClass:"top"},[a("div",{staticClass:"title"},[a("h4",{staticClass:"name"},[a("span",{staticClass:"ellipsis"},[t._v(t._s(e.restaurant_name))]),t._v(" "),a("svg",{staticClass:"arrow_right",attrs:{fill:"#333"}},[a("use",{attrs:{"xlink:href":"#arrow-right"}})])]),t._v(" "),a("span",{staticClass:"pay"},[t._v(t._s(t.paymentStatus[n]))])]),t._v(" "),a("h4",{staticClass:"date"},[t._v(t._s(e.formatted_created_at))])]),t._v(" "),a("div",{staticClass:"middle"},[a("ul",[a("li",{staticClass:"food_li"},[a("span",{staticClass:"food_name ellipsis"},[t._v(t._s(e.basket.group[0][0].name)+t._s(e.basket.group[0].length>1?"等"+e.basket.group[0].length+"件商品":""))]),t._v(" "),a("span",{staticClass:"food_price"},[t._v("￥"+t._s(e.total_amount.toFixed(2)))])])])]),t._v(" "),a("div",{staticClass:"bottom"},["等待支付"==t.paymentStatus[n]?a("compute-time",{attrs:{time:e.time_pass},on:{changePayment:function(e){t.changePayment(n)}},nativeOn:{click:function(t){t.stopPropagation()}}}):a("router-link",{staticClass:"one_more",attrs:{to:{path:"/shop",query:{geohash:t.geohash,id:e.restaurant_id}},tag:"span"},nativeOn:{click:function(t){t.stopPropagation()}}},[t._v("再来一单")])],1)])])})),t._v(" "),a("foot-guide",{attrs:{parent:"order"}}),t._v(" "),a("transition",{attrs:{name:"slide"}},[a("router-view")],1)],1)},staticRenderFns:[]};e.a=n},hbpx:function(t,e){},omth:function(t,e){},zeXb:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=f(a("Xxa5")),s=f(a("exGp")),i=f(a("Dd8w")),r=f(a("vGpu")),o=f(a("n5ZD")),u=f(a("6Q/n")),c=a("i84Q"),l=a("NYxO"),d=a("uaSg");function f(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{orderlist:[],imgBaseUrl:d.imgBaseUrl,paymentStatus:[]}},created:function(){this.init()},components:{headTop:r.default,footGuide:o.default,computeTime:u.default},computed:(0,i.default)({},(0,l.mapState)(["userInfo","geohash"])),methods:(0,i.default)({},(0,l.mapMutations)(["SAVE_ORDERDETAIL"]),{init:function(){var t=this;return(0,s.default)(n.default.mark(function e(){return n.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.userInfo){e.next=5;break}return e.next=3,(0,c.orderList)(t.userInfo.user_id);case 3:t.orderlist=e.sent,t.paymentStatus=t.orderlist.map(function(t){return t.status_bar.title});case 5:case"end":return e.stop()}},e,t)}))()},changePayment:function(t){this.paymentStatus[t]="支付超时"},showDetail:function(t){this.SAVE_ORDERDETAIL(t),this.$router.push("order/orderDetail")}}),watch:{userInfo:function(){this.init()}}}}});
//# sourceMappingURL=5.c586f45e753b72b94717.js.map