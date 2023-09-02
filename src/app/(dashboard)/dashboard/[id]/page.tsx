"use client"
import Footer from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import axios from "axios"
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Slider from "react-slick";
import { InfinitySpin } from 'react-loader-spinner';

export default function PackageDetails() {

    const [productdetails, setProductDetails] = useState();

    const Params = useParams();
    const ProductId = Params.id;

    const Data = async (pId: any) => {
        await axios.get(`https://dummyjson.com/products/${pId}`)
            .then((result) => {
                console.log("This is product details: ", result);
                setProductDetails(result.data);
            }).catch(error => {
                console.log("Error While Getting the Data");
            })
    }

    useEffect(() => {
        Data(ProductId);
    }, [])

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const ImageUrl = productdetails && productdetails?.images;

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">

            <Sidebar />
            {/* This is Used For Sidebar */}
            <div className="body-wrapper">
                <Navbar />
                <div className="container-fluid">

                    <div className='row'>

                        <div className='col' style={{ width: "500px" }}>
                            <Slider {...settings}>
                                {
                                    ImageUrl && ImageUrl ? ImageUrl?.map((res) => {
                                        return (
                                            <div>
                                                <img src={res} />
                                            </div>
                                        )
                                    }) :
                                        <>
                                            <InfinitySpin
                                                width='200'
                                                color="#0000FF"
                                            />
                                        </>
                                }
                            </Slider>
                        </div>

                        <div className='col' style={{ marginLeft: "100px" }} >
                            <h3>Product Name : {productdetails?.title}</h3>
                            <h5>Product Description : {productdetails?.description}</h5>
                            <h5>Category : {productdetails?.category}</h5>
                            <h5>Discount : {productdetails?.discountPercentage}%</h5>
                            <h5>Rating : {productdetails?.rating} / 5</h5>
                            <h5>Stock : {productdetails?.stock}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
