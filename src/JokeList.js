import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./JokeList.css";
import Loading from "./Loading";
import SortedJokes from "./SortedJokes";



const JokeList = () => {
  const numJokesToGet = 5;
  /* empty joke list, set to loading state, and then call getJokes */
  const [jokes, setJokes] = useState([])
  const [seenJokes, setSeenJokes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function getJokes() {
    let newJokes = [];
    let newSeenJokes = [];
    try {
      // load jokes one at a time, adding not-yet-seen jokes
      while (newJokes.length < numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let { ...joke } = res.data;

        if (!newSeenJokes.includes(joke.id)) {
          newSeenJokes.push(joke.id);
          newJokes.push({ ...joke, votes: 0 });
        } else {
          console.log("duplicate found!");
        }
      }
      setSeenJokes([...newSeenJokes]);
      setJokes([...newJokes]);
      setIsLoading(false);

    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    /* retrieve jokes from API */
    getJokes();
  }, []);

  const sortedJokes = useMemo(() => [...jokes].sort((a, b) => b.votes - a.votes), [jokes]);

  /* change vote for this id by delta (+1 or -1) */
  const vote = (id, delta) => {
    const updateJokes = jokes.map(j => j.id === id ? { ...j, votes: j.votes + delta } : j)
    setJokes(updateJokes)
  }
  return (
    /* render: either loading spinner or list of sorted jokes. */
    isLoading ? <Loading /> : <SortedJokes sortedJokes={sortedJokes} vote={vote} getJokes={getJokes} />
  )

}

export default JokeList;
// 