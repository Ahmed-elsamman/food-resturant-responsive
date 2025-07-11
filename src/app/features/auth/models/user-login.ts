export interface UserLoginData {
    username: string;
    password: string;
    rememberMe?: boolean; // Optional field for "Remember Me" functionality
}

export interface UserLoginResponse {
    message: string;
    token: string; // return a token for authenticated sessions
    user?: UserLoginData; // return the logged-in user details
}