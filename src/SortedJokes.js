import Joke from "./Joke";
/** List of jokes. */
const SortedJokes = ({ sortedJokes, getJokes, vote }) => {
    return (
        <div className="JokeList">
            <button
                className="JokeList-getmore"
                onClick={getJokes}
            >
                Get New Jokes
            </button>


            {sortedJokes.map((j) => (
                <Joke
                    text={j.joke}
                    key={j.id}
                    id={j.id}
                    votes={j.votes}
                    vote={vote}
                />
            ))
            }

        </div>
    )
}

export default SortedJokes;