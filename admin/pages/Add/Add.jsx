import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../src/assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
function Add({url}) {
  
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
  });
  const onChangeHandeler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({ ...data, [name]: value }));
  };

  const onSubmitHandeler=async (event)=>{
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("image", image);
    formdata.append("name", data.name);
    formdata.append("description", data.description);
    formdata.append("category", data.category);
    formdata.append("price", Number(data.price));

    const response = await axios.post(`${url}/api/food/add`,formdata);
    console.log(response.data);
    if(response.data.success){
      setData({
        name: "",
        description: "",
        category: "all",
        price: ""
      })
      setImage(false);
      toast.success(response.data.message)
      
    }
    else{
      toast.error(response.data.message)
    }

  }
  return (
    <div className="add"> 
      <form className="flex-col  " onSubmit={onSubmitHandeler}>
        <div className="add-img-uploads flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"                           
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name">
          <p>Product Name</p>
          <input
            onChange={onChangeHandeler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type Name"
            required
          />
        </div>
        <div className="add-product-description">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandeler}
            value={data.description}
            type="text"
            name="description"
            rows="6"
            placeholder="Type Description"
            required
          />
        </div>

        <div className="add-product-category-price">
          <div>
            <p>Product Category </p>
            <select
              onChange={onChangeHandeler}
             
              name="category"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div>
            <p>Product Price</p>
            <input
              onChange={onChangeHandeler}
              value={data.price}
              type="number"
              name="price"
              placeholder="Type Price"
              required
            />
          </div>
        </div>

        <button className="add-btn">Add</button>
      </form>
    </div>
  );
}

export default Add;
