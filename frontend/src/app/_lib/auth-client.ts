import { createAuthClient } from "better-auth/react"
import { usernameClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: "http://localhost:8097/auth",
    plugins: [ 
        usernameClient() 
    ] 
})