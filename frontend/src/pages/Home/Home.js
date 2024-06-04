import "./Home.css";

// Hooks
import { useAuth } from "../../hooks/useAuth";

// components
import { Link } from "react-router-dom";

import imageBackground from "../../images/imageBackgroundHome.png";

const Home = () => {
  const { auth } = useAuth();

  return (
    <>
      <div id="divContent">
        <img src={imageBackground} alt="Home's Backgraund" />
      </div>
      <div id="home">
        <h2>Seja bem vindo ao</h2>
        <h1>Cãonecta Aumor</h1>
        <p>O seu destino online para encontrar o seu parceiro canino perfeito!
          Aqui, unimos corações peludos a lares amorosos, proporcionando uma plataforma onde pessoas e cães se encontram para uma vida cheia de alegria e amor mútuo.</p>
        <p>Navegue por perfis de <b>cães adoráveis</b> disponíveis para <b>adoção</b>,
          conheça suas personalidades únicas e encontre aquele que se encaixa
          perfeitamente no seu estilo de vida e preferências.
        </p>
        {auth ? (
          <>
            <div>
              <Link className="btn" to={`/search`}>
                Encontrar um AUmor!
              </Link>
            </div>
          </>
        ) : (
          <>
            <div>
              <Link className="btn" to={`/login`}>
                Entrar
              </Link>
            </div>

            <p>
              Não tem uma conta? <Link to="/register">Clique aqui!</Link>
            </p>
          </>
        )
        }
      </div>
    </>
  );
};

export default Home;