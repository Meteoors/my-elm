webpackJsonp([14],{"3k4t":function(t,s){},SbJW:function(t,s,i){"use strict";var a={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{attrs:{id:"profile"}},[i("head-top",{attrs:{"go-back":"true","head-title":"我的"}}),t._v(" "),i("router-link",{staticClass:"login_link",attrs:{to:t.userInfo?"/profile/info":"/login",tag:"div"}},[i("div",{staticClass:"avatar"},[t.userInfo?i("img",{staticClass:"profile_img",attrs:{src:t.imgBaseUrl+t.userInfo.avatar}}):i("svg",{staticClass:"profile_photo",attrs:{fill:"#fff"}},[i("use",{attrs:{"xlink:href":"#avatar-default"}})])]),t._v(" "),i("div",{staticClass:"userinfo"},[i("p",{staticClass:"title"},[t._v(t._s(t.username))]),t._v(" "),i("p",{staticClass:"phone"},[i("svg",{staticClass:"mobile"},[i("use",{attrs:{"xlink:href":"#mobile"}})]),t._v(" "),i("span",{staticClass:"num"},[t._v(t._s(t.mobile))])])]),t._v(" "),i("div",{staticClass:"icon"},[i("svg",{staticClass:"arrow_right"},[i("use",{attrs:{"xlink:href":"#arrow-right"}})])])]),t._v(" "),i("ul",{staticClass:"info clear"},[i("router-link",{staticClass:"info_li",attrs:{to:"/balance",tag:"li"}},[i("p",{staticClass:"top"},[i("span",[t._v(t._s(t.balance.toFixed(2)))]),t._v("元")]),t._v(" "),i("p",{staticClass:"bottom"},[t._v("我的余额")])]),t._v(" "),i("router-link",{staticClass:"info_li",attrs:{to:"/benefit",tag:"li"}},[i("p",{staticClass:"top"},[i("span",[t._v(t._s(t.count))]),t._v("个")]),t._v(" "),i("p",{staticClass:"bottom"},[t._v("我的优惠")])]),t._v(" "),i("router-link",{staticClass:"info_li",attrs:{to:"/points",tag:"li"}},[i("p",{staticClass:"top"},[i("span",[t._v(t._s(t.point))]),t._v("分")]),t._v(" "),i("p",{staticClass:"bottom"},[t._v("我的积分")])])],1),t._v(" "),i("section",{staticClass:"service"},[i("router-link",{staticClass:"detail",attrs:{to:"/order"}},[i("svg",{attrs:{fill:"#4aa5f0"}},[i("use",{attrs:{"xmlns:xlink":"http://www.w3.org/1999/xlink","xlink:href":"#order"}})]),t._v(" "),i("span",[t._v("我的订单")]),t._v(" "),i("div",{staticClass:"icon"},[i("svg",{attrs:{fill:"#bbb"}},[i("use",{attrs:{"xmlns:xlink":"http://www.w3.org/1999/xlink","xlink:href":"#arrow-right"}})])])]),t._v(" "),i("a",{staticClass:"detail",attrs:{href:"https://home.m.duiba.com.cn/#/chome/index"}},[i("svg",{attrs:{fill:"#fc7b53"}},[i("use",{attrs:{"xmlns:xlink":"http://www.w3.org/1999/xlink","xlink:href":"#point"}})]),t._v(" "),i("span",[t._v("积分商城")]),t._v(" "),i("div",{staticClass:"icon"},[i("svg",{attrs:{fill:"#bbb"}},[i("use",{attrs:{"xmlns:xlink":"http://www.w3.org/1999/xlink","xlink:href":"#arrow-right"}})])])]),t._v(" "),i("router-link",{staticClass:"detail",attrs:{to:"/vipcard"}},[i("svg",{attrs:{fill:"#ffc636"}},[i("use",{attrs:{"xmlns:xlink":"http://www.w3.org/1999/xlink","xlink:href":"#vip"}})]),t._v(" "),i("span",{staticClass:"border_none"},[t._v("饿了么会员卡")]),t._v(" "),i("div",{staticClass:"icon"},[i("svg",{attrs:{fill:"#bbb"}},[i("use",{attrs:{"xmlns:xlink":"http://www.w3.org/1999/xlink","xlink:href":"#arrow-right"}})])])])],1),t._v(" "),i("section",{staticClass:"service"},[i("router-link",{staticClass:"detail",attrs:{to:"/service"}},[i("svg",{attrs:{fill:"#4aa5f0"}},[i("use",{attrs:{"xmlns:xlink":"http://www.w3.org/1999/xlink","xlink:href":"#service"}})]),t._v(" "),i("span",[t._v("服务中心")]),t._v(" "),i("div",{staticClass:"icon"},[i("svg",{attrs:{fill:"#bbb"}},[i("use",{attrs:{"xmlns:xlink":"http://www.w3.org/1999/xlink","xlink:href":"#arrow-right"}})])])]),t._v(" "),i("router-link",{staticClass:"detail",attrs:{to:"/download"}},[i("svg",{attrs:{fill:"#3cabff"}},[i("use",{attrs:{"xmlns:xlink":"http://www.w3.org/1999/xlink","xlink:href":"#download"}})]),t._v(" "),i("span",{staticClass:"border_none"},[t._v("下载饿了么APP")]),t._v(" "),i("div",{staticClass:"icon"},[i("svg",{attrs:{fill:"#bbb"}},[i("use",{attrs:{"xmlns:xlink":"http://www.w3.org/1999/xlink","xlink:href":"#arrow-right"}})])])])],1),t._v(" "),i("foot-guide",{attrs:{parent:"profile"}}),t._v(" "),i("transition",{attrs:{name:"slide"}},[i("router-view")],1)],1)},staticRenderFns:[]};s.a=a},iIsJ:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=o(i("Dd8w")),r=i("uaSg"),n=i("NYxO"),e=o(i("vGpu")),l=o(i("n5ZD"));function o(t){return t&&t.__esModule?t:{default:t}}s.default={data:function(){return{imgBaseUrl:r.imgBaseUrl,username:"登录/注册",mobile:"暂无绑定手机号",balance:0,count:0,point:0}},computed:(0,a.default)({},(0,n.mapState)(["userInfo"])),created:function(){this.init()},components:{headTop:e.default,footGuide:l.default},methods:{init:function(){this.userInfo?(this.username=this.userInfo.username,this.mobile=this.userInfo.mobile||"暂无绑定手机号",this.balance=this.userInfo.balance,this.count=this.userInfo.gift_amount,this.point=this.userInfo.point):(this.username="登录/注册",this.mobile="暂无绑定手机号",this.balance=0,this.count=0,this.point=0)}},watch:{userInfo:function(){this.init()}}}},nLty:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=i("iIsJ"),r=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(s,t,function(){return a[t]})}(n);var e=i("SbJW");var l=function(t){i("3k4t")},o=i("VU/8")(r.a,e.a,!1,l,"data-v-1f4177b6",null);s.default=o.exports}});
//# sourceMappingURL=14.bea10c7534a74b398b28.js.map