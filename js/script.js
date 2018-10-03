var keyframe = document.getElementById('keyframe');
var navigation = document.getElementById('nav');
var genevaBtn = document.getElementById('geneva');
var londonBtn = document.getElementById('london');
var moscowBtn = document.getElementById('moscow');

var addEventToBtn = function(elements) {
    console.log(elements);
    
    var addElement = function(element){
        console.log(element);
    };
    for(var i = 0; i < elements.length; i++){
        elements[i].addEventListener('click', addElement, false);
    };
};
addEventToBtn([genevaBtn, londonBtn, moscowBtn]);