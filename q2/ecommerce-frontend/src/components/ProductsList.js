import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('Laptop'); // Default category
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/categories/${category}/products`, {
                    params: {
                        top: 10,
                        minPrice: 1,
                        maxPrice: 10000
                    }
                });
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Top Products in {category}</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h2>{product.productName}</h2>
                        <p>Price: {product.price}</p>
                        <p>Rating: {product.rating}</p>
                        <p>Discount: {product.discount}%</p>
                        <p>Availability: {product.availability}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductsList;
