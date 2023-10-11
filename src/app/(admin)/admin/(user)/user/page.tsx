"use client"
import { Navbar } from '@/components/Admin/Navbar'
import { Sidebar } from '@/components/Admin/Sidebar'
import React, { useEffect, useState } from 'react'
import Pagination from "react-js-pagination";
import axios from 'axios';
import { getCookie } from 'cookies-next'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const User = () => {

    const token = getCookie("admin_token");
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push("/admin/login");
        }
    }, [token])

    const [user, setUser] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);

    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const getUserData = async () => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_API_ENDPOINT}/user`).then((res) => {
            setUser(res.data.result);
            setLoading(false);
        }).catch((error) => {
            console.log("error: ", error);
        })
    }

    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };

    const onSwitchAction = async (status: any, id: any) => {

        if (confirm(`are you sure you want to user ${status === "true" ? "InActive" : "Active"}`) == true) {
            await axios.post("http://localhost:3000/api/admin/user", { id, status }).then((res) => {
                toast.success("User Status Updated Successfully");
                window.location.reload();
            }).catch(err => {
                toast.error("User Status Change Failed");
                console.log("err: ", err);
            })
        }
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = user?.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(() => {
        getUserData();
    }, [])

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">

            <Sidebar />
            {/* This is Used For Sidebar */}
            <div className="body-wrapper">
                <Navbar />
                <div className="container-fluid">
                    <div className="row">
                        <h3 style={{ marginBottom: "25px" }}>List of User :</h3>

                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <>

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope='col'>#</th>
                                            <th scope='col'>First Name</th>
                                            <th scope='col'>Last Name</th>
                                            <th scope='col'>Email</th>
                                            <th scope='col'>Status</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {currentPosts && currentPosts.map((admin: any, index: number) => (
                                            <tr key={index}>
                                                <th scope='row'>{index + 1}</th>
                                                <td>{admin?.firstname}</td>
                                                <td>{admin?.lastname}</td>
                                                <td>{admin?.email}</td>
                                                <td>{admin?.isActive === "true" ? "Active" : "InActive"}</td>
                                                <td><div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={e => onSwitchAction(admin.isActive, admin._id)} checked={admin.isActive === "true" ? true : false} />
                                                    {/* <label className="form-check-label" htmlFor="flexSwitchCheckChecked"></label> */}
                                                </div></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                        <div className='d-flex justify-content-center' style={{ marginTop: "25px" }} >
                            <Pagination
                                activePage={user}
                                itemsCountPerPage={postsPerPage}
                                totalItemsCount={user?.length}
                                pageRangeDisplayed={user?.length / postsPerPage}
                                onChange={handlePageChange}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default User