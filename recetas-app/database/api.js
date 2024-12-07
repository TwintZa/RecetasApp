const login = async (email, password) => {
    try {
      const response = await fetch('http://192.168.100.3:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error de inicio de sesión');
      }
  
      return data;
    } catch (error) {
      throw new Error(error.message || 'Error de conexión');
    }
  };

  const register = async (nombre, email, password) => {
    try {
      const response = await fetch('http://192.168.100.3:3000/register', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar usuario');
      }
  
      return data;
    } catch (error) {
      throw new Error(error.message || 'Error de conexión');
    }
  };
  
  export { login };
  export { register };