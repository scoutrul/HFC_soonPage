'use stict';

function Route(name, htmlPath, defaultRoute) {
    try {
        if(!name || !htmlPath) {
            throw 'error: name and htmlPath params are mandatories';
        }
        this.constructor(name, htmlPath, defaultRoute);
    } catch (e) {
        console.error(e);
    }
}

Route.prototype = {
    name: undefined,
    htmlPath: undefined,
    default: undefined,
    constructor(name, htmlPath, defaultRoute) {
        this.name = name;
        this.htmlPath = htmlPath;
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
        if (window.location.hash.length > 0) {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if(route.isActiveRoute(window.location.hash)) {
                    scope.goToRoute(route.htmlPath);
                }
            }
        } else {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if(route.default) {
                    scope.goToRoute(route.htmlPath);
                }
            }
        }
    },
    goToRoute: function (htmlPath) {
        (function(scope) { 
            var url = '/' + htmlPath,
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
            new Route('index', '../components/index.html', true),
            new Route('london', '../components/london.html'),            
            new Route('geneva', '../components/geneva.html'),
            new Route('moscow', '../components/moscow.html'),
        ]);
    }
    init();
}());