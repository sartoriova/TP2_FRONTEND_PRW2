import { useContext } from "react";
import { PlayerContext } from "./PlayerContext";

function Player(props) {
    const {setPlayer, setEditingPlayer, removePlayer} = useContext(PlayerContext);

    function editPlayer() {
        setEditingPlayer(true);

        let newPlayer = {
            id: props.id,
            nome: props.name,
            salario: props.salary,
            id_time: props.team_id
        }

        setPlayer(newPlayer);
    }

    return (
        <>
            <tr>
                <td>{props.id}</td>
                <td>{props.name}</td>
                <td>{props.salary}</td>
                <td>{props.team_id}</td>
                <td>
                    <button className="btn btn-success" id={props.id} onClick={editPlayer}>Editar</button>
                    <button className="btn btn-danger" id={props.id} onClick={removePlayer}>Remover</button>
                </td>
            </tr>
        </>
    )
}

export default Player;