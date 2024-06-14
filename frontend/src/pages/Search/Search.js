import "./Search.css";

// hooks
import { useQuery } from "../../hooks/useQuery";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
//import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// components
import PhotoGrid from "../../components/PhotoGrid";


// Redux
import { searchPhotos } from "../../slices/photoSlice";


const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const dispatch = useDispatch();

  //const resetMessage = useResetComponentMessage(dispatch);

  //const { user } = useSelector((state) => state.auth);
  //const { photos, loading, error } = useSelector((state) => state.photo);

  // Load all photos
  useEffect(() => {
    dispatch(searchPhotos(search));
  }, [dispatch, search]);

  /*const handleLike = (photo = null) => {
    dispatch(like(photo._id));
    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }*/

  if (error) {
    return <p>Erro ao carregar fotos: {error}</p>;
  }

  return (
    <div id="search">
      <h2>Cães para Adotar: {search}</h2>
      <p>Escolha um aumor para ser seu cãopanheiro...</p>
            <PhotoGrid searchQuery={search}/>
    </div>
  );
};

export default Search;
