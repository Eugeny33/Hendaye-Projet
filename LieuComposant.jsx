'use strict';

const e = React.createElement;

// composant pour créer ou modifier les lieux
class LieuComposant extends React.Component {
  constructor(props) {
    super(props);
    const lieu = null;
    const id = props.id;

    // on charge la config
    localStorage.getItem("config");
    var url = "http://localhost/api/lieu";
    if ( config ) {
      url = "http://"+config.HostApi+":"+config.port+config.basePath+"/lieu";
    }    

    this.state = { 
        isLoaded: false,
        error: null,
        id: id, 
        url: url
      };
  }

  componentDidMount() {
    if ( this.state.id != -1) {
      // on est en modification
      // on récupere les éléments du lieu
      fetch(this.state.url+"/"+this.state.id)
      .then(result => result.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true
            });
          this.lieu = result; 
          this.id = this.state.id;
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }

  }
// renvoi JSX du formulaire de modification ou de création
  getLieu() {
    let lieu = this.lieu;
    if (lieu) {
      console.log("Modification du Lieu id="+lieu.id_Lieu);
      return <div className='container-fluid'><form id='form' name='form'><div className='mb-3'><label htmlFor='nom' className='form-label'>Nom du Lieu</label><input type='hidden' id='id_Lieu' defaultValue={this.lieu.id_Lieu}></input><input type='text' className='form-control' id='nom' aria-describedby='nomAide' defaultValue={this.lieu.nom}></input><div id='nomAide' className='form-text'>Entrez le nom du Lieu</div></div>
      <div className='mb-3'><label htmlFor='numero' className='form-label'>Numéro</label><input type='text' className='form-control' id='numero' aria-describedby='numAide' defaultValue={this.lieu.numero}></input><div id='numAide' className='form-text'>Entrez le numéro de l'adresse</div></div>
      <div className='mb-3'><label htmlFor='rue' className='form-label'>Rue</label><input type='text' className='form-control' id='rue' aria-describedby='rueAide' defaultValue={this.lieu.rue}></input><div id='rueAide' className='form-text'>Entrez le nom de la voie</div></div>
      <div className='mb-3'><label htmlFor='codePostal' className='form-label'>Code Postal</label><input type='text' className='form-control' id='codePostal' aria-describedby='codePostalAide' defaultValue={this.lieu.codePostal}></input><div id='codePostalAide' className='form-text'>Entrez le code Postal</div></div>
      <div className='mb-3'><label htmlFor='ville' className='form-label'>Ville</label><input type='text' className='form-control' id='ville' aria-describedby='villeAide' defaultValue={this.lieu.ville}></input><div id='villeAide' className='form-text'>Entrez le nom de la ville</div></div>
      <div className='mb-3'><label htmlFor='description' className='form-label'>Description</label><textarea className='form-control' id='description' aria-describedby='descriptionAide' defaultValue={this.lieu.description}></textarea><div id='descriptionAide' className='form-text'>Entrez la description du Lieu</div></div>
      <button type="submit" className="btn boutonHendaye" onClick={this.modificationLieu}>Modification</button></form></div>
       
      }
     else {
      console.log("Création");
      return <div className='container-fluid'><form id='form' name='form'><div className='mb-3'><label htmlFor='nom' className='form-label'>Nom du Lieu</label><input type='text' className='form-control' id='nom' aria-describedby='nomAide'></input><div id='nomAide' className='form-text'>Entrez le nom du Lieu</div></div>
      <div className='mb-3'><label htmlFor='numero' className='form-label'>Numéro</label><input type='text' className='form-control' id='numero' aria-describedby='numAide'></input><div id='numAide' className='form-text'>Entrez le numéro de l'adresse</div></div>
      <div className='mb-3'><label htmlFor='rue' className='form-label'>Rue</label><input type='text' className='form-control' id='rue' aria-describedby='rueAide' ></input><div id='rueAide' className='form-text'>Entrez le nom de la voie</div></div>
      <div className='mb-3'><label htmlFor='codePostal' className='form-label'>Code Postal</label><input type='text' className='form-control' id='codePostal' aria-describedby='codePostalAide'></input><div id='codePostalAide' className='form-text'>Entrez le code Postal</div></div>
      <div className='mb-3'><label htmlFor='ville' className='form-label'>Ville</label><input type='text' className='form-control' id='ville' aria-describedby='villeAide'></input><div id='villeAide' className='form-text'>Entrez le nom de la ville</div></div>
      <div className='mb-3'><label htmlFor='description' className='form-label'>Description</label><textarea className='form-control' id='description' aria-describedby='descriptionAide'></textarea><div id='descriptionAide' className='form-text'>Entrez la description du Lieu</div></div>
      <button type="submit" className="btn boutonHendaye" onClick={this.ajoutLieu}>Ajout</button></form></div>
     }
     
   }

   // ajout d'un lieu
  ajoutLieu(e)  {
    e.preventDefault();
    const form1 = document.querySelector('form');
    let donnee= new FormData(form1); // creation du form data pour les données à envoyer
    // on prend -1 pour ne pas envoyer l bouton
    for (let pas = 0; pas < form1.elements.length-1; pas++) {
        donnee.append(form1.elements[pas].id, form1.elements[pas].value);
    }

    // creation du format json a envoyer
    var object = {};
    donnee.forEach(function(value, key){
    object[key] = value;
    });
    var json = JSON.stringify(object);

    // une fois les données transformées en JSON
    // On essaye de se connecter

  // on reconstruit l'url à partir de la config
  localStorage.getItem("config");
  var url = "http://localhost/api/lieu";
  if ( config ) {
     url = "http://"+config.HostApi+":"+config.port+config.basePath+"/lieu";
  }    
    
    var xhr = new XMLHttpRequest();
    // methode http PUT 
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    // on recupere le jeton
    let jeton = localStorage.getItem("jeton");

    let auth = JSON.parse(jeton);
      // on le passe dans le header pour le service en backend puisse faire les vérifications
    xhr.setRequestHeader("Authorization","access_token "+auth.access_token);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 201) {
          // si on a un code 201 alors l ajout s est bien passé
          var obj = JSON.parse(xhr.responseText);
          console.log("Lieu ajouté")
          // on repart sur l'écran de gestion des types d'activité
          document.location.href ="listeLieu.html?type=liste";
        }
        else {
          // si 401 access non autorisé
          if (xhr.readyState === 4 && xhr.status === 401) {
            console.log("non autorisé");
          }
        }
    };
    
    xhr.send(json);
  }

  // modification d'un lieu
