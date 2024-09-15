import { useState, useEffect, useCallback } from "react"
import { PokeView } from "./pokeView"
import axios from "axios"

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

interface PokemonProps{
    name: string,
    move1: string 
    move2: string, 
    move3: string,
    move4: string,
    img: string,
    height: string,
    weight: string,
    ID: string,
    type: string
}


export const PokeController = () => {
    const [PokemonID, setPokemonID] = useState("")
    const [PokemonValid, setPokemonValid] = useState<boolean>(false)
    const [offlineMessage, setOfflineMessage] = useState<boolean>(false)
    const [pokemon, setPokemon] = useState<PokemonProps>({
        name: "",
        move1: "", 
        move2: "", 
        move3: "",
        move4: "",
        img: "",
        height: "",
        weight: "",
        ID: "",
        type:""
    })

    const fetchPokemon = async () => {
        try{
            if(PokemonID != ""){
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${PokemonID}`)
                
                const getTypes = () =>{
                    let types = ""
                    for (let i = 0; i < result.data.types.length; i++) {
                        if(i < 1){
                            types += capitalizeFirstLetter(result.data.types[i].type.name)
                        }else{
                            types += ", "+capitalizeFirstLetter(result.data.types[i].type.name)
                        }
                        
                    }

                    return types
                }

                const getMove = (index:number) => {
                    const moves = result.data.moves.length

                    if( moves > index && index < 4){
                        return result.data.moves[index].move.name
                    } else{
                        return null
                    }
                }

                const capitalizeFirstLetter = (word:string) =>{
                    if(word != null){
                        return word[0].toUpperCase()+word.slice(1)
                    }else{
                        return ""
                    }
                }

                const Pokemon : PokemonProps = {
                    name: capitalizeFirstLetter(result.data.forms[0].name),
                    img: result.data.sprites.front_default,
                    move1: capitalizeFirstLetter(getMove(0)),
                    move2: capitalizeFirstLetter(getMove(1)),
                    move3: capitalizeFirstLetter(getMove(2)),
                    move4: capitalizeFirstLetter(getMove(3)),
                    ID: result.data.id,
                    height: result.data.height,
                    weight: result.data.weight,
                    type: getTypes()
                }

                
                setPokemon(Pokemon)
                setPokemonValid(true)
            }
        }catch(e){
            setPokemonValid(false)
            setPokemon({
                name: "",
                move1: "", 
                move2: "", 
                move3: "",
                move4: "",
                img: "",
                height: "",
                weight: "",
                ID: "",
                type:""
            })
        }
    }

    useEffect(() => {
        fetchPokemon()
    }, [])


    return(
        <div>
            <div>
                <h1 style={{fontSize:60, color:"yellow"}}>Pokemon Stats Page</h1>
                <Box
                    component="span"
                    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
                >
                    <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 350 }}
                    >
                        <InputBase
                            onChange={(event) =>{
                                setPokemonID(event.target.value)
                            }}
                            onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
                            onSubmit={(e) =>{
                                fetchPokemon();
                            }}
                            id="pokemonIDInput"
                            type="number"
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search for pokemon with ID"
                            inputProps={{ 'aria-label': 'search google maps' }}
                        />
                        <IconButton type="button" onClick={fetchPokemon} sx={{ p: '10px' }} aria-label="search">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                            <path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 
                            16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                        </IconButton>
                    </Paper>
                </Box>
            </div>
            {
                PokemonValid ? (
                    <Box
                        component="span"
                        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
                    >
                        <PokeView
                            key={pokemon.ID}
                            {...pokemon}
                        />
                    </Box>
                ) : (
                    <div>
                        <img width={300} src="https://media.wired.com/photos/5f87340d114b38fa1f8339f9/master/w_1600,c_limit/Ideas_Surprised_Pikachu_HD.jpg" alt=""/>
                        <h1>You entered an Invalid ID. Please enter a valid Pokemon ID.</h1>
                    </div>
                )
            } 


        </div>
    )

}




