var genevaBtn = document.getElementById('geneva');
var londonBtn = document.getElementById('london');
var moscowBtn = document.getElementById('moscow');
var buttons = [genevaBtn, londonBtn, moscowBtn];

(function(elements) {
    if(!elements) return;
    
    var clearBtns = function(){
        elements.forEach(function(btn){
                btn.className = "";
            }
        )
    };
    var changeBgImg = function(element){
        var slider = document.getElementById('slider');
        
        clearBtns();
        element.target.className = "active";

        slider.className = element.target.id;

    };
    for(var i = 0; i < elements.length; i++){
        elements[i].addEventListener('click', changeBgImg, false);
    };
})(buttons);