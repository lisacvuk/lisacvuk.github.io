
var rotationx = 0;
var rotationy = 0;
var ws = new WebSocket("ws://localhost:8888/ws");

ws.onmessage = function (event) {
	console.log(event.data);
	if(event.data == "b"){
        console.log("Speeding up");
        rotationx = rotationx + 0.1;
        rotationy = rotationy + 0.1;
        event.data = "";
	}
	if(event.data == "s"){
        console.log("Slowing");
        rotationx = rotationx - 0.1;
        rotationy = rotationy - 0.1;
        event.data = "";
	}
    if(event.data == "c"){
        console.log("Current speed X: ", rotationx);
        console.log("Current speed Y: ", rotationy);
        event.data = "";
    }
};
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var loader = new THREE.JSONLoader();
var object;
var light = new THREE.AmbientLight( 0x404040, 5 ); // soft white light
scene.add( light );
// load a resource
loader.load(
	// resource URL
	'/models/playground2.js',
	// Function when resource is loaded
	function ( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
        var material2 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		object = new THREE.Mesh( geometry, material );
        //object.rotation.x = 90;
        object.rotation.y = 90;
		scene.add( object );
	camera.position.y = 20;
        camera.lookAt(object.position);
	}
);

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

camera.position.z = -50;

var render = function () {
    document.addEventListener('keydown',onDocumentKeyDown,false);
    function onDocumentKeyDown(event){
        var delta = 0.05;
        event = event || window.event;
        var keycode = event.keyCode;
        switch(keycode){
        case 37:
            camera.position.x = camera.position.x - delta;
            break;
        case 38:
            camera.position.z = camera.position.z - delta;
            break;
        case 39:
            camera.position.x = camera.position.x + delta;
            break;
        case 40:
            camera.position.z = camera.position.z + delta;
            break;
        }
        document.addEventListener('keyup',onDocumentKeyUp,false);
    }
    function onDocumentKeyUp(event){
        document.removeEventListener('keydown',onDocumentKeyDown,false);
    }
    renderer.setClearColor(0x000000, 1);
    requestAnimationFrame( render );
    if(object){
	  object.rotation.x += 0.05;
	  object.rotation.y += 0.05;
    }
    renderer.render(scene, camera);
};
render();

