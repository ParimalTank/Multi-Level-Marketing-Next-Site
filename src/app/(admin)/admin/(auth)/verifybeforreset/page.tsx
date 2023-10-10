"use client"
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';
// import { useRouter } from 'next/router';
import { useRouter, useSearchParams } from 'next/navigation';

const VerificationResetPassword = () => {

    const router = useRouter();
    const [token, setToken] = useState();
    const searchParams = useSearchParams();

    useEffect(() => {
        const search: any = searchParams.get('token');
        setToken(search);
    }, [token])

    const [formData, setFormData] = useState({
        otp: ""
    })

    // form validation rules 
    const validationSchema = Yup.object().shape({
        otp: Yup.number().required("OTP is required"),
    });

    const { register, setValue, handleSubmit, formState } = useForm({ mode: "onChange", resolver: yupResolver(validationSchema) });
    const { errors } = formState

    const onSubmit = async (data: any) => {

        const userData = data;
        userData["token"] = token;

        await axios.post("http://localhost:3000/api/admin/verify", data).then((response) => {
            toast.success('Verification Successfully');
            router.push(`/admin/resetpassword?token=${token}`);
        }).catch((error) => {
            toast.error('Verification Failed, Invalid OTP');
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
                                        <h5 className="text-center">Verification Mail send you to your Register Email! Please Verify</h5>

                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Enter OTP</label>
                                                {/* @ts-ignore */}
                                                <input type="text" className="form-control" id="exampleInputEmail1" placeholder='otp' defaultValue={formData.otp} onChange={(e) => setValue("otp", e.target.value, { shouldValidate: true })} aria-describedby="emailHelp" />
                                                {errors.otp && (
                                                    <div className="text-danger">
                                                        {errors.otp.message}
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

export default VerificationResetPassword