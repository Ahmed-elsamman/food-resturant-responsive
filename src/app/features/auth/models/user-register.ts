export interface UserRegisterData {
    name: string;
    password: string;
    email: string;
    role?: string; //  'customer', 'admin'
}

export interface UserRegisterResponse {
    message: string;
    user?: UserRegisterData; // Optional, in case you want to return the created user
}
