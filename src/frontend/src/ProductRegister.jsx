function ProductRegister(props) {
    function update(e) {
        props.setProduct({ ...props.product, [e.target.name]: e.target.value });
    }

    function register(e) {
        e.preventDefault();

        !props.editingProduct ? props.registerProduct(props.product) : props.editProduct();

        if (props.editingProduct) {
            props.setEditingProduct(false);
        }

        props.setProduct({ nome: "", preco: "" });
    }

    return (
        <>
            <form className="row g-3" onSubmit={register}>
                <div className="col-12">
                    <label htmlFor="productName" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="productName" name="nome"
                        placeholder="Digite o nome" required onChange={update} value={props.product.nome} />
                </div>

                <div className="col-12">
                    <label htmlFor="productPrice" className="form-label">Preço</label>
                    <input type="number" min="0.01" step="0.01" name="preco" className="form-control"
                        id="productPrice" placeholder="Digite o preço" required onChange={update} value={props.product.preco} />
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">{!props.editingProduct ? "Cadastrar" : "Editar"}</button>
                </div>
            </form>
        </>
    )
}

export default ProductRegister;