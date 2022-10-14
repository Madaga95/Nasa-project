import React, { Component } from "react";
import DateInput from "./components/DateInput";
import Photos from "./components/Photos";

class App extends Component {
  state = {
    date: new Date(),
    photo: "",
  };

  randomDate = (start, end) => {
    // renvoie une date aléatoire entre le début du Nasa POD et la date actuelle
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  };

  handleClick = (date) => {
    // génère une date aléatoire
    // fonction changeDate qui met également à jour l'état
    // récupère une photo à nouveau
    let ranDate = this.randomDate(new Date(1995, 0o6 - 1, 16), new Date());
    this.changeDate(ranDate);
  };

  formatDate = (date) => {
    // convertit la date en aaaa-mm-jj
    return date.toISOString().split("T")[0];
  };
  changeDate = (date) => {
    this.setState({ date: date });
    this.getPhotoByDate(this.formatDate(date));
  };

  // ici je créer une fonction qui va récuperer la photo en fonction de la date entrée dans l'input
  getPhotoByDate = (date) => {
    fetch(
      `https://api.nasa.gov/planetary/apod?date=${date}&api_key=02bJOHRgY6rQUP6bV3VNoSsKAx4KpkxSedtKP42A`
    )
      .then((response) => {
        return response.json();
      })
      .then((photoData) => {
        this.setState({ photo: photoData });
      });
  };

  // méthode de cycle de vie qui rend la photo avant le rendu de l'application
  componentDidMount() {
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=02bJOHRgY6rQUP6bV3VNoSsKAx4KpkxSedtKP42A`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ photo: json });
      });
  }

  render() {
    // Style pour header
    const headerStyle = {
      textShadow: "1px 2px #282794",
      textAlign: "center",
    };
    return (
      <div className="container">
        <div className="card card-body">
          <h2 style={headerStyle}>Photo d'astronomie du jour de la NASA</h2>
          <DateInput
            date={this.state.date}
            changeDate={this.changeDate}
            handleClick={this.handleClick}
          />
          <Photos photo={this.state.photo} />
        </div>
      </div>
    );
  }
}
export default App;
