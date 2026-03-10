import React from 'react'
import * as three from 'three'
import {Canvas, useThree} from '@react-three/fiber'
import {OrbitControls, useGLTF, useTexture} from '@react-three/drei'

const Dog =() =>{
    const model= useGLTF('/models/dog.drc.glb')
    useThree(({camera, scene, gl}) =>{
        console.log(camera.position)
        camera.position.z =1
        
        
    })

    const textures =useTexture({
        normalMap:"/dog_normals.jpg"
    })

    model.scene.traverse((child) =>{
        if(child.name.includes("DOG")){
            child.material =new three.MeshMatcapMaterial({
                normalMap:textures.normalMap,
                color:0xFF0000
            })
            
        }
    })

    return(
    <>
    <primitive object={model.scene} position ={[0.2, -0.5, 0]} rotation ={[0, Math.PI/3, 0]} />
    <OrbitControls/>
    
    </>
    )
}

useGLTF.preload('/models/dog.drc.glb')

export default Dog
