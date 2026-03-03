import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { server } from '@/main'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const OrderPage = () => {
  const {id} = useParams()
  console.log(id)
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const fetchOrder = async()=>{
    try {
      setLoading(true)
      const {data} = await axios.get(`${server}/api/v1/order/${id}`, {withCredentials:true})
      setOrder(data.order)
    } catch (error) {
      console.log(error.response.data.message)
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchOrder()
  },[id])
  console.log(order)
  if(loading){
    return <Loading/>
  }
  if(!order){
    return (<div className='min-h-[70vh] flex flex-col items-center justify-center px-4 '>
      <div className='w-full max-w-100 min-h-52 flex flex-col items-center justify-center px-2 shadow-sm hover:shadow-lg border-2 border-gray-100 rounded-md space-y-4'>
        <h1 className='text-2xl font-bold'>No Order with this ID</h1>
        <Button onClick={()=>navigate("/product")}>Back</Button>
        </div>
      
    </div>)
  }
    return (
    <div className='container mx-auto py-6 px-4'>
      <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle className="text-2xl font-bold">
                  Order Details
                </CardTitle>
                <Button onClick={() => window.print()}>Print Order</Button>
              </div>
            </CardHeader>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
              <div>
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <p>
                  <strong>Order Id: </strong>

                  {order._id}
                </p>
                <p>
                  <strong>Status: </strong>
                  <span
                    className={`${
                      order.status === "Pending"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
                 <p>
                  <strong>Total Items: </strong>

                  {order.items.length}
                </p>

                <p>
                  <strong>Payment Method: </strong>

                  {order.method}
                </p>

                <p>
                  <strong>SubTotal: </strong>

                  {order.subTotal}
                </p>

                <p>
                  <strong>Placed At: </strong>

                  {new Date(order.createAt).toLocaleDateString()}
                </p>
                 <p>
                  <strong>Paid At: </strong>

                  {order.paidAt || "Payment Through COD"}
                </p>
                </div>
                 <div>
                <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
                <p>
                  <strong>Phone:</strong> {order.phone}
                </p>
                <p>
                  <strong>Address:</strong> {order.address}
                </p>
                <p>
                  <strong>User:</strong> {order.user?.email || "Guest"}
                </p>
              </div>
              </div>
            </Card>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {order.items.map((e, i) => (
              <Card key={i}>
                <Link to={`/product/${e.product._id}`}>
                  <img
                    src={e.product.images[0]?.url}
                    alt={e.product.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </Link>

                <CardContent>
                  <h3 className="text-lg font-semibold">{e.product.title}</h3>
                  <p>
                    <strong>Quantity:</strong>
                    {e.quantity}
                  </p>
                  <p>
                    <strong>Price:</strong>₹{e.product.price}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
     
    </div>
  )
}

export default OrderPage
