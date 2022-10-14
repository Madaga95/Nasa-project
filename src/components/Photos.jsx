import React from "react";
const Photos = (props) => {
  const explanationStyles = {
    fontWeight: "bold",
    textShadow: "navy 1px 1px",
  };

  const titleStyles = {
    textShadow: "1px 1px darkred",
    textAlign: "center",
  };

  // fonction pour vérifier si l'api nasa renvoie une vidéo ou une image
  // et rend le code HTML correct en conséquence
  function renderContentType() {
    if (props.photo.media_type === "image") {
      return (
        <img
          style={{ marginBottom: "20px" }}
          className="img-fluid rounded"
          src={props.photo.url}
          alt={props.photo.title}
        />
      );
    } else if (props.photo.media_type === "video") {
      return (
        <iframe
          style={{ marginBottom: "20px" }}
          title="Video du jour de la Nasa"
          className="img-fluid rounded"
          src={props.photo.url}
          alt={props.photo.title}></iframe>
      );
    } else {
      return;
    }
  }
  return (
    <div className="card card-body bg-light">
      <h4 style={titleStyles}>{props.photo.title}</h4>

      {renderContentType()}
      <p style={explanationStyles}>{props.photo.explanation}</p>
    </div>
  );
};

export default Photos;
