//tealium universal tag - utag.208 ut4.0.201901291210, Copyright 2019 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag===undefined){utag={};}if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb();},false);}else{b.onreadystatechange=function(){if(this.readyState==="complete"||this.readyState==="loaded"){this.onreadystatechange=null;o.cb();}};}}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'view':1};u.initialized=false;u.map={"product_id":"product_id","page_type":"page_type","product_price":"product_price"};u.extend=[function(a,b){try{if(1){if(b.page_type=='HOME'){b.page_type=b.page_type.toLowerCase();}else if(b.page_type=='PLP'||b.page_type=='CLP'||b.page_type=='GLP'||b.page_type=='SEARCH'){b.page_type='category';}else if(b.page_type=='PDP'){b.page_type='product';b.product_price=b.product_price[0];}else if(b.page_type=='SHOPPING CART'){b.page_type='cart';var sum=b.product_price.reduce((a,n)=>(a+Number(n)),0);b.product_price=sum;}else if(b.analytics_pagename=='CHECKOUT|COMPLETE'&&b.order_id){b.page_type='purchase';b.product_price=b.order_subtotal;}else{b.page_type='other';}
if(b.product_id&&b.product_id>12){b.product_id.slice(0,12);}}}catch(e){utag.DB(e)}}];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f,i;u.data={"account_id":"2670249","base_url":"//top-fwz1.mail.ru/js/code.js"
};for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){if(typeof utag_err!='undefined'){utag_err.push({e:'extension error:'+e,s:utag.cfg.path+'utag.'+id+'.js',l:c,t:'ex'})}}};for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
u.loader_cb=function(){u.initialized=true;var _tmr=window._tmr||[];_tmr.push({id:u.data.account_id,type:"pageView",start:(new Date()).getTime()});_tmr.push({type:'itemView',productid:u.data.product_id,pagetype:u.data.page_type,totalvalue:u.data.product_price,list:'1'});};if(!u.initialized){u.loader({"type":"script","src":u.data.base_url,"cb":u.loader_cb,"loc":"script","id":'topmailru-code'});}else{u.loader_cb();}
}};utag.o[loader].loader.LOAD(id);})("208","adidas.adidasglobal");}catch(error){utag.DB(error);}
