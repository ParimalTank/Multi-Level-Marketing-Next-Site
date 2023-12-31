"use client"
import React, { ChangeEvent, useState } from 'react'
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const AddModal = () => {

    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        levels: "",
        imageurl: "",
        description: ""
    })
    const [file, setFile] = useState<File | null>(null);
    const [filename, setFilename] = useState('');
    const [uploadStatus, setUploadStatus] = useState(false);
    const [imageURL, setImageURL] = useState("");
    const [submitfile, setSubmitFile] = useState(false);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Package Name is required"),
        price: Yup.string().required("Price is required"),
        levels: Yup.string().required("Levels is required"),
        description: Yup.string().required("Description is required"),
    });

    const { register, setValue, handleSubmit, formState } = useForm({ mode: "onChange", resolver: yupResolver(validationSchema) });
    const { errors } = formState


    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
            setFilename(event.target.files[0].name);
        }
    };

    const onSubmit = async (data: any) => {
        setSubmitFile(true);
        setUploadStatus(true);

        console.log("data: ", data);
        console.log(file);
        if (file) {

            const formData = new FormData();

            formData.append('file', file);
            formData.append('upload_preset', 'my-uploads');

            try {

                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dzus1xwmw/image/upload",
                    formData, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                }
                );

                setImageURL(response.data.secure_url);
                setUploadStatus(true);
                setSubmitFile(false);

                const packageData = data;
                packageData["imageurl"] = response.data.secure_url;

                await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_API_ENDPOINT}/package`, packageData, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                }).then((result) => {

                    toast.success("Package Added Successfully");
                    window.location.reload();
                }).catch((error) => {
                    console.log("error: ", error);
                })

            } catch (error) {
                console.error(error);
            }
            setSubmitFile(false);
        }
    }

    return (
        <>
            <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Add Package</button>

            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">ADD Package</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <label htmlFor="package-name" className="col-form-label">Package Name:</label>
                                    <input type="text" className="form-control" id="package-name" {...register('name')} onChange={(e) => setValue("name", e.target.value, { shouldValidate: true })} />
                                    {errors.name && (
                                        <div className="text-danger">
                                            {errors.name.message}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className="col-form-label">Upload Image</label>
                                    <input type="file" className="form-control" id="image" onChange={handleFileChange} />
                                    {submitfile === false && file ? " " : <div className="text-danger">"file is Require"</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="col-form-label">Price:</label>
                                    <input type="number" className="form-control" id="price" {...register('price')} onChange={(e) => setValue("price", e.target.value, { shouldValidate: true })} />
                                    {errors.price && (
                                        <div className="text-danger">
                                            {errors.price.message}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="level" className="col-form-label">Level:</label>
                                    <input type="number" className="form-control" id="level" {...register('levels')} onChange={(e) => setValue("levels", e.target.value, { shouldValidate: true })} />
                                    {errors.levels && (
                                        <div className="text-danger">
                                            {errors.levels.message}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="col-form-label">Description:</label>
                                    <textarea className="form-control" id="description" {...register('description')} onChange={(e) => setValue("description", e.target.value, { shouldValidate: true })}></textarea>
                                    {errors.description && (
                                        <div className="text-danger">
                                            {errors.description.message}
                                        </div>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" disabled={!formState.isValid}>Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddModal