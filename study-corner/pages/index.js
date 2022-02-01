import Head from 'next/head'
import Sidebar from './../Components/Sidebar/Sidebar';
import ResourcesFeed from './../Components/Feed/ResourcesFeed';


export default function Home() {
    return (
      <div className="">
        <Head>
          <title>Study Corner</title>
          <link rel="icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/css2?family=Bakbak+One&family=Inter:wght@500&family=Roboto+Condensed&display=swap" rel="stylesheet"></link>
        </Head>

        <main className='bg-black min-h-screen flex max-w-full mx-auto'>
          <Sidebar /> 
          <ResourcesFeed />
        </main>
      </div>
    )
}
