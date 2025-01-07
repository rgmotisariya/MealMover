import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";


function List({url}) {
  
  const [list, setList] = useState([]);

  // Fetch list of food items
  const fetchList = async () => {

      const response = await axios.get(`${url}/api/food/list`);
      console.log(response.data);
      if (response.data) {
        setList(response.data);
        console.log(list);
       
      } else {
        toast.error('Error fetching food list');
      }

  };

  // Delete food item function
  const deleteItem = async (id) => {
    
      const response = await axios.post(`${url}/api/food/delete/`,{id:id});
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error('Error deleting food item');
      }
      
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <h1>All Food List</h1>
      <div className="list-table">
        <div className="list-table-formate title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        { 

        list.map((item, index) => (
          <div key={index} className="list-table-formate">
            <img 
              src={`${url}/image/${item.image}`}
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
