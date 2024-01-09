import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import PropTypes from "prop-types"
import { validate } from "../validations/moviesValidator";
export const FormMovies = ({handleAddMovie, movie, setMovie, handleUpdateMovie}) => {
  const [genres, setGenres] = useState([]);
  const getGenres = async () => {
    let response = await fetch(`${import.meta.env.VITE_APP_API_URL}/genres`);
    let result = await response.json();
    setGenres(result.data);
  };
  useEffect(() => {
    getGenres();
  }, []);
  useEffect(() => {
    if(movie){
      formik.setValues({
        title: movie.title,
        rating: movie.rating,
        awards: movie.awards,
        length: movie.length,
        release_date: movie.release_date.split('T')[0],
        genre_id: movie.genre? movie.genre.id : null
      })
    }
  },[movie])
  
 const formik = useFormik({
    initialValues:{
        title: '',
        rating: '',
        awards: '',
        release_date: '',
        length: '',
        genre_id: ''
    },
    validate,
    onSubmit: (values) => {
        movie ? handleUpdateMovie(movie.id, values) : handleAddMovie(values);
        setMovie(null)
        formik.handleReset()
    }
 })
 const handleCancel = () => {
    setMovie(null)
    formik.handleReset()
 }
  return (
    <Form className="row" onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3 col-12">
        <Form.Label>Título</Form.Label>
        <Form.Control type="text" placeholder="Título de la pelicula" value={formik.values.title} name="title" onChange={formik.handleChange}/>
        {formik.errors.title && <small className="ms-2 text-danger">{formik.errors.title}</small>}
      </Form.Group>
      <Form.Group className="mb-3 col-12 col-md-6">
        <Form.Label>Ratíng</Form.Label>
        <Form.Control type="number" value={formik.values.rating} name="rating" onChange={formik.handleChange}/>
        {formik.errors.rating && <small className="ms-2 text-danger">{formik.errors.rating}</small>}
      </Form.Group>
      <Form.Group className="mb-3 col-12 col-md-6">
        <Form.Label>Premios</Form.Label>
        <Form.Control type="number" value={formik.values.awards} name="awards" onChange={formik.handleChange}/>
        {formik.errors.awards && <small className="ms-2 text-danger">{formik.errors.awards}</small>}
      </Form.Group>
      <Form.Group className="mb-3 col-12 col-md-6">
        <Form.Label>Duración</Form.Label>
        <Form.Control type="number" value={formik.values.length} name="length" onChange={formik.handleChange}/>
        {formik.errors.length && <small className="ms-2 text-danger">{formik.errors.length}</small>}
      </Form.Group>
      <Form.Group className="mb-3 col-12 col-md-6">
        <Form.Label>Fecha de estreno</Form.Label>
        <Form.Control type="date" value={formik.values.release_date} name="release_date" onChange={formik.handleChange}/>
        {formik.errors.release_date && <small className="ms-2 text-danger">{formik.errors.release_date}</small>}
      </Form.Group>
      <Form.Group className="mb-3 col-12">
        <Form.Label>Género</Form.Label>
        <Form.Select className="form-control" value={formik.values.genre_id} name="genre_id" onChange={formik.handleChange}>
          <option hidden defaultChecked>
            Selecciona....
          </option>
          {
            genres.map(({name, id}) => <option key={id} value={id} >{name}</option>)
          }
        </Form.Select>
        {formik.errors.genre_id && <small className="ms-2 text-danger">{formik.errors.genre_id}</small>}
      </Form.Group>
      <Form.Group className="mb-3 col-12">
        <div className="d-flex justify-content-between">
        <Button onClick={handleCancel} className="w-100" variant="outline-secondary">
          cancelar
        </Button>
        <Button type="sumbit" className="w-100" variant="outline-dark">
          Guardar
        </Button>
        </div>
      </Form.Group>
    </Form>
  );
};
FormMovies.propTypes = {
    handleAddMovie: PropTypes.func,
    handleUpdateMovie: PropTypes.func,
    setMovie: PropTypes.func,
    movie: PropTypes.object
}