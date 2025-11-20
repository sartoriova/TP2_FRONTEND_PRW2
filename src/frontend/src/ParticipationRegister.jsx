import { useState } from "react";

function ParticipationRegister(props) {
    const [participation, setParticipation] = useState({
        id_time: 0,
        id_campeonato: 0,
    });

    function update(e) {
        setParticipation({ ...participation, [e.target.name]: e.target.value });
    }

    function register(e) {
        e.preventDefault();

        props.registerParticipation(participation);

        setParticipation({ id_time: 0, id_campeonato: 0 });
    }

    return (
        <>
            <form className="row g-3" onSubmit={register}>
                <div className="col-12">
                    <fieldset>
                        <label htmlFor="selectedChampionship" className="form-label pt-2">Campeonato</label>
                        <select id="selectedChampionship" className="form-select" name="id_campeonato" value={participation.id_campeonato} onChange={update} required>
                            <option value="">Selecione um campeonato</option>
                            {props.championships.map((championship, index) => (
                                <option key={index} value={championship.id}>{championship.nome}</option>
                            ))};
                        </select>

                        <label htmlFor="selectedTeam" className="form-label pt-2">Time</label>
                        <select id="selectedTeam" className="form-select" name="id_time" value={participation.id_time} onChange={update} required>
                            <option value="">Selecione um time</option>
                            {props.teams.map((team, index) => (
                                <option key={index} value={team.id}>{team.nome}</option>
                            ))};
                        </select>
                    </fieldset>
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                </div>
            </form>
        </>
    )
}

export default ParticipationRegister;