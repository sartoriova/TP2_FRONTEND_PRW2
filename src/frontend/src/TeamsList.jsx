import Team from "./Team";

function TeamsList(props) {
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Opções</th>
                    </tr>
                </thead>

                <tbody>
                    {props.teams.map((team, index) => (
                        <Team
                            key={index}
                            id={team.id}
                            name={team.nome}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TeamsList;