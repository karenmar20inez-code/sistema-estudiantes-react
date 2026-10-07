import React, { useState } from 'react';

function App() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [opcion, setOpcion] = useState(0);

  const [formulario, setFormulario] = useState({
    matricula: '',
    nombre: '',
    materia: '',
    c1: '',
    c2: '',
    c3: ''
  });

  const [matriculaAccion, setMatriculaAccion] = useState('');
  const [resultado, setResultado] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const capturar = (e) => {
    e.preventDefault();

    const { matricula, nombre, materia, c1, c2, c3 } = formulario;

    if (
      !matricula ||
      !nombre ||
      !materia ||
      c1 === '' ||
      c2 === '' ||
      c3 === ''
    ) {
      setMensaje('⚠️ Por favor, llena todos los campos para capturar.');
      return;
    }

    const calif1 = parseFloat(c1);
    const calif2 = parseFloat(c2);
    const calif3 = parseFloat(c3);

    const promedio_real = (calif1 + calif2 + calif3) / 3;
    const promedio = Math.round(promedio_real);

    let estatus;

    if (promedio >= 6) {
      estatus = 'Aprobado';
    } else {
      estatus = 'Reprobado';
    }

    const nuevoEstudiante = {
      matricula,
      nombre,
      materia,
      c1: calif1,
      c2: calif2,
      c3: calif3,
      promedio,
      estatus
    };

    setEstudiantes([...estudiantes, nuevoEstudiante]);

    setMensaje('✅ Estudiante registrado correctamente.');

    setFormulario({
      matricula: '',
      nombre: '',
      materia: '',
      c1: '',
      c2: '',
      c3: ''
    });

    setResultado(null);

    setTimeout(() => {
      setMensaje('');
    }, 3000);
  };

  const buscar = () => {
    const matricula_buscar = matriculaAccion.trim();

    let encontrado = false;
    let i = 0;

    while (i < estudiantes.length && encontrado === false) {
      if (estudiantes[i].matricula === matricula_buscar) {
        setResultado(estudiantes[i]);
        encontrado = true;
      }

      i++;
    }

    if (encontrado === false) {
      setResultado(null);
      setMensaje('Alumno no registrado.');

      setTimeout(() => {
        setMensaje('');
      }, 3000);
    } else {
      setMensaje('');
    }
  };

  const eliminar = () => {
    const matricula_eliminar = matriculaAccion.trim();

    let encontrado = false;
    let i = 0;

    while (i < estudiantes.length && encontrado === false) {
      if (estudiantes[i].matricula === matricula_eliminar) {
        const nuevosEstudiantes = [...estudiantes];

        nuevosEstudiantes.splice(i, 1);

        setEstudiantes(nuevosEstudiantes);
        setResultado(null);
        setMensaje('🗑️ Registro eliminado.');

        encontrado = true;
      }

      i++;
    }

    if (encontrado === false) {
      setMensaje('Alumno no registrado.');

      setTimeout(() => {
        setMensaje('');
      }, 3000);
    }
  };

  const seleccionarOpcion = (numero) => {
    setOpcion(numero);
    setMensaje('');

    if (numero !== 2) {
      setResultado(null);
    }

    if (numero === 4) {
      setMensaje('👋 Saliendo del sistema...');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        padding: '40px 20px',
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: '#1f2937'
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}
      >

        <img
          src={`${process.env.PUBLIC_URL}/estudiante.png`}
          alt="Estudiante"
          style={{
            width: '120px',
            height: '120px',
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto 15px'
          }}
        />

        <h1
          style={{
            textAlign: 'center',
            color: '#111827',
            fontSize: '2.2rem',
            fontWeight: '800',
            marginBottom: '30px'
          }}
        >
          Sistema de Estudiantes
        </h1>

        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '15px',
            marginBottom: '25px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
          }}
        >
          <h3
            style={{
              textAlign: 'center',
              marginTop: 0
            }}
          >
            Menú Principal
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px'
            }}
          >
            <button
              onClick={() => seleccionarOpcion(1)}
              style={{
                ...btnStyle,
                backgroundColor: '#10b981'
              }}
            >
              1. Capturar
            </button>

            <button
              onClick={() => seleccionarOpcion(2)}
              style={{
                ...btnStyle,
                backgroundColor: '#3b82f6'
              }}
            >
              2. Buscar
            </button>

            <button
              onClick={() => seleccionarOpcion(3)}
              style={{
                ...btnStyle,
                backgroundColor: '#ef4444'
              }}
            >
              3. Eliminar
            </button>

            <button
              onClick={() => seleccionarOpcion(4)}
              style={{
                ...btnStyle,
                backgroundColor: '#6b7280'
              }}
            >
              4. Salir
            </button>
          </div>
        </div>

        {mensaje && (
          <div
            style={{
              backgroundColor:
                mensaje.includes('registrado correctamente')
                  ? '#dcfce7'
                  : mensaje.includes('⚠️')
                  ? '#fef9c3'
                  : mensaje.includes('🗑️')
                  ? '#e0e7ff'
                  : mensaje.includes('👋')
                  ? '#e0e7ff'
                  : '#fee2e2',

              color:
                mensaje.includes('registrado correctamente')
                  ? '#166534'
                  : mensaje.includes('⚠️')
                  ? '#854d0e'
                  : mensaje.includes('🗑️')
                  ? '#3730a3'
                  : mensaje.includes('👋')
                  ? '#3730a3'
                  : '#991b1b',

              padding: '16px',
              borderRadius: '12px',
              marginBottom: '24px',
              textAlign: 'center',
              fontWeight: '600'
            }}
          >
            {mensaje}
          </div>
        )}

        {opcion === 1 && (
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <span style={numberBadgeStyle}>1</span>

              <h3
                style={{
                  margin: 0,
                  fontSize: '1.2rem'
                }}
              >
                Capturar Estudiante
              </h3>
            </div>

            <form
              onSubmit={capturar}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <input
                type="text"
                name="matricula"
                placeholder="Matrícula"
                value={formulario.matricula}
                onChange={manejarCambio}
                style={inputStyle}
              />

              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                value={formulario.nombre}
                onChange={manejarCambio}
                style={inputStyle}
              />

              <input
                type="text"
                name="materia"
                placeholder="Materia"
                value={formulario.materia}
                onChange={manejarCambio}
                style={inputStyle}
              />

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '12px'
                }}
              >
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  name="c1"
                  placeholder="Calif 1"
                  value={formulario.c1}
                  onChange={manejarCambio}
                  style={inputStyle}
                />

                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  name="c2"
                  placeholder="Calif 2"
                  value={formulario.c2}
                  onChange={manejarCambio}
                  style={inputStyle}
                />

                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  name="c3"
                  placeholder="Calif 3"
                  value={formulario.c3}
                  onChange={manejarCambio}
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                style={{
                  ...btnStyle,
                  backgroundColor: '#10b981'
                }}
              >
                Registrar Estudiante
              </button>
            </form>
          </div>
        )}

        {opcion === 2 && (
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <span
                style={{
                  ...numberBadgeStyle,
                  backgroundColor: '#3b82f6'
                }}
              >
                2
              </span>

              <h3
                style={{
                  margin: 0,
                  fontSize: '1.2rem'
                }}
              >
                Buscar Estudiante
              </h3>
            </div>

            <input
              type="text"
              placeholder="Ingresa la matrícula"
              value={matriculaAccion}
              onChange={(e) => setMatriculaAccion(e.target.value)}
              style={{
                ...inputStyle,
                marginBottom: '16px'
              }}
            />

            <button
              onClick={buscar}
              style={{
                ...btnStyle,
                backgroundColor: '#3b82f6'
              }}
            >
              Buscar
            </button>

            {resultado && (
              <div
                style={{
                  marginTop: '24px',
                  borderTop: `6px solid ${
                    resultado.estatus === 'Aprobado'
                      ? '#22c55e'
                      : '#ef4444'
                  }`,
                  paddingTop: '20px'
                }}
              >
                <h4>Expediente del Alumno</h4>

                <div style={dataRowStyle}>
                  <span style={dataLabelStyle}>Matrícula:</span>
                  <span style={dataValueStyle}>
                    {resultado.matricula}
                  </span>
                </div>

                <div style={dataRowStyle}>
                  <span style={dataLabelStyle}>Nombre:</span>
                  <span style={dataValueStyle}>
                    {resultado.nombre}
                  </span>
                </div>

                <div style={dataRowStyle}>
                  <span style={dataLabelStyle}>Materia:</span>
                  <span style={dataValueStyle}>
                    {resultado.materia}
                  </span>
                </div>

                <div style={dataRowStyle}>
                  <span style={dataLabelStyle}>C1:</span>
                  <span style={dataValueStyle}>
                    {resultado.c1}
                  </span>
                </div>

                <div style={dataRowStyle}>
                  <span style={dataLabelStyle}>C2:</span>
                  <span style={dataValueStyle}>
                    {resultado.c2}
                  </span>
                </div>

                <div style={dataRowStyle}>
                  <span style={dataLabelStyle}>C3:</span>
                  <span style={dataValueStyle}>
                    {resultado.c3}
                  </span>
                </div>

                <div
                  style={{
                    marginTop: '15px',
                    fontSize: '24px',
                    fontWeight: 'bold'
                  }}
                >
                  Promedio: {resultado.promedio}
                </div>

                <div
                  style={{
                    marginTop: '10px',
                    fontWeight: 'bold',
                    color:
                      resultado.estatus === 'Aprobado'
                        ? '#166534'
                        : '#991b1b'
                  }}
                >
                  Estatus: {resultado.estatus}
                </div>
              </div>
            )}
          </div>
        )}

        {opcion === 3 && (
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <span
                style={{
                  ...numberBadgeStyle,
                  backgroundColor: '#ef4444'
                }}
              >
                3
              </span>

              <h3
                style={{
                  margin: 0,
                  fontSize: '1.2rem'
                }}
              >
                Eliminar Estudiante
              </h3>
            </div>

            <input
              type="text"
              placeholder="Ingresa la matrícula"
              value={matriculaAccion}
              onChange={(e) => setMatriculaAccion(e.target.value)}
              style={{
                ...inputStyle,
                marginBottom: '16px'
              }}
            />

            <button
              onClick={eliminar}
              style={{
                ...btnStyle,
                backgroundColor: '#ef4444'
              }}
            >
              Eliminar Registro
            </button>
          </div>
        )}

        {opcion === 4 && (
          <div
            style={{
              ...cardStyle,
              textAlign: 'center'
            }}
          >
            <h2>Saliendo del sistema...</h2>

            <p>
              Gracias por utilizar el Sistema de Estudiantes.
            </p>

            <button
              onClick={() => {
                setOpcion(0);
                setMensaje('');
              }}
              style={{
                ...btnStyle,
                backgroundColor: '#3b82f6',
                maxWidth: '250px',
                margin: '0 auto'
              }}
            >
              Volver al sistema
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: '#ffffff',
  padding: '32px',
  borderRadius: '20px',
  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
  display: 'flex',
  flexDirection: 'column'
};

const cardHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '24px'
};

const numberBadgeStyle = {
  width: '28px',
  height: '28px',
  backgroundColor: '#10b981',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '14px'
};

const inputStyle = {
  padding: '14px 16px',
  borderRadius: '10px',
  border: '1px solid #d1d5db',
  width: '100%',
  boxSizing: 'border-box',
  fontSize: '15px',
  outline: 'none',
  backgroundColor: '#f9fafb'
};

const btnStyle = {
  padding: '14px 20px',
  borderRadius: '10px',
  border: 'none',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
  width: '100%',
  fontSize: '15px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
};

const dataRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px'
};

const dataLabelStyle = {
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: '600'
};

const dataValueStyle = {
  color: '#1f2937',
  fontSize: '15px',
  fontWeight: '500',
  textAlign: 'right'
};

export default App;