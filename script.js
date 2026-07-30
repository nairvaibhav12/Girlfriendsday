/* ======================================================
   LOADER
====================================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.transition = "1s";

        setTimeout(() => {

            loader.style.display = "none";

        },1000);

    },2000);

});



/* ======================================================
   CUSTOM CURSOR
====================================================== */

const cursor = document.querySelector(".cursor");


document.addEventListener("mousemove",(e)=>{

    cursor.style.left = e.clientX + "px";

    cursor.style.top = e.clientY + "px";

});



/* ======================================================
   START BUTTON + MUSIC
====================================================== */

const startBtn = document.getElementById("startBtn");

const music = document.getElementById("bgMusic");


startBtn.addEventListener("click",()=>{


    music.play().catch(()=>{});


    document.querySelector(".letter-section")
    .scrollIntoView({

        behavior:"smooth"

    });


});



/* ======================================================
   TYPING LOVE LETTER
====================================================== */


const text = `

I don't know how to put everything into words...

but I want you to know that you are one of the most beautiful parts of my life.

Thank you for every smile, every memory, and every little moment we share.

You make ordinary days feel special.

I hope this little surprise reminds you how much you mean to me.

❤️

`;


let index = 0;


const typingText = document.getElementById("typingText");


function typeWriter(){


    if(index < text.length){


        typingText.innerHTML += text.charAt(index);


        index++;


        setTimeout(typeWriter,45);


    }


}



const letterSection =
document.querySelector(".letter-section");


let letterStarted=false;


window.addEventListener("scroll",()=>{


    const position =
    letterSection.getBoundingClientRect().top;


    if(position < window.innerHeight-200
    && !letterStarted){


        typeWriter();


        letterStarted=true;

    }


});



/* ======================================================
   ENVELOPE CLICK
====================================================== */


const envelope =
document.querySelector(".envelope");


envelope.addEventListener("click",()=>{


    envelope.classList.toggle("open");


});



/* ======================================================
   PHOTO LIGHTBOX
====================================================== */


const photos =
document.querySelectorAll(".photo img");


const lightbox =
document.getElementById("lightbox");


const lightboxImage =
document.getElementById("lightboxImage");


const closeLightbox =
document.getElementById("closeLightbox");



photos.forEach(photo=>{


    photo.addEventListener("click",()=>{


        lightbox.style.display="flex";


        lightboxImage.src =
        photo.src;


    });


});



closeLightbox.addEventListener("click",()=>{


    lightbox.style.display="none";


});



lightbox.addEventListener("click",(e)=>{


    if(e.target === lightbox){

        lightbox.style.display="none";

    }


});



/* ======================================================
   PAINT CANVAS
====================================================== */


const canvas =
document.getElementById("paintCanvas");


if(canvas){


const ctx =
canvas.getContext("2d");


let painting=false;


canvas.width =
canvas.offsetWidth;


canvas.height = 400;



canvas.addEventListener("mousedown",()=>{

    painting=true;

});


canvas.addEventListener("mouseup",()=>{

    painting=false;

    ctx.beginPath();

});


canvas.addEventListener("mousemove",(e)=>{


    if(!painting) return;



    const rect =
    canvas.getBoundingClientRect();



    ctx.lineWidth=5;

    ctx.lineCap="round";

    ctx.strokeStyle="#ff73aa";



    ctx.lineTo(

        e.clientX-rect.left,

        e.clientY-rect.top

    );


    ctx.stroke();


    ctx.beginPath();


    ctx.moveTo(

        e.clientX-rect.left,

        e.clientY-rect.top

    );


});


}



/* ======================================================
   NOTES CLICK EFFECT
====================================================== */


document.querySelectorAll(".note")
.forEach(note=>{


    note.addEventListener("click",()=>{


        note.style.background =
        "#ffd1e3";


        note.style.transform =
        "scale(1.08) rotate(0deg)";


    });


});



/* ======================================================
   SIMPLE HEART PARTICLES
====================================================== */


