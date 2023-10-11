"use client"
import { Navbar } from '@/components/Admin/Navbar'
import { Sidebar } from '@/components/Admin/Sidebar'
import React, { useEffect, useState } from 'react'
import Pagination from "react-js-pagination";
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const PurchaseHistory = () => {

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

    const getUserData = async () => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_API_ENDPOINT}/packagehistory`).then((res) => {
            setUser(res.data.result);
            setLoading(false);
        }).catch((error) => {
            console.log("error: ", error);
        })
    }

    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };

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
                    <div className='row'>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope='col'>#</th>
                                            <th scope='col'>Package Name</th>
                                            <th scope='col'>Price</th>
                                            <th scope='col'>Level</th>
                                            <th scope='col'>ReferralCode From</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {currentPosts && currentPosts.map((admin: any, index: any) => (
                                            <tr key={index}>
                                                <th scope='row'>{index + 1}</th>
                                                <td>{admin.name}</td>
                                                <td>${admin.packagePrice}</td>
                                                <td>{admin.levels}</td>
                                                <td>{admin.referralcode}</td>
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

export default PurchaseHistory