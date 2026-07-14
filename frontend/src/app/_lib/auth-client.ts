import { createAuthClient } from "better-auth/react"
import { usernameClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: process.env.NODE_ENV === 'production'
      ? "https://backend.biber.mom/auth"
      : "http://localhost:8097/auth",
    plugins: [ 
        usernameClient() 
    ] 
})