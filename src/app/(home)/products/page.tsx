"use client"
import Footer from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from "axios"

export default function Home() {

  const [products, setProducts] = useState();

  const Data = async () => {
    await axios.get("https://dummyjson.com/products")
      .then((result) => {
        setProducts(result.data.products);
      }).catch(error => {
        console.log("Error While Getting the Data");
      })
  }

  useEffect(() => {
    Data()
  }, [])

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
              products && products.map((res: any) => {
                return (
                  <div className="col-sm-6 col-xl-3">
                    <div className="card overflow-hidden rounded-2">
                      <div className="position-relative">
                        <a href={`/products/${res.id}`}><img src={res?.thumbnail} className="card-img-top card-image-custome rounded-0" style={{ height: "30vh" }} alt="..." /></a>
                        <a href="" className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i className="ti ti-basket fs-4"></i></a>
                      </div>
                      <div className="card-body pt-3 p-4">
                        <h6 className="fw-semibold fs-4" style={{ textOverflow: "ellipsis" }} >{res?.title.length > 20 ? res?.title.slice(0, 20) + "..." : res?.title}</h6>
                        <div className="d-flex align-items-center justify-content-between">
                          <h6 className="fw-semibold fs-4 mb-0">${res?.price} <span className="ms-2 fw-normal text-muted fs-3"><del>$900</del></span></h6>
                          <ul className="list-unstyled d-flex align-items-center mb-0">
                            <li><a className="me-1" href=""><i className="ti ti-star text-warning"></i></a></li>
                            <li><a className="me-1" href=""><i className="ti ti-star text-warning"></i></a></li>
                            <li><a className="me-1" href=""><i className="ti ti-star text-warning"></i></a></li>
                            <li><a className="me-1" href=""><i className="ti ti-star text-warning"></i></a></li>
                            <li><a className="" href=""><i className="ti ti-star text-warning"></i></a></li>
                          </ul>
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
                  <a href=""><img src="../assets/images/products/s5.jpg" className="card-img-top rounded-0" alt="..." /></a>
                  <a href="" className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i className="ti ti-basket fs-4"></i></a>                      </div>
                <div className="card-body pt-3 p-4">
                  <h6 className="fw-semibold fs-4">MacBook Air Pro</h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <h6 className="fw-semibold fs-4 mb-0">$650 <span className="ms-2 fw-normal text-muted fs-3"><del>$900</del></span></h6>
                    <ul className="list-unstyled d-flex align-items-center mb-0">
                      <li><a className="me-1" href=""><i className="ti ti-star text-warning"></i></a></li>
                      <li><a className="me-1" href=""><i className="ti ti-star text-warning"></i></a></li>
                      <li><a className="me-1" href=""><i className="ti ti-star text-warning"></i></a></li>
                      <li><a className="me-1" href=""><i className="ti ti-star text-warning"></i></a></li>
                      <li><a className="" href=""><i className="ti ti-star text-warning"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-xl-3">
              <div className="card overflow-hidden rounded-2">
                <div className="position-relative">
                  <a href=""><img src="../assets/images/products/s7.jpg" className="card-img-top rounded-0" alt="..." /></a>
                  <a href="" className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i className="ti ti-basket fs-4"></i></a>                      </div>
                <div className="card-body pt-3 p-4">
                  <h6 className="fw-semibold fs-4">Red Valvet Dress</h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <h6 className="fw-semibold fs-4 mb-0">$150 <span className="ms-2 fw-normal text-muted fs-3"><del>$200</del></span></h6>
                    <ul className="list-unstyled d-flex align-items-center mb-0">
                      <li><a className="me-1" href=""><i className="ti ti-star text-warning"></i></a></li>
                      <li><a className="me-1" href=""><i className="ti ti-star text-warning"></i></a></li>
                      <li><a className="me-1" href=""><i className="ti ti-star text-warning"></i></a></li>
                      <li><a className="me-1" href=""><i className="ti ti-star text-warning"></i></a></li>
                      <li><a className="" href=""><i className="ti ti-star text-warning"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-sm-6 col-xl-3">
              <div className="card overflow-hidden rounded-2">
                <div className="position-relative">
                  <a href=""><img src="../assets/images/products/s11.jpg" className="card-img-top rounded-0" alt="..." /></a>
                  <a href="" className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><i className="ti ti-basket fs-4"></i></a>                      </div>
                <div className="card-body pt-3 p-4">
                  <h6 className="fw-semibold fs-4">Cute Soft Teddybear</h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <h6 className="fw-semibold fs-4 mb-0">$285 <span className="ms-2 fw-normal text-muted fs-3"><del>$345</del></span></h6>
                    <ul className="list-unstyled d-flex align-items-center mb-0">
                      <li><a className="me-1" href=""><i className="ti ti-star text-warning"></i></a></li>
                      <li><a className="me-1" href=""><i className="ti ti-star text-warning"></i></a></li>
                      <li><a className="me-1" href=""><i className="ti ti-star text-warning"></i></a></li>
                      <li><a className="me-1" href=""><i className="ti ti-star text-warning"></i></a></li>
                      <li><a className="" href=""><i className="ti ti-star text-warning"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}


          </div>
          <Footer />
        </div>
      </div>


    </div>
  )
}
