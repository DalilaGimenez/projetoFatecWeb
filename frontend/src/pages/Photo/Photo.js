import "./Photo.css";

import { api } from "../../utils/config";

// components
import PhotoItem from "../../components/PhotoItem";
import LikeContainer from "../../components/LikeContainer";
import { Link } from "react-router-dom";

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getPhoto, like, comment } from "../../slices/photoSlice";

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photo } = useSelector(
    (state) => state.photo
  );

  const [commentText, setCommentText] = useState();

  // Load photo data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  // Like a photo
  const handleLike = () => {
    dispatch(like(photo._id));

    resetMessage();
  };

  // Insert a comment
  const handleComment = (e) => {
    e.preventDefault();

    const photoData = {
      comment: commentText,
      id: photo._id,
    };

    dispatch(comment(photoData));

    setCommentText("");

    resetMessage();
  };

  /*if (loading) {
    return <p>Carregando...</p>;
  }*/

  /*<div className="message-container">
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </div>*/

  const defaultProfile = require("../../images/default-profile.png");

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <p>...</p>
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />

      <div id="comments">
        {photo.comments && (
          <>
            <h3>Comentários ({photo.comments.length}):</h3>
            <form onSubmit={handleComment}>
              <input
                type="text"
                placeholder="Insira seu comentário..."
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText || ""}
              />
              <input type="submit" value="Enviar" />
            </form>
            {photo.comments.length === 0 && <p>Não há comentários...</p>}
            {photo.comments.map((comment) => (
              <div id="comments" key={comment.comment}>

                <div id="author">
                  {(comment.userImage || defaultProfile) && (
                    <img
                      src={
                        comment.userImage ? `${api}/uploads/users/${comment.userId}`
                          : defaultProfile
                      }
                      alt={comment.userName}
                    />
                  )}
                  <Link to={`/users/${comment.userId}`}>
                  Comentado por: <p>{comment.userName}</p>
                  </Link>
                </div>
                <p>{comment.comment}</p>
              </div>
              
            ))}
          </>
        )}
        <Link className="btn" to={`/photos/${photo._id}`}>
          Ver mais teste
        </Link>
      </div>
    </div>
  );
};

export default Photo;
