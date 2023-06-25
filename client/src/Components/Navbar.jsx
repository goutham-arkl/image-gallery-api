import React, { useContext } from "react";
import { styled } from "styled-components";
import { AuthContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Container = styled.div`
  width: 100%;
  height: 8vh;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 20px;
`;
const Logo = styled.span`
  font-size: 30px;
  font-weight: 700;
`;
const Right = styled.div`
  display: flex;
  gap: 30px;
`;
const Rcontent = styled.span`
  cursor: pointer;
  font-weight: 500;
`;

const Navbar = ({ modalRef }) => {
  const { setCurrentUser, setImages } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      localStorage.removeItem("user");
      setImages([]);
      setCurrentUser(false);
      navigate("/");
    });
  };
  return (
    <Container>
      <Logo>Image Gallery</Logo>
      <Right>
        <Rcontent onClick={() => modalRef.current.click()}>
          Upload Image
        </Rcontent>
        <Rcontent onClick={handleLogout}>Logout</Rcontent>
      </Right>
    </Container>
  );
};

export default Navbar;
