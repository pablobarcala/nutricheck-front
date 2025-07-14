import { expect } from 'chai';

describe('Opciones del NavBar del Nutricionista', () => {
  const opcionesEsperadas = [
    { name: 'Inicio', ruta: '/nutricionista' },
    { name: 'Comidas', ruta: '/nutricionista/comidas' },
    { name: 'Pacientes', ruta: '/nutricionista/pacientes' },
    { name: 'Panel de Control', ruta: '/nutricionista/panel' },
  ];

  it('debería contener todas las opciones esperadas', () => {
    const rutas = opcionesEsperadas.map(op => op.ruta);
    
    expect(rutas).to.include('/nutricionista');
    expect(rutas).to.include('/nutricionista/comidas');
    expect(rutas).to.include('/nutricionista/pacientes');
    expect(rutas).to.include('/nutricionista/panel');
  });

  it('no debería contener rutas no permitidas o erróneas', () => {
    const rutas = opcionesEsperadas.map(op => op.ruta);

    expect(rutas).to.not.include('/admin');
    expect(rutas).to.not.include('/login');
    expect(rutas).to.not.include('/paciente');
  });
});
