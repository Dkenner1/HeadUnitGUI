var audioPlayer = function() {
    "use strict";
    // Private variables
    var _currentTrack = 0;
    var _elements = {
      audio: document.getElementById("audio"),
      playerButtons: {
        largeToggleBtn: document.getElementById("play-btn"),
        randomBtn: document.getElementById("randomizer")
        //nextTrackBtn: document.querySelector(".next-track-btn"),
        //previousTrackBtn: document.querySelector(".previous-track-btn"),
        //smallToggleBtn: document.getElementsByClassName("small-toggle-btn")
      },
      progressBar: document.getElementById("progress-slider"),
      songs: document.getElementsByClassName("song"),
      trackInfoBox: document.querySelector(".info-box")
    };
    var _active = false;
    var _random = false;
    var _trackLoaded = false;
    var _prevLink = null;

    var _resetTrack= function() {
        _pause();
        _elements.progressBar.value=0;
        _elements.audio.currentTime=0;
    };

    var _next = function() {
        _resetTrack();
        _active=true;
        _currentTrack = _random ?  getRandomInt(_elements.songs.length) : _currentTrack+1;
        if(_currentTrack >= _elements.songs.length){
            console.log("Reached end of playlist");
            _active=false;
            _currentTrack = 0;
        }

        _setTrack(_elements.songs[_currentTrack], _currentTrack);
        if(_active){
            _playBack();
        }
    };


    var _setTrackTitle = function(songTitle){
        var trackTitleBox = document.querySelector(".info-title");
        trackTitleBox.innerHTML = null;
        trackTitleBox.innerHTML = songTitle;
    };

    var _setActiveItem = function(songLink){
        if(_prevLink !== null){
            _prevLink.className = "song";
        }
        _prevLink=songLink;
        songLink.className = "song font-weight-bold";
    };

    /*
    *   
    *   Updates the below values when a songLink is clicked
    *   * audio src file
    *   * Audio title
    *   * Reset range input
    *   * Highlighting selected soundtrack
    * 
    */
    var _setTrack = function(songLink, track) {
        _setTrackTitle(songLink.children[0].outerText);
        _setActiveItem(songLink);
        _elements.audio.setAttribute("src", _elements.audio.children[track].src);
        _elements.audio.load();
        _trackLoaded=true;
    };
 

    /**
     * A utility function for converting a time in miliseconds to a readable time of minutes and seconds.
     *
     * @param seconds The time in seconds.
     *
     * @return time string in minutes:seconds.
     **/
    var timeStr = function(seconds) {
        var min = 0;
        var sec = Math.floor(seconds);
        var time = 0;

        min = Math.floor(sec / 60);

        min = min >= 10 ? min : '0' + min;

        sec = Math.floor(sec % 60);

        sec = sec >= 10 ? sec : '0' + sec;

        time = min + ':' + sec;

        return time;
    };


    /**
   * Updates the time for the song being played.
   **/
    var _trackTimeChanged = function() {
        let timeElement = document.getElementsByClassName("current-time")[0];
        timeElement.innerHTML = null;
        timeElement.innerHTML = timeStr(_elements.audio.currentTime);
        _updateProgressIndicator();
    };

    var _trackDurationChanged = function(){
        let durationElement = document.getElementsByClassName("duration")[0];
        durationElement.innerHTML = null;
        durationElement.innerHTML = timeStr(_elements.audio.duration);
        _elements.progressBar.max = (parseFloat(_elements.audio.duration)/_elements.progressBar.step).toFixed(2);
    }

    var _pause = function(){
        _elements.audio.pause();
        _active=false;
        _elements.playerButtons.largeToggleBtn.children[0].className = "fa-solid fa-play";
    };

    var _play = function(){
        _elements.audio.play();
        _active=true;
        _elements.playerButtons.largeToggleBtn.children[0].className = "fa-solid fa-pause";
    };

    var _updatePlayStatus = function() {
         _elements.audio.paused ? _play() : _pause();
    }

    var _playBack = function(){
        if(_trackLoaded){
            _updatePlayStatus();
        }
    };
   /**
   * Updates the location of the progress indicator according to how much time left in audio.
   **/
    var _updateProgressIndicator = function() {
        let currentTime = parseFloat(_elements.audio.currentTime);
        _elements.progressBar.value = (currentTime / _elements.progressBar.step).toFixed(2);
    };

    var initPlayer = function() {
        // Event handlers
        //Adding event listeners to playlist clickable elements.
        for (let i = 0; i < _elements.songs.length; i++) {
            
            //var smallToggleBtn = _elements.playerButtons.smallToggleBtn[i];
            let songLink = _elements.songs[i];
            //Playlist link clicked.
            songLink.addEventListener("click", function(e) {
                //e.preventDefault();
                let selectedTrack = parseInt(this.getAttribute("data-track"))-1;
                // Reset player
                _resetTrack();
                if (selectedTrack !== _currentTrack) {
                    _currentTrack = selectedTrack;
                    _trackLoaded = false;
                } 
                if (_trackLoaded === false) {
                    _setTrack(songLink, _currentTrack);
                } 
                _playBack();
            }, false);

        } // End of FOR loop adding event listeners

        _elements.playerButtons.randomBtn.addEventListener("click", (event) => {
            if(_random){
                _random = false;
                _elements.playerButtons.randomBtn.className = "fa-solid fa-shuffle text-deselected";
            } else {
                _random = true;
                _elements.playerButtons.randomBtn.className = "fa-solid fa-shuffle text-white";
            }
        });
        _elements.playerButtons.largeToggleBtn.addEventListener("click", _playBack, false);

         // durchange
         _elements.audio.addEventListener('durationchange', _trackDurationChanged);
       
        // timechange
        _elements.audio.addEventListener('timeupdate', _trackTimeChanged);
        
        // audio end
        _elements.audio.addEventListener('ended', _next);
        
          //Audio error. 
        _elements.audio.addEventListener("error", function(e) {
            switch (e.target.error.code) {
                case e.target.error.MEDIA_ERR_ABORTED:
                    alert('You aborted the video playback.');
                    break;
                case e.target.error.MEDIA_ERR_NETWORK:
                    alert('A network error caused the audio download to fail.');
                    break;
                case e.target.error.MEDIA_ERR_DECODE:
                    alert('The audio playback was aborted due to a corruption problem or because the video used features your browser did not support.');
                    break;
                case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    alert('The video audio not be loaded, either because the server or network failed or because the format is not supported.');
                    break;
                default:
                    alert('An unknown error occurred.');
                    break;
            }
            trackLoaded = false;
            _resetTrack()
        });

        var rangeInput = function(e){
            _pause();
            _elements.audio.currentTime = _elements.progressBar.value*_elements.progressBar.step
            _play();
        };
        _elements.progressBar.addEventListener("input", rangeInput);
        _elements.progressBar.addEventListener("change", rangeInput);
        _elements.progressBar.addEventListener("mouseup", (event) =>{
            _elements.audio.addEventListener('timeupdate', _updateProgressIndicator);
            _elements.audio.addEventListener('ended', _next);
        });
        _elements.progressBar.addEventListener("mousedown", (event) =>{
            _elements.audio.removeEventListener("ended", _next);
            _elements.audio.removeEventListener("timeupdate", _updateProgressIndicator);
        });
        _setTrack(_elements.songs[0], 0)
    };
    return { initPlayer: initPlayer };
};
