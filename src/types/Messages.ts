export type Message = {
  text: string
  timestamp: number
  user: {
    id: string
    name: string
    avatar: string
  }
}
