import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { FirebaseAdapter } from "@next-auth/firebase-adapter"
import { db } from '../../../firebase'

export default NextAuth({
  providers: [
    Providers.Credentials({
        credentials: {
          username: { label: "Username", type: "text", placeholder: "" },
          password: {  label: "Password", type: "password",placeholder: "" }
        },
        async authorize(credentials, req) {
        const snapshot = await db.collection('users').where('username', '==', credentials.username).where('password', '==', credentials.password).get()
        
          if (true) {
            if (!snapshot.empty) {
              const user = {
                ...snapshot.docs[0].data(),
                id: snapshot.docs[0].id,
              }
          return user
            }
            else {
              db.collection('users').add({
                username: credentials.username,
                password: credentials.password,
              })
              const snapshot = await db.collection('users').where('username', '==', credentials.username).where('password', '==', credentials.password).get()
              const user = {
                ...snapshot.docs[0].data(),
                id: snapshot.docs[0].id,
              }
          return user
            }
          
        }
        else {
          false
        }
    }
      })
  ],
  adapter: FirebaseAdapter(db),
  session: {
    jwt: true, 
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
        //  "user" parameter is the object received from "authorize"
        //  "token" is being send below to "session" callback...
        //  ...so we set "user" param of "token" to object from "authorize"...
        //  ...and return it...
        user && (token.user = user);
        return Promise.resolve(token)   // ...here
    },
    session: async (session, user, sessionToken) => {
        //  "session" is current session object
        //  below we set "user" param of "session" to value received from "jwt" callback
        session.user = user.user;
        return Promise.resolve(session)
    }
}
})