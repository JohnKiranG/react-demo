(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{115:function(e,t,a){},295:function(e,t,a){e.exports=a(639)},300:function(e,t,a){},577:function(e,t,a){},639:function(e,t,a){"use strict";a.r(t);var n,r=a(0),o=a.n(r),i=a(7),l=a.n(i),s=(a(300),a(102)),c=a(98),d=a(644),p=a(643),m=a(36),u=a(210),g=a(272),h=a(273),f=a.n(h),b=a(19),E=(a(192),a(274),a(313),a(104),function(e){return"EZPROUI/".concat(e)}),v=E("TOGGLE_SIDEMENU"),C=E("SHOW_TOASTER_SUCCESS"),S=E("DISPATCH_AND_ROUTE_REQUEST"),y=E("DISPATCH_AND_ROUTE_SUCCESS"),O=E("DISPATCH_AND_ROUTE_FAILURE"),j=[],P={app:{sidemenu:{collapsed:!1},loading:!1,toaster:""},counter:{count:0,isIncrementing:!1,isDecrementing:!1},placeholder:{loading:!1,list:[],receivedAt:null},study:{loading:!1,list:{}},subject:{list:{},loading:!0},visit:{list:{},loading:!1},site:{list:{},loading:!1},studySite:{loading:!1,list:{},studySite:{},isStale:!1},field:{loading:!1,list:[],receivedAt:null},dashboard:{zadeLoading:!1,barChartLoading:!1,barChartminiLoading:!1,doubleLoopPieLoading:!1,miniAreaChartLoading:!1,studyList:[],totalSubjects:[],receivedAt:null,sitesCompliance:[],formsCompliance:[],dailySubmissionOfForms:[],totalSubmissions:null},subjectVisitForm:{list:[],loading:!0},crfData:{list:[],loading:!0},visitForm:{list:{},loading:!1},user:{id:null,token:null,name:null,userName:null,userOrgId:"",privileges:[],isLicensee:!1,userOrgType:"",canAccessMultipleSites:!1,userOrgName:"",title:"",loading:!1,email:"",logo:""},session:{study:"",subject:"",visit:"",visitOid:"",client:"",clientName:"",site:"",form:"",fieldGroup:"",studySite:"",readOnly:!1},form:{loading:!1,list:{}},fieldGroup:{data:null,list:{},loading:!1},studyTemplate:{loading:!1,list:{}},clientTemplate:{loading:!1,list:{}},visitFormEvent:{list:{},loading:!1},studyCompliance:{studyCompliance:{},loading:!1},clientUser:{list:{},loading:!1},role:{loading:!1,list:{}},crfVersion:{},tables:{subjects:{meta:{page:0,pageSize:5,pageSizeOptions:j,pageTotal:1,total:0}},subjectVisitForms:{meta:{page:0,pageSize:5,pageSizeOptions:j,pageTotal:1,total:0}},auditTrail:{meta:{page:0,pageSize:5,pageSizeOptions:j,pageTotal:1,total:0}},subjectMigration:{meta:{page:1,pageSize:10,pageSizeOptions:j,pageTotal:1,total:0}},crfVersion:{meta:{page:1,pageSize:5,pageSizeOptions:j,pageTotal:1,total:0}},deployToProd:{meta:{page:1,pageSize:10,pageSizeOptions:j,pageTotal:1,total:0}},study:{meta:{page:1,pageSize:5,pageSizeOptions:j,pageTotal:1,total:0}},versionInformation:{meta:{page:1,pageSize:5,pageSizeOptions:j,pageTotal:1,total:0}},forms:{meta:{page:1,pageSize:5,pageSizeOptions:j,pageTotal:1,total:0}},clinicalData:{meta:{page:1,pageSize:5,pageSizeOptions:j,pageTotal:1,total:0}}}},w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P.app,t=arguments.length>1?arguments[1]:void 0;if(t.type.match(/CREATE.*_SUCCESS/))return Object(b.a)({},e,{toaster:"CREATE_SUCCESS"});if(t.type.match(/CREATE.*_FAILURE/))return Object(b.a)({},e,{toaster:"CREATE_FAILURE"});if(t.type.match(/UPDATE.*_SUCCESS/))return Object(b.a)({},e,{toaster:"UPDATE_SUCCESS"});if(t.type.match(/UPDATE.*_FAILURE/))return Object(b.a)({},e,{toaster:"UPDATE_FAILURE"});switch(t.type){case v:return Object(b.a)({},e,{sidemenu:{collapsed:!e.sidemenu.collapsed}});case C:return Object(b.a)({},e,{toaster:null});case S:return Object(b.a)({},e,{loading:!0});case y:case O:return Object(b.a)({},e,{loading:!1});default:return e}},I=f()({basename:"."}),N=[g.a,Object(u.a)(I)],k=m.d.apply(void 0,[m.a.apply(void 0,N)].concat([])),D=Object(m.e)((n=I,Object(m.c)({router:Object(c.b)(n),app:w})),P,k),T=a(24),F=a(25),A=a(27),L=a(26),R=a(28),V=(a(156),a(86)),x=(a(60),a(16)),U=(a(157),a(8)),z=(a(110),a(14)),M=(a(127),a(38)),_=(a(83),a(42)),H=a(291),B=(a(370),a(141)),q=a(63),G=a(64),J=a.n(G),K=a(87),W=a.n(K),X=a(73),Q=a(130),Z=(a(115),function(e){function t(e){var a;return Object(T.a)(this,t),(a=Object(A.a)(this,Object(L.a)(t).call(this,e))).state={},a}return Object(R.a)(t,e),Object(F.a)(t,[{key:"render",value:function(){var e=this.props,t=e.onContentStateChange,a=e.onEditorStateChange,n=e.editorState;return o.a.createElement("div",null,o.a.createElement(Q.Editor,{editorState:n,toolbarClassName:"home-toolbar",wrapperClassName:"home-wrapper",toolbarOnFocus:!0,editorClassName:"demo",editorStyle:{minHeight:"37px",borderRadius:"4px",overflow:"auto",margin:"0px",lineHeight:"20px"},wrapperStyle:{marginTop:"-46px"},toolbar:{options:["inline","fontSize","fontFamily"],inline:{options:["bold","italic","underline","superscript","subscript"],bold:{className:"bordered-option-classname"},italic:{className:"bordered-option-classname"},underline:{className:"bordered-option-classname"},code:{className:"bordered-option-classname"},superscript:{className:"bordered-option-classname"},subscript:{className:"bordered-option-classname"}},fontSize:{options:[8,9,10,11,12,14,16,18,24,30,36,48,60,72,96],className:"bordered-option-classname"}},onContentStateChange:t,onEditorStateChange:a}))}}]),t}(o.a.Component)),$=(a(640),a(289)),Y=(a(172),a(37)),ee=(a(270),a(132)),te=function(e){function t(e){var a;return Object(T.a)(this,t),(a=Object(A.a)(this,Object(L.a)(t).call(this,e))).handleClick=function(e,t,n){(0,a.props.showModal)(t,n)},a.onKeyDown=function(){},a.state={onHover:!1},a}return Object(R.a)(t,e),Object(F.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.modalComponent,n=t.componentName,r=t.index,i=t.handleCancel,l=this.state.onHover;return o.a.createElement("div",{className:"item ".concat(l?"onHover":"")},o.a.createElement(_.a,{className:"item",hoverable:!0},o.a.createElement(z.a,{span:21},o.a.createElement("div",{className:"config",onClick:function(t){return e.handleClick(t,a,n)},onKeyDown:this.onKeyDown,role:"button"},"Tap to configure\xa0",n)),o.a.createElement(z.a,{span:2,offset:1},o.a.createElement(x.a,{type:"danger",title:"Delete",shape:"circle",icon:"delete",onClick:function(e){return i(e,r)}}))))}}]),t}(r.Component),ae=function(e){function t(e){var a;return Object(T.a)(this,t),(a=Object(A.a)(this,Object(L.a)(t).call(this,e))).onChange=function(e){(0,a.props.handlePageChange)(e-1)},a.setVisbility=function(){a.setState(function(e){return{reorderVisbility:!e.reorderVisbility}})},a.state={reorderVisbility:!1},a}return Object(R.a)(t,e),Object(F.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.pageItems,n=t.handleCancel,r=t.showModal,i=t.form,l=t.currentPageNo,s=t.totalPages,c=t.deletePage,d=t.createNewPage,p=t.movePageLeft,m=t.movePageRight,u=t.pageEditorState,g=t.onPageEditorChange,h=t.onPageEditorStateChange,f=this.state.reorderVisbility,E=!1,v=!1,C=!0;return 1===l&&(E=!0),l===s&&(v=!0,C=!1),o.a.createElement("div",{style:{minHeight:"85vh",paddingTop:10}},o.a.createElement(_.a,{style:{minHeight:"85vh"}},o.a.createElement(Y.a,null,o.a.createElement(z.a,{span:21},o.a.createElement(M.a.Item,{label:"Page Name"},i.getFieldDecorator("pageTitle",{rules:[{max:500},{required:!0,message:"Please Enter Page Name"}]})(o.a.createElement(Z,{editorState:u,onContentStateChange:g,onEditorStateChange:h})))),o.a.createElement(z.a,{span:2,offset:1},o.a.createElement(ee.a,{title:"Sure to delete page?",onConfirm:function(){c(l-1)}},o.a.createElement(x.a,{title:"Delete page",type:"danger",icon:"delete",shape:"circle"})))),o.a.createElement("br",null),o.a.createElement(Y.a,{className:"droppedItems"},o.a.createElement(q.c,{droppableId:"droppable2"},function(e,t){return o.a.createElement("div",{ref:e.innerRef,style:(i=t.isDraggingOver,{background:i?"lightblue":"lightgrey",minHeight:"100%",textAlign:"center"})},J.a.isEmpty(a)?o.a.createElement("div",{className:"dndInstruction"},"Drag and drop components ",o.a.createElement("br",null),"to add to this chapter",o.a.createElement("br",null)):a.map(function(e,t){return o.a.createElement(q.b,{key:e.id,draggableId:e.id,index:t},function(a,i){return o.a.createElement("div",Object.assign({ref:a.innerRef},a.draggableProps,a.dragHandleProps,{style:(l=i.isDragging,s=a.draggableProps.style,Object(b.a)({userSelect:"none",padding:5,background:l?"lightgreen":"lightgrey"},s))}),o.a.createElement(te,{index:t,handleCancel:n,componentName:e.type,modalComponent:e.modalComponent,showModal:r}));var l,s})}),e.placeholder);var i})),o.a.createElement("br",null),o.a.createElement(Y.a,null,o.a.createElement(z.a,{span:2},o.a.createElement(x.a,{onClick:this.setVisbility},"Re-order")),o.a.createElement(z.a,{span:12,offset:1},f?o.a.createElement("span",null,o.a.createElement(x.a,{disabled:E,onClick:function(){return p()}},o.a.createElement(U.a,{type:"left"})),"\xa0",o.a.createElement(x.a,{disabled:v,onClick:function(){return m()}},o.a.createElement(U.a,{type:"right"}))):""),o.a.createElement(z.a,{span:2,offset:1},o.a.createElement(x.a,{disabled:C,onClick:function(){return d()}},"Add Page")),o.a.createElement(z.a,{span:5,offset:1,style:{marginTop:4}},o.a.createElement($.a,{simple:!0,defaultCurrent:1,current:l,total:10*s,onChange:function(t){return e.onChange(t)}})))))}}]),t}(r.Component),ne=(a(116),a(137)),re=(a(575),a(577),function(e){function t(e){var a;return Object(T.a)(this,t),(a=Object(A.a)(this,Object(L.a)(t).call(this,e))).imageUploadCallBack=function(e){return new Promise(function(t,a){var n=new XMLHttpRequest;n.open("POST","https://api.imgur.com/3/image"),n.setRequestHeader("Authorization","Client-ID 8d26ccd12712fca");var r=new FormData;r.append("image",e),n.send(r),n.addEventListener("load",function(){var e=JSON.parse(n.responseText);t(e)}),n.addEventListener("error",function(){var e=JSON.parse(n.responseText);a(e)})})},a.state={},a}return Object(R.a)(t,e),Object(F.a)(t,[{key:"render",value:function(){var e=this.props,t=e.onContentStateChange,a=e.onFocus,n=e.editorStateChange,r=e.editorState;return o.a.createElement("div",null,o.a.createElement(_.a,null,o.a.createElement(Q.Editor,{editorState:r,toolbarClassName:"home-toolbar",wrapperClassName:"home-wrapper",editorClassName:"demo-editor",toolbar:{options:["inline","fontSize","fontFamily","list","colorPicker","remove","image","history"],inline:{options:["bold","italic","underline","superscript","subscript"],bold:{className:"bordered-option-classname"},italic:{className:"bordered-option-classname"},underline:{className:"bordered-option-classname"},code:{className:"bordered-option-classname"},superscript:{className:"bordered-option-classname"},subscript:{className:"bordered-option-classname"}},image:{className:void 0,component:void 0,popupClassName:void 0,urlEnabled:!0,uploadEnabled:!0,alignmentEnabled:!0,uploadCallback:this.imageUploadCallBack,previewImage:!1,inputAccept:"image/gif,image/jpeg,image/jpg,image/png,image/svg",alt:{present:!1,mandatory:!1},defaultSize:{height:"auto",width:"auto"}},fontSize:{options:[8,9,10,11,12,14,16,18,24,30,36,48,60,72,96],className:"bordered-option-classname"}},onContentStateChange:t,onEditorStateChange:n,onFocus:a})))}}]),t}(o.a.Component)),oe=M.a.Item,ie=function(e){function t(e){var a;return Object(T.a)(this,t),(a=Object(A.a)(this,Object(L.a)(t).call(this,e))).onEditorStateChange=function(e){a.setState({editorState:e})},a.modalOnEditorStateChange=function(e){a.setState({ModalEditorState:e})},a.onEditorChange=function(e){var t=a.props.form,n=t.getFieldsValue,r=t.setFieldsValue,o=n(),i=W()(e).trim();o.paragraphBody=i,r(o)},a.modalOnEditorChange=function(e){var t=a.props.form,n=t.getFieldsValue,r=t.setFieldsValue,o=n(),i=W()(e).trim();o.modalParagraphBody=i,r(o)},a.handleFocusEvent=function(e){document.activeElement,e.target.id},a.modalHandleFocusEvent=function(e){document.activeElement,e.target.id},a.handleSubmit=function(e){e.preventDefault(),a.props.form.validateFieldsAndScroll(function(e,t){t.title,e||console.log("Received values of form: ",t.paragraphBody),console.log("Received values of form: ",t),a.setState({previewModalVisible:!1})})},a.handleModal=function(){a.setState(function(e){return Object(b.a)({},e,{previewModalVisible:!e.previewModalVisible})})},a.handleCancel=function(){a.setState({visible:!1})},a.state={previewModalVisible:!1,visible:!0,editorState:X.EditorState.createEmpty(),ModalEditorState:X.EditorState.createEmpty()},a}return Object(R.a)(t,e),Object(F.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.previewModalVisible,n=t.editorState,r=t.ModalEditorState,i=this.props.form.getFieldDecorator,l={wrapperCol:{sm:{span:40}}};return o.a.createElement(_.a,{bordered:!0},o.a.createElement(M.a,null,o.a.createElement(M.a.Item,{label:"Title",labelCol:{span:7},wrapperCol:{span:10}},i("title",{rules:[{required:!1,message:"Please input your note!"}]})(o.a.createElement(ne.a,null))),o.a.createElement(oe,{label:"Content",labelCol:{span:5},wrapperCol:{span:14}},i("paragraphBody")(o.a.createElement(re,{editorState:n,onContentStateChange:this.onEditorChange,onFocus:this.handleFocusEvent,editorStateChange:this.onEditorStateChange}))),o.a.createElement(z.a,{offset:18},o.a.createElement(oe,null,o.a.createElement("a",{style:{color:"rgb(59, 165, 122)",paddingRight:"1%"},onClick:function(){return e.handleModal()}},"Add more"))),o.a.createElement(Y.a,{type:"flex",gutter:10},o.a.createElement(z.a,{offset:10},o.a.createElement(oe,l,o.a.createElement(x.a,{type:"default",style:{color:"#FE593D",marginRight:"3%"}},"close"))),o.a.createElement(z.a,{align:"right"},o.a.createElement(oe,l,o.a.createElement(x.a,{type:"primary",htmlType:"submit",icon:"check-circle",onClick:this.handleSubmit},"save"))),o.a.createElement(V.a,{width:"70%",visible:a,closable:!1,onCancel:function(){return e.handleModal("previewModalVisible")},footer:o.a.createElement(x.a,{key:"back",onClick:this.handleSubmit},"Done"),destroyOnClose:!0},i("modalParagraphBody")(o.a.createElement(re,{editorState:r,onContentStateChange:this.modalOnEditorChange,onFocus:this.modalHandleFocusEvent,editorStateChange:this.modalOnEditorStateChange}))))))}}]),t}(o.a.Component),le=M.a.create()(ie),se=(a(641),a(290)),ce=function(e){var t=e.previewImage;return o.a.createElement("img",{alt:"Invalid",style:{width:"100%"},src:t,type:"image/png"})};ce.defaultProps={previewImage:""};var de=ce,pe=function(e){var t=e.previewImage;return o.a.createElement("audio",{src:t,controls:!0})};pe.defaultProps={previewImage:""};var me=pe,ue=function(e){var t=e.previewImage;return o.a.createElement("video",{src:t,controls:!0})};ue.defaultProps={previewImage:""};var ge=ue,he=function(e){var t=e.type,a=e.previewImage;return"image"===t?o.a.createElement(de,{previewImage:a}):"audio"===t?o.a.createElement(me,{previewImage:a}):"video"===t?o.a.createElement(ge,{previewImage:a}):null};he.defaultProps={type:"",previewImage:""};var fe=he,be=M.a.Item,Ee=function(e){var t=e.getFieldDecorator;return o.a.createElement(be,null,t("id",{})(o.a.createElement(ne.a,{placeholder:"Enter URL..."})))},ve=function(e){function t(e){var a;return Object(T.a)(this,t),(a=Object(A.a)(this,Object(L.a)(t).call(this,e))).handleCancel=function(){return a.setState({previewVisible:!1})},a.handlePreview=function(e){a.setState({previewImage:e.url||e.thumbUrl,previewVisible:!0})},a.handleChange=function(e){a.setState({fileList:e.fileList})},a.handleClick=function(){var e=a.props.form.getFieldValue("id");a.props.form.resetFields();var t={url:e,uid:Math.random()},n=a.state.fileList;n.push(t),a.setState({fileList:n})},a.state={previewVisible:!1,previewImage:"",fileList:[]},a}return Object(R.a)(t,e),Object(F.a)(t,[{key:"render",value:function(){var e=this,t=this.props.type,a=this.state,n=a.previewVisible,r=a.fileList,i=a.previewImage,l=this.props.form.getFieldDecorator,s=o.a.createElement("div",null,o.a.createElement(U.a,{type:"plus"}),o.a.createElement("div",null,"Upload File")),c=o.a.createElement("div",null,o.a.createElement(U.a,{type:"plus"}),o.a.createElement("div",null,"Upload URL"));return o.a.createElement("div",null,o.a.createElement(Y.a,{type:"flex",gutter:7},o.a.createElement(V.a,{visible:n,footer:null,onCancel:this.handleCancel,width:"50%",heigth:"50%"},o.a.createElement(fe,{type:t,previewImage:i}))),o.a.createElement(Y.a,{type:"flex",gutter:7},o.a.createElement(se.a,{name:"file",action:"//jsonplaceholder.typicode.com/posts/",listType:"picture-card",fileList:r,onPreview:this.handlePreview,onChange:this.handleChange,multiple:!0},s),o.a.createElement(ee.a,{placement:"topLeft",title:o.a.createElement(Ee,{getFieldDecorator:l}),onConfirm:function(){return e.handleClick()},icon:o.a.createElement(U.a,null)},o.a.createElement(x.a,{type:"dashed",style:{height:"103px",backgroundColor:""}},c))))}}]),t}(o.a.Component);ve.defaultProps={type:"image"};var Ce=M.a.create()(ve),Se={configData:[{type:"icf",label:"ICF",icon:"fas fa-font",id:"ICF-001",modalComponent:Ce},{type:"paragraph",label:"Paragraph",icon:"fas fa-check-square",id:"paragraph-001",modalComponent:le},{type:"image",label:"Image",icon:"far fa-dot-circle",id:"image-001",modalComponent:Ce},{type:"audio",label:"Audio",icon:"fas fa-check",id:"audio-001",modalComponent:Ce},{type:"video",label:"Video",icon:"fas fa-check-double",id:"video-001",modalComponent:Ce},{type:"form",label:"Form",icon:"fas fa-check-double",id:"form-001",modalComponent:Ce},{type:"kr",label:"Knowledge Review",icon:"fas fa-check-double",id:"kr-001",modalComponent:Ce},{type:"attestation",label:"Attestation",icon:"fas fa-check-double",id:"attestation-001",modalComponent:Ce},{type:"signature",label:"Signature",icon:"fas fa-check-double",id:"signature-001",modalComponent:Ce}]},ye=function(e){function t(){var e,a;Object(T.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(A.a)(this,(e=Object(L.a)(t)).call.apply(e,[this].concat(r)))).state={items:Se.configData},a}return Object(R.a)(t,e),Object(F.a)(t,[{key:"render",value:function(){var e=this.state.items;return o.a.createElement("div",null,e.map(function(e,t){return o.a.createElement(q.b,{key:e.id,draggableId:e.id,index:t},function(t,a){return o.a.createElement("div",Object.assign({ref:t.innerRef},t.draggableProps,t.dragHandleProps,{style:(n=a.isDragging,r=t.draggableProps.style,Object(b.a)({userSelect:"none",padding:1,margin:"0 0 ".concat(5,"px 0"),background:n?"lightgreen":"white"},r))}),o.a.createElement(_.a,{hoverable:!0,style:{background:a.isDragging?"lightgreen":"white",border:a.isDragging?"1px lightgreen":"1px solid #e4e2e2"},bodyStyle:{padding:"6%"}},o.a.createElement("i",{className:e.icon}),o.a.createElement("span",{"data-type":e.type,className:"pan-text"},e.label)));var n,r})}))}}]),t}(o.a.Component),Oe=B.a.Content,je=B.a.Sider,Pe={labelCol:{span:4},wrapperCol:{span:20}},we=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Array.from({length:e},function(e,t){return t}).map(function(e){return{id:"right-".concat(e+t),label:"right ".concat(e+t)}})},Ie=function(e,t,a){var n=Array.from(e),r=n.splice(t,1),o=Object(H.a)(r,1)[0];return n.splice(a,0,o),n},Ne=0,ke=function(e,t,a,n){var r=Array.from(Se.configData),o=Array.from(t),i=Se.configData[a.index],l={id:"".concat(i.label,"_").concat(Ne),type:i.type,modalComponent:i.modalComponent};o.splice(n.index,0,l),Ne+=1;var s={};return s[a.droppableId]=r,s[n.droppableId]=o,s},De=function(e){function t(){var e;return Object(T.a)(this,t),(e=Object(A.a)(this,Object(L.a)(t).call(this))).id2List={droppable:"items",droppable2:"pageItems"},e.getList=function(){var t=e.state;return t.pages[t.currentPageNo].pageItems},e.onDragEnd=function(t){var a=t.source,n=t.destination,r=e.state,o=r.currentPageNo,i=r.pages;if(n)if(a.droppableId===n.droppableId){if("droppable"===a.droppableId)return;if("droppable2"===a.droppableId){var l=Ie(e.getList("droppable2"),a.index,n.index);i[o].pageItems=l,e.setState(function(e){return Object(b.a)({},e,{pages:i})})}}else{if("droppable"===n.droppableId)return;var s=ke(e.getList(a.droppableId),i[o].pageItems,a,n);i[o].pageItems=s.droppable2,e.setState(function(e){return Object(b.a)({},e,{pages:i})})}},e.onDrop=function(t){var a=e.state,n=a.currentPageNo,r=a.pages,o=J.a.concat([],r[n].pageItems,t);r[n].pageItems=o,e.setState(function(e){return Object(b.a)({},e,{pages:r})})},e.handleCancel=function(t,a){var n=e.state,r=n.currentPageNo,o=n.pages,i=o[r].pageItems.slice();i.splice(a,1),o[r].pageItems=i,e.setState(function(e){return Object(b.a)({},e,{pages:o})})},e.moveCard=function(t,a){var n=e.state,r=n.currentPageNo,o=n.pages,i=J.a.concat([],o[r].pageItems);J.a.remove(i,function(e,a){return a===t});var l=o[r].pageItems[t];if(t<a){var s=a;i.splice(s,0,l)}else if(t>a)i.splice(a,0,l);else if(t===a)return;o[r].pageItems=i,e.setState(function(e){return Object(b.a)({},e,{pages:o})})},e.showModal=function(t,a){e.setState({modalVisibility:!0,modalComponent:t,componentName:a})},e.hideModal=function(){e.setState({modalVisibility:!1})},e.createNewPage=function(){var t=[{component:ae,title:"",pageItems:[]}],a=e.state.pages;e.setState({pages:J.a.concat(a,t),currentPageNo:a.length})},e.handlePageChange=function(t){e.setState({currentPageNo:t})},e.movePageLeft=function(){var t=e.state,a=t.currentPageNo,n=t.pages,r=n[a-1];n[a-1]=n[a],n[a]=r,e.setState(function(e){return Object(b.a)({},e,{pages:n,currentPageNo:a-1})})},e.movePageRight=function(){var t=e.state,a=t.currentPageNo,n=t.pages,r=n[a+1];n[a+1]=n[a],n[a]=r,e.setState(function(e){return Object(b.a)({},e,{pages:n,currentPageNo:a+1})})},e.deletePage=function(t){var a,n=e.state.pages,r=J.a.filter(n,function(e,a){return a!==t});0===t?(a=0,1===n.length&&(r=[{component:ae,title:"",pageItems:[]}])):a=t-1,e.setState(function(e){return Object(b.a)({},e,{pages:r,currentPageNo:a})})},e.onChapterEditorChange=function(t){var a=e.props.form,n=a.getFieldsValue,r=a.setFieldsValue,o=n(),i=W()(t).trim();o.chapterTitle=i,r(o)},e.onChapterEditorStateChange=function(t){e.setState({chapterEditorState:t})},e.onPageEditorChange=function(t){var a=e.props.form,n=a.getFieldsValue,r=a.setFieldsValue,o=n(),i=W()(t).trim();o.pageTitle=i,r(o)},e.onPageEditorStateChange=function(t){e.setState({pageEditorState:t})},e.state={selected:we(),modalVisibility:!1,modalComponent:"",componentName:"",currentPageNo:0,chapterEditorState:X.EditorState.createEmpty(),pageEditorState:X.EditorState.createEmpty(),pages:[{title:"",pageItems:[]}]},e}return Object(R.a)(t,e),Object(F.a)(t,[{key:"render",value:function(){var e=this.state,t=e.selected,a=e.modalVisibility,n=e.modalComponent,r=e.componentName,i=e.pages,l=e.currentPageNo,s=e.chapterEditorState,c=e.pageEditorState,d=n,p=i[l].pageItems,m=i.length,u=this.props.form;return o.a.createElement("div",null,o.a.createElement(M.a,{layout:"inline",onSubmit:this.handleSubmit},o.a.createElement(B.a,{style:{padding:"15px"}},o.a.createElement(q.a,{onDragEnd:this.onDragEnd},o.a.createElement(q.c,{droppableId:"droppable"},function(e,t){return o.a.createElement(_.a,{bordered:!1,style:{background:"slategray"}},o.a.createElement(je,{theme:"light"},o.a.createElement("div",{ref:e.innerRef,style:(a=t.isDraggingOver,{background:a?"lightblue":"white",padding:10})},o.a.createElement(ye,null),e.placeholder)));var a}),o.a.createElement(Oe,{style:{marginLeft:10,overflowX:"inherit"}},o.a.createElement(_.a,null,o.a.createElement(z.a,{span:21},o.a.createElement(M.a.Item,Object.assign({label:"Chapter"},Pe),u.getFieldDecorator("chapterTitle",{rules:[{max:500},{required:!0,message:"Please Enter Chapter title"}]})(o.a.createElement(Z,{editorState:s,onContentStateChange:this.onChapterEditorChange,onEditorStateChange:this.onChapterEditorStateChange})))),o.a.createElement(z.a,{span:2,offset:1},o.a.createElement(M.a.Item,null,o.a.createElement(x.a,null,o.a.createElement(U.a,{type:"save"}))))),o.a.createElement(ae,{selected:t,onDrop:this.onDrop,pageItems:p,moveCard:this.moveCard,handleCancel:this.handleCancel,showModal:this.showModal,form:u,currentPageNo:l+1,totalPages:m,createNewPage:this.createNewPage,handlePageChange:this.handlePageChange,movePageLeft:this.movePageLeft,movePageRight:this.movePageRight,deletePage:this.deletePage,pageEditorState:c,onPageEditorChange:this.onPageEditorChange,onPageEditorStateChange:this.onPageEditorStateChange}),o.a.createElement(V.a,{title:r,visible:a,onOk:this.hideModal,onCancel:this.hideModal,width:1e3,style:{top:"20px"}},o.a.createElement(d,{type:r})))))))}}]),t}(r.Component),Te=M.a.create()(De),Fe=function(e){function t(){var e,a;Object(T.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(A.a)(this,(e=Object(L.a)(t)).call.apply(e,[this].concat(r)))).state={},a}return Object(R.a)(t,e),Object(F.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(Te,null))}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Ae=document.querySelector("#root");l.a.render(o.a.createElement(s.a,{store:D},o.a.createElement(c.a,{history:I},o.a.createElement(d.a,null,o.a.createElement(p.a,{path:"/",component:Fe})))),Ae),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[295,2,1]]]);
//# sourceMappingURL=main.cf9bf42a.chunk.js.map