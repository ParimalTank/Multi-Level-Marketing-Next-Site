"use client"
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Register = () => {

    const router = useRouter();

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmpassword: ""
    })

    // for password validation
    const lowercaseRegEx = /(?=.*[a-z])/;
    const uppercaseRegEx = /(?=.*[A-Z])/;
    const numericRegEx = /(?=.*[0-9])/;
    const lengthRegEx = /(?=.{8,})/;
    const specialRegEx = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required('Firstname is required'),
        lastname: Yup.string().required('Lastname is required'),
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
            .max(32, "Password cannot exceed more than 32 characters"),
        confirmpassword: Yup.string().required('Password is required').oneOf([Yup.ref("password")], "Passwords do not match")
    });

    const { register, setValue, handleSubmit, formState } = useForm({ mode: "onChange", resolver: yupResolver(validationSchema) });
    const { errors } = formState

    const onSubmit = async (data: any) => {

        await axios.post("http://localhost:3000/api/admin/signup", data).then((response) => {

            if (response.data.status === 410) {
                toast.error('Invalid Credential');
            } else if (response.data.status === 409) {
                toast.error('Referral code is not valid! Because user exist there package level limit. please upgrade package');
            } else {
                toast.success('Register Successfully');
                router.push(`/verify?id=${response.data.result._id}`);
            }

        }).catch((error) => {
            toast.error('User is Already Registered');
        })
    }

    return (
        <>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <div
                    className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                    <div className="d-flex align-items-center justify-content-center w-100">
                        <div className="row justify-content-center w-100">
                            <div className="col-md-8 col-lg-6 col-xxl-3">
                                <div className="card mb-0">
                                    <div className="card-body">
                                        <a href="/" className="text-nowrap logo-img text-center d-block py-3 w-100">
                                            <img src="../assets/images/logos/dark-logo.svg" width="180" alt="" />
                                        </a>
                                        <h4 className="text-center">Register</h4>

                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputtext1" className="form-label">First Name</label>
                                                <input type="text" className="form-control" id="exampleInputtext1" {...register('firstname')} defaultValue={formData.firstname} onChange={(e) => setValue("firstname", e.target.value, { shouldValidate: true })} aria-describedby="textHelp" />
                                                {errors.firstname && (
                                                    <div className="text-danger">
                                                        {errors.firstname.message}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputtext2" className="form-label">Last Name</label>
                                                <input type="text" className="form-control" id="exampleInputtext2" defaultValue={formData.lastname} onChange={(e) => setValue("lastname", e.target.value, { shouldValidate: true })} aria-describedby="textHelp" />
                                                {errors.lastname && (
                                                    <div className="text-danger">
                                                        {errors.lastname.message}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" defaultValue={formData.email} onChange={(e) => setValue("email", e.target.value, { shouldValidate: true })} aria-describedby="emailHelp" />
                                                {errors.email && (
                                                    <div className="text-danger">
                                                        {errors.email.message}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                <input type="password" className="form-control" {...register('password')} defaultValue={formData.password} onChange={(e) => setValue("password", e.target.value, { shouldValidate: true })} id="exampleInputPassword1" />
                                                {errors.password && (
                                                    <div className="text-danger">
                                                        {errors.password.message}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
                                                <input type="password" className="form-control" {...register('confirmpassword')} defaultValue={formData.confirmpassword} onChange={(e) => setValue("confirmpassword", e.target.value, { shouldValidate: true })} id="exampleInputPassword2" />
                                                {errors.confirmpassword && (
                                                    <div className="text-danger">
                                                        {errors.confirmpassword.message}
                                                    </div>
                                                )}
                                            </div>
                                            <button type='submit' disabled={!formState.isValid} className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">
                                                Sign Up
                                            </button>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <p className="fs-4 mb-0 fw-bold">Already have an Account?</p>
                                                <a className="text-primary fw-bold ms-2" href="/admin/login">Sign In</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register