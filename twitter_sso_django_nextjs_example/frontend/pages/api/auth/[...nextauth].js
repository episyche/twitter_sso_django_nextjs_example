import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

var user_credential = []

export default NextAuth({
    providers: [
        TwitterProvider({
            clientId: "",
            clientSecret: "",
        })
    ],

    theme: {
        colorScheme: "light",
    },
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {

            var user_token = token.token.account
            return token;
        },
        async session({ session, token, user }) {
            if (token.token.account.oauth_token) {
                user_credential = {
                    "access_token_key": token.token.account.oauth_token,
                    "access_token_secret": token.token.account.oauth_token_secret,
                }

            }
            return user_credential
        }
    },


});