"use client"
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'

const Profile = () => {

    const router = useRouter();

    const token = getCookie("admin_token");

    useEffect(() => {
        if (!token) {
            router.push("/admin/login");
        }
    }, [token])

    const [user, setUser] = useState();

    const [isSwitchOn, setIsSwitchOn] = useState(false);

    function parseJwt(token: any) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    const onSwitchAction = async () => {
        const token = getCookie("admin_token");
        const userId = parseJwt(token).id;

        if (!isSwitchOn) {

            await axios.post("http://localhost:3000/api/sendmail", { userId }).then((res) => {
                console.log("message send")
            }).catch((error) => {
                console.log("error: ", error);
            })
            router.push(`/twofactorauth?id=${userId}`);
        }
        setIsSwitchOn(!isSwitchOn);
    };

    const userData = async () => {
        const token = getCookie("admin_token");
        console.log("token: ", token);

        await axios.post("http://localhost:3000/api/admin/checkvaliduser", { token }).then((res) => {
            console.log("res: ", res);
            setUser(res.data.result);
            console.log("res.data.result: ", res.data);
        }).catch(error => {
            console.log("error: ", error);
        })
    }

    useEffect(() => {
        userData();
    }, [])

    return (
        <div>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">

                <Sidebar />
                {/* This is Used For Sidebar */}
                <div className="body-wrapper">
                    <Navbar />
                    <div className="container-fluid">

                        <div className='row'>

                            <div className='text-end'>
                                <div className="form-check form-switch d-flex justify-content-end flex-column align-items-end">
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">2 Factor Authentication</label>
                                    <input className="form-check-input" type="checkbox" role="switch" onChange={onSwitchAction} checked={isSwitchOn} id="flexSwitchCheckDefault" />
                                </div>
                            </div>

                            <div className="page-content page-container" id="page-content">

                                <div className="padding">
                                    <div className="row container d-flex justify-content-center">
                                        <div className="col-xl-6 col-md-12">
                                            <div className="card user-card-full">
                                                <div className="row m-l-0 m-r-0">
                                                    <div className="col-sm-4 bg-c-lite-green user-profile">
                                                        <div className="card-block text-center text-white">
                                                            <div className="m-b-25">
                                                                <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile-Image" />
                                                            </div>
                                                            <h6 className="f-w-600">{user?.firstname} {user?.lastname}</h6>
                                                            <p>Web Designer</p>
                                                            <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <div className="card-block">
                                                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600 mt-2">Information</h6>
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <h6 className="m-b-10 f-w-600">Email</h6>
                                                                    <p className="text-muted f-w-400">{user?.email}</p>
                                                                </div>
                                                            </div>

                                                            <div className="row mb-2">
                                                                <div className="col-sm-6">
                                                                    <p className="m-b-10 f-w-600 text-dark fw-bold">Forgot Password</p>
                                                                    <a href='/admin/forgotpassword' className="text-muted f-w-400">Click Here</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default Profile


// export async function getServerSideProps(){

// }