import { title } from "process"
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


interface PokeProps{
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





export const PokeView = ({
    name,
    move1, 
    move2, 
    move3,
    move4,
    img,
    height,
    weight,
    ID,
    type

}: PokeProps) => {

    return (
        <Card  style={{width:350,}}>
            
            <CardContent>
            <Typography variant="h5" component="div">
                Pokemon: {name}
            </Typography>
             <div>
                <img width={300} src={img} alt=""/>
            </div>
            <Typography variant="h6" component="div">
                Type: {type}
            </Typography>
            <Typography variant="h6" component="div">
                Moves: {move1}, {move2}, {move3}, {move4}
            </Typography>
            <Typography variant="h6" component="div">
                Height: {height}
            </Typography>
            <Typography variant="h6" component="div">
                Weight: {weight}
            </Typography> 
            </CardContent>
        </Card>
    )
}






















// interface PokeProps{
//     name: string,
//     move1: string 
//     move2: string, 
//     move3: string,
//     move4: string,
//     img: string,
//     height: string,
//     weight: string,
//     ID: string,
//     type: string
// }

// export const PokeView = ({
//     name,
//     move1, 
//     move2, 
//     move3,
//     move4,
//     img,
//     height,
//     weight,
//     ID,
//     type

// }: PokeProps) => {

//     return (
//         <Card  style={{width:350,}}>
            
//             <CardContent>
//             <Typography variant="h5" component="div">
//                 Pokemon: {name}
//             </Typography>
//             <div>
//                 <img width={300} src={img} alt=""/>
//             </div>
//             <Typography variant="h6" component="div">
//                 Type: {type}
//             </Typography>
//             <Typography variant="h6" component="div">
//                 Moves: {move1}, {move2}, {move3}, {move4}
//             </Typography>
//             <Typography variant="h6" component="div">
//                 Height: {height}
//             </Typography>
//             <Typography variant="h6" component="div">
//                 Height: {weight}
//             </Typography>
//             </CardContent>
//         </Card>
//     )
// }