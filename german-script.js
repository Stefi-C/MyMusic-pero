document.addEventListener("DOMContentLoaded", ()=>{
    //-------------------------------navbarbutton----

    document.addEventListener('DOMContentLoaded', function () {
        var menuToggle = document.getElementById('german-menu-toggle');
        
        // Check if the menu-toggle element exists
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                var menuList = document.getElementById('german-menu-list');
    
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
    prevBtn = wrapper.querySelector("#german-prev"),
    nextBtn = wrapper.querySelector("#german-next"),
    mainAudio = wrapper.querySelector("#german-main-audio"),
    progressArea = wrapper.querySelector(".progress-area"),
    progressBar = progressArea.querySelector(".progress-bar"),
    musicList = wrapper.querySelector(".music-list");

let musicIndex = Math.floor((Math.random() * listMusic.length) + 1),
    isMusicPaused = true;

const ulTag = document.querySelector("#german-ul-tag");

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

const repeatButton = document.getElementById('german-repeat-plist'),
    shuffleButton = document.getElementById('german-shuffle-music');

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
/*--------------------------------video*/

var videoPlayer = document.getElementById("german-videoPlayer"),
    myVideo = document.getElementById("german-myVideo");

if (videoPlayer && myVideo) {
    function stopVideo() {
        videoPlayer.style.display = "none";
        myVideo.pause();
        myVideo.currentTime = 0;
    }

    function playVideo(file) {
        myVideo.src = file;
        videoPlayer.style.display = "block";
    }
}
document.addEventListener('DOMContentLoaded', function () {
    // Check if the English and German buttons exist
    var englishBtn = document.getElementById('german-englishBtn');
    var germanBtn = document.getElementById('german-germanBtn');
    var englishVersion = document.querySelector('.german-english-version');
    var germanVersion = document.querySelector('.german-german-version');

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
});

// Account management
document.addEventListener('DOMContentLoaded', function () {
    const account = document.getElementById('german-account');
    const accountChoices = document.getElementById('german-account-choices');
    const accountSettings = document.getElementById('german-account-settings');
    const signUpOption = document.getElementById('german-u-1');
    const loginOption = document.getElementById('german-u-2');

    if(account || accountChoices || signUpOption || loginOption){

        // Ensure account choices and settings are hidden by default when the page is refreshed
        accountChoices.style.display = 'none';
        accountSettings.style.display = 'none';

        // Check if a user is logged in and update the UI accordingly
        const loggedInUserId = localStorage.getItem('loggedInUserId');

        if (loggedInUserId) {
            // User is logged in
            const userFirstName = localStorage.getItem('userFirstName'); // Assuming you saved this on signup
            account.innerText = userFirstName || 'Account'; // Display the user's first name

            // Show account settings options
            accountSettings.style.display = 'none'; // Initially hide settings
            accountChoices.style.display = 'none'; // Hide sign-up and login options

            // Toggle account settings on clicking the user's name
            account.addEventListener('click', function () {
                accountSettings.style.display = accountSettings.style.display === 'block' ? 'none' : 'block';
                accountChoices.style.display = 'none'; // Hide account choices
            });

            // Populate account settings options
            accountSettings.innerHTML = `
                <li id="german-profile">Profile</li>
                <li id="german-settings">Settings</li>
            `;
        } else {
            // User is not logged in
            accountChoices.style.display = 'block'; // Show account choices
            accountSettings.style.display = 'none'; // Hide account settings

            // Toggle account choices on clicking "Account"
            account.addEventListener('click', function () {
                accountChoices.style.display = accountChoices.style.display === 'block' ? 'none' : 'block';
                accountSettings.style.display = 'none'; // Hide settings if account choices are shown
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
    const signUpContainer = document.getElementById('german-signup');
    const signInContainer = document.getElementById('german-signIn');
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');

    if (mode === 'signup') {
        signUpContainer.style.display = 'block';
        signInContainer.style.display = 'none';
    } else if (mode === 'login') {
        signUpContainer.style.display = 'none';
        signInContainer.style.display = 'block';
    }

    const signUpButton = document.getElementById('german-signUpButton');
    const signInButton = document.getElementById('german-signInButton');

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