import{k as w,l as P,o as m,f as p,b as a,t as j,g as b,i as L,s as C,e as k,p as I}from"./app-481af7cf.js";import{d as g}from"./index-584e29c2.js";import{_ as N}from"./_plugin-vue_export-helper-c27b6911.js";var x="https://js.stripe.com/v3",q=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,h="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",B=function(){for(var e=document.querySelectorAll('script[src^="'.concat(x,'"]')),t=0;t<e.length;t++){var r=e[t];if(q.test(r.src))return r}return null},S=function(e){var t=e&&!e.advancedFraudSignals?"?advancedFraudSignals=false":"",r=document.createElement("script");r.src="".concat(x).concat(t);var n=document.head||document.body;if(!n)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return n.appendChild(r),r},R=function(e,t){!e||!e._registerWrapper||e._registerWrapper({name:"stripe-js",version:"4.3.0",startTime:t})},d=null,f=null,v=null,T=function(e){return function(){e(new Error("Failed to load Stripe.js"))}},W=function(e,t){return function(){window.Stripe?e(window.Stripe):t(new Error("Stripe.js not available"))}},G=function(e){return d!==null?d:(d=new Promise(function(t,r){if(typeof window>"u"||typeof document>"u"){t(null);return}if(window.Stripe&&e&&console.warn(h),window.Stripe){t(window.Stripe);return}try{var n=B();if(n&&e)console.warn(h);else if(!n)n=S(e);else if(n&&v!==null&&f!==null){var i;n.removeEventListener("load",v),n.removeEventListener("error",f),(i=n.parentNode)===null||i===void 0||i.removeChild(n),n=S(e)}v=W(t,r),f=T(r),n.addEventListener("load",v),n.addEventListener("error",f)}catch(s){r(s);return}}),d.catch(function(t){return d=null,Promise.reject(t)}))},M=function(e,t,r){if(e===null)return null;var n=e.apply(void 0,t);return R(n,r),n},c,E=!1,_=function(){return c||(c=G(null).catch(function(e){return c=null,Promise.reject(e)}),c)};Promise.resolve().then(function(){return _()}).catch(function(o){E||console.warn(o)});var A=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];E=!0;var n=Date.now();return _().then(function(i){return M(i,t,n)})};const H={props:{planId:{type:Number,required:!0},clientSecret:{type:String,required:!0}},setup(o,{emit:e}){const t=w(""),r=w(o.sessionError),n=w(!1);let i,s;return window.env.stripeKey,P(async()=>{i=await A("pk_test_51PsPeDImpHhc4Ni6pBqGGR84WfYug4wJJablOc6eAXsP72yjPTWbC9Kt9jnoOkbfg6tREpMwx5CG5TvR0H3WijSR00BwdOahJy"),s=i.elements().create("card"),s.mount("#card-element")}),{cardHolderName:t,error:r,isProcessing:n,handleSubmit:async()=>{n.value=!0;try{const{setupIntent:l,error:y}=await i.confirmCardSetup(o.clientSecret,{payment_method:{card:s,billing_details:{name:t.value}}});if(y)r.value=y.message,n.value=!1;else try{const u=await I.post("/create-payment-intent",{payment_method:l.payment_method,planId:o.planId,card_holder_name:t.value});g.Inertia.visit("/dashboard")}catch(u){u.response&&u.response.status===422?g.Inertia.visit("/stripe-error",{preserveState:!0,props:{error:u.response.data.message}}):r.value="An error occurred while processing your payment."}finally{n.value=!1}}catch(l){console.error("Error in subscription process",l),r.value=l.message}}}}},V={class:"bg-gray-100 flex items-center justify-center min-h-screen"},D={key:0,class:"mb-4 bg-white rounded-lg max-w-md w-full"},O={class:"text-center text-red-400 mt-6 mb-3 text-sm"},F={class:"mb-4"},J={key:1},U=["data-secret","disabled"];function X(o,e,t,r,n,i){return m(),p("div",V,[a("form",{class:"bg-white p-8 rounded-lg shadow-md max-w-md w-full",id:"payment-form",onSubmit:e[1]||(e[1]=k((...s)=>r.handleSubmit&&r.handleSubmit(...s),["prevent"]))},[r.error?(m(),p("div",D,[a("p",O,j(r.error),1)])):b("",!0),e[4]||(e[4]=a("div",{class:"mb-4"},[a("label",{for:"email",class:"block text-gray-700 text-sm font-bold mb-2"},"Email"),a("input",{type:"email",id:"email",class:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none",placeholder:"you@example.com",required:""})],-1)),a("div",F,[e[2]||(e[2]=a("label",{for:"card-holder-name",class:"block text-gray-700 text-sm font-bold mb-2"},"Name on the card",-1)),L(a("input",{type:"text",id:"card-holder-name","onUpdate:modelValue":e[0]||(e[0]=s=>r.cardHolderName=s),class:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none",placeholder:"Name on the card",required:""},null,512),[[C,r.cardHolderName]])]),e[5]||(e[5]=a("div",{class:"mb-4"},[a("label",{for:"card-element",class:"block text-gray-700 text-sm font-bold mb-4"},"Card information"),a("div",{id:"card-element",class:"mt-5"})],-1)),r.isProcessing?(m(),p("span",J,e[3]||(e[3]=[a("svg",{class:"animate-spin h-12 w-12 text-white mx-auto",xmlns:"http://www.w3.org/2000/svg",fill:"#7B5CE6",viewBox:"0 0 24 24"},[a("circle",{class:"opacity-80",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"}),a("path",{class:"opacity-60",fill:"currentColor",d:"M4 12a8 8 0 018-8v4l-3.5 3.5L4 12z"})],-1)]))):b("",!0),r.isProcessing?b("",!0):(m(),p("button",{key:2,type:"submit",class:"w-full bg-dark-blue text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-opacity-50",id:"card-button","data-secret":t.clientSecret,disabled:r.isProcessing}," Pay Now ",8,U))],32)])}const Z=N(H,[["render",X]]);export{Z as default};
