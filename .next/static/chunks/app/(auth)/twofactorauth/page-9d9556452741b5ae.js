(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[290],{1981:function(e,a,s){Promise.resolve().then(s.bind(s,4350))},4350:function(e,a,s){"use strict";s.r(a);var t=s(7437),i=s(2265),l=s(1865),r=s(9701),n=s(5691),c=s(5925),d=s(9222),o=s(4033);a.default=()=>{let e=(0,o.useRouter)(),[a,s]=(0,i.useState)(),m=(0,o.useSearchParams)();(0,i.useEffect)(()=>{let e=m.get("id");s(e)},[a]);let[u,h]=(0,i.useState)({otp:""}),p=n.Ry().shape({otp:n.Z_().required("OTP is required")}),{register:f,setValue:x,handleSubmit:b,formState:j}=(0,l.cI)({mode:"onChange",resolver:(0,r.X)(p)}),{errors:g}=j,v=async s=>{s.id=a,await d.Z.post("http://localhost:3000/api/verify",s).then(a=>{c.default.success("Verification Successfully"),e.push("/")}).catch(e=>{c.default.error("Verification Failed, Invalid OTP")})};return(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("div",{className:"page-wrapper",id:"main-wrapper","data-layout":"vertical","data-navbarbg":"skin6","data-sidebartype":"full","data-sidebar-position":"fixed","data-header-position":"fixed",children:(0,t.jsx)("div",{className:"position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center",children:(0,t.jsx)("div",{className:"d-flex align-items-center justify-content-center w-100",children:(0,t.jsx)("div",{className:"row justify-content-center w-100",children:(0,t.jsx)("div",{className:"col-md-8 col-lg-6 col-xxl-3",children:(0,t.jsx)("div",{className:"card mb-0",children:(0,t.jsxs)("div",{className:"card-body",children:[(0,t.jsx)("a",{href:"/",className:"text-nowrap logo-img text-center d-block py-3 w-100",children:(0,t.jsx)("img",{src:"../assets/images/logos/dark-logo.svg",width:"180",alt:""})}),(0,t.jsx)("h5",{className:"text-center",children:"Verification Mail send you to your Register Email! Please Verify"}),(0,t.jsxs)("form",{onSubmit:b(v),children:[(0,t.jsxs)("div",{className:"mb-3",children:[(0,t.jsx)("label",{htmlFor:"exampleInputEmail1",className:"form-label",children:"Enter OTP"}),(0,t.jsx)("input",{type:"number",className:"form-control",id:"exampleInputEmail1",placeholder:"otp",defaultValue:u.otp,onChange:e=>x("otp",e.target.value,{shouldValidate:!0}),"aria-describedby":"emailHelp"}),g.otp&&(0,t.jsx)("div",{className:"text-danger",children:g.otp.message})]}),(0,t.jsx)("button",{type:"submit",disabled:!j.isValid,className:"btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2",children:"Submit"}),(0,t.jsxs)("div",{className:"d-flex align-items-center justify-content-center",children:[(0,t.jsx)("p",{className:"fs-4 mb-0 fw-bold",children:"Already have an Account?"}),(0,t.jsx)("a",{className:"text-primary fw-bold ms-2",href:"/",children:"Sign In"})]})]})]})})})})})})})})}}},function(e){e.O(0,[540,779,971,596,744],function(){return e(e.s=1981)}),_N_E=e.O()}]);