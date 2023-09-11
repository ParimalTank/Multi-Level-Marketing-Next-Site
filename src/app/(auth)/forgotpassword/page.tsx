"use client"
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ForgotPassword = () => {

    const router = useRouter();

    const [formData, setFormData] = useState({
        email: ""
    })

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid Email").required("Email is required"),
    });

    const { register, setValue, handleSubmit, formState } = useForm({ mode: "onChange", resolver: yupResolver(validationSchema) });
    const { errors } = formState

    const onSubmit = async (data: any) => {
        router.push("/verify");

        await axios.post("http://localhost:3000/api/forgotpassword", data).then((response) => {
            router.push(`/verifybeforreset?email=${response.data.email}`);
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
                                        <h4 className="text-center">Forgot Password</h4>

                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" placeholder='Enter your Register Email' defaultValue={formData.email} onChange={(e) => setValue("email", e.target.value, { shouldValidate: true })} aria-describedby="emailHelp" />
                                                {errors.email && (
                                                    <div className="text-danger">
                                                        {errors.email.message}
                                                    </div>
                                                )}
                                            </div>
                                            <button type='submit' disabled={!formState.isValid} className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">
                                                Submit
                                            </button>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <p className="fs-4 mb-0 fw-bold">Already have an Account?</p>
                                                <a className="text-primary fw-bold ms-2" href="/">Sign In</a>
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

export default ForgotPassword