import { useContext } from "react";
import { UserContext } from "./UserContext";

function User(props) {
    const {removeUser, removePurchaseUser} = useContext(UserContext);

    return (
        <>
            <tr>
                <td>{props.id}</td>
                <td>{props.name}</td>
                <td>
                    <ul>
                        {props.products?.map((product, index) => (
                            <li key={index} id={product.id}>
                                {product.id} - {product.nome} - {product.preco} 
                                <button className="btn btn-link" id={props.id} onClick={removePurchaseUser}>Remover compra</button>
                            </li>
                        ))}
                    </ul>
                </td>
                <td>{props.total}</td>
                <td>
                    <button className="btn btn-danger" id={props.id} onClick={removeUser}>Remover pessoa</button>
                </td>
            </tr>
        </>
    )
}

export default User;