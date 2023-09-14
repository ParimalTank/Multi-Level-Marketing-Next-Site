"use client"
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import axios from "axios"
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import toast from 'react-hot-toast'

export default function PackageDetails() {

    const [productdetails, setProductDetails] = useState<any>();
    const router = useRouter();

    const token = getCookie("token");
    useEffect(() => {
        if (!token) {
            router.push("/");
        }
    }, [token])

    const Params = useParams();
    const id = Params.id;
    console.log("id: ", id);

    const Data = async () => {
        await axios.get(`http://localhost:3000/api/package/${id}`)
            .then((res) => {
                setProductDetails(res.data.result);
                console.log("res.data.result: ", res.data.result);
            }).catch(error => {
                console.log("Error While Getting the Data");
            })
    }

    useEffect(() => {
        Data(id);
    }, [])

    const handlePurchase = async () => {

        if (confirm("Please Conform Order!")) {

            const token = getCookie('token');

            await axios.post(`http://localhost:3000/api/package/${id}`).then((res) => {
                console.log("res: ", res);

                if (res.data.status === 409) {
                    toast.error("Balance is Not Sufficient");
                } else if (res.data.status === 500) {
                    toast.error("Something want wrong");
                }
                else {
                    toast.success("Purchased Successfully");
                    router.push("/package");
                }
            }).catch((error) => {
                console.log("res: ", error);
            })
        }
    }

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">

            <Sidebar />
            {/* This is Used For Sidebar */}
            <div className="body-wrapper">
                <Navbar />
                <div className="container-fluid">

                    <div className='row'>

                        <div className='col' style={{ width: "500px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <img src={productdetails?.imageurl} className="card-img-top rounded-0" style={{ width: "200px", height: "200px" }} alt="Package" />
                        </div>

                        <div className='col' style={{ marginLeft: "100px" }} >
                            <h4>Package Name : {productdetails?.name}</h4>
                            <span className='mt-3'>Package Description : {productdetails?.description}</span>
                            <h5 className='mt-3'>Price : ${productdetails?.price}</h5>
                            <button onClick={handlePurchase} style={{ padding: "10px", paddingLeft: "20px", paddingRight: "20px", color: "white", backgroundColor: "#0000EB" }}>Buy</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
