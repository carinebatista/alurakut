import { useState, useEffect } from "react";
import MainGrid from "./../src/components/MainGrid";
import Box from "./../src/components/Box";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
  AlurakutProfileSidebarMenuDefault,
} from "../src/lib/AlurakutCommons";

// Components

function ProfileSidebar({ githubUser }) {
  return (
    <Box as="aside">
      <img
        style={{ borderRadius: "8px" }}
        src={`https://github.com/${githubUser}.png`}
      />
      <hr />
      <a className="boxLink" href={`https://github.com/${githubUser}`}>
        @{githubUser}
      </a>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function DevsSidebar({ githubUser }) {
  const [follower, setFollower] = useState([]);

  useEffect(async () => {
    const url = `https://api.github.com/users/${githubUser}/followers`;
    const response = await fetch(url);
    setFollower(await response.json());
  }, []);

  const followers = follower.slice(0, 6);

  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">Pessoas da Comunidade ({follower.length})</h2>

      <ul>
        {followers.map((follower) => {
          return (
            <li key={follower.id}>
              <a href={follower.html_url}>
                <img
                  src={`https://github.com/${follower.login}.png`}
                  style={{ borderRadius: "8px" }}
                />
                <span>{follower.login}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

function ComunitySidebar({ comunidades }) {
  const comunidade = comunidades.slice(0, 6);
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>

      <ul>
        {comunidade.map((comunidades) => {
          return (
            <li key={comunidades.id}>
              <a href={`/users/${comunidades.title}`}>
                <img src={comunidades.image} />
                <span> {comunidades.title} </span>
              </a>
            </li>
          );
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

// component Home

export default function Home() {
  const githubUser = "carinebatista";
  const [comunidades, setComunidades] = useState([
    {
      id: "1234545446",
      title: "Eu odeio acordar cedo",
      image: "https://alurakut.vercel.app/capa-comunidade-01.jpg",
    },
  ]);
  const pessoasFavoritas = [
    "juunegreiros",
    "omariosouto",
    "peas",
    "rafaballerini",
    "marcobrunodev",
    "felipefialho",
  ];

  function handleCreateComunidade(e) {
    e.preventDefault();
    const dadosDoForm = new FormData(e.target);
    const comunidade = {
      id: new Date().toISOString(),
      title: dadosDoForm.get("title"),
      image: dadosDoForm.get("image"),
    };

    const comunidadesAtualizadas = [...comunidades, comunidade];
    setComunidades(comunidadesAtualizadas);
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle"> O que você deseja fazer?</h2>
            <form onSubmit={handleCreateComunidade}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ComunitySidebar comunidades={comunidades} />
          <DevsSidebar githubUser={githubUser} />
        </div>
      </MainGrid>
    </>
  );
}
