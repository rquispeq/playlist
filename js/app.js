$(document).ready(function(){
    // initPlayer();
    getSongs();
});

var audio = document.getElementById('player');
var music;

/**
 * funcion que obtiene el json donde estan listado las canciones
 */
function getSongs() {
    $.getJSON("js/app.json",function (mjson) {
        music = mjson;
        generateList(music);
    });
}

/**
 * Funcion que recibe el json y lista cada musica en una lista html
 * 
 */
function generateList(music){
    $.each(music.songs,function(i,song){
        $('#playlist').append('<li class="list-group-item" id="'+ i +'">'+song.name+'</li>');
    });

    // cuando se hace click en un elemento de la lista, reproduce la canción
    $('#playlist li').click(function () {
        var selectedSong = $(this).attr('id');
        playSong(selectedSong);
    });
}

// Establece los valores de album y ubicacion de la cancion y por ultimo, lo reproduce
function playSong(selectedSong){
    if (selectedSong >= music.songs.length) {
        audio.pause();
    } else {
        $('#img-album').attr('src',music.songs[selectedSong].image);
        $('#player').attr('src',music.songs[selectedSong].song);
        audio.play();
        scheduleSong(selectedSong);
    }
}

function scheduleSong(id){
    audio.onended = function(){
        console.log('Terminó la canción');
        playSong(parseInt(id) + 1);
    }
}

$('#shuffle').click(function () {
    $('#playlist').empty();
    console.log(shuffle(music.songs));
    generateList(music);
    playSong(0);
});


function shuffle(array){
    for(var random,temp,position = array.length; position;random = Math.floor(Math.random()*position),temp = array[--position],array[position]=array[random],array[random] = temp);
        return array;
}