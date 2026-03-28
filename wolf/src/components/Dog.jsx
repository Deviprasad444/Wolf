import React ,{useEffect, useRef} from 'react'
import * as three from 'three'
import {Canvas, useThree} from '@react-three/fiber'
import {OrbitControls, useGLTF, useTexture, useAnimations} from '@react-three/drei'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

const Dog =() =>{

    gsap.registerPlugin(useGSAP())
    gsap.registerPlugin(ScrollTrigger)

    
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

    const Dogmodel =useRef(model)

    useGSAP(() =>{
        const tl =gsap.timeline({
            scrollTrigger:{
                trigger:"#section-1",
                endTrigger:"#section-3",
                start:"top top",
                end:"bottom bottom",
                markers:true
            }
        })

        tl
        .to(Dogmodel.current.scene.position,{
            z:"-=0.5",
            y:"+=0.1"
        })

        .to(Dogmodel.current.scene.rotation,{
            x:`+=${Math.PI /15}`
        })

        
    }, [])

    return(
    <>
    <primitive object={model.scene} position ={[0.2, -0.5, 0]} rotation ={[0, Math.PI/3, 0]} />
    <OrbitControls/>
    
    </>
    )
}

useGLTF.preload('/models/dog.drc.glb')

export default Dog
