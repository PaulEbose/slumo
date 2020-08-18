import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as md5 from 'md5'

admin.initializeApp()

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})

// THIS MAY BE REDUNDANT, AS AUTH ALREADY provide fields for displayName and photoURL
// this increases the client request by one
type UserDetails = { email: string; username: string }
export const saveNewUser = functions.https.onCall((user: UserDetails, { auth }) =>
  admin
    .firestore()
    .collection('users')
    .doc(auth!.uid)
    .set({
      name: user.username,
      avatar: `https://gravatar.com/avatar/${md5(user.email)}?d=identicon`,
    })
)

export const userDeleted = functions.auth.user().onDelete((user) => {
  return admin.firestore().collection('users').doc(user.uid).delete()
})
