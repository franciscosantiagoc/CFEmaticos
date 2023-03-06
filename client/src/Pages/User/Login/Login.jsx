import React, {useState, useEffect} from 'react';
import { useFormik } from 'formik';
import { formikConfig } from './validation';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const [user, setUser] = useState(localStorage.getItem('user'))
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('user') !=null) {
      setUser(JSON.parse(localStorage.getItem('user')));
      navigate('/')
    }
  },[])

  const formik = useFormik(formikConfig);
  return (
    <div className='container-login'>
        <form className='login-form' onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <label htmlFor="id" className="form-label">ID</label>
                <input type="text" className="form-control" id="id" onChange={formik.handleChange}/>
                {formik.errors.id && (<div className="error form-text">{formik.errors.id}</div>)}
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="password" onChange={formik.handleChange}/>
                {formik.errors.password && (<div className="error form-text">{formik.errors.password}</div>)}
            </div>
            <button type="submit" className="btn btn-primary">Iniciar sesión</button>
        </form>
    </div>
  )
}
