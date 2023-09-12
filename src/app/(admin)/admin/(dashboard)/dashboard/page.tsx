import { Navbar } from '@/components/Admin/Navbar'
import { Sidebar } from '@/components/Admin/Sidebar'

import React from 'react'

const Dashboard = () => {
    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">

            <Sidebar />
            {/* This is Used For Sidebar */}
            <div className="body-wrapper">
                <Navbar />
                <div className="container-fluid">
                    <div className="row">
                        <div className="row row-cols-1 row-cols-md-3 g-4">

                            <div className="col">
                                <div className="card h-100">
                                    <div className="card-body" style={{ paddingTop: "14px", paddingBottom: "11px" }}>
                                        <div className='d-flex align-items-center'>
                                            <img src="https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg" className="card-img-top" style={{ width: "55px", height: "50px" }} alt="users" />
                                            <h3 style={{ paddingLeft: "20px" }}>Total Active User</h3>
                                        </div>
                                        <h3 className='text-center'>50</h3>
                                        <div className='text-end'>
                                            <h5><a href="#" className='justify-content-end'>View</a></h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="card h-100">
                                    <div className="card-body" style={{ paddingTop: "14px", paddingBottom: "11px" }}>
                                        <div className='d-flex align-items-center'>
                                            <img src="https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg" className="card-img-top" style={{ width: "55px", height: "50px" }} alt="users" />
                                            <h3 style={{ paddingLeft: "20px" }}>InActive User</h3>
                                        </div>
                                        <h3 className='text-center text-danger'>50</h3>
                                        <div className='text-end'>
                                            <h5><a href="#" className='justify-content-end'>View</a></h5>
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

export default Dashboard