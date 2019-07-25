export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: string;
  token?: string;
}

export class LoginDetail {
  userId: number;
  email: string;
  password: string;
  repeatPassword: string;
  token: string;
}

export class RegisterDetail {
  email: string;
  userName?: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  personId: number;
  isCustomer: boolean;
}

export class TokenResult {
  id: string;
  userId: number;
  accessToken: string;
  tokenType: string;
}

export class UserType {
  public static get STAFF(): string {
    return 'staff';
  }
  public static get ADMIN(): string {
    return 'administrator';
  }
  public static get DRIVER(): string {
    return 'driver';
  }
  public static get CUSTOMER(): string {
    return 'customer';
  }
}

/*
localStorage.setItem('users', JSON.stringify([
    {

    id: 1,
    username: "administrator",
    password: "asdfasdf",
    firstName: "Admin",
    lastName: "Istrator",
    userType: "administrator",
    token: "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf"
},
    {

    id: 2,
    username: "0242443401",
    password: "asdfasdf",
    firstName: "Test",
    lastName: "User",
    userType: "customer",
    token: "12341234123412341234123412341234123412341234"
    }
]));
*/
