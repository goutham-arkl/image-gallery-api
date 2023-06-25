import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { styled } from "styled-components";
import { AuthContext } from "../Context/UserContext";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 20%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  outline: none;
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

export const Links = styled.a`
  margin: 5px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
export const Err = styled.span`
  color: red;
`;
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [err, setErr] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setErr(false);
    const obj = {
      email: email,
      password: password,
    };
    if (Object.values(obj).every((value) => value !== "")) {
      login(obj);
    } else {
      setErr(true);
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        {err && <Err>Enter valid credentials</Err>}
        <Form>
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={(e) => handleLogin(e)}>LOGIN</Button>

          <Link style={{ color: "black" }} to={"/register"}>
            {" "}
            <Links>CREATE NEW ACCOUNT</Links>{" "}
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
