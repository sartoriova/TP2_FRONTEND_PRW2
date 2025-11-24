import { useContext } from "react";
import { ChampionshipContext } from "./ChampionshipContext";

function Championship(props) {
    const { setChampionship, setEditingChampionship, removeChampionship, removeParticipation } = useContext(ChampionshipContext);

    function editChampionship() {
        setEditingChampionship(true);

        let newChampionship = {
            id: props.id,
            nome: props.name,
        }

        setChampionship(newChampionship);
    }


    return (
        <>
            <tr>
                <td>{props.id}</td>
                <td>{props.name}</td>
                <td>
                    <ul>
                        {props.teams?.map((team, index) => (
                            <li key={index} id={team.id}>
                                {team.id} - {team.nome}
                                <button className="btn btn-link" id={props.id} onClick={removeParticipation}>Remover time</button>
                            </li>
                        ))}
                    </ul>
                </td>
                <td>
                    <button className="btn btn-success" id={props.id} onClick={editChampionship}>Editar</button>
                    <button className="btn btn-danger" id={props.id} onClick={removeChampionship}>Remover</button>
                </td>
            </tr>
        </>
    )
}

export default Championship;