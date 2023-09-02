import Footer from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import withAuth from '@/utils/withAuth';

function Dashboard() {

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">

            <Sidebar />
            {/* This is Used For Sidebar */}
            <div className="body-wrapper">
                <Navbar />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 col-xl-3">
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
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default withAuth(Dashboard);