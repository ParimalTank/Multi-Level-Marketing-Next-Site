import React from 'react'

export const Sidebar = () => {
    return (
        <aside className="left-sidebar">
            <div>
                <div className="brand-logo d-flex align-items-center justify-content-between">
                    <a href="./index.html" className="text-nowrap logo-img">
                        <img src="../assets/images/logos/dark-logo.svg" width="180" alt="" />
                    </a>
                    <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                        <i className="ti ti-x fs-8"></i>
                    </div>
                </div>

                <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                    <ul id="sidebarnav">
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">Home</span>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/admin/dashboard" aria-expanded="false">
                                <span>
                                    <i className="ti ti-layout-dashboard"></i>
                                </span>
                                <span className="hide-menu">Dashboard</span>
                            </a>
                        </li>
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">USER</span>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/admin/user" aria-expanded="false">
                                <span>
                                    <i className="ti ti-user"></i>
                                </span>
                                <span className="hide-menu">List of User</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/admin/purchasehistory" aria-expanded="false">
                                <span>
                                    <i className="ti ti-user"></i>
                                </span>
                                <span className="hide-menu">Package Purchase History</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/admin/packages" aria-expanded="false">
                                <span>
                                    <i className="ti ti-user"></i>
                                </span>
                                <span className="hide-menu">Add Package</span>
                            </a>
                        </li>
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">AUTH</span>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/admin/login" aria-expanded="false">
                                <span>
                                    <i className="ti ti-login"></i>
                                </span>
                                <span className="hide-menu">Login</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/admin/signup" aria-expanded="false">
                                <span>
                                    <i className="ti ti-user-plus"></i>
                                </span>
                                <span className="hide-menu">Register</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/admin/forgotpassword" aria-expanded="false">
                                <span>
                                    <i className="ti ti-aperture"></i>
                                </span>
                                <span className="hide-menu">Forgot Password</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}
