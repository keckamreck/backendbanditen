import { createAuthClient } from "better-auth/react"
import { usernameClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: "https://backend.biber.mom/auth",
    plugins: [ 
        usernameClient() 
    ] 
})