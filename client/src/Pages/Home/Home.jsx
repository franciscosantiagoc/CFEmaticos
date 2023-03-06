import React, {useState, useEffect} from 'react'
import './Home.scss';
export default function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    if(localStorage.getItem('user') !=null) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  },[])
  return (
    <div className="container-home">
        <h2>{user ? `Hola ${user.name} ${user.aPaterno} bienvenid@`: 'Bienvenidos a CFEmáticos'}</h2>
    </div>
  )
}
