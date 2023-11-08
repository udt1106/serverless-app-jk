import $ from 'jquery';

export const fadeoutAlert = (type) => {
    const myTimeout = window.setTimeout(function() {
        $(".alertMsg").fadeOut(1000, 0).slideUp(1000, function(){
            $(this).remove(); 
        });
    }, 3000);
    //const setTime = setInterval(function(){ $(".alertMsg").fadeOut(); }, 3000);
    //clearTimeout(myTimeout);
}

export const startLoading = (className) => {
    $("."+className).css('background-color','lightgreen');
    $("."+className).text("Loading...");
    $("."+className).prop('disabled', true);
}

export const endLoading = (className, text) => {
    $("."+className).text(text);
    $("."+className).prop('disabled', false);
    $("."+className).css('background-color','');
}

export const convertUnixTimestamp = (unixTimeStamp) => {
    const unixTimestamp = unixTimeStamp
    const milliseconds = unixTimeStamp * 1000
    const dateObject = new Date(milliseconds)
    const humanDateFormat = dateObject.toLocaleString("en-US", { // you can use undefined as first argument
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })

    return humanDateFormat;
}