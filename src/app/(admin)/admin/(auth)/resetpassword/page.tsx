"use client"
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

const ResetPassword = () => {

    const router = useRouter();
    const [email, setEmail] = useState();
    const searchParams = useSearchParams();

    useEffect(() => {
        const search = searchParams.get('email');
        setEmail(search);
        console.log("search: ", search);
    }, [email])

    const [formData, setFormData] = useState({
        password: "",
        confirmpassword: "",
    })

    // for password validation
    const lowercaseRegEx = /(?=.*[a-z])/;
    const uppercaseRegEx = /(?=.*[A-Z])/;
    const numericRegEx = /(?=.*[0-9])/;
    const lengthRegEx = /(?=.{8,})/;
    const specialRegEx = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

    // form validation rules 
    const validationSchema = Yup.object().shape({
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
        confirmpassword: Yup.string().required('Password is required').oneOf([Yup.ref("password")], "Passwords does not match"),
    });

    const { register, setValue, handleSubmit, formState } = useForm({ mode: "onChange", resolver: yupResolver(validationSchema) });
    const { errors } = formState

    const onSubmit = async (data: any) => {
        console.log("data: ", data);

        const userData = data;
        userData["email"] = email;

        await axios.post("http://localhost:3000/api/resetpassword", userData).then((response) => {
            console.log("response: ", response);
            toast.success('Password Reset Successfully');
            router.push("/");
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
                                        <h3 className="text-center">Reset Password</h3>

                                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                                Reset Password
                                            </button>
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

export default ResetPassword