webpackJsonp([2],{"/Yz7":function(t,s,a){"use strict";var e={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"loading"},[s("div",{staticClass:"load_img",style:{backgroundPositionY:-this.positionY%7*2.5+"rem"}}),this._v(" "),s("svg",{staticClass:"load_ellipse",attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1"}},[s("ellipse",{staticStyle:{fill:"#ddd",stroke:"none"},attrs:{cx:"26",cy:"10",rx:"26",ry:"10"}})])])},staticRenderFns:[]};s.a=e},"0qaM":function(t,s){},"3Qg8":function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default={data:function(){return{positionY:0}},created:function(){var t=this;this.timer=setInterval(function(){t.positionY++},600)},beforeDestroy:function(){clearInterval(this.timer)}}},"44dg":function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("3Qg8"),r=a.n(e);for(var i in e)"default"!==i&&function(t){a.d(s,t,function(){return e[t]})}(i);var n=a("/Yz7");var c=function(t){a("0qaM")},o=a("VU/8")(r.a,n.a,!1,c,"data-v-15a434b6",null);s.default=o.exports},AQf5:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("WNpW"),r=a.n(e);for(var i in e)"default"!==i&&function(t){a.d(s,t,function(){return e[t]})}(i);var n=a("rwhq");var c=function(t){a("ktZk")},o=a("VU/8")(r.a,n.a,!1,c,"data-v-80fdaa00",null);s.default=o.exports},TmV0:function(t,s,a){a("fZOM"),t.exports=a("FeBl").Object.values},WNpW:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=h(a("gRE1")),r=h(a("Dd8w")),i=h(a("Xxa5")),n=h(a("exGp")),c=h(a("vGpu")),o=h(a("ib+B")),u=h(a("44dg")),l=a("uaSg"),d=a("NYxO"),_=a("i84Q");function h(t){return t&&t.__esModule?t:{default:t}}s.default={data:function(){return{geohash:"",shopId:null,imgBaseUrl:l.imgBaseUrl,checkoutData:null,showPayWay:!1,payWayId:1,shopCart:null,showAlert:!1,alertText:"",showLoading:!0}},created:function(){var t=this;return(0,n.default)(i.default.mark(function s(){return i.default.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return t.geohash=t.$route.query.geohash,t.shopId=t.$route.query.shopId,t.INIT_BUYCART(),t.shopCart=t.buyCart[t.shopId],s.next=6,t.initData();case 6:case"end":return s.stop()}},s,t)}))()},components:{headTop:c.default,alertTip:o.default,loading:u.default},computed:(0,r.default)({},(0,d.mapState)(["buyCart","userInfo","chosenAddress","remark"]),{remarkText:function(){var t=this.remark.remarkText,s=this.remark.inputText,a="";return(0,e.default)(t).forEach(function(t){(0,e.default)(t).forEach(function(t){a+=t+"、"})}),s?a+=s:a=a.substring(0,a.length-1),a}}),methods:(0,r.default)({},(0,d.mapMutations)(["INIT_BUYCART","CHOOSE_ADDRESS","SAVE_ORDER","ORDER_SUCCESS","SAVE_ADDRESS"]),{initData:function(){var t=this;return(0,n.default)(i.default.mark(function s(){var a;return i.default.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return a=[],(0,e.default)(t.shopCart).forEach(function(t){(0,e.default)(t).forEach(function(t){(0,e.default)(t).forEach(function(t){t&&a.push({attrs:[],extra:{},id:t.id,name:t.name,packing_fee:t.packing_fee,price:t.price,quantity:t.num,sku_id:t.id,specs:[t.specs],stock:t.stock})})})}),s.next=4,(0,_.checkoutData)(t.geohash,[a],t.shopId);case 4:return t.checkoutData=s.sent,s.next=7,t.initAddress();case 7:t.showLoading=!1;case 8:case"end":return s.stop()}},s,t)}))()},initAddress:function(){var t=this;return(0,n.default)(i.default.mark(function s(){var a;return i.default.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(!t.userInfo||!t.userInfo.user_id){s.next=5;break}return s.next=3,(0,_.getAddress)(t.userInfo.user_id);case 3:a=s.sent,t.SAVE_ADDRESS(a);case 5:case"end":return s.stop()}},s,t)}))()},tagColor:function(t){switch(t){case"公司":return"#4cd964";case"学校":return"#3190e8"}},choosePayWay:function(t,s){t&&(this.payWayId=s,this.showPayWay=!1)},confirmOrder:function(){var t=this;return(0,n.default)(i.default.mark(function s(){var a;return i.default.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(t.userInfo){s.next=6;break}return t.showAlert=!0,t.alertText="请登录",s.abrupt("return");case 6:if(t.chosenAddress){s.next=10;break}return t.showAlert=!0,t.alertText="请添加一个收货地址",s.abrupt("return");case 10:return t.SAVE_ORDER({user_id:t.userInfo.user_id,cart_id:t.checkoutData.cart_id,address_id:t.chosenAddress.id,description:t.remark,entities:t.checkoutData.cart.groups,geohash:t.geohash}),s.next=13,(0,_.confirmOrder)(t.userInfo.user_id,t.checkoutData.cart.id,t.chosenAddress.id,t.shopId,t.geohash,t.remark,t.checkoutData.cart.groups);case 13:(a=s.sent).need_validation?t.$router.push("/comfirmOrder/userValidation"):a.success?(t.ORDER_SUCCESS(a),t.$router.push("/confirmOrder/payment")):(t.showAlert=!0,t.alertText=a.message);case 15:case"end":return s.stop()}},s,t)}))()}}),watch:{userInfo:function(){this.initAddress()}}}},fZOM:function(t,s,a){var e=a("kM2E"),r=a("mbce")(!1);e(e.S,"Object",{values:function(t){return r(t)}})},gRE1:function(t,s,a){t.exports={default:a("TmV0"),__esModule:!0}},ktZk:function(t,s){},mbce:function(t,s,a){var e=a("lktj"),r=a("TcQ7"),i=a("NpIQ").f;t.exports=function(t){return function(s){for(var a,n=r(s),c=e(n),o=c.length,u=0,l=[];o>u;)i.call(n,a=c[u++])&&l.push(t?[a,n[a]]:n[a]);return l}}},rwhq:function(t,s,a){"use strict";var e={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{attrs:{id:"confirm_order"}},[t.showLoading?t._e():a("section",[a("head-top",{attrs:{"go-back":"true","head-title":"确认订单",login:"true"}}),t._v(" "),a("router-link",{staticClass:"address_wrapper",attrs:{to:{path:"/confirmOrder/chooseAddress",query:{shopId:t.shopId,geohash:t.geohash}}}},[a("div",{staticClass:"left"},[a("svg",{staticClass:"location"},[a("use",{attrs:{"xlink:href":"#location"}})]),t._v(" "),t.chosenAddress?a("div",{staticClass:"address"},[a("header",[a("span",{staticClass:"name"},[t._v(t._s(t.chosenAddress.name))]),t._v(" "),a("span",[t._v(t._s(1==t.chosenAddress.sex?"先生":"女士"))]),t._v(" "),a("span",[t._v(t._s(t.chosenAddress.phone))])]),t._v(" "),a("p",[t.chosenAddress.tag?a("span",{staticClass:"tag",style:{backgroundColor:t.tagColor(t.chosenAddress.tag)}},[t._v(t._s(t.chosenAddress.tag))]):t._e(),t._v(" "),a("span",{staticClass:"detail ellipsis"},[t._v(t._s(t.chosenAddress.address_detail))])])]):a("div",{staticClass:"no_address"},[t._v("请添加一个收货地址")])]),t._v(" "),a("svg",{staticClass:"arrow_right"},[a("use",{attrs:{"xlink:href":"#arrow-right"}})])]),t._v(" "),a("section",{staticClass:"time_wrapper"},[a("div",{staticClass:"left"},[t._v("送达时间")]),t._v(" "),a("div",{staticClass:"right"},[a("p",{staticClass:"time"},[t._v("尽快送达 | 预计 "+t._s(t.checkoutData.delivery_reach_time))]),t._v(" "),t.checkoutData.cart.is_deliver_by_fengniao?a("p",{staticClass:"mode"},[t._v("蜂鸟专送")]):t._e()])]),t._v(" "),a("section",{staticClass:"pay_info"},[a("div",{staticClass:"pay"},[a("span",{staticClass:"title"},[t._v("支付方式")]),t._v(" "),a("div",{staticClass:"more_type",on:{click:function(s){t.showPayWay=!0}}},[a("span",{staticClass:"way"},[t._v("在线支付")]),t._v(" "),a("svg",{staticClass:"arrow_right"},[a("use",{attrs:{"xlink:href":"#arrow-right"}})])])]),t._v(" "),t._m(0)]),t._v(" "),a("section",{staticClass:"food"},[a("header",{staticClass:"title"},[a("img",{attrs:{src:t.imgBaseUrl+t.checkoutData.cart.restaurant_info.image_path}}),t._v(" "),a("span",[t._v(t._s(t.checkoutData.cart.restaurant_info.name))])]),t._v(" "),a("ul",{staticClass:"food_ul"},t._l(t.checkoutData.cart.groups[0],function(s,e){return a("li",{key:e,staticClass:"food_li"},[a("span",{staticClass:"name ellipsis"},[t._v(t._s(s.name))]),t._v(" "),a("div",{staticClass:"right"},[a("span",{staticClass:"num"},[t._v("x "+t._s(s.quantity))]),t._v(" "),a("span",{staticClass:"price"},[t._v("￥"+t._s(s.price))])])])})),t._v(" "),t.checkoutData.cart.extra?a("div",{staticClass:"price_item"},[a("span",{staticClass:"ellipsis"},[t._v(t._s(t.checkoutData.cart.extra[0].name))]),t._v(" "),a("span",[t._v("￥ "+t._s(t.checkoutData.cart.extra[0].price))])]):t._e(),t._v(" "),a("div",{staticClass:"price_item"},[a("span",[t._v("配送费")]),t._v(" "),a("span",[t._v("￥ "+t._s(t.checkoutData.cart.deliver_amount))])]),t._v(" "),a("div",{staticClass:"total_price"},[a("span",{staticClass:"ellipsis"},[t._v("订单 ￥"+t._s(t.checkoutData.cart.total))]),t._v(" "),a("span",[t._v("待支付 ￥"+t._s(t.checkoutData.cart.total))])])]),t._v(" "),a("section",{staticClass:"extra"},[a("router-link",{staticClass:"item",attrs:{to:{path:"/confirmOrder/remark",query:{cart_id:t.checkoutData.id}}}},[a("span",{staticClass:"title"},[t._v("订单备注")]),t._v(" "),a("div",{staticClass:"detail"},[a("span",{staticClass:"ellipsis"},[t._v(t._s(t.remark?t.remarkText:"口味、偏好等"))]),t._v(" "),a("svg",{staticClass:"arrow_right"},[a("use",{attrs:{"xlink:href":"#arrow-right"}})])])]),t._v(" "),a("router-link",{staticClass:"item",attrs:{to:"/confirmOrder/invoice"}},[a("span",{staticClass:"title"},[t._v("发票抬头")]),t._v(" "),a("div",{staticClass:"detail"},[a("span",[t._v("不需要开发票")]),t._v(" "),a("svg",{staticClass:"arrow_right"},[a("use",{attrs:{"xlink:href":"#arrow-right"}})])])])],1),t._v(" "),a("section",{staticClass:"pay_bar"},[a("div",{staticClass:"num"},[t._v("待支付 ￥"+t._s(t.checkoutData.cart.total))]),t._v(" "),a("div",{staticClass:"pay",on:{click:t.confirmOrder}},[t._v("确认下单")])]),t._v(" "),a("transition",{attrs:{name:"slide_up"}},[a("section",{directives:[{name:"show",rawName:"v-show",value:t.showPayWay,expression:"showPayWay"}],staticClass:"pay_way"},[a("header",[t._v("支付方式")]),t._v(" "),a("ul",{staticClass:"pay_ul"},t._l(t.checkoutData.payments,function(s,e){return a("li",{key:e,class:{chosen:t.payWayId==s.id},on:{click:function(a){t.choosePayWay(s.is_online_payment,s.id)}}},[a("span",[t._v(t._s(s.name)),s.is_online_payment?t._e():a("span",[t._v(t._s(s.description))])]),t._v(" "),a("svg",{staticClass:"select"},[a("use",{attrs:{"xlink:href":"#select"}})])])}))])]),t._v(" "),a("transition",{attrs:{name:"fade"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.showPayWay,expression:"showPayWay"}],staticClass:"cover",on:{click:function(s){t.showPayWay=!1}}})])],1),t._v(" "),a("alert-tip",{directives:[{name:"show",rawName:"v-show",value:t.showAlert,expression:"showAlert"}],attrs:{alertText:t.alertText},on:{closeTip:function(s){t.showAlert=!1}}}),t._v(" "),t.showLoading?a("loading"):t._e(),t._v(" "),a("transition",{attrs:{name:"slide"}},[a("router-view")],1)],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"hongbao"},[s("span",[this._v("红包")]),this._v(" "),s("span",[this._v("暂时只在饿了么APP中支持")])])}]};s.a=e}});
//# sourceMappingURL=2.f685339031789645a8c2.js.map