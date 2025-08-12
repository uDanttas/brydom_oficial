import React, { useEffect } from 'react'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Inicializar configurações globais
    console.log('🏦 BRYDOM BANK - Sistema Inicializado')
  }, [])

  return <Component {...pageProps} />
}

