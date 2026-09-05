import React from "react";

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
    const prizeDraw = Math.floor(Math.random() * 101)
    if(people) setPerson(people.people[prizeDraw]);
    console.log("oi", person)
  };

  return (
    <div>
      {!person ? (
        <button onClick={handleClick}>Escolher um personagem</button>
      ) : (
        <>
          <h1>{person.name}</h1>
          <button onClick={handleClick}>Escolher outro personagem</button>
        </>
      )}
    </div>
  );
};

export default App;
