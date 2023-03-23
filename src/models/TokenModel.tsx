export interface AuthToken {
    accessToken: string
}

export interface AuthResponse {
    authToken: AuthToken;
}

export interface DecodedToken {
    [key: string]: any;
    exp: number;
    username: string;
  }


export interface DecodedTokenResponse {
    isTokenExpired: boolean;
    isLoggedin: boolean;
    username: string;
}