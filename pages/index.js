import Head from 'next/head';
import { useSession, getSession } from 'next-auth/client';
import Login from '../components/Login';
import Header from '../components/Header';
import NewTask from '../components/NewTask';
import Todos from '../components/Todos';


export default function Home() {
  const [session] = useSession();

  if(!session) return <Login />
  return (
    <div className="">
      <Head>
        <title>`${session?.user?.username} Todo List`</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <NewTask />
        <Todos />

      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session
    }
  }
}