var NSfTIF=window.NSfTIF||{};NSfTIF.ts="2023-06-28T13:15:05Z";NSfTIF.cnr=9695;NSfTIF.pid=1148;NSfTIF.pType="CP";NSfTIF.section="undef/undef";
NSfTIF.tax_id="1";NSfTIF.cr="";NSfTIF.sktg="Diverse/Diverse/Diverse";NSfTIF.cc="de";NSfTIF.rc="de";NSfTIF.frabo=true;NSfTIF.has_ads=true;
NSfTIF.options={};NSfTIF.sectionList={produkte:"89"};NSfTIF._validateSection=function(b){if(/^[a-z0-9@./_-]+$/i.test(b)){var a=String(b).toLowerCase();
a=a.replace(new RegExp("//+","g"),"/");return a}else{return this.section}};NSfTIF._setSection=function(a){this.section=this._validateSection(a);
this._setIdCode()};NSfTIF._setIdCode=function(){var a=this.section.length;if(this._isDef(this.sectionList[this.section])){this.tax_id=this.sectionList[this.section]
}else{for(var b in this.sectionList){if(a>=b.length&&this.section.substr(0,b.length)===b){this.tax_id=this.sectionList[b];
break}}}};NSfTIF._replaceVariables=function(a){a=a.replace(/__SC__/g,this.section);a=a.replace(/__TYPE__/g,this.pType);a=a.replace(/__CODE__/g,this.tax_id);
a=a.replace(/__SKTG__/g,this.sktg);a=a.replace(/__CRG__/g,this.cr);a=a.replace(/__CR__/g,this.cr);a=a.replace(/__CC__/g,this.cc);
a=a.replace(/__REGION__/g,this.rc);a=a.replace(/__R__/g,escape(document.referrer));a=a.replace(/__D__/g,this._getRandom());
a=a.replace(/__CNR__/g,this.cnr);a=a.replace(/__PID__/g,this.pid);for(var b in this.options){a=a.replace(new RegExp("__"+b.toUpperCase()+"__","g"),this.options[b])
}a=a.replace(/__[A-Z0-9_-]+__/g,"");return a};NSfTIF._rvmv=function(b){for(var a in b){b[a]=NSfTIF._replaceVariables(b[a])
}return b};NSfTIF._isDef=function(b){return typeof(b)!=="undefined"};NSfTIF.init=function(a){if(!this._isDef(a)){return}if(typeof a.frabo==="boolean"){this.frabo=a.frabo
}if(typeof a.has_ads==="boolean"){this.has_ads=a.has_ads}if(a.cr){this.cr=a.cr}if(a.cc){this.cc=a.cc.toLowerCase()}if(a.region){this.rc=a.region.toLowerCase()
}this.initUniv(a);if(a.pageidentifier){this._setSection(a.pageidentifier)}if(a.contentclass){this.tax_id=a.contentclass}if(a.sktg){this.sktg=a.sktg
}};NSfTIF.initUniv=function(a){if(a){for(var b in a){if(/^[a-z0-9_-]+$/i.test(b)){this.options[b]=a[b]}}}};NSfTIF.checkFraBo=function(){return this.frabo&&window.location.protocol==="http:"&&document.readyState!=="complete"
};NSfTIF.rlsTrc=function(a){(new Image()).src=this._replaceVariables(a)};NSfTIF.rlsTrcRed=function(a){window.location=this._replaceVariables(a)
};NSfTIF._trim=function(a){return a.replace(/\s+$/,"").replace(/^\s+/,"")};NSfTIF._getRandom=function(){return Math.round(Math.random()*100000)
};NSfTIF.track=function(b){if(b){this.init(b)}if(this.options.deviceclass==="tab"){this.options.deviceclass="desktop"}const c=this.options.deviceclass;
let company="undefined";if(this.options.brand){let brand=this.options.brand.replace(/\./g,"").toLowerCase();const a={"1and1":"1und1",gmxch:"gmx",gmxat:"gmx",gmxde:"gmx",gmxnet:"gmx"};
if(typeof a[brand]!=="undefined"){brand=a[brand]}this.options.brand=brand;let company_prefix="";let company_suffix="";if(("mobile"===c||"app"===c)&&brand.search("m-")===-1){company_prefix="m-"
}if("gmx"===brand){if("int"===this.rc||"us"===this.rc){company_suffix="com"}else{if("mobile"===c||"app"===c){company_suffix=this.rc
}else{if("desktop"===c){if("ch"===this.rc||"at"===this.rc){company_suffix="_"+this.rc}else{if(/es|fr|couk|com/.test(this.rc)){company_suffix=this.rc
}}}}}}company=company_prefix+brand+company_suffix}if(!this.options.brand){this.options.brand="undefined"}(function(f,d,e){let trackingUrl=f._replaceVariables("//"+d+"/traffic_p/?md="+e+"&et=__TYPE__&agof=__CODE__&sc=__SC__&brand=__BRAND__&region=__REGION__&dclass=__DEVICECLASS__&lclass=__LAYOUTCLASS__&dclient=__DEVICECLIENT__&hid=__HID__&wid=__WID__&salesarea=__SALESAREA__&lang=__LANGUAGE__&mbn=__MAILBOXNAME__&ul=__UL__&ff=__FF__&conpartner=__PARTNER__&conpartnerid=__PARTNERID__&category=__CATEGORY__&uid_debug=__UID_DEBUG__&eueid=__EUEID__&categorytype=__CATEGORYTYPE__&adsectionlong=__SECTIONLONG__&tif=__CNR__&tifts="+f.ts+"&d=__D__&r=__R__");
if(typeof f._anonymizeTrafficIfNoConsent==="function"){f._anonymizeTrafficIfNoConsent(trackingUrl)}})(this,this.fpTrackingDomain,company);
this._agofOewaInternal()};NSfTIF.fire_conversion=function(a){if(a){this.init(a)}(function(d,b,c){if(typeof b==="function"){b.call(d,c)
}}(this,this._handleConsentForDrpPixel,this._replaceVariables("//t.uimserv.net/drp_p/?md=uid&et=AP&evtid=__EVTID__&mediaID=__MEDIAID__&mpID=__MPID__&site=__SITEID__&region=__REGION__&sc=__USERLEVEL__&att1=__INUM__&att2=__ISTR__&att3=__PRODUCTTYPE__&hid=__AID__&tif=__CNR__&d=__D__")))
};NSfTIF._loadJavaScript=function(b){var a=document.createElement("script");a.setAttribute("type","text/javascript");a.setAttribute("src",b);
if(document.head){document.head.appendChild(a)}};NSfTIF._writeJS=function(a){document.write('<script type="text/javascript" src="'+a+'"><\/script>')
};NSfTIF.fpTrackingDomain=(function(b){const e=b.split(".");const d=e.length;if(d>=2){const c=e[d-1];const f=e[d-2];const a={"1und1":{de:"ymprove.1und1.de"},web:{de:"ymprove.web.de"},gmx:{de:"ymprove.gmx.de",net:"ymprove.gmx.net",at:"ymprove.gmx.at",ch:"ymprove.gmx.ch"}};
if(typeof a[f]!=="undefined"&&typeof a[f][c]!=="undefined"){return a[f][c]}}return"t.uimserv.net"})(window.location.hostname);
NSfTIF._shortenUrl=function(a){const b=new RegExp("&[a-z0-9_-]+=(&|$)","gi");let shortenedUrl=a.replace(b,"&");while(shortenedUrl.length<a.length){a=shortenedUrl;
shortenedUrl=a.replace(b,"&")}return shortenedUrl.replace(/&$/,"")};NSfTIF._anonymizeTrafficIfNoConsent=function(a){const b=this;
function c(){(new Image()).src=b._shortenUrl(a)}function d(){console.log("TIF tracks for TGP/WTR anonymously.");const e=new RegExp("&(hid|cr|crx|adid|idfa|uid_debug|eueid)=[^&]*(&|$)","gi");
(new Image()).src=b._shortenUrl(a.replace(e,"&")+"&anon=1")}b._checkForConsent("tgp",c,d,"Traffic-Pixel")};NSfTIF.internalRetargeting="internalRetargeting";
NSfTIF._handleConsentForDrpPixel=function(a){const b=this;function c(){(new Image()).src=b._shortenUrl(a)}function d(){}b._checkForConsent(NSfTIF.internalRetargeting,c,d,"DRP-Pixel")
};NSfTIF._handleConsentForDrpRedirect=function(a){const b=this;b.options.target=b.options.target||"_blank";function d(){window.open(a,b.options.target)
}function c(){console.log("TIF redirects directly to the destination w/o tracking.");window.open(b.options.durl,b.options.target)
}b._checkForConsent(NSfTIF.internalRetargeting,d,c,"DRP-Redirect")};NSfTIF._checkForConsent=function(g,h,c,d){const b=this;
const f=d?d:"UNKOWN";const e="permissionFeatureType : '"+g+"'";function a(){window.__tcfapi("getPermission",2,function(i){if(i){console.log("TIF has consent for "+e+".");
h.call()}else{console.log("TIF has NO consent for "+e+".");c.call()}},g)}if(typeof window.__tcfapi==="function"){console.log("TIF is checking consent for "+e+" in order to trigger '"+f+"'.");
a()}else{console.log("TIF does NOT see TCF-API. Fallback to 'Privacy by default': We assume NO CONSENT.");c.call()}};NSfTIF._agofInternal=function(e,c){const b=this;
const d=b.options.deviceclient||"browser";let brand=b.options.brand;let angebotskennung;if("app"===d){if(/^ios/.test(b.section)){if("webde"===brand){angebotskennung="appwebde"
}else{if("gmx"===brand){angebotskennung="appgmxde"}}}else{if(/^android/.test(b.section)){if("webde"===brand){angebotskennung="aadwebde"
}else{if("gmx"===brand){angebotskennung="aadgmxma"}else{if("1und1"===brand){angebotskennung="aad1und1"}}}}}}else{if("mobile"===e){angebotskennung="mob"+brand
}else{if("desktop"===e){if("webde"===brand){angebotskennung="webdessl"}}}}if(!angebotskennung){angebotskennung=brand}let survey;
if(b.frabo&&(c||brand==="autoser")){if("desktop"===e){survey="i2"}else{window.iam_skiponload=true;survey="mo"}}else{survey="ke"
}if(b.section==="mail/logout/ad_dynamisch"){window.iam_fadeout_flash=false;window.iam_fadeout_iframe=false;window.iam_fadeout_form=false
}const a={st:angebotskennung,cp:b.tax_id,sv:survey,sur:"yes",sc:"no"};if(b.options.category==="magazine"){iom.h(a,2)}else{iom.c(a,2)
}};NSfTIF._oewaInternal=function(f,d){const c=this;c.sktg=c._trim(c.sktg);const e=window.location.hostname;let angebotskennung="gmx";
if(e.match(/gmx\.at$/)){angebotskennung="at_w_atgmx";if(!c.sktg.match(/gmx\.at$/)){c.sktg+="/gmx.at"}}else{if(e.match(/gmx\.net$/)){angebotskennung="at_w_netgmx";
if(!c.sktg.match(/gmx\.net$/)){c.sktg+="/gmx.net"}}}const a="mobile"===f||"app"===f;let frabo="ke";if(c.frabo&&d){frabo=a?"mo":"in"
}if(!/\/moewa\/$/.test(c.sktg)&&a){c.sktg+="/moewa/"}if(c.section==="mail/logout/ad_dynamisch"){window.iam_fadeout_flash=false;
window.iam_fadeout_iframe=false;window.iam_fadeout_form=false}const b={cn:"at",st:angebotskennung,ps:"lin",cp:c.sktg,sv:frabo,sur:"yes",sc:"no"};
iom.c(b,2)};NSfTIF._agofOewaInternal=function(){const a=this;if(window.iom&&a.options.brand&&a.has_ads&&(a.rc==="de"||a.rc==="at")){if(a.section==="mail/logout/ad_dynamisch"){window.iam_fadeout_flash=false;
window.iam_fadeout_iframe=false;window.iam_fadeout_form=false}const c=a.options.deviceclass||"desktop";const b=/^((search|themen)\/)|(\/?[^/]+\/logout\/)/.test(a.section);
if(a.rc==="de"&&NSfTIF.options.autoplay!=="true"){let agofCallbackWhenConsent=function(){return a._agofInternal(c,b)};let agofCallbackWhenNoConsent=function(){};
a._checkForConsent("agofTracking",agofCallbackWhenConsent,agofCallbackWhenNoConsent,"AGOF-Tracking")}if(a.options.brand==="gmx"&&a.rc==="at"&&!/^(ios|android)\//.test(a.section)){let oewaCallbackWhenConsent=function(){return a._oewaInternal(c,b)
};let oewaCallbackWhenNoConsent=function(){};a._checkForConsent("oewaTracking",oewaCallbackWhenConsent,oewaCallbackWhenNoConsent,"OEWA-Tracking")
}}};var szmvars="";window.iom=(function(){var ax="dummy",ad="de.ioam.de/tx.io",A="de.ioam.de/aid.io",C="de.ioam.de/optin.php?re=",g="irqs.ioam.de",ae=".ioam.de/tx.io",j=".ioam.de/aid.io",af=".ioam.de/optin.php?re=",ay=["imarex"],ag=".iocnt.net/tx.io",N=".iocnt.net/aid.io",aS=".iocnt.net/optin.php?re=",f="irqs.iocnt.net",B=["at"],d=["","inst","init","open","clse","play","resm","stop","fowa","bakw","recd","paus","forg","bakg","dele","refr","kill","view","alve","fini","mute","aforg","abakg","aclse","sple","scvl","serr","spyr","smdr","sfpl","sfqt","ssqt","stqt","soqt","sofc","scfc","scqt","splr","spli","sprs","spre","smrs","smre","sors","sore","sack","sapl","sapa","snsp"],w=[],aD=1,am=0,aw=1,aV="",aW="Leercode_nichtzuordnungsfaehig",aB={onfocus:"aforg",onblur:"abakg",onclose:"aclse"},ab=2,r=[],p="ioam2018",a=0,I="private",Y="ioamout",k=60000,O=5000,K=10000,o=30000,aM=10000,V=30000,c=60000,H=300000,aL,aa=10;
var F=null,t=null,G={},u=86400000,aU={},ah,aN=0,X=0,aF=0;var e=86400000,ac=180000,h="me.ioam.de";var aH=y(location.hostname),aI=[730,785],ao=10,aJ=60,Z=false,ai=new Date();
ai.setDate(ai.getDate()+28);var L={name:"iom_consent",domain:aH.length>0?aH.slice(7,aH.length-1):"",expires:ai.toUTCString(),path:"/"};
function E(aZ){aQ(aZ,{vendors:aI,cookie:L,resultKey:"ct"},aU)}function W(a1){var a2="";var a0;var a3=document.cookie.match(new RegExp("(^| )"+a1.name+"=([^;]+)"));
var aZ;if(a3){aZ=a3[2].split("&");a2=aZ[0];a0=aZ[1]}return{value:a2,date:a0}}function P(a2,a0){var aZ=Date.now();var a1="";
Object.keys(a0).forEach(function(a4,a3,a6){var a5=a0[a4];if(a4==="name"){a1+=a5+"="+a2+"&"+aZ;a1+=a3<a6.length?"; ":""}else{if(a5){a1+=a4+"="+a5;
a1+=a3<a6.length?"; ":""}}});document.cookie=a1}function l(a8,a6,a5,a0,a3){var a9=false;if(typeof a8==="string"&&a8.length===2+a6.length*4){var a7=a6.indexOf(a5);
if(a7>-1){var aZ=2;var a1=aZ+((a7+1)*4);var a4=parseInt(a8.slice(aZ,a1),16);var a2=Math.pow(2,(a0+a3));a9=(a4&a2)===a2}}return a9
}function aQ(a9,a7,a4){function a1(bi,bm){function bg(bu,bq,bp){function bn(bv){return function(bw){return bv[bw]===true}
}function bs(bv){return function(bw){var bx=(parseInt(bw)+bv);return Math.pow(2,bx)}}function bt(bw,bv){return bw.concat(bv.filter(function(bx){return bw.indexOf(bx)<0
}))}var br;var bo=[];br=Object.keys(bi.purpose.consents).filter(bn(bi.purpose.consents)).map(bs(-1));if(bq){bo=Object.keys(bi.purpose.legitimateInterests).filter(bn(bi.purpose.legitimateInterests)).map(bs(-1))
}if(bo.length>0){br=bt(br,bo)}if(bp){br=br.concat(Object.keys(bi.specialFeatureOptins).filter(bn(bi.specialFeatureOptins)).map(bs(9)))
}return br}function bj(bq){var bo=0;for(var bp=0,bn=bq.length;bp<bn;bp+=1){bo|=bq[bp]}return bo}function bb(bt){function br(bv,bu){while(bv.length<bu){bv="0"+bv
}return bv}var bo="";for(var bp=0,bn=bt.length;bp<bn;bp+=1){var bq=bt[bp].toString(16);var bs=4;if(bp===0){bs=2}bq=br(bq,bs);
bo+=bq}return bo}var bl=[1];for(var bf=0,bc=bm.length;bf<bc;bf+=1){var bk=bm[bf];if(bi.vendor.consents[bk]===true||bi.vendor.legitimateInterests[bk]===true){var be=[];
var bd=bi.vendor.legitimateInterests[bk];var bh=Object.keys(bi.specialFeatureOptins).length>0;be=bg(bm[bf],bd,bh);bl.push(bj(be))
}else{bl.push(0)}}return bb(bl)}function a5(bf,be){var bc="";for(var bd=0,bb=bf.length;bd<bb;bd+=1){bc+="0000"}bc=(be?"01":"00")+bc;
return bc}function a8(bd,bb,bc){return function(be,bi){var bh=function(){};if(bi&&["tcloaded","useractioncomplete"].indexOf(be.eventStatus)>-1){var bf=be.gdprApplies?a1(be,bb.vendors):a5(bb.vendors,true);
if(bf!==bd){if(bc&&bb.resultKey){bc[bb.resultKey]=bf}P(bf,a7.cookie)}__tcfapi("removeEventListener",2,bh,be.listenerId)}else{var bg=a5(bb.vendors,true);
if(bc&&bb.resultKey){bc[bb.resultKey]=bg}P(bg,a7.cookie)}}}function aZ(bd,bb,bc){return function(be,bf){if(bf&&be.eventStatus==="cmpuishown"){__tcfapi("addEventListener",2,a8(bd,bb,bc))
}}}function ba(){return"__tcfapi" in window}var a0=0;var a3=0;var a6=W(a7.cookie).value;var a2=a5(a7.vendors,ba());if(ba()){if(a4&&a7.resultKey){a4[a7.resultKey]=a6||a2
}__tcfapi("addEventListener",2,a8((a6||a2),a7,a4));if(Z===false){__tcfapi("addEventListener",2,aZ((a6||a2),a7,a4));Z=true
}}else{if(!ba()){a0=setInterval(function(){a3+=1;if(ba()||a3>=ao){clearInterval(a0);aQ(a9,a7,a4)}},aJ)}}if(a9&&a9!==a6&&ba()===false){P(a9,a7.cookie);
if(a4&&a7.resultKey){a4[a7.resultKey]=a9}}else{if(!a9&&a6&&ba()===false){if(a4&&a7.resultKey){a4[a7.resultKey]=a6}}else{if(!a9&&!a6&&ba()===false){P(a2,a7.cookie);
if(a4&&a7.resultKey){a4[a7.resultKey]=a2}}}}}function R(){if((am==1||aU.tb=="on")&&aU.tb!="off"&&!aN){aN=1;ah=1;for(var aZ in aB){(function(a1){var a0=window[a1];
window[a1]=function(){if(aV!=aB[a1]){aV=aB[a1];M(aB[a1])}if(typeof a0=="function"){a0()}}})(aZ)}}}function aj(){if((ab&2)?((typeof aU.nt=="undefined")?(ab&1):aU.nt):ab&1){if(window.navigator.msDoNotTrack&&window.navigator.msDoNotTrack=="1"){return true
}if(window.navigator.doNotTrack&&(window.navigator.doNotTrack=="yes"||window.navigator.doNotTrack=="1")){return true}}return false
}var aY=function(aZ){if(aZ&&aZ.hasOwnProperty("block-status")){var a0=("NONE"===aZ["block-status"].toUpperCase());if(a0){if(t){t.parentNode.removeChild(t)
}t=au(aZ["invite-url"])}}};function aA(){szmvars=aU.st+"//"+aU.pt+"//"+aU.cp+"//VIA_SZMNG";var a9=(aU.sv=="i2")?"in":aU.sv;
var a1=g;if(aU.cn){a9+="_"+aU.cn;if(aU.cn=="at"){a1=f}}G={siteIdentifier:aU.cp,offerIdentifier:aU.st,sampleType:a9,pixelType:aU.pt,contentType:aU.cp,host:a1,port:"",isFadeoutFlash:true,isFadeoutFrame:true,isFadeoutForm:true,positionTop:10,positionLeft:100,zIndex:1100000,popupBlockDuration:u,keysForQueryParam:["offerIdentifier","siteIdentifier","sampleType","pixelType","isFadeoutFlash","isFadeoutFrame","isFadeoutForm","positionTop","positionLeft","zIndex"]};
if(typeof window.iam_zindex!=="undefined"){G.zIndex=window.iam_zindex}if(typeof window.iam_fadeout_flash!=="undefined"){G.isFadeoutFlash=window.iam_fadeout_flash
}if(typeof window.iam_fadeout_iframe!=="undefined"){G.isFadeoutFrame=window.iam_fadeout_iframe}if(typeof window.iam_fadeout_form!=="undefined"){G.isFadeoutForm=window.iam_fadeout_form
}if(typeof window.iam_position_top!=="undefined"){G.positionTop=window.iam_position_top}if(typeof window.iam_position_left!=="undefined"){G.positionLeft=window.iam_position_left
}var a7=function(bf,be){var bb={},bd;var bg=be.length;for(var bc=0;bc<bg;bc++){bd=be[bc];if(bf.hasOwnProperty(bd)){bb[bd]=bf[bd]
}}return bb};var a0=function(bc){var bd=[];for(var bb in bc){if(bc.hasOwnProperty(bb)){bd.push(encodeURIComponent(bb)+"="+encodeURIComponent(bc[bb]))
}}return bd.join("&")};var a8=function(bc){var bd=new Date();bd.setTime(bd.getTime()+bc);var bb="expires="+bd.toUTCString();
document.cookie="POPUPCHECK="+bd.getTime().toString()+";"+bb+";path=/"};var aZ=function(){var bf=document.cookie.split(";");
for(var be=0;be<bf.length;be++){if(bf[be].match("POPUPCHECK=.*")){var bc=new Date();var bd=bc.getTime();bc.setTime(bf[be].split("=")[1]);
var bb=bc.getTime();if(bd<=bb){return true}}}return false};if(aZ()){return}if(aw&&!X&&aU.sv!=="ke"&&aU.sv==="dz"){X=1;iam_ng_nxss()
}if(aw&&!X&&aU.sv!=="ke"&&(aU.sv==="in"||aU.sv==="mo"||aU.sv==="i2")){X=1;a8(G.popupBlockDuration);var ba="https:";var a5="identitystatus";
var a4=a7(G,G.keysForQueryParam);var a3="?"+a0(a4);if(window.XDomainRequest&&document.documentMode===9){var a6=ba+"//"+G.host+"/"+a5+"/identity.js"+a3+"&callback=iom.gi&c="+Math.random();
au(a6)}else{var a6=ba+"//"+G.host+"/"+a5+a3+"&c="+Math.random();var a2=new XMLHttpRequest();a2.onreadystatechange=function(){if(a2.readyState===XMLHttpRequest.DONE&&200===a2.status){var bb=JSON.parse(a2.responseText);
aY(bb)}};a2.open("GET",a6,true);a2.withCredentials=true;a2.send(null)}}}function T(a0){var a1=0;for(var aZ=0;aZ<a0.length;
++aZ){a1+=a0.charCodeAt(aZ);a1+=(a1<<10);a1^=(a1>>6)}a1+=(a1<<3);a1^=(a1>>11);a1+=(a1<<15);a1=Math.abs(a1&a1);return a1.toString(36)
}function at(){var aZ="",a2,a1=["7790769C-0471-11D2-AF11-00C04FA35D02","89820200-ECBD-11CF-8B85-00AA005B4340","283807B5-2C60-11D0-A31D-00AA00B92C03","4F216970-C90C-11D1-B5C7-0000F8051515","44BBA848-CC51-11CF-AAFA-00AA00B6015C","9381D8F2-0288-11D0-9501-00AA00B911A5","4F216970-C90C-11D1-B5C7-0000F8051515","5A8D6EE0-3E18-11D0-821E-444553540000","89820200-ECBD-11CF-8B85-00AA005B4383","08B0E5C0-4FCB-11CF-AAA5-00401C608555","45EA75A0-A269-11D1-B5BF-0000F8051515","DE5AED00-A4BF-11D1-9948-00C04F98BBC9","22D6F312-B0F6-11D0-94AB-0080C74C7E95","44BBA842-CC51-11CF-AAFA-00AA00B6015B","3AF36230-A269-11D1-B5BF-0000F8051515","44BBA840-CC51-11CF-AAFA-00AA00B6015C","CC2A9BA0-3BDD-11D0-821E-444553540000","08B0E5C0-4FCB-11CF-AAA5-00401C608500","D27CDB6E-AE6D-11CF-96B8-444553540000","2A202491-F00D-11CF-87CC-0020AFEECF20"];
document.body.addBehavior("#default#clientCaps");for(var a0=0;a0<a1.length;a0++){a2=document.body.getComponentVersion("{"+a1[a0]+"}","ComponentID");
if(a2!==null){aZ+=a2}else{aZ+="null"}}return aZ}function x(){var a2=window.navigator,a0=a2.userAgent;a0+=aG();if(a2.plugins.length>0){for(var aZ=0;
aZ<a2.plugins.length;aZ++){a0+=a2.plugins[aZ].filename+a2.plugins[aZ].version+a2.plugins[aZ].description}}if(a2.mimeTypes.length>0){for(var aZ=0;
aZ<a2.mimeTypes.length;aZ++){a0+=a2.mimeTypes[aZ].type}}if(/MSIE (\d+\.\d+);/.test(a2.userAgent)){try{a0+=at()}catch(a1){}}return T(a0)
}function au(aZ){var a1=document.createElement("script");a1.type="text/javascript";a1.src=aZ;var a0=document.getElementsByTagName("head")[0];
if(a0){a0.appendChild(a1);return a1}else{return false}}function D(a0,aZ){var a2=document.createElement("script");a2.type="text/javascript";
a2.src=a0;a2.onload=aZ;a2.async=true;var a1=document.getElementsByTagName("head")[0];if(a1){a1.appendChild(a2);return a2}else{return false
}}function ar(aZ){function a1(a2){var a3=document.createElement("iframe");a3.className="iamsendbox";a3.style.position="absolute";
a3.style.left=a3.style.top="-999px";a3.src=a2+"&mo=1";document.body.appendChild(a3)}var a0=document.querySelectorAll(".iamsendbox");
if(a0.length<aa){a1(aZ)}else{a0[0].remove();a1(aZ)}}function aC(aZ,a0){if(aZ.split("/")[2].slice(aZ.split("/")[2].length-8)==".ioam.de"||aZ.split("/")[2].slice(aZ.split("/")[2].length-10)==".iocnt.net"){switch(a0){case 1:if(F){F.parentNode.removeChild(F)
}F=au(aZ+"&mo=1");if(!F){(new Image()).src=aZ+"&mo=0"}break;case 2:(new Image()).src=aZ+"&mo=0";break;case 3:ar(aZ);break;
case 0:default:document.write('<script src="'+aZ+'&mo=1"><\/script>')}}}function aG(){return screen.width+"x"+screen.height+"x"+screen.colorDepth
}function aP(aZ,a1){var a0;for(a0=0;a0<aZ.length;a0++){if(aZ[a0]==a1){return true}}return false}function an(aZ){if(!aZ){aZ=""
}aZ=aZ.replace(/[?#].*/g,"");aZ=aZ.replace(/[^a-zA-Z0-9,_\/-]+/g,".");if(aZ.length>255){aZ=aZ.substr(0,254)+"+"}return aZ
}function s(aZ){if(!aZ){aZ=""}aZ=aZ.replace(/[^a-zA-Z0-9,_\/:-]+/g,".");if(aZ.length>255){aZ=aZ.substr(0,254)+"+"}return aZ
}function b(){var aZ=document.referrer.split("/");return(aZ.length>=3)?aZ[2]:""}function v(a2){aU={};var a0;for(a0 in a2){if(a2.hasOwnProperty(a0)){if(a0!="cn"||(a0=="cn"&&(aP(ay,a2[a0]))||(aP(B,a2[a0])))){aU[a0]=a2[a0]
}}}if(aU.hasOwnProperty("fp")){aU.fp=(aU.fp!=""&&typeof aU.fp!="undefined")?aU.fp:aW;aU.fp=an(aU.fp);aU.pt="FP"}if(aU.hasOwnProperty("np")){aU.np=(aU.np!=""&&typeof aU.np!="undefined")?aU.np:aW;
aU.np=an(aU.np);aU.pt="NP"}if(aU.hasOwnProperty("xp")){aU.xp=(aU.xp!=""&&typeof aU.xp!="undefined")?aU.xp:aW;aU.xp=an(aU.xp);
aU.pt="XP"}if(aU.hasOwnProperty("cp")){aU.cp=(aU.cp!=""&&typeof aU.cp!="undefined")?aU.cp:aW;aU.cp=an(aU.cp);aU.pt="CP"}if(aU.hasOwnProperty("ms")){aU.ms=(aU.ms!=""&&typeof aU.ms!="undefined")?aU.ms:""
}if(!aU.pt){aU.cp=aW;aU.pt="CP";aU.er="N13"}if(!aU.hasOwnProperty("ps")){aU.ps="lin";aU.er="N22"}else{if(!(aP(["ack","lin","pio","out"],aU.ps))){aU.ps="lin";
aU.er="N23"}}aU.rf=b();if(!aU.hasOwnProperty("sur")||(aU.hasOwnProperty("sur")&&aU.sur!="yes")){aU.r2=s(document.referrer)
}aU.ur=document.location.host;aU.xy=aG();aU.cb="8004";aU.vr="424";aU.id=x();aU.st=aU.st?aU.st:ax;if(!aU.hasOwnProperty("sc")||(aU.hasOwnProperty("sc")&&aU.sc!="no")){var aZ=q();
aU.i3=aZ.cookie;aU.n1=aZ.length}if(((aP(r,aU.st))||(aU.hasOwnProperty("sc")&&aU.sc=="yes"))&&aU.i3=="nocookie"){aU.i3=n()
}if(!aU.hasOwnProperty("cn")&&aU.st.charAt(2)=="_"){var a3=aU.st.substr(0,2);if(aP(ay,a3)||aP(B,a3)){aU.cn=a3}else{aU.er="E12"
}}try{aU.dntt=((window.navigator.msDoNotTrack&&window.navigator.msDoNotTrack=="1")||(window.navigator.doNotTrack&&(window.navigator.doNotTrack=="yes"||window.navigator.doNotTrack=="1")))?"1":"0"
}catch(a1){}}function M(a3){var a0="";var aZ;a3=a3||"";ak();if(aF&&!aj()&&(!aD||(aD&&aP(d,a3)))&&aU.ps!=="out"){aU.lt=(new Date()).getTime();
aU.ev=a3;var a2="https:";var a1=ad;if(aU.cn&&aP(ay,aU.cn)){a1=aU.cn+ae}else{if(aU.cn&&aP(B,aU.cn)){a1=aU.cn+ag}}if(!(aP(w,aU.st))&&(((/iPhone/.test(window.navigator.userAgent)||/iPad/.test(window.navigator.userAgent))&&/Safari/.test(window.navigator.userAgent)&&!(/Chrome/.test(window.navigator.userAgent))&&!(/CriOS/.test(window.navigator.userAgent)))||(/Maple_201/.test(window.navigator.userAgent)||/SMART-TV/.test(window.navigator.userAgent)||/SmartTV201/.test(window.navigator.userAgent)))){if(aU.cn&&aP(ay,aU.cn)){a1=aU.cn+j
}else{if(aU.cn&&aP(B,aU.cn)){a1=aU.cn+N}else{a1=A}}ah=3;if(aU.hasOwnProperty("sur")&&aU.sur=="yes"){aU.u2=window.location.origin
}else{aU.u2=document.URL}}for(aZ in aU){if(aU.hasOwnProperty(aZ)&&aZ!="cs"&&aZ!="url"){a0=a0+encodeURIComponent(aZ).slice(0,8)+"="+encodeURIComponent(aU[aZ]).slice(0,2048)+"&"
}}a0=a0.slice(0,4096);aU.cs=T(a0);aU.url=a2+"//"+a1+"?"+a0+"cs="+aU.cs;aC(aU.url,ah);if(aP(["play","resm","alve","mute","sfqt","ssqt","stqt","sapl","snsp"],a3)&&(ah===1||ah===3)&&aU.hasOwnProperty("hb")){i()
}return aU}return{}}function aK(){if(aU.oer==="yes"&&!window.IVW&&!document.IVW){var aZ=(window.location.protocol.slice(0,4)==="http")?window.location.protocol:"https:";
var a1=(aU.co)?aU.co+"_SENT_VIA_MIGRATION_TAG":"SENT_VIA_MIGRATION_TAG";var a0=(aU.oc)?aU.oc:((aU.cp)?((aU.cp==aW)?"":aU.cp):"");
var a2=(aU.pt!==null)?aU.pt:"CP";(new Image()).src=aZ+"//"+aU.st+".ivwbox.de/cgi-bin/ivw/"+a2.toUpperCase()+"/"+a0+";"+a1+"?r="+escape(document.referrer)+"&d="+(Math.random()*100000)
}}function m(a0,aZ){al(a0,aZ);return M(aU.ev)}function al(a0,aZ){if(!a0.cn||a0.cn!=="at"){aQ(a0.ct,{vendors:aI,cookie:L,resultKey:"ct"},a0)
}ah=aZ;if(a0.act){delete a0.act}v(a0);if(aU.sv){aU.sv=(aU.sv=="in"&&ah==1)?"i2":aU.sv}if(aU.sv&&aU.sv!=="ke"&&l(a0.ct,aI,785,9,-1)===false){aU.sv="ke"
}R();aA();S();aF=1;aK();return{}}function aE(a3,a0){al(a3,a0);var a1=(typeof localStorage==="object"&&typeof localStorage.getItem==="function")?localStorage.getItem("ioam_smi"):null;
var aZ=(typeof localStorage==="object"&&typeof localStorage.getItem==="function")?localStorage.getItem("ioam_site"):null;
var a2=(typeof localStorage==="object"&&typeof localStorage.getItem==="function")?localStorage.getItem("ioam_bo"):null;if(a1!==null&&aZ!==null&&a2!==null){aU.mi=a1;
aU.fs=aU.st;aU.st=aZ;aU.bo=a2;if(aU.fs==aU.st){aU.cp=(aU.cp.slice(0,10)!=="___hyb2___")?"___hyb2___"+aU.fs+"___"+aU.cp:aU.cp
}else{aU.cp=(aU.cp.slice(0,9)!=="___hyb___")?"___hyb___"+aU.fs+"___"+aU.cp:aU.cp}return M(aU.ev)}else{if(a1!==null&&a2!==null){return{}
}else{if(window.location.protocol.slice(0,4)!=="http"||/IOAM\/\d+\.\d+/.test(window.navigator.userAgent)){return{}}else{return M(aU.ev)
}}}}function aq(a0){if(localStorage.getItem("ioam_smi")===null||localStorage.getItem("ioam_site")===null||localStorage.getItem("ioam_bo")===null||localStorage.getItem("ioam_smi")!==a0){aU.fs=aU.st;
var aZ=null;var a2=null;if(typeof a0==="string"&&typeof JSON==="object"&&typeof JSON.parse==="function"){try{aZ=JSON.parse(a0);
if(aZ.hasOwnProperty("library")){if(aZ.library.hasOwnProperty("offerIdentifier")){if(aZ.library.offerIdentifier){a2=aZ.library.offerIdentifier
}else{aU.er="JSON(E10): offerIdentifier not valid"}}else{aU.er="JSON(E10): no key offerIdentifier"}}else{aU.er="JSON(E10): no key library"
}}catch(a1){aU.er="JSON(E10): "+a1}}if(a2!==null){localStorage.setItem("ioam_site",a2)}aU.st=a2;aU.mi=a0;aU.bo=(new Date()).getTime();
localStorage.setItem("ioam_smi",aU.mi);localStorage.setItem("ioam_bo",aU.bo);if(aU.fs==aU.st){aU.cp=(aU.cp.slice(0,10)!=="___hyb2___")?"___hyb2___"+aU.fs+"___"+aU.cp:aU.cp
}else{aU.cp=(aU.cp.slice(0,9)!=="___hyb___")?"___hyb___"+aU.fs+"___"+aU.cp:aU.cp}return M(aU.ev)}return{}}if(window.postMessage||window.JSON&&{}.toString.call(window.JSON.parse)!=="[object Function]"&&{}.toString.call(window.JSON.stringify)!=="[object Function]"){var aT=function(a2){try{var aZ=JSON.parse(a2.data)
}catch(a0){aZ={type:false}}if({}.toString.call(aZ)==="[object Object]"&&aZ.type=="iam_data"){var a1={seq:aZ.seq,iam_data:{st:aU.st,cp:aU.cp}};
a2.source.postMessage(JSON.stringify(a1),a2.origin)}};if(window.addEventListener){window.addEventListener("message",aT)}else{window.attachEvent("onmessage",aT)
}}function az(){var aZ=(window.location.protocol.slice(0,4)==="http")?window.location.protocol:"https://"+C;var a0=window.open(aZ,"_blank");
a0.focus()}function i(){function a0(){return M("alve")}switch(aU.hb){case"adshort":k=O;break;case"admedium":k=K;break;case"adlong":k=o;
break;case"short":k=aM;break;case"medium":k=V;break;case"long":k=c;break;case"extralong":k=H;break;default:k=0}if(k!=0){try{aL=setInterval(a0,k)
}catch(aZ){}}}function ak(){try{clearInterval(aL)}catch(aZ){}}function J(a2){var a0=[];for(var a3=0,aZ=a2.length;a3<aZ;a3++){var a1=Number(a2.charCodeAt(a3)).toString(16);
a0.push(a1)}return a0.join("")}function z(){var aZ=999999999999;var a0=100000000000;return(Math.floor(Math.random()*(aZ-a0+1))+a0).toString(16)+(Math.floor(Math.random()*(aZ-a0+1))+a0).toString(16)+J(aU.cb)+(Math.floor(Math.random()*(aZ-a0+1))+a0).toString(16)
}function Q(){var aZ=365;var a0=300;return Math.floor(Math.random()*(aZ-a0+1))+a0}function q(){try{var a2=document.cookie.split(";");
for(var a1=0;a1<a2.length;a1++){if(a2[a1].match(p+"=.*")){var a4=a2[a1].split("=")[1].replace("!",":");var a5=a4.split(":");
var aZ=a5.slice(0,a5.length-1).join(":");var a0=a5.slice(-1).pop();if(T(aZ)===a0){if(!aU.hasOwnProperty("i3")||!aU.i3){aR(a4)
}return{cookie:a4,length:a2.length}}else{aU.er="N19";try{if(a<3){a++;n(2000)}else{aU.er="N20"}}catch(a3){aU.er="N20"}}}}}catch(a3){return{cookie:"nocookie",length:0}
}return{cookie:"nocookie",length:a2.length}}function av(){var aZ=q();if(aZ.cookie!="nocookie"){return true}else{return false
}}function y(a5){var a8="acadaeafagaialamaoaqarasatauawaxazbabbbdbebfbgbhbibjbmbnbobrbsbtbwbybzcacccdcfcgchcickclcmcncocrcucvcwcxcyczdjdkdmdodzeceeegereseteufifjfkfmfofrgagdgegfggghgiglgmgngpgqgrgsgtgugwgyhkhmhnhrhthuidieiliminioiqirisitjejmjojpkekgkhkikmknkpkrkwkykzlalblclilklrlsltlulvlymamcmdmemgmhmkmlmmmnmompmqmrmsmtmumvmwmxmymznancnenfngninlnonpnrnunzompapepfpgphpkplpmpnprpsptpwpyqarerorsrurwsasbscsdsesgshsiskslsmsnsosrssstsvsxsysztctdtftgthtjtktltmtntotrtttvtwtzuaugukusuyuzvavcvevgvivnvuwfwsyeytzazmzw".match(/.{1,2}(?=(.{2})+(?!.))|.{1,2}$/g),a2=["www","m","mobile"],a0=a5.split("."),a9,a6=[],a3=[],aZ="",a1="",a7=0,a4=0;
if(!a5){return""}if(aP(a8,a0[a0.length-1])){for(a7=a0.length-1;a7>=0;a7-=1){if(a7>=a0.length-3&&a0[a7].length<=4){a6.push(a0[a7])
}else{a3.push(a0[a7]);break}}a6=a6.reverse();for(a7=0,a4=a6.length;a7<a4;a7+=1){if(!aP(a2,a6[a7])){aZ+=a7<a4?"."+a6[a7]:a6[a7]
}}a3=a3.reverse();a1=a3[a3.length-1]||"";if(aP(a2,a1)){a1=""}}else{a1=a0.slice(a0.length-2,a0.length).join(".")||""}a9=a1+aZ;
if(a9&&a9.length>4&&a9.split(".").length>1){return"domain="+(a9[0]==="."?a9:(a9?"."+a9:""))+";"}return""}function aR(a3){var a4=y(location.hostname);
var a6=a3.split(":")[1];var a7=parseInt(a3.split(":")[4])+1;var aZ=new Date(new Date().setTime(a6));var a2=new Date();var a0=(aU.st)?aU.st:"nosite";
var a1=(aU.cp)?aU.cp:(aU.np)?aU.np:(aU.fp)?aU.fp:"nocode";var a8=(aU.ev)?aU.ev:"noevent";var a5=a3.split(":").slice(0,4).join(":")+":"+a7+":"+a0+":"+a1+":"+a8+":"+a2.getTime().toString();
a5=a5+":"+T(a5);document.cookie=p+"="+a5+";expires="+aZ.toUTCString()+";"+a4+";path=/;"}function n(a2){if(!a2){a2=Q()*24*60*60*1000
}var a3=y(location.hostname);var aZ=new Date(new Date().setTime(new Date().getTime()+a2));var a7=new Date();var a5;var a0=(aU.st)?aU.st:"nosite";
var a1=(aU.cp)?aU.cp:(aU.np)?aU.np:(aU.fp)?aU.fp:"nocode";var a8=(aU.ev)?aU.ev:"noevent";if(aU.hasOwnProperty("i2")){a5=aU.i2
}else{a5=z()}var a6=a5+":"+aZ.getTime().toString()+":"+a7.getTime().toString()+":"+a3.replace("domain=","").replace(";","")+":1:"+a0+":"+a1+":"+a8+":"+a7.getTime().toString();
var a4=a5+":"+aZ.getTime().toString()+":"+a7.getTime().toString()+":"+a3.replace("domain=","").replace(";","")+":2:"+a0+":"+a1+":"+a8+":"+a7.getTime().toString();
a4=a4+":"+T(a4);document.cookie=p+"="+a4+";expires="+aZ.toUTCString()+";"+a3+";path=/;";if(!av()){document.cookie=p+"="+a4+";expires="+aZ.toUTCString()+";path=/;";
aU.er="N25";if(!av()){aU.er="N26";return"nocookie"}}return a6}function aX(a1,a0){var aZ=new XMLHttpRequest();if("withCredentials" in aZ){aZ.open(a1,a0,true);
aZ.withCredentials=true}else{if(typeof XDomainRequest!="undefined"){aZ=new XDomainRequest();aZ.open(a1,a0)}else{aZ=null}}return aZ
}function U(a0){if(!a0){a0=1*24*60*60*1000}var a1=y(location.hostname);var aZ=new Date(new Date().setTime(new Date().getTime()+a0));
document.cookie=Y+"=stop;expires="+aZ.toUTCString()+";"+a1+";path=/;";n(2000)}function S(){try{var a0=document.cookie.split(";");
for(var aZ=0;aZ<a0.length;aZ++){if(a0[aZ].match(Y+"=.*")){aU.ps="out";return true}}return false}catch(a1){return false}}function aO(){U(2000);
n(2000)}function ap(){if(typeof localStorage==="object"&&typeof localStorage.getItem==="function"){if(localStorage.getItem("ioamplusdata")!==null&&localStorage.getItem("ioamplusttl")!==null){var aZ=new Date();
var a0=aZ.getTime();aZ.setTime(localStorage.getItem("ioamplusttl"));if(a0<=aZ.getTime()){return true}}var a2="https://"+h+"/soziodata2.php?sc="+I+"&st="+aU.st+"&id="+aU.id;
var a1=aX("GET",a2);if(a1){a1.onload=function(){var a3=a1.responseText;var a4=new Date();try{if((a3.split(":")[1].split(",")[0])=="0"){a4.setTime(a4.getTime()+ac);
localStorage.setItem("ioamplusttl",a4.getTime().toString());if(localStorage.getItem("ioamplusdata")==null){localStorage.setItem("ioamplusdata",a3)
}}else{a4.setTime(a4.getTime()+e);localStorage.setItem("ioamplusdata",a3);localStorage.setItem("ioamplusttl",a4.getTime().toString())
}}catch(a5){}};a1.send();return true}}return false}return{count:m,c:m,i:al,init:al,e:M,event:M,h:aE,hybrid:aE,setMultiIdentifier:aq,smi:aq,oi:az,optin:az,setoptout:U,soo:U,deloptout:aO,doo:aO,getInvitation:aY,gi:aY,getPlus:ap,gp:ap,consent:E,ct:E}
})();