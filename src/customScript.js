import $ from 'jquery';

export const fadeoutAlert = () => {
    const myTimeout = window.setTimeout(function() {
        $(".alertMsg").fadeTo(1000, 0).slideUp(1000, function(){
            $(this).remove(); 
        });
    }, 3000);
    //const setTime = setInterval(function(){ $(".alertMsg").fadeOut(); }, 3000);
    //clearTimeout(myTimeout);
}

export const refreshPage = () => {
    window.location.reload(false);
  }
