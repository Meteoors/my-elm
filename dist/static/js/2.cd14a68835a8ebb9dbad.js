webpackJsonp([2],{"/Yz7":function(t,a,e){"use strict";var s={render:function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"loading"},[a("div",{staticClass:"load_img",style:{backgroundPositionY:-this.positionY%7*2.5+"rem"}}),this._v(" "),a("svg",{staticClass:"load_ellipse",attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1"}},[a("ellipse",{staticStyle:{fill:"#ddd",stroke:"none"},attrs:{cx:"26",cy:"10",rx:"26",ry:"10"}})])])},staticRenderFns:[]};a.a=s},"0qaM":function(t,a){},"3Qg8":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={data:function(){return{positionY:0}},created:function(){var t=this;this.timer=setInterval(function(){t.positionY++},600)},beforeDestroy:function(){clearInterval(this.timer)}}},"44dg":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("3Qg8"),r=e.n(s);for(var i in s)"default"!==i&&function(t){e.d(a,t,function(){return s[t]})}(i);var n=e("/Yz7");var c=function(t){e("0qaM")},o=e("VU/8")(r.a,n.a,!1,c,"data-v-15a434b6",null);a.default=o.exports},AQf5:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("WNpW"),r=e.n(s);for(var i in s)"default"!==i&&function(t){e.d(a,t,function(){return s[t]})}(i);var n=e("QLeG");var c=function(t){e("Gk0k")},o=e("VU/8")(r.a,n.a,!1,c,"data-v-f850f4ea",null);a.default=o.exports},Gk0k:function(t,a){},QLeG:function(t,a,e){"use strict";var s={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"confirm_order"}},[t.showLoading?t._e():e("section",[e("head-top",{attrs:{"go-back":"true","head-title":"确认订单",login:"true"}}),t._v(" "),e("router-link",{staticClass:"address_wrapper",attrs:{to:{path:"/confirmOrder/chooseAddress",query:{shopId:t.shopId,geohash:t.geohash}}}},[e("div",{staticClass:"left"},[e("svg",{staticClass:"location"},[e("use",{attrs:{"xlink:href":"#location"}})]),t._v(" "),t.chosenAddress?e("div",{staticClass:"address"},[e("header",[e("span",{staticClass:"name"},[t._v(t._s(t.chosenAddress.name))]),t._v(" "),e("span",[t._v(t._s(1==t.chosenAddress.sex?"先生":"女士"))]),t._v(" "),e("span",[t._v(t._s(t.chosenAddress.phone))])]),t._v(" "),e("p",[t.chosenAddress.tag?e("span",{staticClass:"tag",style:{backgroundColor:t.tagColor(t.chosenAddress.tag)}},[t._v(t._s(t.chosenAddress.tag))]):t._e(),t._v(" "),e("span",{staticClass:"detail ellipsis"},[t._v(t._s(t.chosenAddress.address_detail))])])]):e("div",{staticClass:"no_address"},[t._v("请添加一个收货地址")])]),t._v(" "),e("svg",{staticClass:"arrow_right"},[e("use",{attrs:{"xlink:href":"#arrow-right"}})])]),t._v(" "),e("section",{staticClass:"time_wrapper"},[e("div",{staticClass:"left"},[t._v("送达时间")]),t._v(" "),e("div",{staticClass:"right"},[e("p",{staticClass:"time"},[t._v("尽快送达 | 预计 "+t._s(t.checkoutData.delivery_reach_time))]),t._v(" "),t.checkoutData.cart.is_deliver_by_fengniao?e("p",{staticClass:"mode"},[t._v("蜂鸟专送")]):t._e()])]),t._v(" "),e("section",{staticClass:"pay_info"},[e("div",{staticClass:"pay"},[e("span",{staticClass:"title"},[t._v("支付方式")]),t._v(" "),e("div",{staticClass:"more_type",on:{click:function(a){t.showPayWay=!0}}},[e("span",{staticClass:"way"},[t._v("在线支付")]),t._v(" "),e("svg",{staticClass:"arrow_right"},[e("use",{attrs:{"xlink:href":"#arrow-right"}})])])]),t._v(" "),t._m(0)]),t._v(" "),e("section",{staticClass:"food"},[e("header",{staticClass:"title"},[e("img",{attrs:{src:t.imgBaseUrl+t.checkoutData.cart.restaurant_info.image_path}}),t._v(" "),e("span",[t._v(t._s(t.checkoutData.cart.restaurant_info.name))])]),t._v(" "),e("ul",{staticClass:"food_ul"},t._l(t.checkoutData.cart.groups[0],function(a,s){return e("li",{key:s,staticClass:"food_li"},[e("span",{staticClass:"name ellipsis"},[t._v(t._s(a.name))]),t._v(" "),e("div",{staticClass:"right"},[e("span",{staticClass:"num"},[t._v("x "+t._s(a.quantity))]),t._v(" "),e("span",{staticClass:"price"},[t._v("￥"+t._s(a.price))])])])})),t._v(" "),t.checkoutData.cart.extra?e("div",{staticClass:"price_item"},[e("span",{staticClass:"ellipsis"},[t._v(t._s(t.checkoutData.cart.extra[0].name))]),t._v(" "),e("span",[t._v("￥ "+t._s(t.checkoutData.cart.extra[0].price))])]):t._e(),t._v(" "),e("div",{staticClass:"price_item"},[e("span",[t._v("配送费")]),t._v(" "),e("span",[t._v("￥ "+t._s(t.checkoutData.cart.deliver_amount))])]),t._v(" "),e("div",{staticClass:"total_price"},[e("span",{staticClass:"ellipsis"},[t._v("订单 ￥"+t._s(t.checkoutData.cart.total))]),t._v(" "),e("span",[t._v("待支付 ￥"+t._s(t.checkoutData.cart.total))])])]),t._v(" "),e("section",{staticClass:"extra"},[e("router-link",{staticClass:"item",attrs:{to:{path:"/confirmOrder/remark",query:{cart_id:t.checkoutData.id}}}},[e("span",{staticClass:"title"},[t._v("订单备注")]),t._v(" "),e("div",{staticClass:"detail"},[e("span",{staticClass:"ellipsis"},[t._v(t._s(t.remark?t.remarkText:"口味、偏好等"))]),t._v(" "),e("svg",{staticClass:"arrow_right"},[e("use",{attrs:{"xlink:href":"#arrow-right"}})])])]),t._v(" "),e("router-link",{staticClass:"item",attrs:{to:"/confirmOrder/invoice"}},[e("span",{staticClass:"title"},[t._v("发票抬头")]),t._v(" "),e("div",{staticClass:"detail"},[e("span",[t._v("不需要开发票")]),t._v(" "),e("svg",{staticClass:"arrow_right"},[e("use",{attrs:{"xlink:href":"#arrow-right"}})])])])],1),t._v(" "),e("section",{staticClass:"pay_bar"},[e("div",{staticClass:"num"},[t._v("待支付 ￥"+t._s(t.checkoutData.cart.total))]),t._v(" "),e("div",{staticClass:"pay",on:{click:t.confirmOrder}},[t._v("确认下单")])]),t._v(" "),e("transition",{attrs:{name:"slide_up"}},[e("section",{directives:[{name:"show",rawName:"v-show",value:t.showPayWay,expression:"showPayWay"}],staticClass:"pay_way"},[e("header",[t._v("支付方式")]),t._v(" "),e("ul",{staticClass:"pay_ul"},t._l(t.checkoutData.payments,function(a,s){return e("li",{key:s,class:{chosen:t.payWayId==a.id},on:{click:function(e){t.choosePayWay(a.is_online_payment,a.id)}}},[e("span",[t._v(t._s(a.name)),a.is_online_payment?t._e():e("span",[t._v(t._s(a.description))])]),t._v(" "),e("svg",{staticClass:"select"},[e("use",{attrs:{"xlink:href":"#select"}})])])}))])]),t._v(" "),e("transition",{attrs:{name:"fade"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.showPayWay,expression:"showPayWay"}],staticClass:"cover",on:{click:function(a){t.showPayWay=!1}}})])],1),t._v(" "),e("alert-tip",{directives:[{name:"show",rawName:"v-show",value:t.showAlert,expression:"showAlert"}],attrs:{alertText:t.alertText},on:{closeTip:function(a){t.showAlert=!1}}}),t._v(" "),t.showLoading?e("loading"):t._e(),t._v(" "),e("transition",{attrs:{name:"slide"}},[e("router-view")],1)],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"hongbao"},[a("span",[this._v("红包")]),this._v(" "),a("span",[this._v("暂时只在饿了么APP中支持")])])}]};a.a=s},TmV0:function(t,a,e){e("fZOM"),t.exports=e("FeBl").Object.values},WNpW:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=h(e("gRE1")),r=h(e("Dd8w")),i=h(e("Xxa5")),n=h(e("exGp")),c=h(e("vGpu")),o=h(e("ib+B")),u=h(e("44dg")),l=e("uaSg"),d=e("NYxO"),_=e("i84Q");function h(t){return t&&t.__esModule?t:{default:t}}a.default={data:function(){return{geohash:"",shopId:null,imgBaseUrl:l.imgBaseUrl,checkoutData:null,showPayWay:!1,payWayId:1,shopCart:null,showAlert:!1,alertText:"",showLoading:!0}},created:function(){var t=this;return(0,n.default)(i.default.mark(function a(){return i.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t.geohash=t.$route.query.geohash,t.shopId=t.$route.query.shopId,alert("before init buycart"),t.INIT_BUYCART(),alert("after init buycart"),t.shopCart=t.buyCart[t.shopId],alert("created!"),a.next=9,t.initData();case 9:case"end":return a.stop()}},a,t)}))()},components:{headTop:c.default,alertTip:o.default,loading:u.default},computed:(0,r.default)({},(0,d.mapState)(["buyCart","userInfo","chosenAddress","remark"]),{remarkText:function(){var t=this.remark.remarkText,a=this.remark.inputText,e="";return(0,s.default)(t).forEach(function(t){(0,s.default)(t).forEach(function(t){e+=t+"、"})}),a?e+=a:e=e.substring(0,e.length-1),e}}),methods:(0,r.default)({},(0,d.mapMutations)(["INIT_BUYCART","CHOOSE_ADDRESS","SAVE_ORDER","ORDER_SUCCESS","SAVE_ADDRESS"]),{initData:function(){var t=this;return(0,n.default)(i.default.mark(function a(){var e;return i.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e=[],alert("brfore initData"),(0,s.default)(t.shopCart).forEach(function(t){(0,s.default)(t).forEach(function(t){(0,s.default)(t).forEach(function(t){t&&e.push({attrs:[],extra:{},id:t.id,name:t.name,packing_fee:t.packing_fee,price:t.price,quantity:t.num,sku_id:t.id,specs:[t.specs],stock:t.stock})})})}),alert("before checkoutData"),a.next=6,(0,_.checkoutData)(t.geohash,[e],t.shopId);case 6:return t.checkoutData=a.sent,alert("checkoutData finish!"),a.next=10,t.initAddress();case 10:t.showLoading=!1;case 11:case"end":return a.stop()}},a,t)}))()},initAddress:function(){var t=this;return(0,n.default)(i.default.mark(function a(){var e;return i.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(alert("initAddress begin"),!t.userInfo||!t.userInfo.user_id){a.next=8;break}return alert("before getAddress"),a.next=5,(0,_.getAddress)(t.userInfo.user_id);case 5:(e=a.sent)instanceof Array&&e.length&&t.CHOOSE_ADDRESS(e[0]),t.SAVE_ADDRESS(e);case 8:case"end":return a.stop()}},a,t)}))()},tagColor:function(t){switch(t){case"公司":return"#4cd964";case"学校":return"#3190e8"}},choosePayWay:function(t,a){t&&(this.payWayId=a,this.showPayWay=!1)},confirmOrder:function(){var t=this;return(0,n.default)(i.default.mark(function a(){var e;return i.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(t.userInfo.user_id){a.next=6;break}return t.showAlert=!0,t.alertText="请登录",a.abrupt("return");case 6:if(t.chosenAddress){a.next=10;break}return t.showAlert=!0,t.alertText="请添加一个收货地址",a.abrupt("return");case 10:return t.SAVE_ORDER({user_id:t.userInfo.user_id,cart_id:t.checkoutData.cart_id,address_id:t.chosenAddress.id,description:t.remark,entities:t.checkoutData.cart.groups,geohash:t.geohash}),a.next=13,(0,_.confirmOrder)(t.userInfo.user_id,t.checkoutData.cart.id,t.chosenAddress.id,t.shopId,t.geohash,t.remark,t.checkoutData.cart.groups);case 13:(e=a.sent).need_validation?t.$router.push("/comfirmOrder/userValidation"):e.success?(t.ORDER_SUCCESS(e),t.$router.push("/confirmOrder/payment")):(t.showAlert=!0,t.alertText=e.message);case 15:case"end":return a.stop()}},a,t)}))()}}),watch:{userInfo:function(){this.initAddress()}}}},fZOM:function(t,a,e){var s=e("kM2E"),r=e("mbce")(!1);s(s.S,"Object",{values:function(t){return r(t)}})},gRE1:function(t,a,e){t.exports={default:e("TmV0"),__esModule:!0}},mbce:function(t,a,e){var s=e("lktj"),r=e("TcQ7"),i=e("NpIQ").f;t.exports=function(t){return function(a){for(var e,n=r(a),c=s(n),o=c.length,u=0,l=[];o>u;)i.call(n,e=c[u++])&&l.push(t?[e,n[e]]:n[e]);return l}}}});
//# sourceMappingURL=2.cd14a68835a8ebb9dbad.js.map