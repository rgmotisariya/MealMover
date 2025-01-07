import React, { useContext, useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

function LoginPopup({ setShowlogin }) {
  const { url, setToken, token, setUser, setUserLoggedIn, userLoggedIn } =
    useContext(StoreContext);

  const [currstate, setCurrstate] = useState("Sign Up"); // Track whether it's login or signup
  const [data, setData] = useState({ name: "", email: "", password: "" });

  // Update form data as user types
  const onChangeHandeler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  // Handle form submission
  const onLogin = async (event) => {
    event.preventDefault(); // Prevent page reload
    const newurl = `${url}/user/login`;
    await axios
      .post(newurl, data)
      .then((response) => {
        console.log(response.data.data.user);

        console.log(response.data.data.accessToken);
        setUserLoggedIn(true);

        // Set user in context
        setUser(response.data.data.user);

        // Set tokens in context
        setToken(response.data.data.accessToken);

        // store token in local storage
        localStorage.setItem("token", response.data.data.accessToken);

        // store user in local storage
        localStorage.setItem("user", JSON.stringify(response.data.data.user));

        // Close the login popup
        setShowlogin(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error during login/signup:", error);
      });
  };
  const onSignUp = async (event) => {
    event.preventDefault(); // Prevent page reload
    const newurl = `${url}/user/register`;
    await axios
      .post(newurl, data)
      .then((response) => {
        console.log(response.data.data.user);

        // Close the login popup
        setShowlogin(false);
      })
      .catch((error) => {
        console.error("Error during sign-up:", error);
      });
  };

  // Submit form and call appropriate function based on the current state (Sign Up or Login)
  const handleSubmit = (event) => {
    if (currstate === "Sign Up") {
      onSignUp(event);
    } else {
      onLogin(event);
    }
  };

  return (
    <div className="container">
      <div className="grid absolute z-40 rounded-xl h-full w-full">
        <form
          onSubmit={handleSubmit}
          className="border-2 px-9 py-4 rounded-xl bg-white place-self-center"
        >
          {/* Form Header */}
          <div className="flex justify-between px-5 pt-4">
            <h2 className="font-semibold">{currstate}</h2>
            <RxCross2
              className="hover:text-primary"
              onClick={() => setShowlogin(false)} // Close the login popup
            />
          </div>

          {/* Input Fields */}
          <div className="pt-4">
            {/* Sign-Up Form (Name, Email, Password) */}
            {currstate === "Sign Up" ? (
              <>
                <input
                  className="w-full block border-2 rounded-xl px-2 my-2"
                  name="name"
                  onChange={onChangeHandeler}
                  value={data.name}
                  type="text"
                  placeholder="Name"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={onChangeHandeler}
                  value={data.email}
                  required
                  className="w-full block border-2 rounded-xl px-2 my-2"
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={onChangeHandeler}
                  value={data.password}
                  required
                  className="w-full block border-2 rounded-xl px-2 my-2"
                />
              </>
            ) : (
              // Login Form (Name, Password)
              <>
                <input
                  className="w-full block border-2 rounded-xl px-2 my-2"
                  name="name"
                  onChange={onChangeHandeler}
                  value={data.name}
                  type="text"
                  placeholder="Name"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={onChangeHandeler}
                  value={data.password}
                  required
                  className="w-full block border-2 rounded-xl px-2 my-2"
                />
              </>
            )}
          </div>

          {/* Submit Button */}
          <div className="grid grid-cols-1 place-items-center py-3">
            <button
              type="submit"
              className="text-white bg-primary hover:bg-secondary rounded-xl px-4 py-1"
            >
              {currstate === "Sign Up" ? "Create Account" : "Login"}
            </button>
          </div>

          {/* Terms and Conditions */}
          <div className="flex gap-2 py-2">
            <input type="checkbox" required />
            <p className="text-sm sm:text-xs">
              By continuing, I agree to the terms of use and privacy policy.
            </p>
          </div>

          {/* Switch between Sign Up and Login */}
          {currstate === "Login" ? (
            <p>
              Create a new account?{" "}
              <span
                className="text-primary cursor-pointer"
                onClick={() => setCurrstate("Sign Up")}
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                className="text-primary cursor-pointer"
                onClick={() => setCurrstate("Login")}
              >
                Login
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginPopup;
