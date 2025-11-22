import Team from "./Team";

function TeamsList(props) {
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Jogadores</th>
                        <th>Campeonatos</th>
                        <th>Opções</th>
                    </tr>
                </thead>

                <tbody>
                    {props.teams.map((team, index) => (
                        <Team
                            key={index}
                            id={team.id}
                            name={team.nome}
                            players={team.jogadores}
                            championships={team.campeonatos}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TeamsList;