import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'



const Filters = () => {

    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search

    const handleCategory = (e) => {
        setCategory(e.target.value)
        setSearch('')
    }

    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase())
    }

    const handleSort = (e) => {
        setSort(e.target.value)
    }

    return (

        <div className='filter_menu' >

            <div className='row'>
                <span> Filters: </span>
                <select name='categories' value={category} onChange={handleCategory}>
                    <option value=''> All Products </option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input
                type='text'
                value={search}
                placeholder="Enter your search term !"
                onChange={handleSearch}
            />

            <div className='row'>
                <span> Sort By: </span>
                <select value={sort} onChange={handleSort}>
                    <option value=''> Newest </option>
                    <option value='sort=oldest'> Oldest </option>
                    <option value='sort=-sold'> best sales </option>
                    <option value='sort=-price'> Price : Hight to Low </option>
                    <option value='sort=price'> Price : Low to Hight </option>
                </select>
            </div>

        </div>
    )
}

export default Filters