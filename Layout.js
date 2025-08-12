import Head from 'next/head'

export default function Layout({ children, title = "BRYDOM BANK" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Sistema Bancário com IA Quântica e Híbrida" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <main>{children}</main>
    </>
  )
}

