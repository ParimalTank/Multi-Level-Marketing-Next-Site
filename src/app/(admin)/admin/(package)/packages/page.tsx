"use client"
import AddModal from '@/components/Admin/AddModal'
import EditModal from '@/components/Admin/EditModal'
import { Navbar } from '@/components/Admin/Navbar'
import { Sidebar } from '@/components/Admin/Sidebar'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const packages = () => {

    const [loading, setLoading] = useState(true);
    const [packages, setPackages] = useState();

    const getUserData = async () => {
        setLoading(true);
        await axios.get("http://localhost:3000/api/admin/package").then((res) => {
            console.log("result: ", res.data);
            setPackages(res.data.result);
            setLoading(false);
        }).catch((error) => {
            console.log("error: ", error);
        })
    }

    const handleDelete = async (id: any) => {
        console.log("id: ", id);

        if (confirm("are you sure you want to delete this package") == true) {
            await axios.delete(`http://localhost:3000/api/admin/package?id=${id}`).then((res) => {
                toast.success("Package Delete Successfully");
                window.location.reload();
            }).catch((error) => {
                console.log("error: ", error);
            })
        }
    }

    const token = getCookie("admin_token");
    const router = useRouter();
    useEffect(() => {
        if (!token) {
            router.push("/admin/login");
        }
        getUserData()
    }, [token])

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">

            <Sidebar />
            {/* This is Used For Sidebar */}
            <div className="body-wrapper">
                <Navbar />
                <div className="container-fluid">
                    <div className='d-flex justify-content-end' style={{ marginBottom: "25px" }}>
                        <AddModal />
                    </div>

                    <div className='row'>
                        {
                            packages?.map((response: any, index: any) => {

                                return (
                                    <div className="col-sm-6 col-xl-3" key={index}>
                                        <div className="card overflow-hidden rounded-2">
                                            <div className="position-relative">
                                                <a href={`/package/${response._id}`}><img src={response.imageurl} className="card-img-top rounded-0" alt="..." /></a>
                                                <a href="" className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i className="ti ti-basket fs-4"></i></a></div>
                                            <div className="card-body pt-3 p-4">
                                                <h6 className="fw-semibold fs-4">{response.name}</h6>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h6 className="fw-semibold fs-4 mb-0">${response.price}</h6>
                                                </div>
                                                <div>
                                                    <span>{response.description.length > 80 ? response?.description.slice(0, 80) + "..." : response.description}</span>
                                                </div>
                                                <div className='d-flex justify-content-between' style={{ marginTop: "25px" }}>
                                                    <EditModal packages={response} />
                                                    <button className='btn btn-danger' onClick={() => handleDelete(response._id)}>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default packages