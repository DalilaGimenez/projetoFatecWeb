import "./PhotoItem.css";

import { api } from "../utils/config";

import { Link } from "react-router-dom";

const PhotoItem = ({ photo }) => {
  return (
    <div className="photo-item">
      {photo.image && (
        <img src={`${api}/uploads/photos/${photo.image}`} alt={photo.title} />
      )}
      <h2>{photo.title}</h2>
      <p className="photo-author">
        <Link to={`/users/${photo.userId}`}>Publicada por: {photo.userName}</Link>
      </p>
      <Link className="btn" to={`/photos/${photo._id}`}>
        Detalhes da foto      
        </Link>
    </div>
  );
};
export default PhotoItem;
