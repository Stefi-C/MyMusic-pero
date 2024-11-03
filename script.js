document.addEventListener("DOMContentLoaded", ()=>{
    //-------------------------------navbarbutton----

    document.addEventListener('DOMContentLoaded', function () {
        var menuToggle = document.getElementById('menu-toggle');
        
        // Check if the menu-toggle element exists
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                var menuList = document.getElementById('menu-list');
    
                // Ensure menuList exists before trying to access its styles
                if (menuList) {
                    if (menuList.style.right === '0px') {
                        menuList.style.right = '-400px';
                        menuToggle.classList.remove('fa-times');
                        menuToggle.classList.add('fa-bars');
                    } else {
                        menuList.style.right = '0px';
                        menuToggle.classList.remove('fa-bars');
                        menuToggle.classList.add('fa-times');
                    }
                }
            });
        }
    });
});

//---------------------------------------------------------------musicPlayer
const wrapper = document.querySelector(".wrapper");
if(wrapper){


   const musicImg = wrapper.querySelector(".img-area img"),
    musicName = wrapper.querySelector(".song-details .name"),
    musicArtist = wrapper.querySelector(".song-details .artist"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next"),
    mainAudio = wrapper.querySelector("#main-audio"),
    progressArea = wrapper.querySelector(".progress-area"),
    progressBar = progressArea.querySelector(".progress-bar"),
    musicList = wrapper.querySelector(".music-list");

let musicIndex = Math.floor((Math.random() * listMusic.length) + 1),
    isMusicPaused = true;

const ulTag = document.querySelector("#ul-tag");

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingSong();
});

function loadMusic(indexNumb) {
    musicName.innerText = listMusic[indexNumb - 1].name;
    musicArtist.innerText = listMusic[indexNumb - 1].artist;
    musicImg.src = `./${listMusic[indexNumb - 1].src}.jpg`;
    mainAudio.src = `./${listMusic[indexNumb - 1].src}.mp3`;
}

function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
    if(musicImg){
         musicImg.classList.add('rotate');
        }
    }
   

function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
    if(musicImg){
    musicImg.classList.remove('rotate');
    }
}

function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = listMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

function nextMusic() {
    musicIndex++;
    musicIndex > listMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

playPauseBtn.addEventListener("click", () => {
    const isMusicPlay = wrapper.classList.contains("paused");
    isMusicPlay ? pauseMusic() : playMusic();
    playingSong();
});

prevBtn.addEventListener("click", () => {
    prevMusic();
});

nextBtn.addEventListener("click", () => {
    nextMusic();
});

mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime,
        duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current-time"),
        musicDuration = wrapper.querySelector(".max-duration");

    if (duration) {
        let totalMin = Math.floor(duration / 60),
            totalSec = Math.floor(duration % 60);
        if (totalSec < 10) totalSec = `0${totalSec}`;
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    }

    let currentMin = Math.floor(currentTime / 60),
        currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) currentSec = `0${currentSec}`;
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth,
        clickedOffsetX = e.offsetX,
        songDuration = mainAudio.duration;
    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
    playingSong();
});

const repeatButton = document.getElementById('repeat-plist'),
    shuffleButton = document.getElementById('shuffle-music');

repeatButton.addEventListener("click", () => {
    if (repeatButton.innerText === 'repeat') {
        repeatButton.innerText = 'repeat_on';
        repeatButton.setAttribute("title", "Repeat On");
        mainAudio.loop = true;
    } else if (repeatButton.innerText === 'repeat_on') {
        repeatButton.innerText = 'repeat';
        repeatButton.setAttribute("title", "Repeat Off");
        mainAudio.loop = false;
    }
});

shuffleButton.addEventListener("click", () => {
    if (shuffleButton.innerText === 'shuffle') {
        shuffleButton.innerText = 'shuffle_on';
        shuffleButton.setAttribute("title", "Shuffle On");
        shuffle(listMusic);
    } else if (shuffleButton.innerText === 'shuffle_on') {
        shuffleButton.innerText = 'shuffle';
        shuffleButton.setAttribute("title", "Shuffle Off");
        listMusic.sort();  // Assuming you want to disable shuffle by resetting to original order
    }
});

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

