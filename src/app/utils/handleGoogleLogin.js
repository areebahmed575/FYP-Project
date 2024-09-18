// "use server"
import signIn from "./auth"
export const handleGoogleLogin = async () => {
    signIn("google")
}