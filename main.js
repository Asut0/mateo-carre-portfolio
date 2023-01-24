import './style.css'
import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector(".experience-canvas"))

let list = document.querySelectorAll('.list');
let projectBox = document.querySelectorAll('.project-box');
let list2 = document.querySelectorAll('.list-2');
let experienceWrapper = document.querySelectorAll('.experience-wrapper');

for(let i = 0; i<list.length; i++){
    list[i].addEventListener('click', function(){
        for(let j = 0; j<list.length; j++){
            list[j].classList.remove('active');
        }
        this.classList.add('active');

        let dataFilter = this.getAttribute('data-filter');

        for( let k = 0; k<projectBox.length; k++){
            projectBox[k].classList.remove('active');
            projectBox[k].classList.add('hide');

            if(projectBox[k].getAttribute('data-item') == dataFilter || dataFilter == "all"){
                projectBox[k].classList.remove('hide');
                projectBox[k].classList.add('active');
            }
        }

    })
}

for(let i = 0; i<list2.length; i++){
    list2[i].addEventListener('click', function(){
        for(let j = 0; j<list2.length; j++){
            list2[j].classList.remove('active');
        }
        this.classList.add('active');

        let dataFilter = this.getAttribute('data-filter');

        for( let k = 0; k<experienceWrapper.length; k++){
            experienceWrapper[k].classList.remove('active');
            experienceWrapper[k].classList.add('hide');

            if(experienceWrapper[k].getAttribute('data-item') == dataFilter){
                experienceWrapper[k].classList.remove('hide');
                experienceWrapper[k].classList.add('active');
            }
        }

    })
}