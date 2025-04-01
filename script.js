// Music Player and Background Images
document.addEventListener('DOMContentLoaded', function() {
    // Background Image Rotation
    const backgroundImages = [
        '/images/background1.gif',
        '/images/background2.gif',
        '/images/background3.gif',
        '/images/background4.gif',
        '/images/background5.gif'
    ];
    
    let currentBgIndex = 0;
    
    // Function to Change Background Image
    function changeBackgroundImage() {
        document.body.style.backgroundImage = `url('${backgroundImages[currentBgIndex]}')`;
        currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
    }
    
    // Set Initial background
    changeBackgroundImage();
    
    // Change Background Every 8 Seconds
    setInterval(changeBackgroundImage, 8000);
    
    // Music Player Elements
    const audioElement = document.getElementById('background-music');
    const playPauseButton = document.getElementById('play-pause-btn');
    const songInfo = document.getElementById('song-info');
    
    // Playlist
    const playlist = [
        { title: "habits (stay high) - hippie sabotage remix", url: "/audio/stayhigh.mp3" },
        { title: "this is gospel - panic! at the disco", url: "/audio/thisisgospel.mp3" },
        { title: "radio - lana del rey", url: "/audio/radio.mp3" },
        { title: "sweater weather - the neighbourhood", url: "/audio/sweaterweather.mp3" },
        { title: "team - lorde", url:"/audio/team.mp3" }
    ];
    
    // Set Initial Song
    let currentSongIndex = 0;
    songInfo.textContent = playlist[currentSongIndex].title;
    audioElement.src = playlist[currentSongIndex].url;
    
    // Play/Pause button functionality
    playPauseButton.addEventListener('click', function() {
        if (audioElement.paused) {
            audioElement.play();
            playPauseButton.textContent = "⏸";
        } else {
            audioElement.pause();
            playPauseButton.textContent = "▶";
        }
    });

   
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');

    // Previous Song Button functionality
    prevButton.addEventListener('click', function() {
        // Go to Previous Song or Loop to the End of Playlist
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        audioElement.src = playlist[currentSongIndex].url;
        songInfo.textContent = playlist[currentSongIndex].title;
        
        // Auto-play the song after changing tracks
        audioElement.play();
        // Update button text to reflect the playing state
        playPauseButton.textContent = "⏸";
    });

    // Next Song Button Functionality
    nextButton.addEventListener('click', function() {
        // Go to Next Song or Loop back to Beginning of Playlist
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        audioElement.src = playlist[currentSongIndex].url;
        songInfo.textContent = playlist[currentSongIndex].title;
        
        // Auto-play the song after changing tracks
        audioElement.play();
        // Update button text to reflect the playing state
        playPauseButton.textContent = "⏸";
    });
        
    // Change Song When Current One Ends
    audioElement.addEventListener('ended', function() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        audioElement.src = playlist[currentSongIndex].url;
        songInfo.textContent = playlist[currentSongIndex].title;
        audioElement.play();
    });
    
    // Store music state when leaving the page
    window.addEventListener('beforeunload', function() {
        // Save current song index and position
        localStorage.setItem('currentSongIndex', currentSongIndex);
        localStorage.setItem('currentSongPosition', audioElement.currentTime);
        localStorage.setItem('musicWasPlaying', !audioElement.paused);
    });

    // Check for saved music state when the page loads
    const savedSongIndex = localStorage.getItem('currentSongIndex');
    const savedSongPosition = localStorage.getItem('currentSongPosition');
    const musicWasPlaying = localStorage.getItem('musicWasPlaying');

    if (savedSongIndex !== null) {
    // Restore the previous song
    currentSongIndex = parseInt(savedSongIndex);
    audioElement.src = playlist[currentSongIndex].url;
    songInfo.textContent = playlist[currentSongIndex].title;
    
    // Restore the previous position
    if (savedSongPosition !== null) {
        audioElement.currentTime = parseFloat(savedSongPosition);
    }
    
    // Resume playing if it was playing before
    if (musicWasPlaying === 'true') {
        audioElement.play();
        playPauseButton.textContent = "⏸";
    }
}   

    // Random Visitor Counter
    const visitorCountElement = document.getElementById('visitor-count');
    if (visitorCountElement) {
        // Generate a random number between 1000 and 9999
        const randomVisitorCount = Math.floor(Math.random() * 9000) + 1000;
        visitorCountElement.textContent = randomVisitorCount;
    }
    
    // Last Updated Date
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = "april 1, 2016";
    }
    
    // Load Effects
    document.body.style.opacity = 0;
    let opacity = 0;
    const fadeIn = setInterval(function() {
        if (opacity < 1) {
            opacity += 0.1;
            document.body.style.opacity = opacity;
        } else {
            clearInterval(fadeIn);
        }
    }, 100);
});