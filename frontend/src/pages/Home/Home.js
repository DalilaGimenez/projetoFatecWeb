import "./Home.css";

// Hooks
import { useAuth } from "../../hooks/useAuth";

// components
import { Link } from "react-router-dom";

import imageBackground from "../../images/imageBackgroundHome.png";
import pawImageBackground from "../../images/paw-image-background.png";


const Home = () => {
  const { auth } = useAuth();

  return (
    <>
      <div id="divContent">
        <img src={imageBackground} alt="Home's Backgraund" />
        </div>
      
      <div id="home">
        <div id="container-row">
          <img src={pawImageBackground} alt="Paw Image"/>
          <div className="div1">
          <h2>Seja bem vindo ao</h2>
          <h1>Cãonecta Aumor</h1>
          </div>
          <p>O seu destino online para encontrar o <a>seu parceiro canino perfeito</a>!<br/>
            Aqui, unimos corações peludos a lares amorosos, proporcionando uma plataforma onde pessoas e cães se encontram para uma vida cheia de alegria e amor mútuo.</p>
        </div>
      <p>Navegue por perfis de <a>cães adoráveis</a> disponíveis para <a>adoção</a>,
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