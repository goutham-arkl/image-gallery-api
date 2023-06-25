import React, { useRef, useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { styled } from "styled-components";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { AuthContext } from "../Context/UserContext";
import { storage } from "../firebase";
import ModalComponent from "../Components/ModalComponent";
import Navbar from "../Components/Navbar";
import ImageListing from "../Components/ImageListing";
import { useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UserDetails from "../Components/UserDetails";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 50px;
`;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 750,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 10,
};
const Send = styled.button`
  width: 100%;
  padding: 9px;
  cursor: pointer;
  background-color: black;
  color: white;
  border: 1px solid black;

  &:hover {
    color: black;
    background-color: white;
  }
`;
const OutContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 70%;
  height: 100px;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px;
  outline: none;
  margin-bottom: 10px;
`;

const Home = () => {
  const [img, setImg] = useState(null);
  const [open, setOpen] = useState(false);
  const { currentUser, setReload, reload } = useContext(AuthContext);
  const [apikey, setApiKey] = useState("");
  const modalRef = useRef();
  let verified;
  const verifyUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/auth/verify/obj?id=${currentUser._id}&apikey=${apikey}`
      );
      verified = true;
    } catch (err) {
      console.log("hello");
      setOpen(false);
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Invalid Api Key",
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
      });
    }
  };

  const handleSend = async () => {
    console.log("hei");

    await verifyUser();

    if (img && verified) {
      verified = false;
      const storageRef = ref(storage, uuid());

      try {
        const uploadSnapshot = await uploadBytes(storageRef, img);
        const downloadURL = await getDownloadURL(uploadSnapshot.ref);
        const obj = {
          link: downloadURL,
        };

        const result = await axios
          .patch(
            `http://localhost:5000/api/auth/addimage/${currentUser._id}`,
            obj
          )
          .then(() => {
            setOpen(false);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Photo uploaded",
              showConfirmButton: false,
              timer: 1500,
            });
          });
        setImg(null);
        setReload(!reload);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      return;
    }
  };

  return (
    <Container>
      <Navbar modalRef={modalRef} />

      <ImageListing />

      <Button
        ref={modalRef}
        style={{ display: "none" }}
        onClick={() => setOpen(true)}
      >
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <span style={{ fontSize: "20px", fontWeight: "500" }}>
            Upload Image
          </span>
          <ModalComponent setImg={setImg} img={img} handleSend={handleSend} />
          <OutContainer>
            <Input
              type="text"
              placeholder="Api key"
              onChange={(e) => setApiKey(e.target.value)}
            />
            {img && <Send onClick={handleSend}>Upload</Send>}
          </OutContainer>
        </Box>
      </Modal>
    </Container>
  );
};

export default Home;
