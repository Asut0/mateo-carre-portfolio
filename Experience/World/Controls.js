import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";

export default class Controls {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;

        this.circleFirst = this.experience.world.floor.circleFirst;
        this.circleSecond = this.experience.world.floor.circleSecond;
        this.circleThird = this.experience.world.floor.circleThird;

        GSAP.registerPlugin(ScrollTrigger);

        document.querySelector(".page").style.overflow = "visible";

        this.setSmoothScroll();
        this.setScrollTrigger();
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.2,
            disableRaf: true });
      
      
        GSAP.ticker.add(asscroll.update);
      
        ScrollTrigger.defaults({
          scroller: asscroll.containerElement });
      
      
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
          scrollTop(value) {
            if (arguments.length) {
              asscroll.currentPos = value;
              return;
            }
            return asscroll.currentPos;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          fixedMarkers: true });
      
      
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
      
        requestAnimationFrame(() => {
          asscroll.enable({
            newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]") });
      
        });
        return asscroll;
    }

    setSmoothScroll(){
        this.asscroll = this.setupASScroll();
    }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            // Desktop
            "(min-width: 969px)": () => {

                this.room.scale.set(0.5, 0.5, 0.5);

                // First Section ------------------------------------------------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });
                this.firstMoveTimeline.to(this.room.position, {
                    x: () => {
                        return this.sizes.width * 0.0015;
                    }
                });

                // Second Section ------------------------------------------------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });
                this.secondMoveTimeline.to(this.room.position, {
                    x: () => {
                        return -1.5;
                    },
                    z: () => {
                        return this.sizes.height * 0.008;
                    }
                }, "same"
                );
                this.secondMoveTimeline.to(this.room.scale, {
                    x: 1.5,
                    y: 1.5,
                    z: 1.5,
                }, "same"
                );

                // Third Section ------------------------------------------------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });
                this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
                    y: 2,
                    x: -2.5,
                    z: 5,
                }, "same3");
                this.thirdMoveTimeline.to(this.room.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                }, "same3");
                this.thirdMoveTimeline.to(this.room.position, {
                    x: 1,
                    y: 1,
                    z: 1,
                }, "same3"
                );
            },


            // Mobile
            "(max-width: 968px)": () => {

                // Resets
                //this.room.scale.set(0.35, 0.35, 0.35);

                // First Section ------------------------------------------------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.scale, {
                    x: 0.35,
                    y: 0.35,
                    z: 0.35,
                });

                // Second Section ------------------------------------------------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                }, "same").to(this.room.position, {
                    x: 0.7,
                    z: 3,
                }, "same");

                // Third Section ------------------------------------------------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });
                this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
                    y: -1.3,
                    x: -0.5,
                });
                
            },
        
            // all screens
            all: () => {

                this.sections = document.querySelectorAll(".section");
                this.sections.forEach(section => {
                    this.progressWrapper = section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if(section.classList.contains("right")){
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 1,
                            }
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 1,
                            }
                        });
                    }else{
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 1,
                            }
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 1,
                            }
                        });
                    }
                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.6,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        }
                    });
                });

                // Circle Animation ---------------------------------------------------------------------------

                // First Circle ------------------------------------------------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                }).to(this.circleFirst.scale, {
                    x: 4,
                    y: 4,
                    z: 4,
                });

                // Second Circle ------------------------------------------------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                }).to(this.circleSecond.scale, {
                    x: 4,
                    y: 4,
                    z: 4,
                }, "same").to(this.room.position, {
                    y: 0.4,
                }, "same");

                // Third Circle ------------------------------------------------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                }).to(this.circleThird.scale, {
                    x: 4,
                    y: 4,
                    z: 4,
                });

                // Mini Platform Animation
                this.secondPartTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "center center",
                    }
                }); 

                this.room.children.forEach((child) => {
                    
                    if(child.name === "MiniFloor"){
                        this.first = GSAP.to(child.position, {
                            x: -1.24482,
                            z: 2.97861,
                            ease: "back.out(2)",
                            duration: 0.3,
                       });
                    }

                    if(child.name === "Mailbox"){
                        this.second = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3,
                        });
                    }

                    if(child.name === "Lamp"){
                        this.third = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3,
                        });
                    }

                    if(child.name === "FloorFirst"){
                        this.fourth = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3,
                        });
                    }

                    if(child.name === "FloorSecond"){
                        this.fifth = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3,
                        });
                    }

                    if(child.name === "FloorThird"){
                        this.sixth = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3,
                        });
                    }
                });

                this.secondPartTimeline.add(this.first);
                this.secondPartTimeline.add(this.second);
                this.secondPartTimeline.add(this.third, "-=0.1");
                this.secondPartTimeline.add(this.fourth, "-=0.1");
                this.secondPartTimeline.add(this.fifth, "-=0.1");
                this.secondPartTimeline.add(this.sixth, "-=0.1");
            },
        });
    }

    resize(){}

    update(){}
}