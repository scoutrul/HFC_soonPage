var genevaBtn = document.getElementById('geneva');
var londonBtn = document.getElementById('london');
var moscowBtn = document.getElementById('moscow');
var scene = document.getElementById('scene');
console.log(scene);

(function(elements) {
    if(!elements) return;
    
    console.log(elements);
    
    var addElement = function(element){
        console.log(element);
    };
    for(var i = 0; i < elements.length; i++){
        elements[i].addEventListener('click', addElement, false);
    };
})([genevaBtn, londonBtn, moscowBtn]);