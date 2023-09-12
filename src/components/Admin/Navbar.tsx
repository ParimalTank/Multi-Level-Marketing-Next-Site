"use client"
import { deleteCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import React from 'react'

export const Navbar = () => {

    const handleClick = async () => {
        await deleteCookie("token");
        window.location.reload();
    }

    return (
        <header className="app-header">
            <nav className="navbar navbar-expand-lg navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item d-block d-xl-none">
                        <a className="nav-link sidebartoggler nav-icon-hover" id="headerCollapse" href="">
                            <i className="ti ti-menu-2"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link nav-icon-hover" href="">
                            <i className="ti ti-bell-ringing"></i>
                            <div className="notification bg-primary rounded-circle"></div>
                        </a>
                    </li>
                </ul>
                <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
                    <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                        <a href="/" target="_blank" className="btn btn-primary">Language</a>
                        <li className="nav-item dropdown">
                            <a className="nav-link nav-icon-hover" href="" id="drop2" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <img src="../assets/images/profile/user-1.jpg" alt="" width="35" height="35" className="rounded-circle" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                                <div className="message-body">
                                    <a href="/admin/profile" className="d-flex align-items-center gap-2 dropdown-item">
                                        <i className="ti ti-user fs-6"></i>
                                        <p className="mb-0 fs-3">My Profile</p>
                                    </a>
                                    <button onClick={handleClick} className='btn btn-outline-primary mx-4 border-0 bg-white text-bg-light d-block'>Logout</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}