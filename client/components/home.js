const template = `
  <h3>{{ HomePage.welcome }}</h3>
`;

class Home {

  static $inject = ['$http']

  constructor($http) {
    this.welcome = 'loading';
    $http.get('/version')
      .then((res) => {
        this.welcome = res.data;
      })
    ;
  }
}

export default {
  name: 'home',
  url: '/',
  template,
  controller: Home,
  controllerAs: 'HomePage'
};
