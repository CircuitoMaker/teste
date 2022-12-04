//carrossel 1
let count = 1;
document.getElementById("radio1").checked = true;
document.getElementById("carrosselScroll1").checked = true;

setInterval(function(){
    nextImage();
}, 5000);




//função carossel 
function nextImage(){
    count++;
    if(count>4){
        count=1;
    }
    document.getElementById("radio"+count).checked = true;
}