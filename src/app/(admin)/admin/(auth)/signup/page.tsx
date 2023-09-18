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

    const [upper, setUpper] = useState();
    const [lower, setLower] = useState();
    const [numeric, setNumeric] = useState();
    const [passLength, setPassLength] = useState();
    const [special, setSpecial] = useState();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required('Firstname is required'),
        lastname: Yup.string().required('Lastname is required'),
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
            }),
        confirmpassword: Yup.string().required('Password is required').oneOf([Yup.ref("password")], "Passwords do not match")
    });

    const { register, setValue, handleSubmit, formState } = useForm({ mode: "onChange", resolver: yupResolver(validationSchema) });
    const { errors } = formState

    const onSubmit = async (data: any) => {

        await axios.post("http://localhost:3000/api/admin/signup", data).then((response) => {

            if (response.data.status === 410) {
                toast.error('Invalid Credential');
            } else if (response.data.status === 409) {
                toast.error('User is Already Exist');
            } else {
                toast.success('Register Successfully');
                router.push(`/admin/verify?id=${response.data.result._id}`);
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
                                                    <>
                                                        <div className={(upper && lower && passLength && special && numeric) ? "d-none" : ""}>
                                                            <div id="message" className='mt-3'>
                                                                <h6>Password must contain the following:</h6>
                                                                <p style={{ color: lower === true ? "#008000" : "#e0694f" }}><li>A lowercase letter</li></p>
                                                                <p style={{ color: upper === true ? "#008000" : "#e0694f" }}><li>A capital uppercase letter</li></p>
                                                                <p style={{ color: numeric === true ? "#008000" : "#e0694f" }}><li>A number</li></p>
                                                                <p style={{ color: special === true ? "#008000" : "#e0694f" }}><li>A Spacial Character</li></p>
                                                                <p style={{ color: passLength === true ? "#008000" : "#e0694f" }}><li>Minimum 8 characters</li></p>
                                                            </div>
                                                        </div>
                                                    </>
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