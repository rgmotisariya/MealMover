import { createContext, useState, useEffect } from "react";
export const StoreContext = createContext();

import axios from "axios";

const StoreContextProvider = (props) => {
  const [CartItems, setCartItems] = useState({}); 

  const url = "http://localhost:3000";

  const [token, setToken] = useState(""); 
  const [user, setUser] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const [subtotal, setSubtotal] = useState(0);
  const [cartLength, setCartLength] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [total, setTotal] = useState(0);

  const [food_list, setFood_list] = useState([]);

  //fetch food data  from backend
  const fetchFoodList = async () => {
    try {
      //http://localhost:3000/api/food/list
      const response = await axios.get(`${url}/api/food/list`);
      const foodData = Array.isArray(response.data) ? response.data : [];
      setFood_list(foodData);
      console.log("Food list:", foodData);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };
  const loadCartData = async (token) => {
    await axios .post(`${url}/cart/get`,{},{
          headers: {
            authorization: `Bearer ${token}`,
          },
          withCredentials: true,
    })
    .then((response) => {
        console.log(response.data.cartData);
        setCartItems(response.data.cartData);
    })
    .catch((error) => console.error("Error loading cart data:", error));
  };

  //load food data and cart data over first load 
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (token) {
        setUserLoggedIn(true); // Set user as logged in
        setToken(token); // Set token 
        setUser(JSON.parse(user)); // Set user data from localStorage
        await loadCartData(token);
      }
    }
    loadData();
  }, []);

  const addToCart = async (itemId) => {
    if (!CartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post( `${url}/cart/add`, { itemId },  {
          headers: { authorization: `Bearer ${token}` },
          withCredentials: true }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId]) {
        updatedCart[itemId] -= 1;
        if (updatedCart[itemId] <= 0) {
          delete updatedCart[itemId];
        }
      }
      return updatedCart;
    });

    if (token) {
      try {
        await axios.post(
          `${url}/cart/remove`,
          { itemId },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error("Error removing item from cart in database:", error);
        setCartItems((prev) => {
          const updatedCart = { ...prev };
          updatedCart[itemId] = (updatedCart[itemId] || 0) + 1; // Revert the decrement
          return updatedCart;
        });
      }
    }
  };

  // Load cart data from server

   // Sync CartItems with food_list and update totals
  useEffect(() => {
    if (food_list.length > 0) {
      const filteredCartItems = Object.keys(CartItems)
        .filter((itemId) => {
          const itemExists = food_list.some((foodItem) => foodItem._id === itemId);
          if (!itemExists) {
            removeFromCart(itemId); // Remove from DB   
          } 
          return itemExists;
        }) 
        .reduce((acc, itemId) => {
          acc[itemId] = CartItems[itemId];
          return acc;
        }, {});

      if (JSON.stringify(filteredCartItems) !== JSON.stringify(CartItems)) {
        setCartItems(filteredCartItems);
      }

      const newSubtotal = food_list.reduce((acc, item) => {
        return acc + (filteredCartItems[item._id] ? filteredCartItems[item._id] * item.price : 0);
      }, 0);
      const newDeliveryFee = newSubtotal > 0 ? 50 : 0;
      const newTotal = newSubtotal + newDeliveryFee;
      const newCartLength = Object.values(filteredCartItems).reduce((acc, quantity) => acc + quantity, 0);

      setSubtotal(newSubtotal);
      setDeliveryFee(newDeliveryFee);
      setTotal(newTotal);
      setCartLength(newCartLength);
    }
  }, [CartItems, food_list]);
    
  
  const contextValue = {
    food_list,
    CartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    subtotal,
    setSubtotal,
    total,
    setTotal,
    cartLength,
    setCartLength,
    deliveryFee,
    setDeliveryFee,
    url,
    setToken,
    token,
    user,
    setUser,
    userLoggedIn,
    setUserLoggedIn, 
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
