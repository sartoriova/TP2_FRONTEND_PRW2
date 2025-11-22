import { useContext } from "react";
import { TeamContext } from "./TeamContext";

function Team(props) {
    const {setTeam, setEditingTeam, removeTeam} = useContext(TeamContext);

    function editTeam() {
        setEditingTeam(true);

        let newTeam = {
            id: props.id,
            nome: props.name,
        }

        setTeam(newTeam);
    }

    return (
        <>
            <tr>
                <td>{props.id}</td>
                <td>{props.name}</td>
                <td>
                    {props.players?.map((player, index) => (
                            <li key={index} id={player.id}>
                                {player.id} - {player.nome}
                            </li>
                    ))}
                </td>
                <td>
                    {props.championships?.map((championship, index) => (
                            <li key={index} id={championship.id}>
                                {championship.id} - {championship.nome}
                            </li>
                    ))}
                </td>
                <td>
                    <button className="btn btn-success" id={props.id} onClick={editTeam}>Editar</button>
                    <button className="btn btn-danger" id={props.id} onClick={removeTeam}>Remover</button>
                </td>
            </tr>
        </>
    )
}

export default Team;