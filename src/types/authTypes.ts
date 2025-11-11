export interface RegisterType {
    username: string
    password: string
    first_name: string
    last_name: string
    email: string
}

export interface LoginType {
    username: string
    password: string
}

export interface AuthContextType {
    token: string
    getToken: () => void
    login: (data: LoginType) => void
    register: (data: RegisterType) => void
}
