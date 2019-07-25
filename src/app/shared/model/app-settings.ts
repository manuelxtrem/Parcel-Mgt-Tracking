export class AppSettings {
  public static get APP_NAME(): string {
    return 'eParcel Delivery Manager';
  }

  public static get SERVER(): string {
    return 'http://127.0.0.1:5000/api';
    // return 'http://192.168.137.1:5000/api';
    // return 'http://192.168.1.200:5000/api';
  }
  public static get SERVER_AUTH(): string {
    return 'http://127.0.0.1:5500';
    // return 'http://192.168.137.1:5500';
    // return 'http://192.168.1.200:5500';
  }
  public static get API_KEY(): string {
    return 'kocc4gkg848gs4c04cwwg4o0gwko8kogsc808088';
  }
  public static get SESSION(): string {
    return localStorage.getItem('login_session');
  }
  public static get USER_AUTH(): string {
    return localStorage.getItem('login_auth');
  }
}
