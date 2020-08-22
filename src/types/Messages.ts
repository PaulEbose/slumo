export type Message = {
  id: string
  text: string
  timestamp: firebase.firestore.Timestamp
  user: {
    id: string
    name: string
    avatar: string
  }
}
