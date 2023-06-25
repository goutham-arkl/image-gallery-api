import React, { useContext } from "react";
import { styled } from "styled-components";
import { AuthContext } from "../Context/UserContext";

const Container = styled.div`
  width: 80%;
  height: 150px;
  border-radius: 10px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
`;
const Detailscontainer = styled.div`
  width: 33%;
  height: 60px;
  text-align: left;
  line-height: 30px;
`;
const Imagecount = styled.div`
  width: 20%;
  height: 50%;
  text-align: center;
`;

const UserDetails = ({ imageLength }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Container>
      <Detailscontainer>
        Name : {currentUser.name} <br></br>
        ApiKey : <strong>{currentUser.apikey}</strong>
      </Detailscontainer>
      <Imagecount>Total Images : {imageLength}</Imagecount>
    </Container>
  );
};

export default UserDetails;