modificationLieu(e)  {
  e.preventDefault();
  const form1 = document.querySelector('form');
  let donnee= new FormData(form1);
  // on prend -1 pour ne pas envoyer le bouton
  for (let pas = 0; pas < form1.elements.length-1; pas++) {
    donnee.append(form1.elements[pas].id, form1.elements[pas].value);
  }

  // creation du format json a envoyer
  var object = {};
  donnee.forEach(function(value, key){
    object[key] = value;
  });
  var json = JSON.stringify(object);


  // une fois les données transformées en JSON
  // On essaye de se connecter
  // on reconstruit l'url à partir de la config
  localStorage.getItem("config");
  var url = "http://localhost/api/lieu";
  if ( config ) {
     url = "http://"+config.HostApi+":"+config.port+config.basePath+"/lieu";
  }    
    
  var xhr = new XMLHttpRequest();
  // on ajout l id du lieu que l'on modifie
  url += "/"+recupParametre("id");
  // methode http PATCH
  xhr.open("PATCH", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  // on recupere le jeton
  let jeton = localStorage.getItem("jeton");

  let auth = JSON.parse(jeton);
  // on ajoute le jeton pour verification par le service backend
  xhr.setRequestHeader("Authorization","access_token "+auth.access_token);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 202) {
      // si on a un code 202 alors l'authentification est bonne et ma modification ok
      var obj = JSON.parse(xhr.responseText);
      console.log("Lieu modifié")
      // on repart sur l'écran de gestion des types d'activité
      document.location.href ="listeLieu.html?type=liste";
  }
  else {
      // si 401 access non autorisé
      if (xhr.readyState === 4 && xhr.status === 401) {
          console.log("non autorisé");
       }
      }
  };

xhr.send(json);
}
  // affichage
  render() {
    const { error, isLoaded , id } = this.state;
     if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded && id != -1 ) {
      return <div>Loading...</div>;
    } else {
      if ( id != -1) {
        return (
          <ul>
            {this.getLieu()}
           </ul>
        );
      }
      else {
        return (<ul>
          {this.getLieu()}
         </ul>);
      }

    }
  }

  
}

// instanciation du composant react
const domContainer = document.querySelector('#lieuComposant');
const root2 = ReactDOM.createRoot(domContainer);
// initiailisation de l etat modification ou creation
var id1 = recupParametre("id");
root2.render(React.createElement(LieuComposant, {id: id1}));


