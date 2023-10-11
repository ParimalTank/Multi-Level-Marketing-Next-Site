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
        email: "",
        password: ""
    })

    const [upper, setUpper] = useState();
    const [lower, setLower] = useState();
    const [numeric, setNumeric] = useState();
    const [passLength, setPassLength] = useState();
    const [special, setSpecial] = useState();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid Email").required("Email is required"),
        password: Yup.string().required('Password is required')
            .test('uppercaselatter', 'Password must contain 1 uppercase latter', (value) => {
                const upper: any = /[A-Z]/.test(value);
                setUpper(upper);
                return /[A-Z]/.test(value);
            })
            .test('lowercaselatter', 'Password must contain 1 lowercase latter', (value) => {
                const lower: any = /(?=.*[a-z])/.test(value);
                setLower(lower);
                return /(?=.*[a-z])/.test(value);
            })
            .test('numeric', 'Password must contain 1 numeric', (value) => {
                const numeric: any = /(?=.*[0-9])/.test(value)
                setNumeric(numeric);
                return /(?=.*[0-9])/.test(value);
            })
            .test('special', 'Password must contain 1 numeric', (value) => {
                const special: any = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);
                setSpecial(special);
                return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);
            })
            .test('special', 'Password length must between max 32 , min 8', (value) => {
                const passlength: any = /(?=.{8,32})/.test(value);
                setPassLength(passlength);
                return /(?=.{8,32})/.test(value);
            })
    });

    const { register, setValue, handleSubmit, formState } = useForm({ mode: "onChange", resolver: yupResolver(validationSchema) });
    const { errors } = formState

    const onSubmit = async (data: any) => {

        await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_API_ENDPOINT}/login`, data).then((response) => {

            if (response.data.status === 410) {
                toast.error('Admin has mark deactivate to your account! please contact admin');
            } else if (response.data.status === 409) {
                toast.error('Invalid Credentials');
            }
            else if (response.data.status === 500) {
                toast.error('Something Want Wrong');
            } else {
                toast.success('Login Successfully');
                router.push("/admin/dashboard");
            }
        }).catch((error) => {
            console.log("error: ", error);
        })
    }

    return (
        <div>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <div
                    className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                    <div className="d-flex align-items-center justify-content-center w-100">
                        <div className="row justify-content-center w-100">
                            <div className="col-md-8 col-lg-6 col-xxl-3">
                                <div className="card mb-0">
                                    <div className="card-body">
                                        <a href="./index.html" className="text-nowrap logo-img text-center d-block py-3 w-100">
                                            <img src="../assets/images/logos/dark-logo.svg" width="180" alt="" />
                                        </a>
                                        <h4 className="text-center">Login</h4>

                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" {...register('email')} defaultValue={formData.email} onChange={(e) => setValue("email", e.target.value, { shouldValidate: true })} aria-describedby="emailHelp" />
                                                {errors.email && (
                                                    <div className="text-danger">
                                                        {errors.email.message}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="exampleInputPassword2" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword2" {...register('password')} defaultValue={formData.password} onChange={(e) => setValue("password", e.target.value, { shouldValidate: true })} />
                                                {errors.password && (
                                                    <>
                                                        <div className={(upper && lower && passLength && special && numeric) ? "d-none" : ""}>
                                                            <div id="message" className='mt-3'>
                                                                <h6>Password must contain the following:</h6>
                                                                <p style={{ color: lower === true ? "#008000" : "#e0694f" }}><li>lowercase letter</li></p>
                                                                <p style={{ color: upper === true ? "#008000" : "#e0694f" }}><li>capital uppercase letter</li></p>
                                                                <p style={{ color: numeric === true ? "#008000" : "#e0694f" }}><li>number</li></p>
                                                                <p style={{ color: special === true ? "#008000" : "#e0694f" }}><li>Spacial Character</li></p>
                                                                <p style={{ color: passLength === true ? "#008000" : "#e0694f" }}><li>Minimum 8 characters</li></p>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}

                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mb-4">
                                                <div className="form-check">
                                                    <input className="form-check-input primary" type="checkbox" value="" id="flexCheckChecked" />
                                                    <label className="form-check-label text-dark" htmlFor="flexCheckChecked">
                                                        Remeber this Device
                                                    </label>
                                                </div>
                                                <a className="text-primary fw-bold" href="/admin/forgotpassword">Forgot Password ?</a>
                                            </div>
                                            <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2" disabled={!formState.isValid}>Sign In</button>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <p className="fs-4 mb-0 fw-bold">New to MLM?</p>
                                                <a className="text-primary fw-bold ms-2" href="/admin/signup">Create an account</a>
                                            </div>
                                            <div className='text-center' style={{ marginTop: "25px" }}>
                                                <a className="text-primary fw-bold ms-2" href='/'>Are you a user? Click Here</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login