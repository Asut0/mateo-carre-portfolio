import {EventEmitter} from "events";
import Experience from "./Experience.js";
import GSAP from "gsap";
import convert from "./Utils/convertDivsToSpans.js";

export default class Preloader extends EventEmitter{
    constructor(){
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        })

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets(){
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));
        convert(document.querySelector(".hero-second-subheading"));
        convert(document.querySelector(".second-sub"));
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
    }

    firstIntro(){

        return new Promise ((resolve) => {

            this.timeline = new GSAP.timeline();
            this.timeline.set(".animatedis", {y: 0, yPercent: 100 });

            this.timeline.to(".preloader", {
                opacity: 0,
                delay: 1, 
                onComplete: () =>  {
                    document.querySelector(".preloader").classList.add("hidden");
                }
            });

            if(this.device === "desktop"){
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 0.15,
                    y: 0.15,
                    z: 0.15,
                    ease: "back.out(2.5)",
                    duration : 0.7,
                }).to(this.room.position, {
                    x: -1.3,
                    ease: "power1.out",
                    duration: 0.7,
                });
            } else {
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 0.15,
                    y: 0.15,
                    z: 0.15,
                    ease: "back.out(2.5)",
                    duration : 0.7,
                }).to(this.room.position, {
                    z: -1.3,
                    ease: "power1.out",
                    duration: 0.7,
                });
            }
            this.timeline.to(".intro-text .animatedis", {
                yPercent: 0,
                stagger: 0.05,
                ease: "back.out(1.7)",
            })
            .to(".arrow-svg-wrapper", {
                opacity: 1,
            }, "same10")
            .to(".toggle-bar", {
                opacity: 1,
                onComplete: resolve,
            }, "same10");
        });
    }

    secondIntro(){

        return new Promise ((resolve) => {

            this.secondTimeline = new GSAP.timeline();

            this.secondTimeline
            .to(".intro-text .animatedis", {
                yPercent: 100,
                stagger: 0.05,
                ease: "back.in(1.7)",
            }, "fadeout")
            .to(".arrow-svg-wrapper", {
                opacity: 0,
            }, "fadeout")
            .to(this.room.position, {
                x: 0,
                y: 0,
                z: 0,
                ease: "power1.out",
            }, "same").to(this.roomChildren.cube.rotation, {
                y: 2*Math.PI + Math.PI/4
            }, "same").to(this.roomChildren.cube.scale, {
                x: 1,
                y: 1,
                z: 1,
            }, "same").to(this.camera.orthographicCamera.position, {
                y: 2.7,
            }, "same").to(this.roomChildren.cube.position, {
                x: 0, 
                y: 2.25,//0.088155,
                z: 0,
            }, "same").set(this.roomChildren.body.scale, {
                x: 1,
                y: 1,
                z: 1,
            }).to(this.roomChildren.cube.scale, {
                x: 0,
                y: 0,
                z: 0,
            }, "same5").to(".hero-main-title .animatedis", { //text Animation
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)",
            }, "same5").to(".hero-main-description .animatedis", { //text Animation
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)",
            }, "same5").to(".first-sub .animatedis", { //text Animation
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)",
            }, "same5").to(".second-sub .animatedis", { //text Animation
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)",
            }, "same5").to(this.roomChildren.piano.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }, ">-0.5").to(this.roomChildren.clock.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }, ">-0.4").to(this.roomChildren.shelves.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }, ">-0.3").to(this.roomChildren.flooritems.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }, ">-0.2").to(this.roomChildren.desks.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }, ">-0.1").to(this.roomChildren.tablestuff.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }, ">-0.08").to(this.roomChildren.computer.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }, ">-0.05").set(this.roomChildren.minifloor.scale, {
                x: 1,
                y: 1,
                z: 1,
            }, ">-0.02")
            .to(this.roomChildren.chair.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",  
                duration: 0.5,
            }, "same2")
            .to(this.roomChildren.chair.rotation, {
                y: 4* Math.PI + Math.PI/4,
                ease: "power2.out",
                duration: 1,
                onComplete: resolve,
            }, "same2")
            .to(".arrow-svg-wrapper", {
                opacity: 1,
                onComplete: resolve,
            });
        });
    }

    onScroll(e){
        if(e.deltaY > 0){
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e){
        this.initialY = e.touches[0].clientY;
    }

    onTouchMove(e){
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if(difference > 0){
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.initialY = null;
    }

    removeEventListeners(){
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro(){
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }
    async playSecondIntro(){
        this.moveFlag = false;
        //this.scaleFlag = true;
        await this.secondIntro();
        //this.scaleFlag = false;
        this.emit("enablecontrols");
    }

    move(){
        if(this.device === "desktop"){
            this.room.position.set(-1.3, 0, 0);
        } else {
            this.room.position.set(0, 0, -1.3);
        }
    }

    //scale(){
        //if(this.device === "mobile"){
            //this.room.scale.set(0.3, 0.3, 0.3);
        //} else {
            //this.room.scale.set(0.15, 0.15, 0.15);
        //}
    //}

    update(){
        if(this.moveFlag){
            this.move();
        }
        //if(this.scaleFlag){
            //this.scale();
        //}
    }
}

