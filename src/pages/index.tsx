import type { NextPage } from 'next'
import Head from 'next/head'
import App from '@/components/App/App';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Harvest V2 API Client</title>
        <meta name="description" content="A third-party React.js client for the Harvest API V2, that helps you to manage the time tracking of your Harvest Account, while also giving you statistical feedback on how you spend your time." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className='app-container'>
            <App />
        </div>
    </div>
  )
}

export default Home
