import { useState, useContext } from "react";
import { ChampionshipContext } from "./ChampionshipContext";

function Championship(props) {
    const { setChampionship, setEditingChampionship, removeChampionship, removeTeamChampionship } = useContext(ChampionshipContext);

    function editChampionship(e) {
        setEditingChampionship(true);

        let tr = e.target.parentElement.parentElement;

        let newChampionship = {
            id: e.target.id,
            nome: tr.children[1].innerText,
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
                                <button className="btn btn-link" id={props.id} onClick={removeTeamChampionship}>Remover time</button>
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