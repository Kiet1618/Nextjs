import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: "75654006966-s37ejl8kvu35bog54p8bl6aa8dn5ioe4.apps.googleusercontent.com",
            clientSecret: "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"
        }),
    ],
});