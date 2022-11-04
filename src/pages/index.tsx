import Image from 'next/image'
import { motion, AnimatePresence  } from "framer-motion"
import { useMemo, useState } from 'react'
import type { GetServerSideProps } from 'next'
import pokemon from '../../public/pokemon.png'
import { Input } from '../components/input/input'
import { Header } from '../components/header/header'
import { Buttons } from '../components/buttons/buttons'

interface pokemonsProps {
  pokemons: {
    entry_number: number,
    pokemon_species: {
      name: string
    }
  }[]
}

const Home = ({ pokemons }: pokemonsProps) => {
  const [ search, setSearch ] = useState('')

  const filteredPokemons = useMemo(() => {
    const lowerSearch = search.toLowerCase()
    return pokemons.filter(item => item.pokemon_species.name.toLowerCase().includes(lowerSearch)) 
  }, [pokemons, search])
  
  return (
    <div className='
    flex 
    w-screen
    h-screen
    items-center
    justify-center
    bg-slate-900'>
      <div className='
      w-full
      h-full 
      border-2
      max-w-md 
      rounded-3xl
      bg-red-700
      border-black'>

      <Header />

          <div className='
          flex 
          justify-center
          '>
            <div className='
            flex 
            mt-4 
            w-96 
            h-72 
            border-2 
            rounded-lg
            items-center 
            bg-gray-400
            border-black 
            justify-center'>
            <div className='
            w-72  
            h-60 
            border-2 
            bg-white 
            rounded-lg
            border-black
            justify-center
            overflow-hidden'>

                <motion.ul
                className='m-12' 
                initial={{opacity: 0, x: -100}}
                animate={{opacity: 1, x: 0}}
                exit={{opacity: 0, x: 100}}>
              <AnimatePresence >
                
              { search != '' ? filteredPokemons.map(items => (

              <motion.li key={items.entry_number}
              initial={{opacity: 0, x: -100}}
              animate={{opacity: 1, x: 0}}
              exit={{opacity: 0, x: 100}}>

                  <Image width={300} height={300} src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${String(items.entry_number).padStart(3, "0")}.png`} alt={items.pokemon_species.name} />
  
              </motion.li>
              )) : <Image className='mt-20' src={pokemon} alt='logo da pokemon escrito pokemon' /> }

              </AnimatePresence>
                </motion.ul>
            </div>
          </div>
        </div>
        <div className='
        mt-4
        flex 
        items-center 
        justify-center'>
          <form>
            <Input
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder='Ensira o nome do pokemon'/>
          </form>
        </div>

        <Buttons />

    </div>
  </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ()=> {
  const respose = await fetch('https://pokeapi.co/api/v2/pokedex/2/')
  .then(data => data.json())
  .then(pokemons => pokemons.pokemon_entries)
  return {
    props: {
      pokemons: respose
    }
  }
}

export default Home