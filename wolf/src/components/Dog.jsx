import React from 'react'
import {Canvas, useThree} from '@react-three/fiber'
import {OrbitControls, useGLTF} from '@react-three/drei'

const Dog =() =>{
    const model= useGLTF('/models/dog.drc.glb')
    useThree(({camera, scene, gl}) =>{
        console.log(camera.position)
    })
    

    return(
    <>
    <primitive object={model.scene} />
    <OrbitControls/>
    
    </>
    )
}

useGLTF.preload('/models/dog.drc.glb')

export default Dog
