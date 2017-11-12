import packageJson from '../../package.json';

export default class Home {

  constructor() {
    this.welcome = packageJson.version;
  }
}
