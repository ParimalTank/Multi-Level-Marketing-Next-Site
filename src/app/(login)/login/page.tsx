"use client"
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login = () => {


    const router = useRouter();

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmpassword: "",
        referralcode: ""
    })

    // for password validation
    const lowercaseRegEx = /(?=.*[a-z])/;
    const uppercaseRegEx = /(?=.*[A-Z])/;
    const numericRegEx = /(?=.*[0-9])/;
    const lengthRegEx = /(?=.{8,})/;
    const specialRegEx = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid Email").required("Email is required"),
        password: Yup.string().required('Password is required')
            .matches(
                lowercaseRegEx,
                "Must contains one lowercase alphabetical character!"
            )
            .matches(
                uppercaseRegEx,
                "Must contains one uppercase alphabetical character"
            )
            .matches(numericRegEx, "Must contains one Numeric character!")
            .matches(specialRegEx, "Must contains one Special Character")
            .min(8, "Password length should be at least 8 characters")
            .max(32, "Password cannot exceed more than 32 characters")
    });

    const { register, setValue, handleSubmit, formState } = useForm({ mode: "onChange", resolver: yupResolver(validationSchema) });
    const { errors } = formState

    const onSubmit = async (data: any) => {
        console.log("Data submitted");
        console.log("data: ", data);

        // await axios.post("http://localhost:3000/api/register", data).then((response) => {
        //     console.log("response: ", response);
        //     toast.success('Register Successfully');
        // }).catch((error) => {
        //     toast.error('User is Already Registered');
        // })
    }

    console.log("This is Login");

    return (
        // <div>
        //     <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
        //         data-sidebar-position="fixed" data-header-position="fixed">
        //         <div
        //             className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        //             <div className="d-flex align-items-center justify-content-center w-100">
        //                 <div className="row justify-content-center w-100">
        //                     <div className="col-md-8 col-lg-6 col-xxl-3">
        //                         <div className="card mb-0">
        //                             <div className="card-body">
        //                                 <a href="./index.html" className="text-nowrap logo-img text-center d-block py-3 w-100">
        //                                     <img src="../assets/images/logos/dark-logo.svg" width="180" alt="" />
        //                                 </a>
        //                                 <p className="text-center">Login</p>

        //                                 <form>
        //                                     <div className="mb-3">
        //                                         <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
        //                                         <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        //                                     </div>
        //                                     <div className="mb-4">
        //                                         <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        //                                         <input type="password" className="form-control" id="exampleInputPassword1" />
        //                                     </div>
        //                                     <div className="d-flex align-items-center justify-content-between mb-4">
        //                                         <div className="form-check">
        //                                             <input className="form-check-input primary" type="checkbox" value="" id="flexCheckChecked" />
        //                                             <label className="form-check-label text-dark" htmlFor="flexCheckChecked">
        //                                                 Remeber this Device
        //                                             </label>
        //                                         </div>
        //                                         <a className="text-primary fw-bold" href="/">Forgot Password ?</a>
        //                                     </div>
        //                                     <a href="/" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Sign In</a>
        //                                     <div className="d-flex align-items-center justify-content-center">
        //                                         <p className="fs-4 mb-0 fw-bold">New to Modernize?</p>
        //                                         <a className="text-primary fw-bold ms-2" href="/register">Create an account</a>
        //                                     </div>
        //                                 </form>


        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <>
            This is Loign pAGE
        </>
    )
}

export default Login