import React , {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

const LoadMore = () => {
    const state = useContext(GlobalState)
    const [page, setPage] = state.productsAPI.page
    const [result] = state.productsAPI.result

    const handleLoad = () => {
        setPage(page+1)
    }

    return (
        <div className='load_more'>
            {
                result < page*9 ? " " 
                : 
                <button onClick={handleLoad}> Load More </button>
            }
        </div>
    )
}

export default LoadMore