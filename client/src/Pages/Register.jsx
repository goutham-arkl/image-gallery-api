import React, { useState } from "react";
import { styled } from "styled-components";

import axios from "axios";
import { Err, Links } from "./Login";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
  outline: none;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #333;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [passErr, setPassErr] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr(false);
    const obj = {
      name: name,
      email: email,
      password: password,
    };

    if (Object.values(obj).every((value) => value !== "")) {
      await axios
        .post("http://localhost:5000/api/auth/register", obj)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          Swal.fire({
            title: "Oops!",
            text: "Something went wrong",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Try Again",
          });
        });
    } else {
      setErr(true);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        {err && <Err>Enter valid Credentials</Err>}
        {passErr && <Err>Password should be matching</Err>}
        <Form>
          <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            onChange={(e) =>
              e.target.value !== password ? setPassErr(true) : setPassErr(false)
            }
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={(e) => handleRegister(e)}>CREATE</Button>
        </Form>
        <Link style={{ color: "black" }} to={"/login"}>
          {" "}
          <Links>ALREADY HAVE AN ACCOUNT ?</Links>{" "}
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Register;
