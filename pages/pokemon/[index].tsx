import { GetServerSideProps, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function Character({ character }) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Carregando...</p>;
  }

  return (
        <div className="flex flex-col">
          <Header/>
          <div className="flex flex-col items-center w-full" style={{minHeight: 'calc(100vh - 300px)'}}>
            <div className="box-border flex flex-col lg:flex-row items-center justify-center bg-gray-100 rounded-md justify-center items-center w-9/12 mt-10 md:px-40 sm:px-10 py-28">
              <div className="flex flex-col items-center justify-center">
                <img src={character.img}  alt={character.name} className="sm:w-32 w-20 img-character"/>
                <h1 className="font-bold text-2xl md:text-4xl lg:p-0 p-5 text-gray-700 text-center" >{character.name}</h1>
              </div>
              <ul className="w-3/5 sm:ml-24 ml-0">
                <li className="border-gray-300 border-t border-b py-2 pl-1 text-gray-600">Number: #{character.num}</li>
                <li className="border-gray-300 border-b py-2 pl-1 text-gray-600">Type: {character.type[0]}</li>
                <li className="border-gray-300 border-b py-2 pl-1 text-gray-600">Height: {character.height}</li>
                <li className="border-gray-300 border-b py-2 pl-1 text-gray-600">Weight: {character.weight}</li>
              </ul>
            </div>
          </div>
          <Footer/>
        </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { index } = context.params;

  const response = await fetch(`https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`)
  const data = await response.json()

  const character = data.pokemon[index];

  return { props: { character } }
}

export default Character;