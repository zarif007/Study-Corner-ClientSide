import Head from 'next/head'
import Sidebar from './../Components/Sidebar/Sidebar';

export default function Home() {
    return (
      <div className="">
        <Head>
          <title>Study Corner</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className='bg-black min-h-screen flex max-w-full mx-auto'>
          <Sidebar />
        </main>
      </div>
    )
}
