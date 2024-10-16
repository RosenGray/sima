'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/rtk/store'

/**
 * If you need to initialize the store with data from the parent component,
 * then define that data as a prop on the client StoreProvider component and
 * use a Redux action on the slice to set the data in the store as shown below.
 * like in the example below, we can pass count as prop and then initialize it with dispatch(initializeCount(count))
 */

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    //    storeRef.current.dispatch(initializeCount(count))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
