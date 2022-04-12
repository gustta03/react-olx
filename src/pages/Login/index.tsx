import { useState } from "react";
import { LoginMain, Card, Form, Input } from "./style";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { toast, Toaster } from "react-hot-toast";

interface typeResponse {
  data: {
    error: string;
    token: string;
  };
}

export const Login = () => {
  const goHome = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remembrePassword, setRemembrePassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [Error, setError] = useState("");

  const handleSubmit = async () => {
    setDisabled(true);
    const token = true;
    const res: typeResponse = await api.post("/user/signin", {
      email,
      password,
    });

    if (res.data.error == "") {
      localStorage.setItem("token", res.data.token);
      goHome("/");
    } else {
      toast.error(res.data.error, {
        duration: 5000,
        position: "top-center",
        style: {
          backgroundColor: "red",
          color: "#FFF",
        },
      });
    }

    setDisabled(false)
  };

  return (
    <LoginMain>
      <Toaster></Toaster>
      <Card>
        <h1>Acessar a sua conta</h1>
        <Form>
          <Input
            placeholder="Email"
            disabled={disabled}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
          <Input
            placeholder="Senha"
            disabled={disabled}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />
          <p>Lembrar a senha</p>
        </Form>
        <button disabled={disabled} onClick={handleSubmit}>
          Entrar
        </button>
      </Card>
    </LoginMain>
  );
};
