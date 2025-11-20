import "./App.css";
import axios from "axios";
import { useState, useEffect } from 'react';
import TeamsList from "./TeamsList";
import TeamRegister from "./TeamRegister";
import ChampionshipRegister from "./ChampionshipRegister";
import ParticipationRegister from "./ParticipationRegister";
import { TeamContext } from "./TeamContext";
import { ChampionshipContext } from "./ChampionshipContext";
import ChampionshipList from "./ChampionshipsList";

function App() {
  const [championships, setChampionships] = useState([]);
  const [participations, setParticipations] = useState(new Map());
  const [invalidName, setInvalidName] = useState("");

  const [teams, setTeams] = useState([]);
  const [editingTeam, setEditingTeam] = useState(false);
  const [editingChampionship, setEditingChampionship] = useState(false);
  const [team, setTeam] = useState({
    nome: "",
  });
  const [championship, setChampionship] = useState({
    nome: "",
  });

  const [duplicatePurchase, setDuplicatePurchase] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const api = axios.create({
    baseURL: "http://localhost:3000"
  });

  async function loadChampionships() {
    try {
      let res = await api.get("/campeonatos");
      setChampionships(res.data);
    } catch (error) {
      if (error.response) {
        console.log("Erro de requisição: ", error.response.status);
      } else if (error.request) {
        console.log("Timeout");
      } else {
        console.error("Erro inesperado: ", error.message);
      }
    }
  }

  async function loadTeams() {
    try {
      let res = await api.get("/times");
      setTeams(res.data);
    } catch (error) {
      if (error.response) {
        console.log("Erro de requisição: ", error.response.status);
      } else if (error.request) {
        console.log("Timeout");
      } else {
        console.error("Erro inesperado: ", error.message);
      }
    }
  }

  async function loadTeamsChampionship() {
    try {
      for (const championship of championships) {
        let res = await api.get(`/campeonatos/${championship.id}/times`);
        setParticipations(prev => {
          const novo = new Map(prev);
          novo.set(championship.id, res.data);
          return novo;
        });
      }
    } catch (error) {
      if (error.response) {
        console.log("Erro de requisição: ", error.response.status);
      } else if (error.request) {
        console.log("Timeout");
      } else {
        console.error("Erro inesperado: ", error.message);
      }
    }
  }

  useEffect(() => {
  if (championships.length > 0) {
    loadTeamsChampionship();
  }
  }, [championships]);


  useEffect(() => {
    loadChampionships();
    loadTeams();
  }, []);

  async function registerChampionship(newChampionship) {
    try {
      await api.post("/campeonatos", newChampionship);
      await loadChampionships();

      if (invalidName) {
        setInvalidName(false);
      }
    } catch (error) {
      if (error.response) {
        console.log("Erro de requisição: ", error.response.status);

        if (error.response.status == 400) {
          setInvalidName(true);
          setErrorMessage(error.response.data.msg);
        }
      } else if (error.request) {
        console.log("Timeout");
      } else {
        console.error("Erro inesperado: ", error.message);
      }
    }
  }

  async function removeChampionship(e) {
    try {
      await api.delete(`/campeonatos/${e.target.id}`);
      await loadChampionships();
    } catch (error) {
      if (error.response) {
        console.log("Erro de requisição: ", error.response.status);
      } else if (error.request) {
        console.log("Timeout");
      } else {
        console.error("Erro inesperado: ", error.message);
      }
    }
  }

  async function registerTeam() {
    try {
      await api.post("/times", team);
      await loadTeams();
    } catch (error) {
      if (error.response) {
        console.log("Erro de requisição: ", error.response.status);
      } else if (error.request) {
        console.log("Timeout");
      } else {
        console.error("Erro inesperado: ", error.message);
      }
    }
  }

  async function editTeam() {
    try {
      await api.put(`/times/${team.id}`, team);
      await loadTeams();
      await loadChampionships();
    } catch (error) {
      if (error.response) {
        console.log("Erro de requisição: ", error.response.status);
      } else if (error.request) {
        console.log("Timeout");
      } else {
        console.error("Erro inesperado: ", error.message);
      }
    }
  }

  async function editChampionship() {
    try {
      await api.put(`/campeonatos/${championship.id}`, championship);
      await loadChampionships();
    } catch (error) {
      if (error.response) {
        console.log("Erro de requisição: ", error.response.status);
      } else if (error.request) {
        console.log("Timeout");
      } else {
        console.error("Erro inesperado: ", error.message);
      }
    }
  }

  async function removeTeam(e) {
    try {
      await api.delete(`/times/${e.target.id}`);
      await loadTeams();
      await loadChampionships();
    } catch (error) {
      if (error.response) {
        console.log("Erro de requisição: ", error.response.status);
      } else if (error.request) {
        console.log("Timeout");
      } else {
        console.error("Erro inesperado: ", error.message);
      }
    }
  }

  async function registerParticipation(newParticipation) {
    try {
      await api.post("/participacao", newParticipation);
      await loadChampionships();
    } catch (error) {
      if (error.response) {
        console.log("Erro de requisição: ", error.response.status);
      } else if (error.request) {
        console.log("Timeout");
      } else {
        console.error("Erro inesperado: ", error.message);
      }
    }
  }

  async function removeTeamChampionship(e) {
    try {
      await api.delete(`/participacao/${e.target.parentElement.id}/${e.target.id}`);
      await loadChampionships();
    } catch (error) {
      if (error.response) {
        console.log("Erro de requisição: ", error.response.status);
      } else if (error.request) {
        console.log("Timeout");
      } else {
        console.error("Erro inesperado: ", error.message);
      }
    }
  }

  return (
    <>
      <h1 className="p-3 text-center">Lista de compras por usuário</h1>
      <div className="container">
        <div className="row">

          <div className="col p-1">
            <h2 className="mt-4">{!editingChampionship ? "Cadastrar" : "Editar"} Campeonato</h2>
            <ChampionshipRegister championship={championship} setChampionship={setChampionship} editingChampionship={editingChampionship} editChampionship={editChampionship} setEditingChampionship={setEditingChampionship} registerChampionship={registerChampionship}></ChampionshipRegister>
            <p hidden={!invalidName} className="error">{errorMessage}</p>

            <h2 className="mt-4">Participação</h2>
            <ParticipationRegister championships={championships} teams={teams} registerParticipation={registerParticipation}></ParticipationRegister>
            <p hidden={!duplicatePurchase} className="error">{errorMessage}</p>

            <h2 className="display-6 text-center mt-4">Lista de Campeonatos</h2>
            <ChampionshipContext.Provider value={{ setChampionship, setEditingChampionship, removeChampionship, removeTeamChampionship }}>
              <ChampionshipList championships={championships} teams={participations}></ChampionshipList>
            </ChampionshipContext.Provider>
          </div>

          <div className="col-2"></div>

          <div className="col p-1">
            <h2 className="mt-4">{!editingTeam ? "Cadastrar" : "Editar"} Time</h2>
            <TeamRegister team={team} setTeam={setTeam} editingTeam={editingTeam} setEditingTeam={setEditingTeam} registerTeam={registerTeam} editTeam={editTeam}></TeamRegister>

            <h2 className="display-6 text-center mt-4">Lista de Times</h2>
            <TeamContext.Provider value={{ setTeam, setEditingTeam, removeTeam }}>
              <TeamsList teams={teams}></TeamsList>
            </TeamContext.Provider>
          </div>

        </div>
      </div>
    </>
  )
}

export default App;
