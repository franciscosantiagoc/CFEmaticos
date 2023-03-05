import React from 'react';
import { useFormik } from 'formik';
import { formikConfig } from './validation';
import './Login.scss';
export default function Login() {
  const formik = useFormik(formikConfig);
  return (
    <div className='container-login'>
        <form className='login-form' onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <label for="id" className="form-label">ID</label>
                <input type="email" className="form-control" id="id" onChange={formik.handleChange}/>
                {formik.errors.id && (<div className="error form-text">{formik.errors.id}</div>)}
            </div>
            <div className="mb-3">
                <label for="password" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="password" onChange={formik.handleChange}/>
                {formik.errors.password && (<div className="error form-text">{formik.errors.password}</div>)}
            </div>
            <button type="submit" className="btn btn-primary">Iniciar sesión</button>
        </form>
    </div>
  )
}
