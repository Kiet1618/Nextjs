import { AuthSession } from '@app/common/types';
import { Session } from 'inspector';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { useSession } from 'next-auth/react';
export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: "75654006966-s37ejl8kvu35bog54p8bl6aa8dn5ioe4.apps.googleusercontent.com",
            clientSecret: "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",
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            // Persist the OAuth access_token to the token right after signin

            if (account) {
                token.id_token = account.id_token;
            }
            return token;
        },
        async session(params) {
            // Send properties to the client, like an access_token from a provider.
            const token = params.token;
            const session = params.session as AuthSession;
            session.id_token = String(token.id_token || "");
            return session;
        },
    },
});