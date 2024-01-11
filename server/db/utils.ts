import db from './connection'

export function getUserIdByEmail(userEmail: string) {
  return db('users').select('id').where('email', userEmail)
}
