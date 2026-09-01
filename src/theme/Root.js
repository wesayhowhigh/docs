import React from 'react'
import { VariableProvider } from "../context/VariableContext"

export default function Root({ children }) {
    return <VariableProvider>{children}</VariableProvider>
}