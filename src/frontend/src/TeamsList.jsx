import Product from "./Team";

function ProductsList(props) {
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Opções</th>
                    </tr>
                </thead>

                <tbody>
                    {props.products.map((product, index) => (
                        <Product
                            key={index}
                            id={product.id}
                            name={product.nome}
                            price={product.preco}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ProductsList;