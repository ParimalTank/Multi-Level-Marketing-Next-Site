import Footer from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import withAuth from '@/utils/withAuth';
import axios from 'axios';
import { cookies } from 'next/headers';

async function Dashboard() {
    let data: any;
    const getPackageData = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/package`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            data = res.data.result;
        }).catch(error => {
            console.log("error: ", error);
        })
    }
    await getPackageData();

    let userData: any;
    let packageDetails: any;
    const getUserData = async () => {
        const token = cookies().get("token")?.value
        await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user`, { token }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            userData = res.data.result;
            packageDetails = res.data.package;
        }).catch(error => {
            console.log("error: ", error);
        })
    }
    await getUserData();

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">

            <Sidebar />
            {/* This is Used For Sidebar */}
            <div className="body-wrapper">
                <Navbar />
                <div className="container-fluid">
                    <h3 style={{ textAlign: "end" }}>Current Balance : {userData.userWallet}</h3>
                    <div className="row">
                        {
                            data.map((response: any) => {

                                return (
                                    <div className="col-sm-6 col-xl-3">
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
                                                    <span>{response.description.length > 80 ? response?.description?.slice(0, 80) + "..." : response.description}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                        <h3>Package History</h3>
                        <div className='table-responsive'>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Purchase Date & Time</th>
                                        {/* <th scope="col">Users Added In this Package</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        packageDetails.map((result: any, index: number) => {

                                            const date = new Date(result.createdAt);
                                            const time = new Date(date).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{result.name}</td>
                                                    <td>${result.packagePrice}</td>
                                                    <td>{time}</td>
                                                    {/* <td>{result.numberofUsers.length > 0 ? result.numberofUsers.map((res) => {

                                                        return (
                                                            <div>{res}</div>
                                                        )
                                                    })
                                                        :
                                                        "-"
                                                    }</td> */}
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withAuth(Dashboard);