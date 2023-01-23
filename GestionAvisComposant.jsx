'use strict';

const e = React.createElement;
// composant permettant de gérer les avis
class GestionAvisComposant extends React.Component {
  constructor(props) {
    super(props);
    const avisListe = [];
    const id = props.id;
    const conn = props.conn;
    const admin = props.admin ;
    // on charge la config
    localStorage.getItem("config");
    var url = "http://localhost/api/";
    if ( config ) {
       url = "http://"+config.HostApi+":"+config.port+config.basePath;
     }

    this.state = { 
        isLoaded: false,
        error: null,
        id: id,
        conn: conn,
        admin: admin,
        url: url
       
      };  
  }

  componentDidMount() {
    // on récupère les avis pour l'activité en cours 
      fetch(this.state.url+"/avis/activite/"+this.state.id)
      .then(result => result.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,

          });
          this.avisListe = result; 
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
      );
      this.admin = this.state.admin;
      // on récupère le jeton
      var jeton = localStorage.getItem('jeton');
      var myHeaders = new Headers();
      this.admin = false;
      if ( jeton)  {
        let auth = JSON.parse(jeton);
        // on ajoute le token dans les header http
        myHeaders.append("Authorization","access_token "+auth.access_token);
      }

      /*var it = myHeaders.entries();
      let resultat = it.next();
      while (!resultat.done) {
        console.log(resultat.value);
        resultat = it.next();
      }*/
      var myInit = { method: 'GET',
      headers: myHeaders,
      mode: 'cors'};

      // on verifie si on est administrateur
     fetch(this.state.url+"/login/isAdmin/",myInit)
     .then(result => result.json())
     .then(
       (result) => {
         this.admin = result; 
       },
       // Note: it's important to handle errors here
       // instead of a catch() block so that we don't swallow
       // exceptions from actual bugs in components.
       (error) => {
         this.setState({
           error
         });
       }
     ) 
    
  }
// on supprime un avis
suppressionAvis(e)  {
  // on reconstruit l'url à partir de la config
  localStorage.getItem("config");
  var url = "http://localhost/api/avis";
  if ( config ) {
     url = "http://"+config.HostApi+":"+config.port+config.basePath+"/avis/"+e.target.dataset.id;
  }  
  var xhr = new XMLHttpRequest();
 // methpde http DELE
  xhr.open("DELETE", url, true);
  // on récupere le jeton
  var jeton = localStorage.getItem('jeton');
  if ( jeton)  {
    let auth = JSON.parse(jeton);
    // on le passe dans le header autorization
    xhr.setRequestHeader("Authorization","access_token "+auth.access_token);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 202) {
            // si on a un code 202 alors la suppression est OK
            var obj = JSON.parse(xhr.responseText);
            console.log("activité supprimée")
        }
        else {
            // si 401 access non autorisé
            if (xhr.readyState === 4 && xhr.status === 401) {
                console.log("non autorisé");
             }
            }
        };
      xhr.send();
      // on recharge la page pour rafraichir la liste
      document.location.reload();
  }
  else {
    console.log("pas de jeton");
  }
  
 }

 // affichage des avis 
 getAvisListeElements() {
   let listeAvis = this.avisListe;
   let estAdmin = this.admin;
   if (listeAvis) {
     if ( estAdmin == true) {
       console.log("administrateur "+this.admin);
       // admin on peut supprimer
      return listeAvis.map((avis) => <tr><th scope='row' key={avis.id}>{avis.email.toString()}</th><td>{avis.etoiles.toString()}</td><td>{avis.commentaire.toString()}</td><td><button className='btn btn-danger' data-id={avis.id} onClick={this.suppressionAvis}>Suppr</button></td></tr>);   
     }
     else { // on est pas admin donc uniquement l'affichage des avis
      return listeAvis.map((avis) => <tr><th scope='row' key={avis.id}>{avis.email.toString()} </th><td>{avis.etoiles.toString()} </td><td>{avis.commentaire.toString()} </td></tr>);   
     }
      
    }
    else {
      return <li>empty</li>
    }
    
  }

  // ajout d'un avis
  ajoutAvis(e)  {
    e.preventDefault();
    const form1 = document.querySelector('#form1');
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
    // On verifie si l'on est connecté
    let jeton = localStorage.getItem("jeton");
    if ( jeton) {
      var xhr = new XMLHttpRequest();
      // on reconstruit l'url à partir de la config
      localStorage.getItem("config");
      var url = "http://localhost/api/avis";
      if ( config ) {
        url = "http://"+config.HostApi+":"+config.port+config.basePath+"/avis";
      }
      // http PUT
      xhr.open("PUT", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      let auth = JSON.parse(jeton);
      // on récupere le jeton
      // on le passe dans les headers http
      xhr.setRequestHeader("Authorization","access_token "+auth.access_token);
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 201) {
            // si on a un code 201 alors l'authentification et l'ajout OK
            var obj = JSON.parse(xhr.responseText);
            console.log("avis ajouté")
            // on repart sur l'écran de gestion des types d'activité
            document.location.href ="detailActivite.html?id="+recupParametre('id');
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
    else ( alert('vous n etes pas connecté'));

  }
     
  // affichage
  render() {
    const { error, isLoaded, conn, id } = this.state;
     if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      if (conn) {
        // administrateur ou utilisateur authentifié
          return (
            <div className='container-fluid'>
              <h1>Avis</h1><br></br>
              <div className="table-responsive">
              <table className='table table-striped'><thead className='textHendaye'><tr><th scope='col'>Utilisateurs</th><th scope='col'>Etoiles</th><th scope='col'>Commentaires</th>
             </tr></thead>
             <tbody>
              {this.getAvisListeElements()}
              </tbody>
              </table>
              </div>
              <h2>Ajouter un avis ? </h2>
              <form id='form1' name='form1'>
                <div className='mb-3'><label htmlFor='etoiles' className='form-label'>Etoile de l'activité</label><select className='form-select form-select-lg mb-3' id='etoiles' aria-describedby='etoilesAide' ><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option> </select><div id='etoilesAide' className='form-text'>Note l'activité</div></div>
                <div className='mb-3'><label htmlFor='commentaire' className='form-label'>Avis</label><textarea className='form-control' id='commentaire' aria-describedby='commentaireAide' rows='4'></textarea><div id='commentaireAide' className='form-text'>Avis sur l'activité</div></div>
                <input type='hidden' className='form-control' id='id_Activite' value={this.state.id}></input>
                <input type='hidden' className='form-control' id='id_User' value='1'></input>
                <button type="submit" className="btn boutonHendaye" onClick={this.ajoutAvis}>Ajout</button>
              </form>
            </div>
          );
          // 
        }
        else {
          // utilisateur anonyme
          return (
            <div className='container-fluid'>
              <h1>Avis</h1><br></br>
              <table className='table table-striped'><thead className='textHendaye'><tr><th scope='col'>Utilisateurs</th><th scope='col'>Etoiles</th><th scope='col'>Commentaires</th>
             </tr></thead>
             <tbody>
              {this.getAvisListeElements()}
              </tbody>
              </table>
              </div>
          );
        }
      }
     
  }
}

const domContainer = document.querySelector('#listeAvisComposant');
const root = ReactDOM.createRoot(domContainer);
const admin = false;
const id = recupParametre("id");
let jeton = localStorage.getItem("jeton");
let conn = false;
if ( jeton ) {
  conn = true;
}
else {
  conn = false;
}

root.render(React.createElement(GestionAvisComposant, {id: id , conn: conn , admin: admin}));
