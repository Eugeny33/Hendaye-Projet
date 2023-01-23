'use strict';

const e = React.createElement;

// composant permettant de gérer les listes d'activité
// Affichage des liste
// Suppression d'une activité (entraine la suppression des la "liste")
class GestionActiviteComposant extends React.Component {
  constructor(props) {
    super(props);
    const activiteListe = [];
    const type = props.type;
    const typeActivite = props.typeActivite;
    // on charge la config permettant de d'utiliser le backend
    localStorage.getItem("config");
    var url = "http://localhost/api/activites";
    if ( config ) {
      url = "http://"+config.HostApi+":"+config.port+config.basePath+"/activites";
    }    
    this.state = { 
        isLoaded: false,
        error: null,
        type: type,
        typeActivite: typeActivite,
        url: url
      };
  }

  componentDidMount() {
    if ( this.state.type == "liste") {
      // cas de l'administrateur il cree peut agir sur toutes les activités
      // on les récupere toutes
      fetch(this.state.url)
      .then(result => result.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
          });
          this.activiteListe = result; 
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
    else {
      // cas de l'utilisateur qui voit les activités d'un type
      fetch(this.state.url+"/type/"+this.state.typeActivite)
      .then(result => result.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
          });
          this.activiteListe = result; 
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

  // suppresion d'une activité
suppressionActivite(e)  {
  var xhr = new XMLHttpRequest();
  // on reconstruit l'url à partir de la config
  localStorage.getItem("config");
  var url = "http://localhost/api/activites";
  if ( config ) {
     url = "http://"+config.HostApi+":"+config.port+config.basePath+"/activites/"+e.target.dataset.id;
  }
  // methode http DELETE
  xhr.open("DELETE", url, true);
  // on récupere le jeton du localstorage
  var jeton = localStorage.getItem('jeton');
  if ( jeton)  {
    let auth = JSON.parse(jeton);
    // on envoie le jeton dans le header http pour vérification par le service de backend
    xhr.setRequestHeader("Authorization","access_token "+auth.access_token);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 202) {
            // si on a un code 202 alors suppression
            var obj = JSON.parse(xhr.responseText);
            console.log("activité supprimée");
        }
        else {
            // si 401 access non autorisé
            if (xhr.readyState === 4 && xhr.status === 401) {
                console.log("non autorisé");
             }
            }
        };
      xhr.send();
      document.location.reload();
  }
  else {
    console.log("pas de jeton");
  }
  
 }
// access a la modification d'une activité 
// on récupere l id pour le passer dans l'url
 modificationActivite(e)  {
   document.location.href ="ajoutActivite.html?id="+e.target.dataset.id+"&type=modification";
 }

 // access au détail d'une activité 
// on récupere l id pour le passer dans l'url
 detailActivite(e)  {
  document.location.href ="detailActivite.html?id="+e.target.dataset.id;
}

// rendu JSX sous forme de liste pour affichage 
 getActiviteListeElements() {
   let listeActivite = this.activiteListe;
   if (listeActivite) {
     return listeActivite.map((activite) => <tr><td key={activite.id}>{activite.nom.toString()}</td><td><button className='btn boutonHendayeModif' data-id={activite.id} onClick={this.modificationActivite}> Modification </button> <button className='btn btn-danger' data-id={activite.id} onClick={this.suppressionActivite}> Suppr </button></td></tr>);
    }
    else {
      return <li>empty</li>
    }
    
  }

  // affichage du détail des activité 
  // on utilise le composant card de bootstrap
  getUtilisateurActiviteListeElements() {
    let listeActivite = this.activiteListe;
    if (listeActivite) {
    return listeActivite.map((activite) => <div className='card' key={activite.id}><div className='card-header'>{activite.nom.toString()}</div>
      <div className='card-body'>
         <p className="card-text">{activite.resume.toString()}</p>
         <a className="btn boutonHendaye" data-id={activite.id} onClick={this.detailActivite}>Détail</a>
  </div>
</div>
    
  
   );   
     }
     else {
       return <h1>empty</h1>
     }
     
   }

   // affichage selon le type
   // si c est liste on est dans la partie admin et on affiche les activités pour modifs et suppression
   // si c est utilisateur par Type alors on est dans la partie utilisateur et on affiche les activité pour avoir le détail et les avis
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
            <table className='table table-striped'><thead className='textHendaye'><tr><th scope='col'>Nom de l'Activité</th><th></th></tr></thead>
            <tbody>
              {this.getActiviteListeElements()}
             </tbody>
             </table>
             </div>
          );
        }
        else {
          if (type == 'utilisateurParType') {
            return (
              <div className='container-fluid'>
              {this.getUtilisateurActiviteListeElements()}
              </div>
            );
            
          }
        }
      }
      
  }
}

const domContainer = document.querySelector('#activiteListeComposant');
const root = ReactDOM.createRoot(domContainer);
const type = recupParametre("type");
const typeActivite = recupParametre("typeActivite");
root.render(React.createElement(GestionActiviteComposant, {type: type, typeActivite: typeActivite}));

