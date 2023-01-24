import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";

export default class Environment {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        
        this.setSunlight();
    }

    setSunlight(){
        this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(-3, 14, 6);
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
        this.scene.add(this.ambientLight);
    }

    switchTheme(theme){
        if(theme === "dark"){
            GSAP.to(this.sunLight.color, {
                r: 0.172,
                g: 0.231,
                b: 0.686,
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.172,
                g: 0.231,
                b: 0.686,
            });
            GSAP.to(this.sunLight,{
                intensity: 0.7,   
            })
            GSAP.to(this.ambientLight,{
                intensity: 0.7,    
            })
        } else {
            GSAP.to(this.sunLight.color, {
                r: 1,
                g: 1,
                b: 1,
            });
            GSAP.to(this.ambientLight.color, {
                r: 1,
                g: 1,
                b: 1,
            });
            GSAP.to(this.sunLight,{
                intensity: 3,  
            })
            GSAP.to(this.ambientLight,{
                intensity: 1, 
            })
        };
    }

    resize(){}

    update(){}
}