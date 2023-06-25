import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [reload, setReload] = useState(false);
  const [images, setImages] = useState([]);

  const login = (details) => {
    axios
      .post("http://localhost:5000/api/auth/login", details)
      .then((res) => {
        fetchImages();
        setCurrentUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((err) => {
        Swal.fire({
          text: "Invalid Credentials",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "oK",
        });
      });
  };
  const fetchImages = () => {
    {
      currentUser &&
        axios
          .get(`http://localhost:5000/api/auth/${currentUser._id}`)
          .then((res) => {
            setImages(res.data?.images);
          });
    }
  };

  useEffect(() => {
    fetchImages();
  }, [reload]);

  // useEffect(() => {
  //     if (currentUser != undefined) {
  //       localStorage.setItem("user", JSON.stringify(currentUser));
  //     }
  //   }, [currentUser]);
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        images,
        setReload,
        reload,
        login,
        images,
        setImages,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
