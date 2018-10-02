'use stict';

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




function Route(name, htmlName, defaultRoute) {
    try {
        if(!name || !htmlName) {
            throw 'error: name and htmlName params are mandatories';
        }
        this.constructor(name, htmlName, defaultRoute);
    } catch (e) {
        console.error(e);
    }
}

Route.prototype = {
    name: undefined,
    htmlName: undefined,
    default: undefined,
    constructor(name, htmlName, defaultRoute) {
        this.name = name;
        this.htmlName = htmlName;
        this.default = defaultRoute;
    },
    isActiveRoute: function (hashedPath) {
        return hashedPath.replace('#', '') === this.name; 
    }
}

function Router(routes) {
    try {
        if (!routes) {
            throw 'error: routes param is mandatory';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);   
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    constructor(routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
    },
    init: function () {
        var r = this.routes;
        (function(scope, r) { 

            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },
    hasChanged: function(scope, r){
        console.log('window.location', window.location);
        if (window.location.hash.length > 0) {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if(route.isActiveRoute(window.location.hash)) {
                    scope.goToRoute(route.htmlName);
                }
            }
        } else {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if(route.default) {
                    scope.goToRoute(route.htmlName);
                }
            }
        }
    },
    goToRoute: function (htmlName) {
        (function(scope) { 
            console.log('goToRoute', scope);
            var url = '/' + htmlName,
                xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this);
    }
};

(function () {
    function init() {
        var router = new Router([
            new Route('index', 'index.html', true),
            new Route('london', 'components/london.html'),            
            new Route('geneva', 'components/geneva.html'),
            new Route('moscow', 'components/moscow.html'),
        ]);
    }
    init();
}());