export const validate = values => {
    const errors = {};
    if (!values.title) {
      errors.title = 'Te falta el titulo capo';
    } else if (values.title.length < 3) {
      errors.title = 'minimo 3 caracteres';
    }
    if (!values.rating) {
      errors.rating = 'No te olvides del rating';
    }
    
    if (!values.awards) {
      errors.awards = '¿No cuenta con ningún premio?';
    } 
  
    if (!values.length) {
        errors.length = 'Tenés que ingresar la duración';
      } 
    
    
    if (!values.release_date) {
        errors.release_date = '¿En qué fecha fue estrenada?';
      }
    if (!values.genre_id) {
        errors.genre_id = '¿No tiene género?';
      }
  
    return errors;
  };