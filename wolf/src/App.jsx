import Dog from './components/Dog'
import {Canvas} from '@react-three/fiber'
import './App.css'

function App() {

  return (
    <>
    <Canvas>
      <directionalLight position ={[0, 5, 5]} intensity ={10}/>
      <Dog/>
    </Canvas>

    </>
  )
}

export default App
