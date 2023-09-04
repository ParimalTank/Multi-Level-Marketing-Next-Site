import Footer from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import withAuth from '@/utils/withAuth';
import axios from 'axios';
import { useEffect, useState } from 'react';

async function Dashboard() {
    let data;
    const getData = async () => {
        await axios.get("http://localhost:3000/api/package").then((res) => {
            data = res.data.result;
        }).catch(error => {
            console.log("error: ", error);
        })
    }
    await getData();

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">

            <Sidebar />
            {/* This is Used For Sidebar */}
            <div className="body-wrapper">
                <Navbar />
                <div className="container-fluid">
                    <div className="row">

                        {
                            data?.map((response) => {

                                return (
                                    <div className="col-sm-6 col-xl-3">
                                        <div className="card overflow-hidden rounded-2">
                                            <div className="position-relative">
                                                <a href={`/package/${response._id}`}><img src={response.imageurl} className="card-img-top rounded-0" alt="..." /></a>
                                                <a href="" className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i className="ti ti-basket fs-4"></i></a>                      </div>
                                            <div className="card-body pt-3 p-4">
                                                <h6 className="fw-semibold fs-4">{response.name}</h6>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h6 className="fw-semibold fs-4 mb-0">${response.price}</h6>
                                                </div>
                                                <div>
                                                    <span>{response.description.length > 80 ? response?.description.slice(0, 80) + "..." : response.description}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                        {/* <div className="col-sm-6 col-xl-3">
                            <div className="card overflow-hidden rounded-2">
                                <div className="position-relative">
                                    <a href={`/dashboard`}><img src="../assets/chat.gif" className="card-img-top rounded-0" alt="..." /></a>
                                    <a href="" className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i className="ti ti-basket fs-4"></i></a>                      </div>
                                <div className="card-body pt-3 p-4">
                                    <h6 className="fw-semibold fs-4">Ethereum</h6>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h6 className="fw-semibold fs-4 mb-0">$50</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-xl-3">
                            <div className="card overflow-hidden rounded-2">
                                <div className="position-relative">
                                    <a href=""><img src="../assets/bitcoin.gif" className="card-img-top rounded-0" alt="..." /></a>
                                    <a href="" className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i className="ti ti-basket fs-4"></i></a>                      </div>
                                <div className="card-body pt-3 p-4">
                                    <h6 className="fw-semibold fs-4">Bitcoin</h6>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h6 className="fw-semibold fs-4 mb-0">$100</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-xl-3">
                            <div className="card overflow-hidden rounded-2">
                                <div className="position-relative">
                                    <a href=""><img src="../assets/dogcoin.gif" className="card-img-top rounded-0" alt="..." /></a>
                                    <a href="" className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i className="ti ti-basket fs-4"></i></a>                      </div>
                                <div className="card-body pt-3 p-4">
                                    <h6 className="fw-semibold fs-4">Dogcoin</h6>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h6 className="fw-semibold fs-4 mb-0">$500</h6>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default withAuth(Dashboard);