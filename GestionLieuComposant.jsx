'use strict';

const e = React.createElement;

// Composant de Gestion des lieux
class GestionLieuComposant extends React.Component {
  constructor(props) {
    super(props);
    const type = props.type;

    // on charge la config
    localStorage.getItem("config");
    var url = "http://localhost/api/lieu";
    if ( config ) {
      url = "http://"+config.HostApi+":"+config.port+config.basePath+"/lieu";
    }
  
    this.state = { 
        isLoaded: false,
        error: null,
        type: type,
        url: url
      };
  }
// on récupere tous les lieux
  componentDidMount() {
    fetch(this.state.url)
      .then(result => result.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
          });
          this.lieuListe = result; 
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

// suppression d'un lieu
suppressionLieu(e)  {
  // on reconstruit l'url à partir de la config
  localStorage.getItem("config");
  var url = "http://localhost/api/lieu";
  if ( config ) {
     url = "http://"+config.HostApi+":"+config.port+config.basePath+"/lieu/"+e.target.dataset.id;
  }
  var xhr = new XMLHttpRequest();
  // methode http delete
  xhr.open("DELETE", url, true);
  // on récupere le jeton
  var jeton = localStorage.getItem('jeton');
  if ( jeton)  {
    console.log(jeton);
    let auth = JSON.parse(jeton);
    // ajoute le jeton dans les headers
    xhr.setRequestHeader("Authorization","access_token "+auth.access_token);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 202) {
            // si on a un code 202 alors suppression OK
            var obj = JSON.parse(xhr.responseText);
            console.log("lieu supprimé")
        }
        else {
            // si 401 access non autorisé
            if (xhr.readyState === 4 && xhr.status === 401) {
                console.log("non autorisé");
             }
            }
        };
      xhr.send();
      // on recharge la page en cours pour mettre à jour la liste
      document.location.reload();
  }
  else {
    console.log("pas de jeton");
  }
  
 }
// acces a la modification du lieu
 modificationLieu(e)  {
   document.location.href =" ajoutLieu.html?id="+e.target.dataset.id;
 }

 // on fait le rendu de la liste en JSX pour les administrateurs
 getLieuListeElements() {
   let listeLieu = this.lieuListe;
   if (listeLieu) {
     return listeLieu.map((lieu) => <tr><td key={lieu.id_Lieu}>{lieu.nom.toString()}</td><td><button className='btn boutonHendayeModif' data-id={lieu.id_Lieu} onClick={this.modificationLieu}> Modification </button> <button className='btn btn-danger' data-id={lieu.id_Lieu} onClick={this.suppressionLieu}> Suppr </button></td></tr>);
    }
    else {
      return <li>empty</li>
    }
    
  }

  // rendu pour la liste des select
  getLieuListeSelect() {
    let listeLieu = this.lieuListe;
    if (listeLieu) {
      return listeLieu.map((lieu) => <option key={lieu.id_Lieu} value={lieu.id_Lieu}>{lieu.nom.toString()}</option>);   
    }
    else {
      return <option>empty</option>
    }
    
  }


  // affichage
  render() {
    const { error, isLoaded, type } = this.state;
     if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
        if (type == 'liste') {
          return (
            <div className="table-responsive">
            <table className='table table-striped'><thead className='textHendaye'><tr><th scope='col'>Nom du Lieu</th><th></th></tr></thead>
            <tbody>
              {this.getLieuListeElements()}
             </tbody>
             </table>
             </div>
          );
        }
        else if (type == 'listeSelect') {
          console.log(type);
          return (
            <select id='type' className="form-select" aria-describedby='typeAide'>
              {this.getLieuListeSelect()}
             </select>
          );
         
        
        }
      
    }
  }
}

function recupParametre() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams (queryString);
  const typeAffichage = urlParams.get ('type')

  if (typeAffichage) {
    return typeAffichage;
  }
  else {
    return "listeSelect";
  }

}

const domContainer1 = document.querySelector('#lieuListeComposant');
const root = ReactDOM.createRoot(domContainer1);
var typeListe = recupParametre();
root.render(React.createElement(GestionLieuComposant, { type: typeListe }));
