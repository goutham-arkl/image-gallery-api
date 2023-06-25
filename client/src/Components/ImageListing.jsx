import React, { useContext } from "react";
import { styled } from "styled-components";
import { AuthContext } from "../Context/UserContext";
import UserDetails from "./UserDetails";
import useFetchImages from "../Hooks/FetchImages";

const Container = styled.div`
  width: 80%;
  min-height: 90vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
`;

const Heading = styled.span`
  font-size: 40px;
  font-weight: 500;
  letter-spacing: 1px;
`;

const Imagecontainer = styled.div`
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;
`;
const Image = styled.img`
  width: 400px;
  height: 500px;
  border-radius: 10px;
  transition: all 0.4s;
  object-fit: cover;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  filter: grayscale(100%);
  &:hover {
    transform: scale(1.1) rotate(5deg);
    filter: none;
    z-index: 1;
  }
`;

const ImageListing = () => {
  const { currentUser } = useContext(AuthContext);

  const images = useFetchImages(currentUser);

  return (
    <Container>
      <Heading>Your Photos</Heading>
      <UserDetails imageLength={images.length} />
      <Imagecontainer>
        {images.map((item) => (
          <Image key={item} src={item} alt="photo" />
        ))}
      </Imagecontainer>
    </Container>
  );
};

export default ImageListing;
