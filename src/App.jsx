import React, { useState, useEffect } from 'react';
import './style.css';

// Aqui é para resumir o url para retirar dados de usuários.
const API_URL = "https://api.github.com/users/";

function App() {
    const [userData, setUserData] = useState(null);
    const [repos, setRepos] = useState([]);
    const [location, setLocation] = useState(null);
    const githubBaseUrl = "https://github.com/";
    // Parte para poder retirar dados com a base do link do Github + Setar o useState para mudar o ciclo do site.
   
    // Uso do useEffect para poder usar o userData com localização.
    useEffect(() => {
        if (userData && userData.location) {
            getLocation(userData.location);
        } else {
            setLocation('Not Available');
        }
    }, [userData]);

    // Aqui ele pega a promessa dos dados de usuário + nome de usuário que você colocou.
    const getUser = async (username) => {
        try {
            const response = await fetch(API_URL + username);
            const data = await response.json();
            setUserData(data);
            getRepos(username);
        } catch (error) {
            setUserData(null);
            setRepos([]);
        }
    }

    // Me dê os repositórios! xD
    const getRepos = async (username) => {
        try {
            const response = await fetch(API_URL + username + "/repos");
            const data = await response.json();
            setRepos(data);
        } catch (error) {
            setRepos([]);
        }
    }

    // Me dê a localização do usuário!
    const getLocation = async (location) => {
        try {
            const response = await fetch(API_URL + username + location);
            const data = await response.json();
            setLocation(data.weather[0].description);
        } catch (error) {
            setLocation(null);
        }
    }

    // Condição para verificar se é o nome de usuário.
    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.elements.search.value.trim();
        if (username !== "") {
            getUser(username);
        }
        e.target.elements.search.value = "";
    }

    return (
        <>
            <h1>Buscador de Perfis</h1>
            <h2 id='github'><a href="https://github.com/">by Github</a></h2>
            <form className="user-form" onSubmit={handleSubmit}>
                <input type="text" name="search" autoFocus placeholder="Procure seu perfil no Github!" />
            </form>

            {userData && (
                <div className="card">
                    
                    <a href={"https://github.com/" + userData.name.replace(/\s/g, '') + ".png"}><img src={userData.avatar_url} alt="avatar" className="avatar" /></a>

                    <div className="user-info">
                    <h2><a href={githubBaseUrl + userData.name.replace(/\s/g, '')}>{userData.name}</a> <span className="separator">•</span> <a href={"https://www.google.com.br/maps/place/" + userData.location}>{userData.location}</a></h2>

                        <p>{userData.bio}</p>

                        <ul className="info">
                            <a href={githubBaseUrl + userData.name.replace(/\s/g, '') + "?tab=followers"}><li>{userData.followers}<strong> Seguidores</strong></li></a>
                            <a href={githubBaseUrl + userData.name.replace(/\s/g, '') + "?tab=following"}><li>{userData.following}<strong> Seguindo</strong></li></a>
                            <a href={githubBaseUrl + userData.name.replace(/\s/g, '') + "?tab=repositories"}><li>{userData.public_repos}<strong> Repositórios</strong></li></a>
                        </ul>

                        <div id="repo">
                            {repos.map(repo => (
                                <a key={repo.id} className="repo" href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                            ))}
                        </div>
                    
                    </div>
                </div>
            )}
        </>
    );
}

export default App;