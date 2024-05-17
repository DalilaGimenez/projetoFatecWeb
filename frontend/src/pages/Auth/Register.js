import "./Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { register, reset } from "../../slices/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    console.log(user);

    dispatch(register(user));
  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  const imageBackground = require("../../images/imageBackgroundSignUp.png");

  return (
    <>
    <div className="container">
    <div className="background-left"></div>
    <img id="register-background-img" src={imageBackground} alt="Imagem de Background" />
    </div>

      <div id="register">
        <p className="subtitle">Faça seu cadastro para divulgar ou adotar um aumigo!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome e Sobrenome"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            type="password"
            placeholder="Confirme a Senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          {!loading && <input type="submit" value="Cadastrar" />}
          {loading && <input type="submit" value="Aguarde..." disabled />}
          {error && <Message msg={error} type="error" />}
        </form>
        <p>
          Já possui uma conta? <Link to="/login">Clique aqui!</Link>
        </p>
      </div>
    </>
  );
};

export default Register;