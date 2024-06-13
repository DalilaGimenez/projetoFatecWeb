import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPage, searchPhotos, getPhotos, incrementPage } from "../slices/photoSlice";
import PhotoItem from "./PhotoItem";
import { api } from "../utils/config";
import Photo from "../pages/Photo/Photo";

const PhotoGrid = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const { photos, loading, error, page } = useSelector((state) => state.photo);

  const [query, setQuery] = useState(searchQuery || "");

  useEffect(() => {
    if (query) {
      dispatch(resetPage());
      dispatch(searchPhotos({ query, page: 1 }));
    } else {
      dispatch(getPhotos());
    }
  }, [dispatch, query]);

  useEffect(() => {
    if (!query) {
      dispatch(getPhotos());
    }
  }, [dispatch, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(resetPage());
    dispatch(searchPhotos({ query, page: 1 }));
  };

  const loadMorePhotos = () => {
    dispatch(incrementPage(Photo));
  };

  //if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar fotos: {error}</p>;

  return (
    <div id="photo-grid">
      {!searchQuery && (
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Pesquisar"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      )}
      <div className="grid-container">
        {photos.map((photo, index) => (
          <div className="grid-item" key={index}>
            <p></p>
            <PhotoItem photo={photo} />
          </div>
        ))}
      </div>
      <button onClick={loadMorePhotos}>Ver mais</button>
    </div>
  );
};

export default PhotoGrid;