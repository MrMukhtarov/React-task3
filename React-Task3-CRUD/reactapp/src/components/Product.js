import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';

const Product = () => {
    const [items , setItems] = useState([]);
    const [search, setSearch] = useState("")
    const api = "http://localhost:3000/products";

    useEffect(() => {
        const GetItems = async () => {
            const response = await axios.get(api)
            setItems(response.data)
        }
        GetItems();
    } , [])

    const SearcHandler = (e) => {
      setSearch(e.target.value)
     }
    
    const AddProduct = async () => {
      const newProducts = {
        id: items.id.length + 1,
        title: 'Playstation 5',
        price: 499,
        description: "Oyun dünyasına PlayStation 5 ilə qatılın! Yenilənmiş oyun konsolu ilə qeympad sizə yeni təəssüratlar bəxş edəcək. Cihaz güclü AMD Ryzen prosessor üzərində işləyir və 825 GB SSD ilə təchiz edilib",
        image: "https://images-na.ssl-images-amazon.com/images/I/619BkvKW35L._SX342_.jpg"
      }
      await axios.post(api,newProducts)
      setItems([newProducts,...items])
    }
    const DeletePost = async (item) => {
      await axios.delete(`${api}/${item.id}`)
      setItems(items.filter(x => x.id !== item.id))
    }
  // const EditProduct = async (prod) => {
  //   await axios.get(`${api}/${items.id}`)
  //   setItems(items.filter)
  // }

 const filteredProducts = items.filter(products => products.title.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className='container'>
      <input onChange={SearcHandler} className='form-control mt-3' placeholder='Search' type="text" />
      <button onClick={AddProduct} className='btn btn-primary w-100 mb-3 mt-2'>Add Post</button>
      <table className='table table-stripped table-bordered mt-3'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Id</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            items && filteredProducts.map(item => {
              return(
                <tr>
                  <tr key={item.id}></tr>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>
                   <button  className='btn btn-warning btn-sm'> <FaEdit/> Edit</button>
                 </td>
                 <td>
                 <button onClick={() => DeletePost(item)} className='btn btn-danger btn-sm'><AiFillDelete/> Delete</button>
                 </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Product