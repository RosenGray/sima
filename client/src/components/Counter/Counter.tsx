'use client'

import React from 'react'
import { RootState } from '@/lib/rtk/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '@/lib/rtk/featuers/counter/counterSlice'

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <h1>counterrrrrr</h1>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
