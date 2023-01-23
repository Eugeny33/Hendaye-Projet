'use strict';

const e = React.createElement;

// gestion de la liste des Types d'activi&
class GestionTypeActiviteComposant extends React.Component {
  constructor(props) {
    super(props);
    const typeActiviteListe = [];
    const type = props.type;
    // on charge la config
    localStorage.getItem("config");
    var url = "http://localhost/api/type-activite";
    if ( config ) {
      url = "http://"+config.HostApi+":"+config.port+config.basePath+"/type-activite";
    }

    this.state = { 
        isLoaded: false,
        error: null,
        type: type,
        url: url
      };

  }

  // on récupère les listes d'activités
  componentDidMount() {
    // on recupere l'url du state
    fetch(this.state.url)
      .then(result => result.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true
          });
          this.typeActiviteListe = result; 
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

  // on supprime un type d'Activité
suppressionTypeActivite(e)  {
  // on reconstruit l'url à partir de la config
  localStorage.getItem("config");
    var url = "http://localhost/api/type-activite";
    if ( config ) {
      url = "http://"+config.HostApi+":"+config.port+config.basePath+"/type-activite/"+e.target.dataset.id;
    }
  var xhr = new XMLHttpRequest();

  // methode http DELETE
  xhr.open("DELETE", url, true);
  // on récupere le jeton
  var jeton = localStorage.getItem('jeton');
  if ( jeton)  {
    console.log(jeton);
    let auth = JSON.parse(jeton);
    // on ajoute le jeton dans le header autorization
    xhr.setRequestHeader("Authorization","access_token "+auth.access_token);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // si on a un code 200 alors l'authentification est bonne et on le stocke dans le localstorage
            var obj = JSON.parse(xhr.responseText);
            console.log("type activité supprimé")
        }
        else {
            // si 401 access non autorisé
            if (xhr.readyState === 4 && xhr.status === 401) {
                console.log("non autorisé");
             }
            }
        };
      xhr.send();
      // on recharge la page pour mettre à jour la liste
      document.location.reload();
  }
  else {
    console.log("pas de jeton");
  }
  
 }
// acces à la modification du type d'activité
 modificationTypeActivite(e)  {
   document.location.href =" ajoutTypeActivite.html?id="+e.target.dataset.id;
 }

 // rendu JSX de la liste des type d'activités
 getTypeActiviteListeElements() {
   let listeActivite = this.typeActiviteListe;
   if (listeActivite) { // on affiche la liste pour l admin donc avec modification et suppression
     return listeActivite.map((activite) => <tr><td key={activite.id_Activited}>{activite.nom.toString()}</td><td><button className='btn boutonHendayeModif' data-id={activite.id_Activite} onClick={this.modificationTypeActivite}> Modification </button> <button className='btn btn-danger' data-id={activite.id_Activite} onClick={this.suppressionTypeActivite}> Suppr </button></td></tr>);
    }
    else {
      return <li>empty</li>
    }
    
  }

  // rendu JSX pour afficher les types d'activités dans un select bootstrap
  getTypeActiviteListeSelect() {
    let listeActivite = this.typeActiviteListe;

   if (listeActivite) {
    return listeActivite.map((activite) => <a key={activite.id_Activite} className='dropdown-item headerHendaye' href={'listeActiviteUtilisateur.html?type=utilisateurParType&typeActivite='+activite.id_Activite}>{activite.nom.toString()}</a>);   
    }
    else {
      return <li>empty</li>
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
          // affichage de la liste des types pour les administrateurs
          return (
            <div className="table-responsive">
            <table className='table table-striped'><thead className='textHendaye'><tr><th scope='col'>Nom du type d'Activité</th><th></th></tr></thead>
            <tbody>
              {this.getTypeActiviteListeElements()}
             </tbody>
             </table>
             </div>
          );
        }
        else if (type == 'listeSelect') {
          // affichage pour le select du menu de la page principale
          return ( <i>{this.getTypeActiviteListeSelect()}</i>);
        }
      
    }
  }
}

function recupParametre() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams (queryString);
  const typeAffichage = urlParams .get ('type')
  // console.log (typeAffichage);
  if (typeAffichage) {
    return typeAffichage;
  }
  else {
    // pas d'id retour -1
    return "listeSelect";
  }

}

const domContainer = document.querySelector('#typeActiviteListeComposant');
const root = ReactDOM.createRoot(domContainer);
var typeListe = recupParametre();
root.render(React.createElement(GestionTypeActiviteComposant, { type: typeListe }));
