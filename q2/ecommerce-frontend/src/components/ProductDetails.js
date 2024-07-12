import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { category, productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/categories/${category}/products/${productId}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [category, productId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>No product found</div>;
    }

    return (
        <div>
            <h1>{product.productName}</h1>
            <p>Price: {product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}%</p>
            <p>Availability: {product.availability}</p>
        </div>
    );
};

export default ProductDetails;
