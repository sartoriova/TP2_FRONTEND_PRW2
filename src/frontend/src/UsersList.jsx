import User from "./User";

function UsersList(props) {
    return (
        <>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Produtos</th>
                  <th>Total compras</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                {props.users.map((user, index) => (
                    <User
                        key={index}
                        id={user.id}
                        name={user.nome}
                        products={user.produtos}
                        total={props.calculateTotal(user.id)}
                    />
                ))}
              </tbody>

            </table>
        </>
    )
}

export default UsersList;