function createHeart(){


    const heart =
    document.createElement("div");


    heart.innerHTML="❤️";


    heart.style.position="fixed";

    heart.style.left =
    Math.random()*100+"vw";


    heart.style.bottom="-20px";


    heart.style.fontSize =
    Math.random()*20+15+"px";


    heart.style.zIndex="999";


    heart.style.pointerEvents="none";


    document.body.appendChild(heart);



    heart.animate([

        {
            transform:"translateY(0)",
            opacity:1
        },

        {
            transform:"translateY(-100vh)",
            opacity:0
        }

    ],{


        duration:5000,

        easing:"ease-out"

    });



    setTimeout(()=>{

        heart.remove();

    },5000);


}



setInterval(createHeart,1500);



/* ======================================================
   SCROLL REVEAL
====================================================== */


const sections =
document.querySelectorAll("section");


const reveal = ()=>{


    sections.forEach(section=>{


        const top =
        section.getBoundingClientRect().top;


        if(top < window.innerHeight-100){


            section.style.opacity="1";

            section.style.transform=
            "translateY(0)";


        }


    });


};


sections.forEach(section=>{


    section.style.opacity="0";

    section.style.transform=
    "translateY(50px)";


    section.style.transition=
    "1s ease";


});


window.addEventListener("scroll",reveal);

reveal();
/* ======================================================
   CONFETTI ENDING EFFECT
====================================================== */

const confettiCanvas = document.getElementById("confettiCanvas");

if(confettiCanvas){

    const confettiCtx = confettiCanvas.getContext("2d");

    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;


    let confettiPieces = [];


    function createConfetti(){

        confettiPieces.push({

            x:Math.random()*confettiCanvas.width,

            y:-20,

            size:Math.random()*8+5,

            speed:Math.random()*3+2,

            rotation:Math.random()*360,

            rotateSpeed:Math.random()*5-2

        });

    }


    function drawConfetti(){

        confettiCtx.clearRect(
            0,
            0,
            confettiCanvas.width,
            confettiCanvas.height
        );


        confettiPieces.forEach((p,index)=>{


            confettiCtx.save();


            confettiCtx.translate(p.x,p.y);


            confettiCtx.rotate(
                p.rotation*Math.PI/180
            );


            confettiCtx.fillStyle =
            "#ff8fbd";


            confettiCtx.fillRect(
                -p.size/2,
                -p.size/2,
                p.size,
                p.size
            );


            confettiCtx.restore();



            p.y += p.speed;

            p.rotation += p.rotateSpeed;



            if(p.y > confettiCanvas.height){

                confettiPieces.splice(index,1);

            }


        });


        requestAnimationFrame(drawConfetti);

    }


    drawConfetti();



    function launchConfetti(){

        for(let i=0;i<120;i++){

            createConfetti();

        }

    }


    const ending =
    document.querySelector(".ending");


    window.addEventListener("scroll",()=>{


        if(
            ending.getBoundingClientRect().top
            <
            window.innerHeight/2
        ){

            launchConfetti();

        }


    });

}



/* ======================================================
   SHOOTING STARS
====================================================== */


function shootingStar(){


    const star =
    document.createElement("div");


    star.className="shooting-star";


    star.style.top =
    Math.random()*40+"vh";


    star.style.left =
    Math.random()*100+"vw";


    document.body.appendChild(star);



    setTimeout(()=>{

        star.remove();

    },2000);


}


setInterval(shootingStar,5000);



/* ======================================================
   SURPRISE BUTTON HEART BURST
====================================================== */


startBtn.addEventListener("click",()=>{


    for(let i=0;i<25;i++){

        const heart =
        document.createElement("div");


        heart.innerHTML="❤️";


        heart.style.position="fixed";


        heart.style.left =
        startBtn.getBoundingClientRect().left
        +
        "px";


        heart.style.top =
        startBtn.getBoundingClientRect().top
        +
        "px";


        heart.style.fontSize =
        Math.random()*25+15+"px";


        heart.style.zIndex="9999";


        document.body.appendChild(heart);



        const x =
        (Math.random()-0.5)*400;


        const y =
        (Math.random()-0.5)*400;



        heart.animate([

            {
                transform:"translate(0,0)",
                opacity:1
            },

            {
                transform:
                `translate(${x}px,${y}px)`,
                opacity:0
            }


        ],{


            duration:1200,

            easing:"ease-out"

        });



        setTimeout(()=>{

            heart.remove();

        },1200);


    }


});



/* ======================================================
   STAR PARTICLES
====================================================== */


