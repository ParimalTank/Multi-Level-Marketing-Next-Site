"use client"
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react'
// import Tree from 'react-d3-tree'
const Tree = dynamic(() => import('react-d3-tree'), {
    loading: () => <p>Loading...</p>,
    ssr: false
})

const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
    const [translate, setTranslate] = useState(defaultTranslate);
    const containerRef: any = useCallback((containerElem: any) => {
        if (containerElem !== null) {
            const { width, height } = containerElem.getBoundingClientRect();
            setTranslate({ x: width / 4, y: height / 4 });
        }
    }, []);
    return [translate, containerRef];
};

const usertree = () => {

    const router = useRouter()
    const [translate, containerRef] = useCenteredTree();
    const [users, setUsers] = useState<any[]>();
    console.log("users: ", users);

    const token = getCookie("token");

    const getUserData = async () => {
        await axios.post("http://localhost:3000/api/usertree", { token }).then((res) => {
            setUsers(res.data.username);
            console.log("Packages from the data", res);
        }).catch(err => {
            console.log("err: ", err);
        })
    }

    const orgChart = {
        name: 'Me',
        children: users?.map((res) => {
            return { name: res.firstname + "\n" + res.lastname }
        })
    };


    useEffect(() => {
        if (!token) {
            router.push("/");
        } else {
            getUserData();
        }
    }, [token])


    return (
        <>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">

                <Sidebar />
                {/* This is Used For Sidebar */}
                <div className="body-wrapper">
                    <Navbar />
                    <div className="container-fluid">
                        <div className='row'>
                            <div id="treeWrapper" ref={containerRef} className='d-flex justify-content-center align-item-center'
                                style={{
                                    width: "100%",
                                    height: "100vh"
                                }}>
                                <Tree data={orgChart} nodeSize={{ x: 180, y: 180 }} orientation="vertical" draggable transitionDuration={500} translate={translate} zoomable={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default usertree