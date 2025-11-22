import Championship from "./Championship";

function ChampionshipList(props) {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Times</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {props.championships.map((championship, index) => (
            <Championship
              key={index}
              id={championship.id}
              teams={championship.times}
              name={championship.nome}
            />
          ))}
        </tbody>

      </table>
    </>
  )
}

export default ChampionshipList;