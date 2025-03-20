import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProducts = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [formData,setFormData]=useState({
        productName: '',
        productDescription: '',
        productPrice: '',
        productImages: null,
    })
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:7777/product/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setProduct(result.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, productImages: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // const formData = new FormData();
            // formData.append('productName', product.productName);
            // formData.append('productDescription', product.productDescription);
            // formData.append('productPrice', product.productPrice);
            // if (product.productImages) {
            //     formData.append('productImages', product.productImages);
            // };

            console.log(formData);

            const response = await fetch(`http://localhost:7777/product/update/${id}`, {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers:{"authorization":`${localStorage.getItem("Token")}`,
                "Content-Type":"application/json"}
            }).then((res)=>{
                return res.json();
            }).then((res)=>{
                console.log(res);
            })

            

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            //navigate('/'); // Redirect to product list after successful edit
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="productName">Product Name</label>
            <input
                type="text"
                name="productName"
                placeholder="Enter Product Name"
                value={formData.productName}
                onChange={handleChange}
            />
            <label htmlFor="productDescription">Product Description</label>
            <input
                type="text"
                name="productDescription"
                placeholder="Enter Product Description"
                value={formData.productDescription}
                onChange={handleChange}
            />
            <label htmlFor="productPrice">Product Price</label>
            <input
                type="text"
                name="productPrice"
                placeholder="Enter Product Price"
                value={formData.productPrice}
                onChange={handleChange}
            />
            <label htmlFor="productImages">Product Images</label>
            <input
                type="file"
                name="productImages"
                placeholder="Add Product Images"
                onChange={handleFileChange}
            />

            <input type="submit" value="Edit Product" />
        </form>
    );
};

export default EditProducts;