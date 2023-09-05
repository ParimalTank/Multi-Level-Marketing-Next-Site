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
                            <a className="sidebar-link" href="/package" aria-expanded="false">
                                <span>
                                    <i className="ti ti-layout-dashboard"></i>
                                </span>
                                <span className="hide-menu">Dashboard</span>
                            </a>
                        </li>
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">AUTH</span>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/login" aria-expanded="false">
                                <span>
                                    <i className="ti ti-login"></i>
                                </span>
                                <span className="hide-menu">Login</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/register" aria-expanded="false">
                                <span>
                                    <i className="ti ti-user-plus"></i>
                                </span>
                                <span className="hide-menu">Register</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/forgotpassword" aria-expanded="false">
                                <span>
                                    <i className="ti ti-aperture"></i>
                                </span>
                                <span className="hide-menu">Forgot Password</span>
                            </a>
                        </li>
                    </ul>
                    <div className="unlimited-access hide-menu bg-light-primary position-relative mb-7 mt-5 rounded">
                        <div className="d-flex">
                            <div className="unlimited-access-title me-3">
                                <h6 className="fw-semibold fs-4 mb-6 text-dark w-85">Upgrade to pro</h6>
                                <a href="/" target="_blank" className="btn btn-primary fs-2 fw-semibold lh-sm">Buy Pro</a>
                            </div>
                            <div className="unlimited-access-img">
                                <img src="../assets/images/backgrounds/rocket.png" alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    )
}
