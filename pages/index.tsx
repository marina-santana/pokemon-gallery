import Head from 'next/head'
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import { GetStaticProps } from "next";
import { useRouter } from 'next/router';

function Home({pokemon}) {
  const router = useRouter();

  return (
    <html>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap" rel="stylesheet"/>      
      </Head>
      <body>
        <div className="flex flex-col">
          <Header/>
          <div className="flex flex-col items-center w-full">
            <div className="box-border flex flex-col items-center bg-gray-100 rounded-md flex justify-center p-5 sm:p-10 mt-10 md:px-40 sm:px-10">
              <h1 className="font-bold text-xl sm:text-3xl text-gray-700 text-left sm:text-center" >Pokemon Galerry</h1>
              <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 sm:gap-5 mt-7 cursor-pointer">
                {pokemon.map((character, index) => (
                  <div key={character.id} 
                    onClick={() => {
                      router.push({
                        pathname: '/pokemon/[index]',
                        query: { index: index },
                      })
                    }}
                    className="flex flex-col cursor-pointer items-center box-border w-32 sm:w-52 p-3 rounded-md bg-white shadow-lg">
                    <img src={character.img}  alt={pokemon.name} className="sm:w-28 w-20"/>
                    <div className="flex flex-row justify-center w-full w-auto">
                      <div className="text-gray-500 text-xs sm:text-lg">#{character.num}</div>
                      <div className="text-gray-600 ml-2 text-xs sm:text-lg">{character.name}</div>
                    </div>
                  </div>
                ))}              
              </div>
            </div>
          </div>
          <Footer/>
        </div>
      </body>     
    </html>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`)
  const data = await response.json()

  return {
    props: {
      pokemon: data.pokemon,
    }
  }
}

export default Home;