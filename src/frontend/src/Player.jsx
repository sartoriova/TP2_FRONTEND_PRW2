import { useContext } from "react";
import { PlayerContext } from "./PlayerContext";

function Player(props) {
    const {setPlayer, setEditingPlayer, removePlayer} = useContext(PlayerContext);

    function editPlayer(e) {
        setEditingPlayer(true);

        let tr = e.target.parentElement.parentElement;

        let newPlayer = {
            id: e.target.id,
            nome: tr.children[1].innerText,
            salario: tr.children[2].innerText,
            id_time: tr.children[3].innerText
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