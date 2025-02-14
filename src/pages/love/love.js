$(document).ready(fucntion(){
    $(".container").mouseenter(function(){
        $(".card").stop().animate({
            top:"-90px"
        },"slow");
    }).mouseleave(function(){
        $(".card").stop().animate({
            top:0
        }, "slow");
    })
})