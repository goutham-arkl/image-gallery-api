import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/UserContext";

const useFetchImages = (currentUser) => {
  const [images, setImages] = useState([]);
  const { reload } = useContext(AuthContext);

  useEffect(() => {
    const fetchImages = async () => {
      if (currentUser) {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/auth/${currentUser._id}`
          );
          setImages(res.data?.images);
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      }
    };

    fetchImages();
  }, [currentUser, reload]);

  return images;
};

export default useFetchImages;
