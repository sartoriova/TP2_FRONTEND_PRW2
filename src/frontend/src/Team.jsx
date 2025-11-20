import { useContext } from "react";
import { TeamContext } from "./TeamContext";

function Team(props) {
    const {setTeam, setEditingTeam, removeTeam} = useContext(TeamContext);

    function editTeam(e) {
        setEditingTeam(true);

        let tr = e.target.parentElement.parentElement;

        let newTeam = {
            id: e.target.id,
            nome: tr.children[1].innerText,
        }

        setTeam(newTeam);
    }

    return (
        <>
            <tr>
                <td>{props.id}</td>
                <td>{props.name}</td>
                <td>
                    <button className="btn btn-success" id={props.id} onClick={editTeam}>Editar</button>
                    <button className="btn btn-danger" id={props.id} onClick={removeTeam}>Remover</button>
                </td>
            </tr>
        </>
    )
}

export default Team;