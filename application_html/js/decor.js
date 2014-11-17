var decor = {

	creerGridParticles: function(scene) {
		var _gridParticles = new BABYLON.ParticleSystem("particles", 2000, scene)
		//_gridParticles.particleTexture = new BABYLON.Texture("./assets/textures/star.png", scene)
		_gridParticles.particleTexture = new BABYLON.Texture("./assets/textures/tutur.jpg", scene)
		_gridParticles.minAngularSpeed = -1.5
		_gridParticles.maxAngularSpeed = 1.5
		_gridParticles.minSize = 2.0
		_gridParticles.maxSize = 4.0
		_gridParticles.minLifeTime = 1.0
		_gridParticles.maxLifeTime = 4.0
		_gridParticles.minEmitPower = 1.0
		_gridParticles.maxEmitPower = 2.0
		_gridParticles.emitRate = 300
		_gridParticles.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
		_gridParticles.minEmitBox = new BABYLON.Vector3(-250, 0, -250)
		_gridParticles.maxEmitBox = new BABYLON.Vector3(250, 0, 250)
		_gridParticles.direction1 = new BABYLON.Vector3(0, 1, 0)
		_gridParticles.direction2 = new BABYLON.Vector3(0, 1, 0)
		_gridParticles.color1 = new BABYLON.Color4(0, 1.0, 1.0, 1)
		_gridParticles.color2 = new BABYLON.Color4(0, 0.5, 0.5, 1)
		_gridParticles.gravity = new BABYLON.Vector3(0, 5, 0)
		_gridParticles.emitter = new BABYLON.Vector3(0, -0.1, 0)
		_gridParticles.start();
		return _gridParticles
	},

	creerSolGrille: function(scene) {
		var _sol_de_verre = BABYLON.Mesh.CreateGround("sol_de_verre", 200, 200, 250, 0, 25, scene, false);
		
		var _verre_material = new BABYLON.StandardMaterial("verre", scene);
		
		_verre_material.diffuseColor = new BABYLON.Color3(1, 1, 1);
		_verre_material.emissiveTexture = new BABYLON.Texture("./assets/textures/emissivemap.png", scene);
		_verre_material.emissiveTexture.hasAlpha = true
		_verre_material.emissiveTexture.uScale = 64.0
		_verre_material.emissiveTexture.vScale = 64.0
		_sol_de_verre.material = _verre_material;
		_verre_material.alpha = 0.75;
		return _sol_de_verre
	},

	creerSol: function(scene) {
		var _sol_de_verre = BABYLON.Mesh.CreateGroundFromHeightMap("sol", "./assets/textures/sol_height_map.jpg", 500, 500,  10,  0,  100, scene, false);
		
		var _verre_material = new BABYLON.StandardMaterial("verre", scene);
		
		_verre_material.diffuseColor = new BABYLON.Color3(1, 1, 1);
		_verre_material.emissiveTexture  = new BABYLON.Texture("./assets/textures/emissivemap.png", scene);
		//_verre_material.emissiveTexture  = new BABYLON.Texture("./assets/textures/tutur.jpg", scene);
		_verre_material.emissiveTexture .hasAlpha = false
		_verre_material.emissiveTexture .uScale = 64.0
		_verre_material.emissiveTexture .vScale = 64.0
		_sol_de_verre.material = _verre_material;
		//_verre_material.alpha = 0.75;
		return _sol_de_verre
	},

	creerSkyBoxBasique: function(scene) {
		var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
		var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
		skyboxMaterial.backFaceCulling = false;
		skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./assets/textures/skybox/placeholder", scene);
		skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
		skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
		skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
		skybox.material = skyboxMaterial;
		return skybox;
	},
	
	activerBrouillard: function(scene) {
		scene.fogColor = new BABYLON.Color3(0, 0, 0)
		scene.fogStart = 200000.0
		scene.fogEnd = 210000.0
		scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR
		scene.fogDensity = 0.01
	},
	
	createScene: function () {
		var scene = new BABYLON.Scene(engine)
		scene.clearColor = new BABYLON.Color3(0.0,0.0,0.0);
		scene.gravity = new BABYLON.Vector3(0, -10.0, 0)
		scene.collisionsEnabled = true
		contexte.camera = creerCamera(scene)
		contexte.sol = decor.creerSol(scene)

		/*
		contexte.sous_sol = decor.creerSolGrille(scene)
		contexte.sol2 = decor.creerSolGrille(scene)
		contexte.sous_sol2 = decor.creerSolGrille(scene)
		contexte.sol.position.y = 0.0;
		contexte.sous_sol.position.y = 10.0;
		contexte.sol2.position.y = -10.0;
		contexte.sous_sol2.position.y = -20.0;
		*/

		contexte.sol.checkCollisions = true
		contexte.cielEtoile = decor.creerGridParticles(scene)
		contexte.sphere = creerSphereTemp(scene)
		return scene;
	},

}