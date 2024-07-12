const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzYwNjA4LCJpYXQiOjE3MjA3NjAzMDgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQ4NWE5YjViLTFlY2ItNGM5ZS1iOTRmLWE5NDA5NjIxNTUzMSIsInN1YiI6Impvc3BhcjIwMDNAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiTWVwY28iLCJjbGllbnRJRCI6ImQ4NWE5YjViLTFlY2ItNGM5ZS1iOTRmLWE5NDA5NjIxNTUzMSIsImNsaWVudFNlY3JldCI6InBwbEZKU3hXaHp2S0NDWU0iLCJvd25lck5hbWUiOiJKLkpvc3Bhck1pbGxpYW4iLCJvd25lckVtYWlsIjoiam9zcGFyMjAwM0BnbWFpbC5jb20iLCJyb2xsTm8iOiIyMUJBRDA0NSJ9.mZkMJRgBRr_7iJCZxUqnYytqt1M3WJq-UWbg7u1taxc';

app.post('/register', (req, res) => {
    res.status(200).json({ message: 'Registered successfully', token: token });
});

app.get('/all-data', async (req, res) => {
    try {
        const response = await axios.get('http://20.244.56.144/test/companies/AMZ/all-data', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error(`Error fetching all data: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch all data', details: error.message });
    }
});

app.get('/categories/:category/products', async (req, res) => {
    const { category } = req.params;
    const { top = 10, minPrice, maxPrice, sortBy, sortOrder = 'asc' } = req.query;
    try {
        const response = await axios.get(`http://20.244.56.144/test/companies/AMZ/categories/${category}/products`, {
            params: {
                top,
                minPrice,
                maxPrice,
                sortBy,
                sortOrder
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error(`Error fetching products: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch products', details: error.message });
    }
});

app.get('/categories/:category/products/:productId', async (req, res) => {
    const { category, productId } = req.params;
    try {
        const response = await axios.get(`http://20.244.56.144/test/companies/AMZ/categories/${category}/products/${productId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error(`Error fetching product details: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch product details', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
