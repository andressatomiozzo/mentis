import React from "react";
import "./App.css";

type IPerson = {
  name: string;
  field: [string, string];
  period: string;
  country: string;
};

const App = () => {
  const [person, setPerson] = React.useState<IPerson | null>(null);
  const [people, setPeople] = React.useState<{ people: IPerson[] } | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const pullData = async () => {
      try {
        setLoading(true);
        setPeople(null);
        setError(null);
        const response = await fetch("data.json");
        if (!response.ok) throw new Error("Houve um erro na busca dos dados, tente mais tarde");
        const dataJson = (await response.json()) as { people: IPerson[] };
        setPeople(dataJson);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    pullData();
  }, []);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      const prizeDraw = Math.floor(Math.random() * 100);
      if (people) {
        setPerson(people.people[prizeDraw]);
      }
      setLoading(false);
    }, 1100);
  };

  return (
    <div className="wrapper">
      <main className="content">
        {error && <p className="errorContent">Houve um erro na busca dos dados, tente mais tarde</p>}
        {loading && <div className="loadingContent"><div></div></div>}
        {person && !loading && (
          <div className="personContent">
            <h1>{person.name}</h1>
            <p>Área: {person.field.join(" e ")}</p>
            <p>País: {person.country}</p>
            <p>Período: {person.period}</p>
          </div>
        )}
        <button onClick={handleClick} className="button">
          Escolher {!person ? "um" : "outro"} personagem
        </button>
      </main>
    </div>
  );
};

export default App;
