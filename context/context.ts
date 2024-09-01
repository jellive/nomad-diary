import React, { useContext } from 'react'
export const DBContext = React.createContext<Realm | null>(null)
export const useDB = () => {
  return useContext(DBContext)
}
