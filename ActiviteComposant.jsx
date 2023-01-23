'use strict';

const e = React.createElement;

// Composant permettant l'affichage du lieu de l'Activité
class Lieu extends React.Component {

  constructor(props) {
    super(props);
    const lieu = null;
    const id = props.id;

    // on charge la config pour appeler l'application Back
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
  // on récupère les éléments du Lieu en asynchrone
  componentDidMount() {
    fetch(this.state.url+"/"+this.state.id)
      .then(result => result.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
          });
          this.lieu = result; 
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

  // on créé le rendu en affichage simple
  getLieu() {
    let lieu = this.lieu;
    if (lieu) {
      return <div className='row'> <div className='col mb-3'>Lieu de l'activité </div> <div className='col mb-3'>  {lieu.nom}</div></div>
    }
    else {
      return <div className='row'> <div className='col mb-3'>Lieu de l'activité </div> <div className='col mb-3'>  vide </div></div>
    }
    
  }

 
  render() {
   return (<div>{this.getLieu()}</div>);
  }
}


// Composant permettant l'affichage du type de l'Activité
class TypeActivite extends React.Component {

  constructor(props) {
    super(props);
    const type = null;
    const id = props.id;
   // on charge la config pour appeler l'application Back
   localStorage.getItem("config");
   var url = "http://localhost/api/type-activite";
   if ( config ) {
       url = "http://"+config.HostApi+":"+config.port+config.basePath+"/type-activite";
    }

    this.state = { 
        isLoaded: false,
        error: null,
        id: id,
        url: url
      };
  }
    // on récupère les éléments du type d'activité en asynchrone
  componentDidMount() {
    fetch(this.state.url+"/"+this.state.id)
      .then(result => result.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
          });
          this.type = result; 
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

  // on créé le rendu c'est un affichage simple
  getTypeActivite() {
    let type = this.type;
    if (type) {
      return <div className='row'> <div className='col mb-3'>Type de l'activité </div> <div className='col mb-3'>  {type.nom}</div></div>
    return <h2>{type.nom}</h2>
    }
    else {
      return <div className='row'> <div className='col mb-3'>Type de l'activité </div> <div className='col mb-3'>  vide </div></div>
    }
    
  }

 
  render() {
   return (<div>{this.getTypeActivite()}</div>);
  }
}

// composant permettant la sélection du Lieu lors de la création et/ou de la modification
class SelectLieu extends React.Component {

  constructor(props) {
    super(props);
    const lieuListe = null;
    const id = props.id;

    // on charge la config pour appeler le Back
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

  // on récupere la liste des lieux
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

  // on créé le rendu de la liste
  getLieuListeSelect(valeur) {
    let listeLieu = this.lieuListe;
    if (listeLieu) {
      // on cree les éléments de la liste
      let retour = listeLieu.map((lieu) => <option key={lieu.id_Lieu} value={lieu.id_Lieu}>{lieu.nom.toString()}</option> );   
       return retour;

    }
    else {
      return <option>empty</option>
    }
    
  }

  // on affiche un select bootstrap en tant que rendu
  render() {
   return (<div className='mb-3'><label htmlFor='lieu' className='form-label'>Lieu</label><select onChange={this.handleChange} className="form-select form-select-lg mb-3" id='lieu' aria-describedby='lieuAide' 
  value={this.state.id}>{this.getLieuListeSelect()}</select><div id='lieuAide' className='form-text'>Lieu </div></div>);
  }
}

// composant permettant la sélection du Type d'Activité lors de la création et/ou de la modification
class SelectType extends React.Component {

