import{A as M}from"./ApplicationLogo-877d0a7c.js";import{l as N,y as B,h as m,k as D,o as d,f as g,b as e,r as f,i as C,z as L,a as n,w as r,n as u,A as E,c as k,u as v,j as b,d as i,t as y,g as j}from"./app-b4c42108.js";const z={class:"relative"},S={__name:"Dropdown",props:{align:{default:"right"},width:{default:"48"},contentClasses:{default:()=>["py-1","bg-white"]}},setup(a){const o=a,t=h=>{l.value&&h.key==="Escape"&&(l.value=!1)};N(()=>document.addEventListener("keydown",t)),B(()=>document.removeEventListener("keydown",t));const s=m(()=>({48:"w-48"})[o.width.toString()]),p=m(()=>o.align==="left"?"origin-top-left left-0":o.align==="right"?"origin-top-right right-0":"origin-top"),l=D(!1);return(h,c)=>(d(),g("div",z,[e("div",{onClick:c[0]||(c[0]=$=>l.value=!l.value)},[f(h.$slots,"trigger")]),C(e("div",{class:"fixed inset-0 z-40",onClick:c[1]||(c[1]=$=>l.value=!1)},null,512),[[L,l.value]]),n(E,{"enter-active-class":"transition ease-out duration-200","enter-from-class":"transform opacity-0 scale-95","enter-to-class":"transform opacity-100 scale-100","leave-active-class":"transition ease-in duration-75","leave-from-class":"transform opacity-100 scale-100","leave-to-class":"transform opacity-0 scale-95"},{default:r(()=>[C(e("div",{class:u(["absolute z-50 mt-2 rounded-md shadow-lg",[s.value,p.value]]),style:{display:"none"},onClick:c[2]||(c[2]=$=>l.value=!1)},[e("div",{class:u(["rounded-md ring-1 ring-black ring-opacity-5",a.contentClasses])},[f(h.$slots,"content")],2)],2),[[L,l.value]])]),_:3})]))}},x={__name:"DropdownLink",setup(a){return(o,t)=>(d(),k(v(b),{class:"block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"},{default:r(()=>[f(o.$slots,"default")]),_:3}))}},w={__name:"NavLink",props:["href","active"],setup(a){const o=a,t=m(()=>o.active?"inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out":"inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out");return(s,p)=>(d(),k(v(b),{href:a.href,class:u(t.value)},{default:r(()=>[f(s.$slots,"default")]),_:3},8,["href","class"]))}},_={__name:"ResponsiveNavLink",props:["href","active"],setup(a){const o=a,t=m(()=>o.active?"block w-full pl-3 pr-4 py-2 border-l-4 border-indigo-400 text-left text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out":"block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out");return(s,p)=>(d(),k(v(b),{href:a.href,class:u(t.value)},{default:r(()=>[f(s.$slots,"default")]),_:3},8,["href","class"]))}},A={class:"min-h-screen bg-gray-100"},V={class:"bg-white border-b border-gray-100"},O={class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"},P={class:"flex justify-between h-16"},T={class:"flex"},R={class:"shrink-0 flex items-center"},U={class:"hidden space-x-8 sm:-my-px sm:ml-10 sm:flex"},q={class:"hidden sm:flex sm:items-center sm:ml-6"},F={class:"ml-3 relative"},G={class:"inline-flex rounded-md"},H={type:"button",class:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"},I={class:"-mr-2 flex items-center sm:hidden"},J={class:"h-6 w-6",stroke:"currentColor",fill:"none",viewBox:"0 0 24 24"},K={class:"pt-2 pb-3 space-y-1"},Q={class:"pt-4 pb-1 border-t border-gray-200"},W={class:"px-4"},X={class:"font-medium text-base text-gray-800"},Y={class:"font-medium text-sm text-gray-500"},Z={class:"mt-3 space-y-1"},ee={key:0,class:"bg-white shadow"},te={class:"max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"},re={__name:"AuthenticatedLayout",setup(a){const o=D(!1);return(t,s)=>(d(),g("div",null,[e("div",A,[e("nav",V,[e("div",O,[e("div",P,[e("div",T,[e("div",R,[n(v(b),{href:t.route("dashboard")},{default:r(()=>[n(M,{class:"block h-9 w-auto fill-current text-gray-800"})]),_:1},8,["href"])]),e("div",U,[n(w,{href:t.route("dashboard"),active:t.route().current("dashboard")},{default:r(()=>s[1]||(s[1]=[i(" Dashboard ")])),_:1},8,["href","active"]),n(w,{href:t.route("stripe.subscription"),active:t.route().current("stripe.subscription")},{default:r(()=>s[2]||(s[2]=[i(" Stripe ")])),_:1},8,["href","active"]),n(w,{href:t.route("stripe.plans"),active:t.route().current("stripe.plans")},{default:r(()=>s[3]||(s[3]=[i(" Plans ")])),_:1},8,["href","active"])])]),e("div",q,[e("div",F,[n(S,{align:"right",width:"48"},{trigger:r(()=>[e("span",G,[e("button",H,[i(y(t.$page.props.auth.user.name)+" ",1),s[4]||(s[4]=e("svg",{class:"ml-2 -mr-0.5 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},[e("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1))])])]),content:r(()=>[n(x,{href:t.route("dashboard")},{default:r(()=>s[5]||(s[5]=[i(" Events ")])),_:1},8,["href"]),n(x,{href:t.route("my.profile")},{default:r(()=>s[6]||(s[6]=[i(" Profile ")])),_:1},8,["href"]),n(x,{href:t.route("logout"),method:"post",as:"button"},{default:r(()=>s[7]||(s[7]=[i(" Log Out ")])),_:1},8,["href"])]),_:1})])]),e("div",I,[e("button",{onClick:s[0]||(s[0]=p=>o.value=!o.value),class:"inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"},[(d(),g("svg",J,[e("path",{class:u({hidden:o.value,"inline-flex":!o.value}),"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 6h16M4 12h16M4 18h16"},null,2),e("path",{class:u({hidden:!o.value,"inline-flex":o.value}),"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"},null,2)]))])])])]),e("div",{class:u([{block:o.value,hidden:!o.value},"sm:hidden"])},[e("div",K,[n(_,{href:t.route("dashboard"),active:t.route().current("dashboard")},{default:r(()=>s[8]||(s[8]=[i(" Dashboard ")])),_:1},8,["href","active"])]),e("div",Q,[e("div",W,[e("div",X,y(t.$page.props.auth.user.name),1),e("div",Y,y(t.$page.props.auth.user.email),1)]),e("div",Z,[n(_,{href:t.route("profile.edit")},{default:r(()=>s[9]||(s[9]=[i(" Profile ")])),_:1},8,["href"]),n(_,{href:t.route("logout"),method:"post",as:"button"},{default:r(()=>s[10]||(s[10]=[i(" Log Out ")])),_:1},8,["href"])])])],2)]),t.$slots.header?(d(),g("header",ee,[e("div",te,[f(t.$slots,"header")])])):j("",!0),e("main",null,[f(t.$slots,"default")])])]))}};export{re as _};
