import React, { useState } from 'react';
import Input from './input';

export default function Table({ items }) {

    const Options = [... new Set(items.map(item => item.category) || [])];
    const [search, setSearch] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const handleSearchChange = (value) => setSearch(value);
    const handleOptionChange = (e) => setSelectedOption(e.target.value);





    const handleFilterItems = (items) => {
        if (!search && !selectedOption) {
            return items
        }
        return items.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase()) && item.category.toLowerCase().includes(selectedOption.toLowerCase())
        );
    };

    const filteredItems = handleFilterItems(items);

    const totalNumberOfProductsByCategory = (category) => items.filter(item => item.category == category)?.length


    return (
        <>
            <div>
                <div className="filter-container">
                    <Input
                        label="Search"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="search by name"
                    />
                    <div>
                        <label>
                            Filter by category  {totalNumberOfProductsByCategory(selectedOption) ? `(total number ${totalNumberOfProductsByCategory(selectedOption)})` : ""}
                        </label>
                        <select value={selectedOption} onChange={handleOptionChange}>
                            <option value="">All</option>
                            {Options.map(option => {
                                return (
                                    <option value={option}>{option}
                                        {/* {totalNumberOfProductsByCategory(option)} */}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item, i) => (
                            <tr key={item.id}>
                                <td>{i + 1}</td>
                                <td>{item.title}</td>
                                <td>
                                    <img className='table-image' src={item.image} />
                                </td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </>

    );
}