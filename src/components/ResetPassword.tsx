"use client"
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';


export const ResetPassword = ({ useremail }: { useremail: any }) => {
    console.log("useremail: ", useremail);

    const router = useRouter();
    const [email, setEmail] = useState();
    const searchParams = useSearchParams();

    useEffect(() => {
        const search: any = searchParams.get('email');
        setEmail(search);
    }, [email])

    const [formData, setFormData] = useState({
        password: "",
        confirmpassword: "",
    })

    const [upper, setUpper] = useState();
    const [lower, setLower] = useState();
    const [numeric, setNumeric] = useState();
    const [passLength, setPassLength] = useState();
    const [special, setSpecial] = useState();

    // form validation rules 
    const validationSchema = Yup.object().shape({
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
    )
}