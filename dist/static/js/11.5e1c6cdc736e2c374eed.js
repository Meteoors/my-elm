webpackJsonp([11],{"8aQa":function(e,t,a){"use strict";var s={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"add_address"}},[s("head-top",{attrs:{"go-back":"true","head-title":"添加地址"}}),e._v(" "),s("section",{staticClass:"form"},[s("div",{staticClass:"item"},[s("div",{staticClass:"title"},[e._v("联系人")]),e._v(" "),s("div",{staticClass:"detail"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"name",attrs:{type:"text",placeholder:"你的名字"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}}),e._v(" "),s("div",{staticClass:"sex"},[s("span",{staticClass:"option",class:{active:1==e.sex},on:{click:function(t){e.chooseSex(1)}}},[s("svg",[s("use",{attrs:{"xlink:href":"#select"}})]),e._v(" "),s("span",[e._v("先生")])]),e._v(" "),s("span",{staticClass:"option",class:{active:2==e.sex},on:{click:function(t){e.chooseSex(2)}}},[s("svg",[s("use",{attrs:{"xlink:href":"#select"}})]),e._v(" "),s("span",[e._v("女士")])])])])]),e._v(" "),s("div",{staticClass:"item"},[s("div",{staticClass:"title"},[e._v("联系电话")]),e._v(" "),s("div",{staticClass:"detail"},[s("p",{staticClass:"phone"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],attrs:{type:"text",placeholder:"你的手机号"},domProps:{value:e.phone},on:{input:function(t){t.target.composing||(e.phone=t.target.value)}}}),e._v(" "),s("img",{attrs:{src:a("IntN"),height:"20",width:"20"},on:{click:function(t){e.showExPhone=!0}}})]),e._v(" "),e.showExPhone?s("input",{directives:[{name:"model",rawName:"v-model",value:e.exPhone,expression:"exPhone"}],staticClass:"exPhone",attrs:{type:"text",placeholder:"备选电话"},domProps:{value:e.exPhone},on:{input:function(t){t.target.composing||(e.exPhone=t.target.value)}}}):e._e()])]),e._v(" "),s("div",{staticClass:"item"},[s("div",{staticClass:"title"},[e._v("送餐地址")]),e._v(" "),s("div",{staticClass:"detail"},[s("router-link",{staticClass:"address",attrs:{to:"/confirmOrder/chooseAddress/addAddress/searchAddress",tag:"div"}},[e._v(e._s(e.building?e.building:"小区/写字楼/学校等"))]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.addressDetail,expression:"addressDetail"}],attrs:{type:"text",placeholder:"详细地址（如门牌号等）"},domProps:{value:e.addressDetail},on:{input:function(t){t.target.composing||(e.addressDetail=t.target.value)}}})],1)]),e._v(" "),s("div",{staticClass:"item"},[s("div",{staticClass:"title"},[e._v("标签")]),e._v(" "),s("div",{staticClass:"detail"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.tag,expression:"tag"}],attrs:{type:"text",placeholder:"无/家/学校/公司"},domProps:{value:e.tag},on:{input:function(t){t.target.composing||(e.tag=t.target.value)}}})])])]),e._v(" "),s("div",{staticClass:"btn",on:{click:e.confirm}},[e._v("确定")]),e._v(" "),s("alert-tip",{directives:[{name:"show",rawName:"v-show",value:e.showAlert,expression:"showAlert"}],attrs:{alertText:e.alertText},on:{closeTip:function(t){e.showAlert=!1}}}),e._v(" "),s("transition",{attrs:{name:"slide"}},[s("router-view")],1)],1)},staticRenderFns:[]};t.a=s},IntN:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAAAXNSR0IArs4c6QAAAHRJREFUSA1jZCAT8E59/R+m9XO2KCOMTQrNRIpiaqsdtZzaIUqUeaPBTlQwUVvRaLBTO0SJMm802IkKJmorYkSunahtOCHzRm6ck9UIAAUncnSNNiYIJTB0+ZGb4EZ9jp4W6MIfDXa6BDO6JaPBjh4idOEDAOTZCsiDM8JjAAAAAElFTkSuQmCC"},guON:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=d(a("Xxa5")),r=d(a("exGp")),n=d(a("Dd8w")),i=d(a("vGpu")),o=d(a("ib+B")),l=a("NYxO"),u=a("i84Q");function d(e){return e&&e.__esModule?e:{default:e}}t.default={data:function(){return{name:null,sex:1,phone:null,showExPhone:!1,exPhone:null,addressDetail:null,tag:null,tag_type:1,showAlert:!1,alertText:""}},components:{headTop:i.default,alertTip:o.default},computed:(0,n.default)({},(0,l.mapState)(["userInfo","building","geohash"])),methods:(0,n.default)({},(0,l.mapMutations)(["SAVE_ADDRESS","CHOOSE_ADDRESS"]),{chooseSex:function(e){this.sex=e},confirm:function(){var e=this;return(0,r.default)(s.default.mark(function t(){var a;return s.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.userInfo.user_id){t.next=6;break}return e.showAlert=!0,e.alertText="请登录",t.abrupt("return");case 6:if(e.name){t.next=12;break}return e.showAlert=!0,e.alertText="请输入姓名",t.abrupt("return");case 12:if(e.phone&&/^[1][358][0-9]{9}$/.test(e.phone)){t.next=18;break}return e.showAlert=!0,e.alertText="请输入正确的手机号",t.abrupt("return");case 18:if(e.building){t.next=24;break}return e.showAlert=!0,e.alertText="请选择地址",t.abrupt("return");case 24:if(e.addressDetail){t.next=30;break}return e.showAlert=!0,e.alertText="请输入详细地址",t.abrupt("return");case 30:if(e.tag){t.next=34;break}return e.showAlert=!0,e.alertText="标签错误",t.abrupt("return");case 34:return"家"==e.tag?e.tag_type=2:"学校"==e.tag?e.tag_type=3:"公司"==e.tag&&(e.tag_type=4),t.next=37,(0,u.postAddress)(e.userInfo.user_id,e.addressDetail,e.building,e.geohash,e.name,e.phone,e.exPhone,e.tag,e.sex,e.tag_type);case 37:if(!t.sent.message){t.next=43;break}e.showAlert=!0,e.alertText=e.message,t.next=49;break;case 43:return t.next=45,(0,u.getAddress)(e.userInfo.user_id);case 45:a=t.sent,e.SAVE_ADDRESS(a),e.CHOOSE_ADDRESS(a[0]),e.$router.go(-2);case 49:case"end":return t.stop()}},t,e)}))()}})}},qPfB:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("guON"),r=a.n(s);for(var n in s)"default"!==n&&function(e){a.d(t,e,function(){return s[e]})}(n);var i=a("8aQa");var o=function(e){a("qm6I")},l=a("VU/8")(r.a,i.a,!1,o,"data-v-12ab2d1c",null);t.default=l.exports},qm6I:function(e,t){}});
//# sourceMappingURL=11.5e1c6cdc736e2c374eed.js.map