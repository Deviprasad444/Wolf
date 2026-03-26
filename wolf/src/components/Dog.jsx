import React ,{useEffect} from 'react'
import * as three from 'three'
import {Canvas, useThree} from '@react-three/fiber'
import {OrbitControls, useGLTF, useTexture, useAnimations} from '@react-three/drei'

const Dog =() =>{
    const model= useGLTF('/models/dog.drc.glb')
    useThree(({camera, scene, gl}) =>{

        camera.position.z =1
        gl.toneMapping =three.reinhardToneMapping
        gl.outputColorSpace =three.SRGBColorSpace
        
        
    })


    const {actions} =useAnimations(model.animations,model.scene)

    useEffect(() =>{
        actions["Take 001"].play()
    },[actions])


   const[normalMap, sampleMatCap, branchMap, branchNormalMap] =(useTexture(["/dog_normals.jpg", "/matcap/mat-2.png","/branches_diffuse.jpg","/branches_normals.jpg"]))

    .map(texture =>{
        texture.flipY =false
        texture.colorSpace =three.SRGBColorSpace
        return texture
    })

    const dogMaterial =new three.MeshMatcapMaterial({
        normalMap:normalMap,
        matcap:sampleMatCap
    })

    const branchMaterial =new three.MeshMatcapMaterial({
        normalMap:branchNormalMap,
        map:branchMap
    })

    model.scene.traverse((child) =>{
        if(child.name.includes("DOG")){
            child.material =dogMaterial
            
        }else{
            child.material =branchMaterial
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
