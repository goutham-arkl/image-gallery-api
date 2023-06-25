import React, { useRef, useState } from "react";
import { styled } from "styled-components";

const Image = styled.div`
  width: 100%;
  height: 40vh;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed gray;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;
const Send = styled.button`
  width: 100%;
  padding: 8px;
`;

const ModalComponent = ({ setImg, handleSend }) => {
  const InputRef = useRef();
  const [background, setBackground] = useState("");
  const containerStyle = {
    backgroundImage: background
      ? `url(${URL.createObjectURL(background)})`
      : "none",
    backgroundSize: "100% 53%",
    backgroundRepeat: "no-repeat",
    overFlow: "hidden",
    backgroundSize: "cover",
    border: "none",
  };

  return (
    <Container>
      {background ? (
        <Image style={containerStyle} onClick={() => InputRef.current.click()}>
          <span style={{ color: "gray" }}>Change Image</span>
        </Image>
      ) : (
        <Image onClick={() => InputRef.current.click()}>
          <span>Click here to add image</span>
        </Image>
      )}

      <input
        style={{ display: "none" }}
        ref={InputRef}
        type="file"
        onChange={async (e) => {
          setBackground(e.target.files[0]);
          await setImg(e.target.files[0]);
        }}
      />
    </Container>
  );
};

export default ModalComponent;
