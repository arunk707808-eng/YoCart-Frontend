import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { server } from '@/main';
import axios from 'axios';
import { Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Chackout = () => {
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(false)
  const fetchAddress = async()=>{
    setLoading(true)
    try {
       const {data} = await axios.get(`${server}/api/v1/address/all`,{withCredentials:true})
    setAddress(data.allAddress)
    } catch (error) {
      toast.error(error.response.data.message||"something went wrong fetching address")
    }finally{
      setLoading(false)
    }
  }

  const [modalOpen, setModalOpen] = useState(false)
  const [newAddress, setNewAddress] = useState({address:"", phone:""})
  const handleAddAddress = async()=>{
    try {
       const {data} = await axios.post(`${server}/api/v1/address/add`,{address:newAddress.address, phone:newAddress.phone},{withCredentials:true})
    toast.success(data.message)
    setAddress({address:"", phone:""})
    setModalOpen(false)
    fetchAddress();
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const deleteHandler = async(id)=>{
    if(confirm("Are You sure you want to delete this address")){
      try {
      const {data} = await axios.delete(`${server}/api/v1/address/${id}`,{withCredentials:true})
      toast.success(data.message)
      fetchAddress();
    } catch (error) {
      toast.error(error.response.data.message)
    }
    }
    
  }
  useEffect(()=>{
    fetchAddress()
  },[])
  return (
    <div className='container mx-auto px-4 py-8 min-h-12 '>
      <h1 className='text-3xl mb-6 font-bold text-center'>ChackOut</h1>
      {loading?<Loading/>:
      (<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
        {address?.length>0 ? address.map((e)=>(
          <div className='p-4 border rounded-lg shadow-sm' key={e._id}>
            <h3 className='text-lg font-semibold flex justify-between gap-3'>
            Address - {e.address}
            <Button variant='destructive' onClick={()=>deleteHandler(e._id)}>
            <Trash/>
            </Button>
            </h3>
            <p className='text-sm'>Phone-{e.phone}</p>
            <Link to={`/payment/${e._id}`}>
             <Button variant="outline">Use Address</Button>
            </Link>
          
        </div>)):<p>no Address Found</p>}
      </div>)
      }
     <Dialog  open={modalOpen} onOpenChange={setModalOpen} >
      <form>
        <DialogTrigger asChild onClick={()=>setModalOpen(true)}>
          <Button variant="outline" >Add New Address</Button>
        </DialogTrigger>
         <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add address</DialogTitle>
            <DialogDescription>
              Please give address & Phone number below. Click save when you are
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="address-1">Address</Label>
              <Input id="address-1" name="address" value={newAddress.address}  onChange={(e) =>
                setNewAddress({ ...newAddress, address: e.target.value})} />
            </Field>
            <Field>
              <Label htmlFor="phone-1">Phone</Label>
              <Input type="Number" id="phone-1" name="phone" onChange={(e)=>setNewAddress({...newAddress,phone: e.target.value})}/>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleAddAddress}>Save</Button>
          </DialogFooter>
        </DialogContent>
        
      </form>
    </Dialog>
    </div>
  )
}

export default Chackout
