import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // On first sign-in, flag that terms have not been accepted yet
      if (account) {
        token.provider = account.provider;
        token.termsAccepted = false;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session as any).termsAccepted = token.termsAccepted as boolean;
        (session as any).provider = token.provider as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // After OAuth callback, always go to /auth?step=terms
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
