import Player from "./Player";

function PlayersList(props) {
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Salário</th>
                        <th>ID Time</th>
                        <th>Opções</th>
                    </tr>
                </thead>

                <tbody>
                    {props.players.map((player, index) => (
                        <Player
                            key={index}
                            id={player.id}
                            name={player.nome}
                            salary={player.salario}
                            team_id={player.id_time}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default PlayersList;