mainAudio.addEventListener("ended", () => {
    let getText = repeatButton.innerText;
    switch (getText) {
        case "repeat":
            nextMusic();
            break;
        case "repeat_on":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle_on":
            let randIndex;
            do {
                randIndex = Math.floor((Math.random() * listMusic.length) + 1);
            } while (musicIndex == randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            playingSong();
            break;
    }
});

for (let i = 0; i < listMusic.length; i++) {
    let liTag = `<li li-index="${i + 1}">
                    <img src="./${listMusic[i].src}.jpg" alt="">
                    <div class="row">
                      <span>${listMusic[i].name}</span>
                      <p>${listMusic[i].artist}</p>
                    </div>
                    <span id="${listMusic[i].src}" class="audio-duration">3:40</span>
                    <audio class="${listMusic[i].src}" src="./${listMusic[i].src}.mp3"></audio>
                 </li>
                  <div class="download-btn">
                    <a href="./${listMusic[i].src}.mp3" download="${listMusic[i].name}">
                      <i class="fa-solid fa-download"></i>
                    </a>
                 </div>`;

    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioDurationTag = ulTag.querySelector(`#${listMusic[i].src}`),
        liAudioTag = ulTag.querySelector(`.${listMusic[i].src}`);
    liAudioTag.addEventListener("loadeddata", () => {
        let duration = liAudioTag.duration,
            totalMin = Math.floor(duration / 60),
            totalSec = Math.floor(duration % 60);
        if (totalSec < 10) totalSec = `0${totalSec}`;
        liAudioDurationTag.innerText = `${totalMin}:${totalSec}`;
        liAudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
    });

    let liElement = ulTag.querySelector(`li[li-index="${i + 1}"]`);
    liElement.addEventListener("click", function() {
        clicked(this);
    });
}

function playingSong() {
    const allLiTag = ulTag.querySelectorAll("li");
    for (let j = 0; j < allLiTag.length; j++) {
        let audioTag = allLiTag[j].querySelector(".audio-duration");
        if (allLiTag[j].classList.contains("playing")) {
            allLiTag[j].classList.remove("playing");
            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration;
        }
        if (allLiTag[j].getAttribute("li-index") == musicIndex) {
            allLiTag[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }
    }
}

function clicked(element) {
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}
}
/*--------------------------------video

var videoPlayer = document.getElementById("videoPlayer"),
    myVideo = document.getElementById("myVideo");

function stopVideo(){
    videoPlayer.style.display = "none";
}

function playVideo(file){
    myVideo.src = file;
    videoPlayer.style.display = "block";
}

let listVideo = document.querySelectorAll('.video-list .vid'),
    mainVideo = document.querySelector('.main-video video'),
    title = document.querySelector('.main-video .video-title');

listVideo.forEach(video => {
    video.onclick = () => {
        listVideo.forEach(vid => vid.classList.remove('active'));
        video.classList.add('active');
        if (video.classList.contains('active')) {
            let source = video.children[0].innerHTML;
            title.innerHTML = text;
        }
      };
    });
})
*/


 /*--------------------------------gallery*/

    
       
      const images = [...document.querySelectorAll('.image')];

      const popup = document.querySelector('.popup');
      const closeBtn = document.querySelector('.close-btn');
      const imageName = document.querySelector('.image-name');
      const largeImage = document.querySelector('.large-image');
      const imageIndex = document.querySelector('.index');
      const leftArrow = document.querySelector('.left-arrow');
      const rightArrow = document.querySelector('.right-arrow');


      let index = 0;

      images.forEach((item, i) =>{
        item.addEventListener('click', ()=>{
            popup.classList.toggle('active');
            updateImage(i);
           
        })
      })
      const updateImage = (i) => {
        let path = `./gallery-img${i+1}.jpg`;
        largeImage.src = path;
        imageName.innerHTML = path;
        imageIndex.innerHTML = `0${i+1}`;
        index = i;
      }

     if(closeBtn){
        closeBtn.addEventListener("click", ()=>{
            popup.classList.toggle('active');
          })
     }
    if(leftArrow){
        leftArrow.addEventListener("click", ()=>{
            if(index > 0){
                updateImage(index - 1);
            }
            if(index === 0){
                index = images.length;
            }
          })
    }
     if(rightArrow){
        rightArrow.addEventListener("click", ()=>{
            if(index < images.length - 1){
                updateImage(index + 1);
            }
            if(index === images.length){
                index = 0;
            }
          })
     }
     
      //-----------------contact form
      document.addEventListener("DOMContentLoaded", function() {
        const form = document.querySelector('form');
        const fullName = document.getElementById('fname');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const subject = document.getElementById('subject');
        const mess = document.getElementById('message');
    
        function sendEmail() {
            const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone: ${phone.value}<br> Message: ${mess.value}`;
            
            Email.send({
                Host: "smtp.elasticemail.com",
                Username: "urboyperomusic@gmail.com",
                Password: "9D94291748048B2B2B0FDF26FB44A3DB1416",
                To: 'urboyperomusic@gmail.com',
                From: "urboyperomusic@gmail.com",
                Subject: subject.value,
                Body: bodyMessage
            }).then(
                message => {
                    if (message === 'OK') {
                        Swal.fire({
                            title: "Success",
                            text: "Message sent successfully!",
                            icon: "success"
                        });
                    } else {
                        console.error('Error:', message);
                        Swal.fire({
                            title: "Error",
                            text: "Message not sent. Please try again.",
                            icon: "error"
                        });
                    }
                }
            ).catch(
                error => {
                    console.error('Error:', error);
                    Swal.fire({
                        title: "Error",
                        text: "Message not sent. Please try again.",
                        icon: "error"
                    });
                }
            );
        }
    
        function checkInputs() {
            const items = document.querySelectorAll('.item');
            for (const item of items) {
                if (item.value === "") {
                    item.classList.add('error');
                    item.parentElement.classList.add('error');
                } else {
                    item.classList.remove('error');
                    item.parentElement.classList.remove('error');
                }
                if (item === email) {
                    checkEmail();
                }
            }
        }
    
        function checkEmail() {
            const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/i;
            const errorTxtEmail = document.querySelector(".error-txt.email");
    
            if (!email.value.match(emailRegex)) {
                email.classList.add("error");
                email.parentElement.classList.add("error");
    
                if (email.value !== "") {
                    errorTxtEmail.innerText = "Enter a valid email address";
                } else {
                    errorTxtEmail.innerText = "Email Address can't be blank";
                }
            } else {
                email.classList.remove("error");
                email.parentElement.classList.remove("error");
                errorTxtEmail.innerText = "";
            }
        }
    
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            checkInputs();
    
            if (!fullName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !mess.classList.contains("error")) {
                sendEmail();
                form.reset();
            }
        });
    });
       //----------------contact button
       const contactInfoBtn = document.querySelectorAll('#info-btn');
       const serviceBox = document.querySelectorAll('.service-box');
       const serviceInfoText = document.querySelectorAll('.service-box p');
       
       function openInfo(){
         serviceBox.classList.add('active');//da correggere
         serviceInfoText.classList.add('active');//da correggere
       };

// Variabile per salvare più date di streaming
let countdownDates = [];

// Funzione per iniziare il conto alla rovescia per una nuova data
function addNewStreamingDate() {
    const inputDate = document.getElementById("streaming-date").value;

    if (!inputDate) {
        alert("Please select a date and time for the streaming.");
        return;
    }

    const newDate = new Date(inputDate).getTime();
    if (isNaN(newDate)) {
        alert("Invalid date format. Please check your input.");
        return;
    }

    countdownDates.push(newDate);

    // Rimuovi le date scadute prima di salvare nel localStorage
    filterExpiredDates();

    // Salva le nuove date nel localStorage
    localStorage.setItem('countdownDates', JSON.stringify(countdownDates));

    // Avvia la visualizzazione del prossimo countdown se non è già in corso
    if (!streamingInProgress) {
        updateCountdown();
    }
}

// Funzione per filtrare le date scadute
function filterExpiredDates() {
    const now = new Date().getTime();
    countdownDates = countdownDates.filter(date => date > now);
}

// Controlla se ci sono countdownDates salvati nel localStorage e ripristinali
const storedDates = localStorage.getItem('countdownDates');
if (storedDates) {
    countdownDates = JSON.parse(storedDates);
    // Rimuovi le date scadute
    filterExpiredDates();
} else {
    // Aggiungi date di esempio per testare
    countdownDates = [
        new Date(new Date().getTime() + 1 * 60 * 1000).getTime(), // Data di esempio: 5 minuti da ora
        new Date("2024-09-17T13:30:00").getTime(), // Data di esempio: oggi alle 13:30
        new Date("2024-09-26T00:00:00").getTime(), // Data futura
        new Date("2024-10-03T00:00:00").getTime(), // Data futura
        new Date("2024-10-10T00:00:00").getTime(), // Data futura
        new Date("2024-10-17T00:00:00").getTime()  // Data futura
    ];
    // Rimuovi le date scadute (se ci sono)
    filterExpiredDates();
    localStorage.setItem('countdownDates', JSON.stringify(countdownDates));
}

// Variabile per tracciare se uno streaming è in corso
let streamingInProgress = false;

// Funzione per aggiornare il countdown del prossimo evento
function updateCountdown() {
    const countdownContainer = document.getElementById("countdown");
    const statusMessage = document.getElementById("status-message");

    // Check if countdown elements are present
    if (!countdownContainer || !statusMessage) {
        return; // Exit the function if elements are not found
    }

    if (countdownDates.length === 0) {
        countdownContainer.style.display = "none";
        statusMessage.innerHTML = "No upcoming streams";
        return;
    }

    const now = new Date().getTime();

    // Trova la prossima data di streaming
    const nextDate = countdownDates[0]; // Sempre la prima data

    const distance = nextDate - now;

    if (distance > 0) {
        // Calcola giorni, ore, minuti e secondi rimanenti
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Visualizza il countdown per la prossima data
        countdownContainer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        countdownContainer.style.display = "block";
        statusMessage.innerHTML = "";

    } else if (!streamingInProgress) {
        // Se il countdown è terminato, inizia lo streaming
        startStreaming();
    }
}

// Funzione per avviare lo streaming
// When streaming starts
function startStreaming() {
    const iframe = document.getElementById("streaming-iframe");
    const countdownContainer = document.getElementById("countdown");
    const statusMessage = document.getElementById("status-message");

    // Hide countdown and show iframe
    countdownContainer.style.display = "none";
    statusMessage.innerHTML = "Streaming has started!";
    
    iframe.src = "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4"; // link of streaming
    iframe.style.display = "block"; // Make iframe visible
    statusMessage.innerHTML = "Streaming has started!";

    // Dopo 3 ore (10800 secondi) simula la fine dello streaming
    setTimeout(function() {
        iframe.style.display = "none"; // Nascondi l'iframe
        statusMessage.innerHTML = "Streaming is over, more info coming soon";

        // Rimuovi la data corrente e aggiorna il localStorage
        countdownDates.shift(); // Rimuovi il primo elemento (data corrente)
        filterExpiredDates(); // Rimuovi eventuali date scadute
        localStorage.setItem('countdownDates', JSON.stringify(countdownDates));

        // Avvia un nuovo conto alla rovescia dopo 3 ore
        setTimeout(function() {
            streamingInProgress = false;
            statusMessage.innerHTML = "Next streaming…";
            updateCountdown();
        }, 3 * 60 * 60 * 1000); // Attendi 3 ore prima di iniziare il nuovo countdown

    }, 10800000); // 3 ore di streaming simulato
}

// Avvia il conto alla rovescia per la prossima data e aggiorna ogni secondo
setInterval(updateCountdown, 1000);


//da qui
//english switch
/*
document.addEventListener('DOMContentLoaded', function () {
    // Check if the English and German buttons exist
    var englishBtn = document.getElementById('englishBtn');
    var germanBtn = document.getElementById('germanBtn');
    var englishVersion = document.querySelector('.english-version');
    var germanVersion = document.querySelector('.german-version');

    // Only proceed if both buttons are present
    if (englishBtn || germanBtn) {
        // Ensure the version elements exist before adding event listeners
        if (englishVersion && germanVersion) {
            // Check if the English button exists
            if (englishBtn) {
                englishBtn.addEventListener('click', function() {
                    englishVersion.style.display = 'block';
                    germanVersion.style.display = 'none';
                });
            }

            // Check if the German button exists
            if (germanBtn) {
                germanBtn.addEventListener('click', function() {
                    englishVersion.style.display = 'none';
                    germanVersion.style.display = 'block';
                });
            }
        }
    }
});*/
document.addEventListener('DOMContentLoaded', function () {
    const account = document.getElementById('account');
    const accountChoices = document.getElementById('account-choices');
    const accountSettings = document.getElementById('account-settings');
    const signUpOption = document.getElementById('u-1');
    const loginOption = document.getElementById('u-2');

    // Ensure account choices and settings are hidden by default when the page is refreshed
    if (accountChoices) accountChoices.style.display = 'none';
    if (accountSettings) accountSettings.style.display = 'none';

    if (account && accountChoices && accountSettings) {
        // Check if a user is logged in and update the UI accordingly
        const loggedInUserId = localStorage.getItem('loggedInUserId');

        if (loggedInUserId) {
            // User is logged in
            const userFirstName = localStorage.getItem('userFirstName');
            account.innerText = userFirstName || 'Account';

            // Toggle account settings on clicking the user's name
            account.addEventListener('click', function () {
                accountSettings.style.display = accountSettings.style.display === 'block' ? 'none' : 'block';
                accountChoices.style.display = 'none';
            });

            accountSettings.innerHTML = `
                <li id="profile">Profile</li>
                <li id="settings">Settings</li>
                <li id="logout">Logout</li>
            `;

            const logoutButton = document.getElementById('logout');
            if (logoutButton) {
                logoutButton.addEventListener('click', function () {
                    localStorage.removeItem('loggedInUserId');
                    localStorage.removeItem('userFirstName');
                    const auth = getAuth();
                    signOut(auth).then(() => {
                        window.location.href = 'index.html';
                    }).catch((error) => {
                        console.error("Error logging out:", error);
                    });
                });
            }
        } else {
            // User is not logged in

            // Toggle account choices on clicking "Account"
            account.addEventListener('click', function () {
                accountChoices.style.display = accountChoices.style.display === 'block' ? 'none' : 'block';
                accountSettings.style.display = 'none';
            });

            // Handle Sign Up and Log In redirection
            if (signUpOption) {
                signUpOption.addEventListener('click', function () {
                    window.location.href = 'signup.html?mode=signup';
                });
            }

            if (loginOption) {
                loginOption.addEventListener('click', function () {
                    window.location.href = 'signup.html?mode=login';
                });
            }
        }
    }
});

// Toggle between sign-up and sign-in forms
document.addEventListener('DOMContentLoaded', function () {
    const signUpContainer = document.getElementById('signup');
    const signInContainer = document.getElementById('signIn');
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');

    if (mode === 'signup') {
        signUpContainer.style.display = 'block';
        signInContainer.style.display = 'none';
    } else if (mode === 'login') {
        signUpContainer.style.display = 'none';
        signInContainer.style.display = 'block';
    }

    const signUpButton = document.getElementById('signUpButton');
    const signInButton = document.getElementById('signInButton');

    if (signUpButton || signInButton) {
        signUpButton.addEventListener('click', function () {
            signUpContainer.style.display = 'block';
            signInContainer.style.display = 'none';
        });

        signInButton.addEventListener('click', function () {
            signUpContainer.style.display = 'none';
            signInContainer.style.display = 'block';
        });
    }
});
