import { ContentRowMovies } from "../components/ContentRowMovies"
import { GenresInDb } from "../components/GenresInDb"
import { LastMovieInDb } from "../components/lastMovieInDb"

export const Home = () => {
  return (
    <>
    <ContentRowMovies/>
    <div className="row">
                <LastMovieInDb/>
                <GenresInDb/>
            </div>
    </>
  )
}
