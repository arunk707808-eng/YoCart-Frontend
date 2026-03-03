import Hero from '@/components/Hero'
import ProductCard from '@/components/ProductCard';
import { ProductData } from '@/context/ProductContext';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  const {loading, product,newProduct, mostSoldProduct } = ProductData();
  
  return (
    <div>
      <Hero navigate={navigate}/>
      <div className='top product mt-4 p-4'>
        <h1 className='text-3xl mb-4 font-semibold'>Latest Products</h1>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
          {newProduct?.length > 0 ?(
           newProduct.map((e)=> {return <ProductCard key={e._id} product={e} type={"new"} />})
          ):(
            <p>No Product Yet</p>
          )}
        </div>
        <h1 className='text-3xl my-6 font-semibold'>Most Sold Products</h1>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
          {mostSoldProduct && mostSoldProduct.length > 0 ?(
           mostSoldProduct.map((e)=> {return <ProductCard key={e._id} product={e} type={"mostSold"} />})
          ):(
            <p>No Product Yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
