import React, { useState } from 'react';
import Input from './input';

export default function Products({ products }) {
    const [filter, setFilter] = useState('');
    const [selectedOption, setSelectedOption] = useState('title');


    const handleFilterChange = (value) => {
        setFilter(value);
    };

    const handleOptionChange = (e) => setSelectedOption(e.target.value);

    const handleFilterProduct = (products) => {
        if (!filter) {
            return products
        }
        if (selectedOption === 'title') {
            return products.filter((item) =>
                item.title.toLowerCase().includes(filter.toLowerCase())
            );
        } else if (selectedOption === 'price') {
            return products.filter((item) => +item.price == +filter);

        } else if (selectedOption === 'date') {
            return products.filter((item) =>
                item.date.toLowerCase().includes(filter.toLowerCase())
            );
        }
    };

    const filteredProducts = handleFilterProduct(products);
    console.log(filteredProducts);
    return (
        <>
            <div>
                <div className="filter-container">
                    <Input
                        value={filter}
                        type={selectedOption !== "date" ? "text" : selectedOption}
                        onChange={handleFilterChange}
                        placeholder="Filter..."
                    />
                    <select value={selectedOption} onChange={handleOptionChange}>
                        <option value="title">Title</option>
                        <option value="amount">Amount</option>
                        <option value="date">Date</option>
                    </select>
                </div>
                <div className='card-container'>
                    {filteredProducts.map(product => {
                        return <Product key={product.id} product={product} />
                    })}
                </div>
            </div>
        </>

    );
}


const Product = ({ product }) => {
    return <>
        <div class="card">
            <img src={product.image} alt="Product Image" />
            <h2>{product.title.slice(0, 20)}</h2>
            <p>{product.description.slice(0, 40)}</p>
        </div>
    </>
}