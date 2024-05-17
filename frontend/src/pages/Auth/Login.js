import "./Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { login, reset } from "../../slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    console.log(user);

    dispatch(login(user));
  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  const imageBackgroundLogin = require("../../images/imageBackgroundLogin.png");

  return (
    <>
      <div class="background-right"></div>
      <img
        id="login-background-img"
        src={imageBackgroundLogin}
        alt="Imagem de Background da pagina Login" />
      <div id="login">
        <p className="subtitle">Faça seu login para divulgar ou adotar um aumigo!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
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
          {!loading && <input type="submit" value="Entrar" />}
          {loading && <input type="submit" disabled value="Aguarde..." />}
          {error && <Message msg={error} type="error" />}
        </form>
        <p>
          Não tem uma conta? <Link to="/register">Clique aqui!</Link>
        </p>
      </div>
    </>
  );
};

export default Login;