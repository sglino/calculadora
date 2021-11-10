//Se importan las librerias
import InputIP from './components/inputIP';
import './App.css';
import { useState } from 'react';

//Se crean las funciones de la aplicación, en este caso las variables logicas para la programación de la calculadora 
function App() {
  const [IP, setIP] = useState('');
  const [Tipo, setTipo] = useState('');
  const [MascaraRed, setMascaraRed] = useState('');
  const [TipoSubNet, setTipoSubNet] = useState('');
  const [nTipoS, setnTipoS] = useState('');
  const [nSubredes, setnSubredes] = useState('');
  const [nHost, setnHost] = useState('');
  const [SubMascara, setSubMascara] = useState('');
  const [LsubRedes, setLsubRedes] = useState('');

  // Se retornan las variables logicas desde un input que soporta la direccion IP que se ingresa y realiza sus procedimientos
  return (
    <div className="flex flex-col items-center h-screen w-screen gap-5 bg-gray-200">
      <h6>Calculadora IP</h6>
      <div>
        <InputIP
          IP={IP}
          setIP={setIP}
          Tipo={Tipo}
          setTipo={setTipo}
          MascaraRed = {MascaraRed}
          setMascaraRed = {setMascaraRed}
          TipoSubNet = {TipoSubNet}
          setTipoSubNet = {setTipoSubNet}
          nTipoS = {nTipoS}
          setnTipoS = {setnTipoS}
          nSubredes = {nSubredes}
          setnSubredes = {setnSubredes}
          nHost = {nHost}
          setnHost = {setnHost}
          SubMascara = {SubMascara}
          setSubMascara = {setSubMascara}
          LsubRedes = {LsubRedes}
          setLsubRedes = {setLsubRedes}
        />
      </div>
      
    </div>
  );
}

export default App;
