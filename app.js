const container = document.getElementById('container')
const audio = document.getElementById('audio')
const cover = document.getElementById('cover')
const title = document.getElementById('title')
const start = document.getElementById('start')
const end = document.getElementById('end')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
const volume = document.getElementById('volume')
const list = document.getElementById('.list')


const songs = [
    "Dancin",
    "Push",
    "Mockingberd",
]
let songIndex = 0
loadSong(songs[songIndex])

function loadSong(){
    const songName = songs[songIndex]
    title.textContent = songName
    cover.src = `./images/${songName}.jpg`
    audio.src = `./music/${songName}.mp3`
}

function playMusic(){
    container.classList.add('play')
    playBtn.innerHTML = '<i class="fas fa-pause"></i>'
    audio.play()
}

function pauseMusic(){
    container.classList.remove('play')
    playBtn.innerHTML = '<i class="fas fa-play"></i>'
    audio.pause()
}

function nextMusic(){
    songIndex++
    if(songIndex > songs.length - 1){
        songIndex = 0
    }
    loadSong()
    playMusic()
}

playBtn.addEventListener('click', ()=>{
    const isPLaying = container.classList.contains('play')
    if(isPLaying){
        pauseMusic()
    }
    else{
        playMusic()
    }
})

function prevmusic(){
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length - 1
    }
    loadSong()
    playMusic()
}

function progres(e){
    let duration = e.srcElement.duration
    let currentTime = e.srcElement.currentTime
    let musicTime = Math.floor(duration / 60)
    let musicTimeSeconds = Math.floor(duration % 60)
    end.innerHTML = `${musicTime ? musicTime < 10 ? "0"+musicTime : musicTime : "00"} : ${musicTimeSeconds ? musicTimeSeconds < 10 ? "0"+musicTimeSeconds : musicTimeSeconds : "00"}`

    curMusicMinutes = Math.floor(currentTime / 60)
    curMusicSeconds = Math.floor(currentTime % 60)
    start.innerHTML = `${curMusicMinutes ? curMusicMinutes < 10 ? "0"+curMusicMinutes : curMusicMinutes : "00"} : ${curMusicSeconds ? curMusicSeconds < 10 ? "0"+curMusicSeconds : curMusicSeconds : "00"}`

    let calwith = (currentTime / duration) * 100

    progress.style.width = `${calwith}%`
}

function setProgress(e){
    let width = this.clientWidth
    let widthX = e.offsetX
    let duration = audio.duration

    audio.currentTime = (widthX / width) * duration
}

// document.addEventListener('keydown', e=>{
//     if(e.keyCode == 32){
//         console.log(e);
//         const isPLaying = container.classList.contains('play')
//         if(isPLaying){
//             container.classList.remove('play')
//             playBtn.innerHTML = '<i class="fas fa-play"></i>'
//             audio.pause()
//         }
//         else{
//             container.classList.add('play')
//             playBtn.innerHTML = '<i class="fas fa-pause"></i>'
//             audio.play()
//         }
//     }
// })

nextBtn.addEventListener('click', nextMusic)

prevBtn.addEventListener('click', prevmusic)

audio.addEventListener('timeupdate', progres)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextMusic)