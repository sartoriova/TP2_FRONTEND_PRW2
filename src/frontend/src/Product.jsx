import { useContext } from "react";
import { ProductContext } from "./ProductContext";

function Product(props) {
    const {setProduct, setEditingProduct, removeProduct} = useContext(ProductContext);

    function editProduct(e) {
        setEditingProduct(true);

        let tr = e.target.parentElement.parentElement;

        let newProduct = {
            id: e.target.id,
            nome: tr.children[1].innerText,
            preco: tr.children[2].innerText,
        }

        setProduct(newProduct);
    }

    return (
        <>
            <tr>
                <td>{props.id}</td>
                <td>{props.name}</td>
                <td>{props.price}</td>
                <td>
                    <button className="btn btn-success" id={props.id} onClick={editProduct}>Editar</button>
                    <button className="btn btn-danger" id={props.id} onClick={removeProduct}>Remover</button>
                </td>
            </tr>
        </>
    )
}

export default Product;