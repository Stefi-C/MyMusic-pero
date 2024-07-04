
//-------------------------------navbarbutton----
const sidebar = document.querySelector('.sidebar');
function showSidebar(){
    
    sidebar.style.display = 'flex';
}
function hideSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}  
/*---------------------------------------------------------------musicPlayer*/
        const wrapper = document.querySelector(".wrapper"),
        musicImg = wrapper.querySelector(".img-area img"),
        musicName = wrapper.querySelector(".song-details .name"),
        musicArtist = wrapper.querySelector(".song-details .artist"),
        playPauseBtn = wrapper.querySelector(".play-pause"),
        prevBtn = wrapper.querySelector("#prev"),
        nextBtn = wrapper.querySelector("#next"),
        mainAudio = wrapper.querySelector("#main-audio"),
        progressArea = wrapper.querySelector(".progress-area"),
        progressBar = progressArea.querySelector(".progress-bar"),
        musicList = wrapper.querySelector(".music-list");
        
        let musicIndex = Math.floor((Math.random() * listMusic.length) + 1);
        isMusicPaused = true;
        
        window.addEventListener("load", ()=>{
          loadMusic(musicIndex);
          playingSong();  
        });
        
        function loadMusic(indexNumb){
          musicName.innerText = listMusic[indexNumb - 1].name;
          musicArtist.innerText = listMusic[indexNumb - 1].artist;
          musicImg.src = `/assets/images/${listMusic[indexNumb - 1].src}.jpg`;
          mainAudio.src = `/songs/${listMusic[indexNumb - 1].src}.mp3`;
        }
        
        //play music function
        function playMusic(){
          wrapper.classList.add("paused");
          playPauseBtn.querySelector("i").innerText = "pause";
          mainAudio.play();
          musicImg.classList.add ('rotate');
        }
        
        //pause music function
        function pauseMusic(){
          wrapper.classList.remove("paused");
          playPauseBtn.querySelector("i").innerText = "play_arrow";
          mainAudio.pause();
          musicImg.classList.remove ('rotate');
        }
        
        //prev music function
        function prevMusic(){
          musicIndex--; //decrement of musicIndex by 1
          //if musicIndex is less than 1 then musicIndex will be the array length so the last music play
          musicIndex < 1 ? musicIndex = listMusic.length : musicIndex = musicIndex;
          loadMusic(musicIndex);
          playMusic();
          playingSong(); 
        }
        
        //next music function
        function nextMusic(){
          musicIndex++; //increment of musicIndex by 1
          //if musicIndex is greater than array length then musicIndex will be 1 so the first music play
          musicIndex > listMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
          loadMusic(musicIndex);
          playMusic();
          playingSong(); 
        }
        
        // play or pause button event
        playPauseBtn.addEventListener("click", ()=>{
          const isMusicPlay = wrapper.classList.contains("paused");
          //if isPlayMusic is true then call pauseMusic else call playMusic
          isMusicPlay ? pauseMusic() : playMusic();
          playingSong();
        });
        
        //prev music button event
        prevBtn.addEventListener("click", ()=>{
          prevMusic();
        });
        
        //next music button event
        nextBtn.addEventListener("click", ()=>{
          nextMusic();
        });
        
        // update progress bar width according to music current time
        mainAudio.addEventListener("timeupdate", (e)=>{
          const currentTime = e.target.currentTime; //getting playing song currentTime
          const duration = e.target.duration; //getting playing song total duration
          let progressWidth = (currentTime / duration) * 100;
          progressBar.style.width = `${progressWidth}%`;
        
          let musicCurrentTime = wrapper.querySelector(".current-time"),
          musicDuartion = wrapper.querySelector(".max-duration");
          mainAudio.addEventListener("loadeddata", ()=>{
            // update song total duration
            let mainAdDuration = mainAudio.duration;
            let totalMin = Math.floor(mainAdDuration / 60);
            let totalSec = Math.floor(mainAdDuration % 60);
            if(totalSec < 10){ //if sec is less than 10 then add 0 before it
              totalSec = `0${totalSec}`;
            }
            musicDuartion.innerText = `${totalMin}:${totalSec}`;
          });
          // update playing song current time
          let currentMin = Math.floor(currentTime / 60);
          let currentSec = Math.floor(currentTime % 60);
          if(currentSec < 10){ //if sec is less than 10 then add 0 before it
            currentSec = `0${currentSec}`;
          }
          musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
        });
        
        // update playing song currentTime on according to the progress bar width
        progressArea.addEventListener("click", (e)=>{
          let progressWidth = progressArea.clientWidth; //getting width of progress bar
          let clickedOffsetX = e.offsetX; //getting offset x value
          let songDuration = mainAudio.duration; //getting song total duration
          
          mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
          playMusic(); //calling playMusic function
          playingSong();
        });
       /* 
       //repeat and shuffle
       const repeatButton = document.getElementById('repeat-plist');
       const shuffleButton = document.getElementById('shuffle-music');

       repeatButton.addEventListener("click", ()=>{
        if(repeatButton.innerText === 'repeat'){
            repeatButton.innerText = 'repeat_on';
            repeatButton.setAttribute("title", "Repeat On");
            mainAudio.loop = true;
         
        }else if(repeatButton.innerText === 'repeat_on'){
            repeatButton.innerText = 'repeat';
            repeatButton.setAttribute("title", "Repeat Off");
            mainAudio.loop = false;
          
        }
    });
    function randomFile(){
      return listMusic[Math.floor(Math.random() * listMusic.length)];
    }
    let newSong = new Audio(randomFile());
    shuffleButton.addEventListener("click", ()=>{
        if(shuffleButton.innerText === 'shuffle'){
            shuffleButton.innerText = 'shuffle_on';
            shuffleButton.setAttribute("title", "Shuffle On");
            listMusic.randomFile() = true;
            newSong.play()
            
        }else if(shuffleButton.innerText === 'shuffle_on'){
            shuffleButton.innerText = 'shuffle';
            shuffleButton.setAttribute("title", "Shuffle Off");
            listMusic.randomFile() = false;
          

        }
    });
   
function shuffle(array){
    array.sort(()=> Math.floor(Math.random()- 1));
    shuffle(listMusic);
}
      //code for what to do after song ended
mainAudio.addEventListener("ended", ()=>{
    // we'll do according to the icon means if user has set icon to
    // loop song then we'll repeat the current song and will do accordingly
    let getText = repeatButton.innerText; //getting this tag innerText
    switch(getText){
      case "repeat":
        nextMusic(); //calling nextMusic function
        break;
      case "repeat_on":
        mainAudio.currentTime = 0; //setting audio current time to 0
        loadMusic(musicIndex); //calling loadMusic function with argument, in the argument there is a index of current song
        playMusic(); //calling playMusic function
        break;
     case "shuffle_on":
        let randIndex = Math.floor((Math.random() * listMusic.length) + 1); //genereting random index/numb with max range of array length
        do{
          randIndex = Math.floor((Math.random() * listMusic.length) + 1);
        }while(musicIndex == randIndex); //this loop run until the next random number won't be the same of current musicIndex
        musicIndex = randIndex; //passing randomIndex to musicIndex
        loadMusic(musicIndex);
        playMusic();
        playingSong();
        shuffle(listMusic);
        break;
    }
  }); 
  */
  
        const ulTag = document.querySelector("#ul-tag");
        // let create li tags according to array length for list
        for (let i = 0; i < listMusic.length; i++) {
          //let's pass the song name, artist from the array
          let liTag = `<li li-index="${i + 1}">
                        <img src="assets/images/${listMusic[i].src}.jpg" alt="">
                        <div class="row">
                          <span>${listMusic[i].name}</span>
                          <p>${listMusic[i].artist}</p>
                        </div>
                        <span id="${listMusic[i].src}" class="audio-duration">3:40</span>
                        <audio class="${listMusic[i].src}" src="songs/${listMusic[i].src}.mp3"></audio>
                      
                      </li>
                      <div class="download-btn">
                      <a href="songs/${listMusic[1].src}.mp3" download="${listMusic[i].name}" 
                     ><i class="fa-solid fa-download"></i></a>
                     <!--<i class="fa-solid fa-share share-btn" onclick="share()"></i>-->
                      </div>`;

          /* 
          //share songs to social media
          function share(){
            if(navigator.share){
           navigator.share({
              title:"Pero's Song",
              text:"Checkout this Song!"
              //url:"the link of the web site"
           })
          }
         }
*/



          ulTag.insertAdjacentHTML("beforeend", liTag); //inserting the li inside ul tag
        
          let liAudioDuartionTag = ulTag.querySelector(`#${listMusic[i].src}`);
          let liAudioTag = ulTag.querySelector(`.${listMusic[i].src}`);
          liAudioTag.addEventListener("loadeddata", ()=>{
            let duration = liAudioTag.duration;
            let totalMin = Math.floor(duration / 60);
            let totalSec = Math.floor(duration % 60);
            if(totalSec < 10){ //if sec is less than 10 then add 0 before it
              totalSec = `0${totalSec}`;
            };
            liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
            liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //adding t-duration attribute with total duration value
          });
        }
        
        //play particular song from the list onclick of li tag
        function playingSong(){
          const allLiTag = ulTag.querySelectorAll("li");
          
          for (let j = 0; j < allLiTag.length; j++) {
            let audioTag = allLiTag[j].querySelector(".audio-duration");
            
            if(allLiTag[j].classList.contains("playing")){
              allLiTag[j].classList.remove("playing");
              let adDuration = audioTag.getAttribute("t-duration");
              audioTag.innerText = adDuration;
            }
        
            //if the li tag index is equal to the musicIndex then add playing class in it
            if(allLiTag[j].getAttribute("li-index") == musicIndex){
              allLiTag[j].classList.add("playing");
              audioTag.innerText = "Playing";
            }
        
            allLiTag[j].setAttribute("onclick", "clicked(this)");
          }
        }
        
        //particular li clicked function
        function clicked(element){
          let getLiIndex = element.getAttribute("li-index");
          musicIndex = getLiIndex; //updating current song index with clicked li index
          loadMusic(musicIndex);
          playMusic();
          playingSong();
        }

      /*--------------------------------video*/

      var videoPlayer = document.getElementById("videoPlayer");
      var myVideo = document.getElementById("myVideo");

      function stopVideo(){
          videoPlayer.style.display = "none";
      }
      function playVideo(file){
          myVideo.src = file;
          videoPlayer.style.display = "block";
      }


      let listVideo = document.querySelectorAll('.video-list .vid');
      let mainVideo = document.querySelector('.main-video video');
      let title = document.querySelector('.main-video .video-title');

      listVideo.forEach(video =>{
        video.onclick = () =>{
            listVideo.forEach(vid => vid.classList.remove('active'));
            video.classList.add('active');
            if(video.classList.contains('active')){
                let source = video.children[0].getAttribute('src');
                mainVideo.src = source;
                let text = video.children[1].innerHTML;
                title.innerHTML = text;
            }
        }
      });


  
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
        let path = `assets/gallery-img${i+1}.jpg`;
        largeImage.src = path;
        imageName.innerHTML = path;
        imageIndex.innerHTML = `0${i+1}`;
        index = i;
      }
      closeBtn.addEventListener("click", ()=>{
        popup.classList.toggle('active');
      })
      leftArrow.addEventListener("click", ()=>{
        if(index > 0){
            updateImage(index - 1);
        }
        if(index === 0){
            index = images.length;
        }
      })
      rightArrow.addEventListener("click", ()=>{
        if(index < images.length - 1){
            updateImage(index + 1);
        }
        if(index === images.length){
            index = 0;
        }
      })
     

  

  
      //-----------------contact form
      const form = document.querySelector('form');
      const fullName = document.getElementById('fname');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const subject = document.getElementById('subject');
      const mess = document.getElementById('message');

      function sendEmail(){
        const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone:${phone.value} Message:${mess.value}`;
        
        Email.send({
        Host : "smtp.elasticemail.com",
        Username : "urboyperomusic@gmail.com",//mail u used on smpt
        Password : "BE9B5A1F036F5B6217323DE15763538CD6A8",//password got from smpt
        To : 'urboyperomusic@gmail.com',//mail u used on smpt
        From : "urboyperomusic@gmail.com",//mail u used on smpt
        Subject : subject.value,
        Body : bodyMessage
    }).then(
      message => 
      { 
        if(message == 'OK' ){
          Swal.fire({
            title: "Success",
            text: "Message sent succesfully!",
            icon: "success"
          });
        }
      }
    );
  }
      
function checkInputs(){
        const items = document.querySelectorAll('.item');
        for( const item of items){
          if(item.value == ""){
            item.classList.add('error');
            item.parentElement.classList.add('error');
          }
          if(items[1].value != ''){
            checkEmail();
          }
          items[1].addEventListener('keyup', ()=>{
            checkEmail();
});
          
item.addEventListener('keyup', () =>{
               if(item.value != ''){
                item.classList.remove('error');
                item.parentElement.classList.remove('error');
               }else{
                item.classList.add('error');
                item.parentElement.classList.add('error');
               }
          });
        }
      }
      function checkEmail() {
        const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
        const errorTxtEmail = document.querySelector(".item.error-txt.email");
    
        if (!email.value.match(emailRegex)) {
            email.classList.add("error");
            email.parentElement.classList.add("error");
    
            if (email.value != "") {
                errorTxtEmail.innerText = "Enter a valid email address";
            }
            else {
                errorTxtEmail.innerText = "Email Address can't be blank";
            }
        }
        else {
            email.classList.remove("error");
            email.parentElement.classList.remove("error");
        }
    }



    form.addEventListener("submit", (e) => {
      e.preventDefault();
      checkInputs();
  
      if (!fullName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !subject.classList.contains("error") && !mess.classList.contains("error")) {
          sendEmail();
  
          form.reset();
          return false;
      }
  });
   
