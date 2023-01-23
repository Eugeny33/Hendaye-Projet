function recupParametre(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams (queryString);
  const idObj = urlParams.get(param)

  if (idObj) {
    return idObj;
  }
  else {
    // pas d'id retour -1
    return -1;
  }

}