  constructor(props) {
    super(props);
    const typeActiviteListe = null;
    const id = props.id;

   // on charge la config pour appeler l'application Back
   localStorage.getItem("config");
   var url = "http://localhost/api/type-activite";
   if ( config ) {
       url = "http://"+config.HostApi+":"+config.port+config.basePath+"/type-activite";
    }

    this.state = { 
        isLoaded: false,
        error: null,
        id: id,
        url: url
      };
  }
  // on récupère les types d'activités 
  componentDidMount() {
    fetch(this.state.url)
      .then(result => result.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
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

    // rendu de la liste
  gettypeActiviteListeSelect() {
    let listeTypeActivite = this.typeActiviteListe;
    if (listeTypeActivite) {
      // on cree les éléments de la liste
      let retour = listeTypeActivite.map((typeActivite) => <option key={typeActivite.id_Activite} value={typeActivite.id_Activite}>{typeActivite.nom.toString()}</option> );   
       return retour;
    }
    else {
      return <option>empty</option>
    }
    
  }

  
// on affiche un select bootstrap avec les différents types d'Activité
  render() {
  return (<div className='mb-3'><label htmlFor='type' className='form-label'>Type d'Activité</label><select onChange={this.handleChange} className="form-select form-select-lg mb-3" id='type' aria-describedby='typeAide' value={this.state.id}>{this.gettypeActiviteListeSelect()}</select><div id='typeAide' className='form-text'>Type d'Activité </div></div>);
  }
}

// composant permettant de créer ou mettre à jour une Activité
class ActiviteComposant extends React.Component {
  constructor(props) {
    super(props);
    const activite = null;
    const id = props.id;
    const type = props.type;
    // on charge la config pour accéder au Back
    localStorage.getItem("config");
    var url = "http://localhost/api/activites";
    if ( config ) {
      url = "http://"+config.HostApi+":"+config.port+config.basePath+"/activites";
    }

    this.state = { 
        isLoaded: false,
        error: null,
        id: id,
        type: type,
        url: url
    };
  }


  componentDidMount() {
    // on est en modification
    if ( this.state.id != -1) {
      this.type = this.state.type;
      // on récupère les éléments de l'activité
      fetch(this.state.url+"/"+this.state.id)
      .then(result => result.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
        //    typeActiviteListe: result
          });
          this.activite = result; 
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

  // renvoi le rendu d'une activté en JSX
  getActivite() {
    let activite = this.activite;
    let type = this.type;

    if (activite) {
      // on est en modification ou en affichage
      if ( type != "user") {
        // on est en modificication
        console.log("Modification de l'activité id="+activite.id);
        // gestion du format de la date pour permettre l'utilisation du controle de type date
        var d = new Date(activite.date);
        var m = d.getMonth()+1;
        if (m < 10) { m = "0"+m};
        var j = d.getDate() ;
        if (j < 10) { j = "0"+j};
        var tmpDate = d.getFullYear()+"-"+m+"-"+j;
        // rendu bootStrap on utilise les composants préalablement créés
         return (<div className='container-fluid'><form id='form' name='form'><div className='mb-3'><label htmlFor='nom' className='form-label'>Nom de l'activité</label><input type='hidden' id='id' defaultValue={this.activite.id}></input><input type='text' className='form-control' id='nom' aria-describedby='nomAide' defaultValue={this.activite.nom}></input><div id='nomAide' className='form-text'>Entrez l'activité</div></div>
        <div className='mb-3'><label htmlFor='date' className='form-label'>Date</label><input type='date' className='form-control' id='date' aria-describedby='dateAide' defaultValue={tmpDate}></input><div id='dateAide' className='form-text'>Date De l'activité</div></div>
        <div className='mb-3'><label htmlFor='resume' className='form-label'>Résumé</label><textarea className='form-control' id='resume' aria-describedby='resumeAide' defaultValue={this.activite.resume}></textarea><div id='resumeAide' className='form-text'>Résumé de l'activité</div></div>
        <SelectLieu id={activite.lieu}></SelectLieu>  
        <SelectType id={activite.type}></SelectType>
        <button type="submit" className="btn boutonHendaye" onClick={this.modificationActivite}>Modification</button></form></div>);
      }
      else {
        // Affichage d'une activité
        // gestion du format de la date pour permettre l'utilisation du controle de type daye
        var d = new Date(activite.date);
        var m = d.getMonth()+1;
        if (m < 10) { m = "0"+m};
        var j = d.getDate() ;
        if (j < 10) { j = "0"+j};
        var tmpDate = d.getFullYear()+"-"+m+"-"+j;
        // rendu d'un activité en consultation on passe le type d'activité et le lieu au composant React
      return (<div className='container-fluid'>
        <div className='row'> <div className='col mb-3'>Nom de l'activité </div> <div className='col mb-3'>  {this.activite.nom}</div></div>
        <div className='row'> <div className='col mb-3'>Date de l'activité </div> <div className='col mb-3'>  {tmpDate}</div></div>
        <div className='row'> <div className='col mb-3'>Résumé de l'activité </div> <div className='col mb-3'>  {this.activite.resume}</div></div>
        <Lieu  id={this.activite.lieu}></Lieu>
        <TypeActivite  id={this.activite.type}></TypeActivite>
      </div>);

       }
      }
     else {
       // on est en création
      console.log("Création");
      // on affiche le formulaire BootStrap et on utilise les le composants Select préalablement créés
      return <div className='container-fluid'><form id='form' name='form'><div className='mb-3'>
        <label htmlFor='nom' className='form-label'>Nom de l'activité</label><input type='text' className='form-control' id='nom' aria-describedby='nomAide'></input><div id='nomAide' className='form-text'>Entrez l'activité</div></div>
      <div className='mb-3'><label htmlFor='date' className='form-label'>Date</label><input type='date' className='form-control' id='date' aria-describedby='dateAide'></input><div id='dateAide' className='form-text'>Date De l'activité</div></div>
      <div className='mb-3'><label htmlFor='resume' className='form-label'>Résumé</label><textarea className='form-control' id='resume' aria-describedby='resumeAide'></textarea><div id='resumeAide' className='form-text'>Résumé de l'activité</div></div>
        <SelectLieu></SelectLieu>  
        <SelectType></SelectType>
       
      <button type="submit" className="btn boutonHendaye" onClick={this.ajoutActivite}>Submit</button>
      </form>
      </div>
     }
     
   }

  // fonction d'ajout
  ajoutActivite(e)  {
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
    var url = "http://localhost/api/activites";
    if ( config ) {
      url = "http://"+config.HostApi+":"+config.port+config.basePath+"/activites";
    }

    var xhr = new XMLHttpRequest();
    // on utilise la méthode PUT pour la création
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    // on recupere le jeton
    let jeton = localStorage.getItem("jeton");
    if ( jeton ) {
      let auth = JSON.parse(jeton);
      // on ajoute le jeton qui nous permettra de vérifier les droits dans l'application de backend
      xhr.setRequestHeader("Authorization","access_token "+auth.access_token);
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 201) {
            // si on a un code 201 alors l ajout est OK
            var obj = JSON.parse(xhr.responseText);
            console.log("Activite ajouté")
            // on repart sur l'écran de gestion des types d'activité
            document.location.href ="listeActivite.html?type=liste";
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
    else {
      alert('vous n etes pas connecté');
    }

  }
// modiciation de l'activité
modificationActivite(e)  {
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
    var url = "http://localhost/api/activites";
    if ( config ) {
      url = "http://"+config.HostApi+":"+config.port+config.basePath+"/activites";
    }
  var xhr = new XMLHttpRequest();
  // on ajoute l'id de l activité à modifier
  url += "/"+recupParametre("id");
  // méthode http PATCH pour la modification
  xhr.open("PATCH", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  // on recupere le jeton
  let jeton = localStorage.getItem("jeton");

  let auth = JSON.parse(jeton);
  // ajoute le jeton pour controle sur le backend
  xhr.setRequestHeader("Authorization","access_token "+auth.access_token);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 202) {
      // si on a un code 202 alors la modification est OK
      var obj = JSON.parse(xhr.responseText);
      console.log("Activité modifiés")
      // on repart sur l'écran de gestion des types d'activité
      document.location.href ="listeActivite.html?type=liste";
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
            {this.getActivite()}
           </ul>
        );
      }
      else {
        return (<ul>
          {this.getActivite()}
         </ul>);
      }

    }
  }

  
}

// instanciation du composant react
const domContainer = document.querySelector('#activiteComposant');
const root2 = ReactDOM.createRoot(domContainer);

// initiailisation de l etat modification ou creation
var id1 = recupParametre("id");
var type = recupParametre("type");
if ( type == -1 ) {
  type = "user";
  
}



root2.render(React.createElement(ActiviteComposant, {id: id1 , type: type}));


