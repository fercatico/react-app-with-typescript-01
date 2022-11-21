import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import List from "./components/List";
import { Sub, SubsResponseFromApi } from "./types";
import axios from "axios";

interface AppState {
  subs: Sub[];
  newSubsNumber: number;
}

function App() {
  //const [subs, setSubs] = useState<Array<Sub>>([]);
  const [subs, setSubs] = useState<AppState["subs"]>([]);
  const [newSubsNumber, setNewSubsNumber] =
    useState<AppState["newSubsNumber"]>(0);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSubs = () => {
      return axios
        .get<SubsResponseFromApi>("http://localhost:3001/subs")
        .then((response) => response.data);
    };

    const mapFromApiToSubs = (apiResponse: SubsResponseFromApi): Array<Sub> => {
      return apiResponse.map((subFromApi) => {
        const {
          months: subMonths,
          profileUrl: avatar,
          nick,
          description,
        } = subFromApi;
        return {
          nick,
          description,
          avatar,
          subMonths,
        };
      });
    };

    fetchSubs().then(mapFromApiToSubs).then(setSubs);
  }, []);

  const handleNewSub = (newSub: Sub): void => {
    setSubs((subs) => [...subs, newSub]);
    setNewSubsNumber(newSubsNumber + 1);
  };

  return (
    <div className="App" ref={divRef}>
      <h1>All Subs</h1>
      <List subs={subs} />
      New Subs #: {newSubsNumber}
      <Form onNewSub={handleNewSub} />
    </div>
  );
}

export default App;
