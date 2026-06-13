console.log("Welcome to Spotify");

// 1. Initialize Track variables
let songIndex = 0;
let audioElement = new Audio('music/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName'); // ✅ Target text span

// 2. Define your songs list matching your folder structure
let songs = [
    {songName: "Piano Music", filePath: "music/1.mp3"},
    {songName: "Vintage Music", filePath: "music/2.mp3"},
    {songName: "Memphis Synthwave Music", filePath: "music/3.mp3"}
];

// 3. Helper function to reset all small item play buttons back to play icons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}

// 4. Handle Master Play/Pause click
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        
        // Match the small play icon in the list with master play state
        let currentListIcon = document.getElementById(`${songIndex}`);
        if(currentListIcon) {
            currentListIcon.classList.remove('fa-circle-play');
            currentListIcon.classList.add('fa-circle-pause');
        }
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        makeAllPlays();
    }
});

// 5. Handle Individual Song Item Clicks
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let clickedIndex = parseInt(e.target.id);
        
        // If clicking the currently active song, toggle play/pause
        if(songIndex === clickedIndex) {
            if(!audioElement.paused) {
                audioElement.pause();
                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
                gif.style.opacity = 0;
            } else {
                audioElement.play();
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
                gif.style.opacity = 1;
            }
        } else {
            // Clicking a completely new song
            makeAllPlays();
            songIndex = clickedIndex;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName; // ✅ Dynamically changes title
            audioElement.currentTime = 0;
            audioElement.play();
            
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
    });
});

// 6. Next Button Click functionality
document.getElementById('next').addEventListener('click', () => {
    if(songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName; // ✅ Dynamically changes title on Next
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    makeAllPlays();
    document.getElementById(`${songIndex}`).classList.remove('fa-circle-play');
    document.getElementById(`${songIndex}`).classList.add('fa-circle-pause');
});

// 7. Previous Button Click functionality
document.getElementById('previous').addEventListener('click', () => {
    if(songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName; // ✅ Dynamically changes title on Prev
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    makeAllPlays();
    document.getElementById(`${songIndex}`).classList.remove('fa-circle-play');
    document.getElementById(`${songIndex}`).classList.add('fa-circle-pause');
});

// 8. Update Progress Bar
audioElement.addEventListener('timeupdate', () => {
    let progress = 0;
    if(audioElement.duration){
        progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    }
    myProgressBar.value = progress;
});

// 9. Seek Control
myProgressBar.addEventListener('input', () => {
    let progressValue = parseInt(myProgressBar.value);
    if(audioElement.duration) {
        audioElement.currentTime = (progressValue * audioElement.duration) / 100;
    }
});