function createStar(){


    const star =
    document.createElement("div");


    star.innerHTML="✦";


    star.style.position="fixed";


    star.style.left =
    Math.random()*100+"vw";


    star.style.top =
    Math.random()*100+"vh";


    star.style.color="#fff";


    star.style.fontSize =
    Math.random()*15+10+"px";


    star.style.opacity=".7";


    star.style.zIndex="-1";


    document.body.appendChild(star);



    star.animate([

        {
            opacity:.2,
            transform:"scale(.5)"
        },

        {
            opacity:1,
            transform:"scale(1.4)"
        },

        {
            opacity:.2,
            transform:"scale(.5)"
        }

    ],{

        duration:2000,

        iterations:Infinity

    });


}


for(let i=0;i<40;i++){

    createStar();

}



/* ======================================================
   RESIZE CANVAS FIX
====================================================== */


window.addEventListener("resize",()=>{


    if(confettiCanvas){

        confettiCanvas.width =
        window.innerWidth;


        confettiCanvas.height =
        window.innerHeight;

    }


});
/* ======================================================
   ENVELOPE OPEN ANIMATION
====================================================== */

const envelopeBox = document.querySelector(".envelope");
const letterPaper = document.querySelector(".letter-paper");


if(envelopeBox && letterPaper){

    letterPaper.style.opacity="0";
    letterPaper.style.transform="translateY(30px)";


    envelopeBox.addEventListener("click",()=>{


        envelopeBox.classList.toggle("opened");


        if(envelopeBox.classList.contains("opened")){


            letterPaper.style.opacity="1";

            letterPaper.style.transform=
            "translateY(0)";


            letterPaper.style.transition=
            "1s ease";


        }


    });

}



/* ======================================================
   FLOATING FLOWERS
====================================================== */


function createFlower(){


    const flower =
    document.createElement("div");


    flower.innerHTML="🌸";


    flower.style.position="fixed";


    flower.style.left =
    Math.random()*100+"vw";


    flower.style.top="-40px";


    flower.style.fontSize =
    Math.random()*20+20+"px";


    flower.style.zIndex="10";


    flower.style.pointerEvents="none";


    document.body.appendChild(flower);



    flower.animate([

        {

            transform:
            "translateY(0) rotate(0deg)",

            opacity:1

        },

        {

            transform:
            `translateY(110vh) rotate(360deg)`,

            opacity:0

        }


    ],{


        duration:
        Math.random()*6000+5000,


        easing:"linear"


    });



    setTimeout(()=>{

        flower.remove();

    },9000);


}


setInterval(createFlower,2500);




/* ======================================================
   MUSIC CONTROL
====================================================== */


const musicButton =
document.createElement("button");


musicButton.innerHTML="🎵";


musicButton.className="music-button";


document.body.appendChild(musicButton);



let playing=false;


musicButton.addEventListener("click",()=>{


    if(!playing){


        bgMusic.play();


        musicButton.innerHTML="🔊";


        playing=true;


    }

    else{


        bgMusic.pause();


        musicButton.innerHTML="🎵";


        playing=false;


    }


});




/* ======================================================
   SMOOTH SECTION REVEAL
====================================================== */


const animatedElements =
document.querySelectorAll(
".love-card,.photo,.note,.picnic-left,.picnic-right"
);



const observer =
new IntersectionObserver((entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){


            entry.target.classList.add("show");


        }


    });


},{

    threshold:.2

});



animatedElements.forEach(el=>{

    observer.observe(el);

});




/* ======================================================
   FINAL LOVE MESSAGE
====================================================== */


const endingTitle =
document.querySelector(".ending h1");


if(endingTitle){


    endingTitle.addEventListener("click",()=>{


        for(let i=0;i<50;i++){


            createHeart();


        }


    });


}




/* ======================================================
   PAGE START EFFECT
====================================================== */


window.addEventListener("load",()=>{


    document.body.style.opacity="0";


    setTimeout(()=>{


        document.body.style.transition=
        "1.5s ease";


        document.body.style.opacity="1";


    },500);


});
window.addEventListener("load", () => {
    const music = document.getElementById("bgMusic");

    music.volume = 0.35;

    music.play().catch(() => {
        console.log("Autoplay blocked by browser.");
    });
});