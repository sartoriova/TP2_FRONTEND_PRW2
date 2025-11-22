function ChampionshipRegister(props) {
    function update(e) {
        props.setChampionship({ ...props.championship, [e.target.name]: e.target.value });
    }

    function register(e) {
        e.preventDefault();

        !props.editingChampionship ? props.registerChampionship(props.championship) : props.editChampionship();

        if (props.editingChampionship) {
            props.setEditingChampionship(false);
        }

        props.setChampionship({ nome: "" });
    }

    return (
        <>
            <form className="row g-3" onSubmit={register}>
                <div className="col-12">
                    <label htmlFor="championshipName" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="championshipName" name="nome"
                        placeholder="Digite o nome" required onChange={update} value={props.championship.nome} />
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">{!props.editingChampionship ? "Cadastrar" : "Editar"}</button>
                </div>
            </form>
        </>
    )
}

export default ChampionshipRegister;