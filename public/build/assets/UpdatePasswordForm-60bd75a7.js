import{k as c,T as _,o as m,f as i,b as t,a as e,u as r,w,A as v,e as V,d as y,g}from"./app-b4c42108.js";import{a as l,b as n,_ as d}from"./TextInput-20d94ced.js";import{_ as k}from"./PrimaryButton-87506d7d.js";const b={class:"flex items-center gap-4"},x={key:0,class:"text-sm text-gray-600"},U={__name:"UpdatePasswordForm",setup(P){const u=c(null),p=c(null),s=_({current_password:"",password:"",password_confirmation:""}),f=()=>{s.put(route("password.update"),{preserveScroll:!0,onSuccess:()=>s.reset(),onError:()=>{s.errors.password&&(s.reset("password","password_confirmation"),u.value.focus()),s.errors.current_password&&(s.reset("current_password"),p.value.focus())}})};return(S,o)=>(m(),i("section",null,[t("form",{onSubmit:V(f,["prevent"]),class:"mt-6 space-y-6"},[t("div",null,[e(d,{for:"current_password",value:"Current Password"}),e(l,{id:"current_password",ref_key:"currentPasswordInput",ref:p,modelValue:r(s).current_password,"onUpdate:modelValue":o[0]||(o[0]=a=>r(s).current_password=a),type:"password",class:"mt-1 block w-full",autocomplete:"current-password"},null,8,["modelValue"]),e(n,{message:r(s).errors.current_password,class:"mt-2"},null,8,["message"])]),t("div",null,[e(d,{for:"password",value:"New Password"}),e(l,{id:"password",ref_key:"passwordInput",ref:u,modelValue:r(s).password,"onUpdate:modelValue":o[1]||(o[1]=a=>r(s).password=a),type:"password",class:"mt-1 block w-full",autocomplete:"new-password"},null,8,["modelValue"]),e(n,{message:r(s).errors.password,class:"mt-2"},null,8,["message"])]),t("div",null,[e(d,{for:"password_confirmation",value:"Confirm Password"}),e(l,{id:"password_confirmation",modelValue:r(s).password_confirmation,"onUpdate:modelValue":o[2]||(o[2]=a=>r(s).password_confirmation=a),type:"password",class:"mt-1 block w-full",autocomplete:"new-password"},null,8,["modelValue"]),e(n,{message:r(s).errors.password_confirmation,class:"mt-2"},null,8,["message"])]),t("div",b,[e(k,{disabled:r(s).processing},{default:w(()=>o[3]||(o[3]=[y("Save")])),_:1},8,["disabled"]),e(v,{"enter-from-class":"opacity-0","leave-to-class":"opacity-0",class:"transition ease-in-out"},{default:w(()=>[r(s).recentlySuccessful?(m(),i("p",x,"Saved.")):g("",!0)]),_:1})])],32)]))}};export{U as default};
