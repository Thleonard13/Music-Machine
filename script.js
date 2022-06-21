const image = document.querySelector('img');
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
    {
        name: 'Times Up', 
        displayName: 'Time\'s Up',
        artist: 'Rug', 
    },
    {
        name: 'Neptune', 
        displayName: 'Neptune',
        artist: 'Rug', 
    },
    {
        name: 'Warm Body', 
        displayName: 'Warm Body',
        artist: 'Rug', 
    },
    {
        name: 'Goddess', 
        displayName: 'Goddess',
        artist: 'Rug', 
    }
]

let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause')
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play')
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong());

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.png`;
}
// Current Song
let songIndex = 0

function prevSong() {
    if (songIndex > 0) {
        songIndex--;
    } else {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();

}

function nextSong() {
    if (songIndex < songs.length - 1) {
        songIndex++ ;
    } else {
        songIndex = 0
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar and Time
function updateProgressBar(e) {
    if (isPlaying) {
        console.log(e);
        // Update progress bar
        const {duration, currentTime} = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate the duration display
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate current time display
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    const timeClicked = clickX / width * duration;
    music.currentTime = timeClicked;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar)
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);
  