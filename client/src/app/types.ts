export type MessageType = {
  sender: string
  content: string
  date: Date
}

export type UserType = {
  name: string
}

export type ChatType = {
  history?: MessageType[]
}
