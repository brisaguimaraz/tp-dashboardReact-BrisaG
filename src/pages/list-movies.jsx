import { Card, CardBody, CardTitle, Col, Row, Table } from "react-bootstrap";
import { TableItem } from "../components/TableItem";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { Paginator } from "../components/Paginator";
import { FormSearch } from "../components/FormSearch";
import { FormMovies } from "../components/FormMovies";
import { showMessageSuccess } from "../components/Toast";
import Swal from "sweetalert2";

export const ListMovies = () => {
  const [movie, setMovie] = useState(null)
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState();
  const getMovies = async (endpoint = "/api/v1/movies") => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001${endpoint}`);
      const result = await response.json();
      setLoading(false);
      setMovies(result.data);
      setPagination(result.meta);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);
  const handlePagination = async (event, endpoint) => {
    event.preventDefault();
    getMovies(endpoint);
  };
  const handleAddMovie = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/movies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      showMessageSuccess(result.message)
      getMovies()
      
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditMovie = async(id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/movies/${id}`)
      const result = await response.json()
      result.ok && setMovie(result.data)

    } catch (error) {
      console.log(error)
    }
  }
  const handleUpdateMovie = async(id, data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/movies/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      // console.log(result)
      setMovies(movies.map(movie => movie.id === result.data.id ? result.data : movie))
      showMessageSuccess(result.message)
    } catch (error) {
      console.log(error);
    }
  }
  const handleDeleteMovie = async (id) => {
    Swal.fire({
      title: "Estas seguro que queres eliminar la pelicula?",
      showDenyButton: true,
      confirmButtonText: "Si eliminala",
      confirmButtonColor: 'red',
      denyButtonText: `No, me arrepentí :(`,
      denyButtonColor: 'grey'
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/movies/${id}`,
        {
          method: "DELETE",
        })
        const result = await response.json()
        if(result.ok){
          showMessageSuccess(result.message)
          setMovies(movies.filter(movie => movie.id !== id))
        }
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
  return loading ? (
    <Loading />
  ) : (
    <Row>
      <Col sn={12} lg={4}>
        <Card className="mb-3">
          <Card.Header>
            <CardTitle>{movie ? 'Editar' : 'Agregar'} Película</CardTitle>
          </Card.Header>
          <Card.Body>
            <FormMovies handleAddMovie={handleAddMovie} movie={movie} setMovie={setMovie} handleUpdateMovie={handleUpdateMovie}/>
          </Card.Body>
        </Card>
      </Col>
      <Col sn={12} lg={8}>
        <Card className="shadow-lg mb-5">
          <Card.Body>
            <div className="d-flex flex-column flex-lg-row justify-content-between">
              <FormSearch getMovies={getMovies} />
              <Paginator
                pagination={pagination}
                handlePagination={handlePagination}
              />
            </div>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Duracion</th>
                  <th>Rating</th>
                  <th>Géneros</th>
                  <th>Premios</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <TableItem
                    key={movie.id}
                    movie={movie}
                    handleEditMovie = {handleEditMovie}
                    handleDeleteMovie={handleDeleteMovie}
                  />
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
