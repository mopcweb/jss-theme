(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{yXWL:function(e,t,o){"use strict";o.r(t);var r=o("PCNd"),n=o("iInd");function c(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}var s=o("s7LF"),i=o("hecr"),a=o("EvqT"),l=o("PZkE"),b=o("Kj3r"),u=o("y7ui"),m=o("OLiY"),p=o("uzWi"),d=o("8Y7J"),f=o("o0su"),h=o("zRaO");const g=[[["","formFields",""]],[["","formControls",""]]],C=function(e){return[e]},y=["[formFields]","[formControls]"],x=p.c.makeStyles(e=>({EntityForm:{},Fields:{padding:e.mixins.spacing(1),width:"100%",backgroundColor:e.palette.background.paper,"& [formField]":{display:"block",minWidth:250,maxWidth:"100%","&:not(:last-child)":{marginBottom:e.mixins.spacing(2)},"&[full]":{width:"100%"},"&[half]":{width:"50%"},"&[quarter]":{width:"25%"},"&[inline]":{marginRight:e.mixins.spacing(2),display:"inline-block"},[e.breakpoints.down("sm")]:{marginRight:`${e.mixins.spacing(2)} !important`,minWidth:0,width:"100% !important"}}},Controls:{margin:e.mixins.spacing(3,0),display:"flex",flexWrap:"wrap",alignItems:"center",alignContent:"center",width:"100%",[e.breakpoints.down("md")]:{margin:e.mixins.spacing(2,0)},"& [formButton]":{marginBottom:e.mixins.spacing(3),"&:not(:last-of-type)":{marginRight:e.mixins.spacing(3)}}}}));let T=(()=>{class e{constructor(){this.classes=p.c.useStyles(this,x)}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d.Ib({type:e,selectors:[["jss-form"]],ngContentSelectors:y,decls:5,vars:9,consts:[[3,"clsx"]],template:function(e,t){1&e&&(d.ic(g),d.Ub(0,"form",0),d.Ub(1,"section",0),d.hc(2),d.Tb(),d.Ub(3,"section",0),d.hc(4,1),d.Tb(),d.Tb()),2&e&&(d.jc("clsx",d.lc(3,C,t.classes.EntityForm)),d.Cb(1),d.jc("clsx",d.lc(5,C,t.classes.Fields)),d.Cb(2),d.jc("clsx",d.lc(7,C,t.classes.Controls)))},directives:[s.m,s.j,s.k,h.a],encapsulation:2}),e})();var k=o("Q2Ze"),j=o("e6WT");const v=["colorInput"],w=function(e){return[e]},U=p.c.makeStyles(()=>({ColorPicker:{display:"block",width:"100%",height:"100%",boxShadow:"inherit",borderRadius:"inherit","& > input":{visibility:"hidden"}}}));let P=(()=>{class e{constructor(){this.onInput=new d.n,this.classes=p.c.useStyles(this,U)}handleClick(){this.colorInput.nativeElement.click()}handleChange(e){this.control.setValue(e.currentTarget.value),this.onInput.emit(e)}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d.Ib({type:e,selectors:[["jss-color-picker"]],viewQuery:function(e,t){var o;1&e&&d.uc(v,!0),2&e&&d.nc(o=d.dc())&&(t.colorInput=o.first)},inputs:{control:"control"},outputs:{onInput:"onInput"},decls:2,vars:5,consts:[[3,"clsx"],["matInput","","type","color",3,"input"]],template:function(e,t){1&e&&(d.Ub(0,"label",0),d.Ub(1,"input",1),d.cc("input",(function(e){return t.handleChange(e)})),d.Tb(),d.Tb()),2&e&&(d.vc("background-color",t.control.value),d.jc("clsx",d.lc(3,w,t.classes.ColorPicker)))},directives:[h.a,j.a],styles:["[_nghost-%COMP%] { display: block; }"]}),e})();var S=o("Dxy4"),N=o("Tj54");const O=function(e){return[e]};function I(e,t){if(1&e&&(d.Ub(0,"mat-tree-node",16),d.Ub(1,"li",17),d.Pb(2,"button",18),d.Ub(3,"span",0),d.xc(4),d.Tb(),d.Ub(5,"span",0),d.xc(6),d.Tb(),d.Tb(),d.Tb()),2&e){const e=t.$implicit,o=d.gc();d.Cb(3),d.jc("clsx",d.lc(4,O,o.defineClass("",e.value))),d.Cb(1),d.yc(o.formatKey(e)),d.Cb(1),d.jc("clsx",d.lc(6,O,o.defineClass(e.value))),d.Cb(1),d.yc(o.formatValue(e))}}const F=function(e,t){return[e,t]};function R(e,t){if(1&e&&(d.Ub(0,"mat-nested-tree-node"),d.Ub(1,"li"),d.Ub(2,"div",17),d.Ub(3,"button",19),d.Ub(4,"mat-icon"),d.xc(5),d.Tb(),d.Tb(),d.Ub(6,"span",0),d.xc(7),d.Tb(),d.Ub(8,"span",0),d.xc(9),d.Tb(),d.Tb(),d.Ub(10,"ul",0),d.Qb(11,20),d.Tb(),d.Tb(),d.Tb()),2&e){const e=t.$implicit,o=d.gc();d.Cb(3),d.Db("aria-label","toggle "+e.key),d.Cb(2),d.yc(o.treeControl.isExpanded(e)?"expand_more":"chevron_right"),d.Cb(1),d.jc("clsx",d.lc(7,O,o.defineClass("",e.value))),d.Cb(1),d.yc(o.formatKey(e)),d.Cb(1),d.jc("clsx",d.lc(9,O,o.defineClass(e.value))),d.Cb(1),d.yc(o.formatValue(e)),d.Cb(1),d.jc("clsx",d.mc(11,F,o.classes.List,!o.treeControl.isExpanded(e)&&o.classes.NestedTree))}}const $=p.c.makeStyles(e=>({Title:{marginBottom:e.mixins.spacing(3),font:e.mixins.font("h5"),color:e.palette.primary.main},ColorPicker:{width:"50px !important",minWidth:"50px !important",borderRadius:e.shape.borderRadius,boxShadow:e.shadows[1]},Tree:{padding:e.mixins.spacing(2,0),background:e.palette.background.paper,"& .mat-tree-node":{height:e.mixins.spacing(3),minHeight:e.mixins.spacing(3),whiteSpace:"nowrap",color:e.palette.text.primary}},NestedTree:{display:"none"},List:{paddingLeft:e.mixins.spacing(3),overflowX:"scroll",overflowY:"hidden"},Key:{marginRight:e.mixins.spacing(.5)},FunctionValue:{color:e.palette.warning.main},NumberValue:{color:e.palette.primary.main},StringValue:{color:e.palette.secondary.main}})),D=[{path:"",component:(()=>{class e{constructor(e,t){this.store=e,this.formBuilder=t,this.treeControl=new u.j(e=>e.children),this.dataSource=new m.d}ngOnInit(){this.initForm(),this.listenThemeChanges(),this.dataSource.data=this.createTreeLikeStructure(this.store.state.theme.theme)}ngOnDestroy(){this.sub&&this.sub.unsubscribe(),this.formSub&&this.formSub.unsubscribe()}isNested(e,t){return!!t.children&&t.children.length>0}handleApply(){const e=Object.assign(Object.assign({},p.b),{palette:Object(i.createPalette)({primary:{main:this.form.value.primaryColor||"#1976d2"},secondary:{main:this.form.value.secondaryColor||"#dc004e"},background:{default:this.form.value.backgroundDefaultColor||"#fafafa",paper:this.form.value.backgroundPaperColor||"#fafafa"},text:{primary:this.form.value.textColor||"rgba(0, 0, 0, 0.87)"}})});this.store.set("theme",{title:"Custom",theme:e})}defineClass(e,t){return t&&"function"==typeof t?`${this.classes.Key} ${this.classes.FunctionValue}`:e&&"string"==typeof e?`${this.classes.Key} ${this.classes.StringValue}`:e&&"number"==typeof e?`${this.classes.Key} ${this.classes.NumberValue}`:this.classes.Key}formatKey({key:e,value:t,children:o}){const r=o?(n=typeof o)[0].toUpperCase()+n.slice(1):"";var n;return e&&"function"==typeof t?`${e}(): ${r}`:`${e}: ${r}`}formatValue({value:e}){if((e||0===e||!1===e)&&"function"!=typeof e)return"string"==typeof e?`"${e}"`:String(e)}listenThemeChanges(){this.sub=this.store.state$.pipe(Object(l.a)("theme")).pipe(Object(b.a)(100)).subscribe(({theme:e})=>{this.initForm(e.theme),this.dataSource.data=this.createTreeLikeStructure(this.store.state.theme.theme)})}createTreeLikeStructure(e){return function e(t){const o=[];return Object.keys(t).forEach(r=>{"updatedHash"!==r&&o.push(t[r]instanceof Object&&"function"!=typeof t[r]?{key:r,children:e(t[r])}:{key:r,value:t[r]})}),o}(e)}initForm(e){this.form=this.formBuilder.group({primaryColor:new s.c(e&&e.palette&&e.palette.primary.main||""),secondaryColor:new s.c(e&&e.palette&&e.palette.secondary.main||""),backgroundDefaultColor:new s.c(e&&e.palette&&e.palette.background&&e.palette.background.default||""),backgroundPaperColor:new s.c(e&&e.palette&&e.palette.background&&e.palette.background.paper||""),textColor:new s.c(e&&e.palette&&e.palette.text&&e.palette.text.primary||"")})}}return e.\u0275fac=function(t){return new(t||e)(d.Ob(f.a),d.Ob(s.b))},e.\u0275cmp=d.Ib({type:e,selectors:[["jss-create-theme"]],decls:35,vars:36,consts:[[3,"clsx"],[3,"formGroup"],["formFields",""],["formField",""],["formField","","inline",""],["matInput","","formControlName","primaryColor","placeholder","Primary color"],["formField","","inline","",3,"clsx","control"],["matInput","","formControlName","secondaryColor","placeholder","Secondary color"],["matInput","","formControlName","backgroundDefaultColor","placeholder","Background color"],["matInput","","formControlName","backgroundPaperColor","placeholder","Background color"],["matInput","","formControlName","textColor","placeholder","Text color"],["formControls",""],["mat-raised-button","",3,"click"],[3,"dataSource","treeControl","clsx"],["matTreeNodeToggle","",4,"matTreeNodeDef"],[4,"matTreeNodeDef","matTreeNodeDefWhen"],["matTreeNodeToggle",""],[1,"mat-tree-node"],["mat-icon-button","","disabled",""],["mat-icon-button","","matTreeNodeToggle",""],["matTreeNodeOutlet",""]],template:function(e,t){1&e&&(d.Ub(0,"article",0),d.Ub(1,"section"),d.Ub(2,"h2",0),d.xc(3,"Choose colors for custom theme: "),d.Tb(),d.Ub(4,"jss-form",1),d.Sb(5,2),d.Ub(6,"div",3),d.Ub(7,"mat-form-field",4),d.Pb(8,"input",5),d.Tb(),d.Pb(9,"jss-color-picker",6),d.Tb(),d.Ub(10,"div",3),d.Ub(11,"mat-form-field",4),d.Pb(12,"input",7),d.Tb(),d.Pb(13,"jss-color-picker",6),d.Tb(),d.Ub(14,"div",3),d.Ub(15,"mat-form-field",4),d.Pb(16,"input",8),d.Tb(),d.Pb(17,"jss-color-picker",6),d.Tb(),d.Ub(18,"div",3),d.Ub(19,"mat-form-field",4),d.Pb(20,"input",9),d.Tb(),d.Pb(21,"jss-color-picker",6),d.Tb(),d.Ub(22,"div",3),d.Ub(23,"mat-form-field",4),d.Pb(24,"input",10),d.Tb(),d.Pb(25,"jss-color-picker",6),d.Tb(),d.Rb(),d.Sb(26,11),d.Ub(27,"button",12),d.cc("click",(function(){return t.handleApply()})),d.xc(28,"Apply colors"),d.Tb(),d.Rb(),d.Tb(),d.Tb(),d.Ub(29,"section"),d.Ub(30,"h2",0),d.xc(31,"Current theme object: "),d.Tb(),d.Ub(32,"mat-tree",13),d.wc(33,I,7,8,"mat-tree-node",14),d.wc(34,R,12,14,"mat-nested-tree-node",15),d.Tb(),d.Tb(),d.Tb()),2&e&&(d.jc("clsx",d.lc(18,O,t.classes.Root)),d.Cb(2),d.jc("clsx",d.lc(20,O,t.classes.Title)),d.Cb(2),d.jc("formGroup",t.form),d.Cb(5),d.jc("clsx",d.lc(22,O,t.classes.ColorPicker))("control",t.form.get("primaryColor")),d.Cb(4),d.jc("clsx",d.lc(24,O,t.classes.ColorPicker))("control",t.form.get("secondaryColor")),d.Cb(4),d.jc("clsx",d.lc(26,O,t.classes.ColorPicker))("control",t.form.get("backgroundDefaultColor")),d.Cb(4),d.jc("clsx",d.lc(28,O,t.classes.ColorPicker))("control",t.form.get("backgroundPaperColor")),d.Cb(4),d.jc("clsx",d.lc(30,O,t.classes.ColorPicker))("control",t.form.get("textColor")),d.Cb(5),d.jc("clsx",d.lc(32,O,t.classes.Title)),d.Cb(2),d.jc("dataSource",t.dataSource)("treeControl",t.treeControl)("clsx",d.lc(34,O,t.classes.Tree)),d.Cb(2),d.jc("matTreeNodeDefWhen",t.isNested))},directives:[h.a,T,s.j,s.e,k.a,j.a,s.a,s.i,s.d,P,S.b,m.b,m.f,m.e,m.h,m.a,N.a,m.g],encapsulation:2}),function(e,t,o,r){var n,c=arguments.length,s=c<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var i=e.length-1;i>=0;i--)(n=e[i])&&(s=(c<3?n(s):c>3?n(t,o,s):n(t,o))||s);c>3&&s&&Object.defineProperty(t,o,s)}([Object(a.UseStyles)($),c("design:type",Object)],e.prototype,"classes",void 0),e})()}];let L=(()=>{class e{}return e.\u0275mod=d.Mb({type:e}),e.\u0275inj=d.Lb({factory:function(t){return new(t||e)},imports:[[n.b.forChild(D)],n.b]}),e})();o.d(t,"CreateThemeModule",(function(){return V}));let V=(()=>{class e{}return e.\u0275mod=d.Mb({type:e}),e.\u0275inj=d.Lb({factory:function(t){return new(t||e)},imports:[[r.a,L]]}),e})()}}]);