function creerCamera(scene) {
    var camera = false;
	camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 13.01, 0), scene)
	camera.setTarget(BABYLON.Vector3.Zero())
    camera.attachControl(canvas, false)
    camera.applyGravity = true
	camera.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);
    camera.checkCollisions = true
	return camera
}





function creerSphereTemp(scene) {
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene)
    sphere.position.y = 10;
	sphere.material = new BABYLON.StandardMaterial("sphere", scene);
	sphere.material.diffuseColor = new BABYLON.Color4(0, 0, 0, 0);
	sphere.material.emissiveColor = new BABYLON.Color3(0, 0.5, 0.5);
    sphere.checkCollisions = true
	sphere.loupiote = new BABYLON.SpotLight("Spot0", sphere.position, new BABYLON.Vector3(0, -1, 0), 2.8, 1, scene);
	sphere.loupiote.diffuse = new BABYLON.Color3(0, 0.5, 0.5);
	sphere.loupiote.specular = new BABYLON.Color3(1, 1, 1);
    return sphere
}


BABYLON.Engine.ShadersRepository = "./assets/shaders/";

// Get the canvas element from our HTML below
var canvas = document.getElementById("caneva");
var engine = new BABYLON.Engine(canvas, true);
var fpsCounterSpan = document.getElementById("fps-counter");

//engine.switchFullscreen(true)
var contexte = {}
var scene = decor.createScene();
engine.runRenderLoop(function () {
	contexte.cielEtoile.emitter = new BABYLON.Vector3( contexte.camera.position.x, -0.1,  contexte.camera.position.z);
    fpsCounterSpan.innerHTML = Math.round(BABYLON.Tools.GetFps())
	scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});

