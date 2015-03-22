var decor = {

	creerGridParticles: function(scene) {
		var _gridParticles = new BABYLON.ParticleSystem("particles", 2000, scene)
		_gridParticles.particleTexture = new BABYLON.Texture("./assets/textures/star.png", scene)
		//_gridParticles.particleTexture = new BABYLON.Texture("./assets/textures/tutur.jpg", scene)
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
		var _sol_de_verre = BABYLON.Mesh.CreateGroundFromHeightMap("sol", "./assets/textures/sol_height_map.jpg", 500, 500, 80,  0,  10, scene, false);
		
		var _verre_material = new BABYLON.StandardMaterial("verre", scene);
		
		_verre_material.diffuseColor = new BABYLON.Color3(1, 1, 1);
		
		//_verre_material.bumpTexture = new BABYLON.Texture("./assets/textures/waterbump.jpg", scene);

		//_verre_material.emissiveTexture  = new BABYLON.Texture("./assets/textures/sol1.png", scene);
		//_verre_material.emissiveTexture  = new BABYLON.Texture("./assets/textures/tutur.jpg", scene);
		//_verre_material.emissiveTexture .hasAlpha = false
		//_verre_material.emissiveTexture .uScale = 64.0
		//_verre_material.emissiveTexture .vScale = 64.0
		_sol_de_verre.material = _verre_material;
		//_verre_material.alpha = 0.75;
		return _sol_de_verre
	},

	creerSkyBoxBasique: function(scene) {
		
		/*
		var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
		var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
		skyboxMaterial.backFaceCulling = false;
		skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./assets/textures/skybox/placeholder", scene);
		skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
		skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
		skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
		skybox.material = skyboxMaterial;
		*/

		var skybox = BABYLON.Mesh.CreateSphere("skyBox", 10, 2500, scene);
		var shader = new BABYLON.ShaderMaterial("gradient", scene, "gradient", {});
		shader.setFloat("offset", 0);
		shader.setFloat("exponent", 0.6);
		shader.setColor3("topColor", BABYLON.Color3.FromInts(238,245,204));
		shader.setColor3("bottomColor", BABYLON.Color3.FromInts(57,146, 162));
		shader.backFaceCulling = false;
		skybox.material = shader;

		return skybox;
	},
	
	activerBrouillard: function(scene) {
		scene.fogColor = new BABYLON.Color3(0, 0, 0)
		scene.fogStart = 200000.0
		scene.fogEnd = 210000.0
		scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR
		scene.fogDensity = 0.01
	},

	ajouterPlanEau: function (scene,ciel) {
		var plan_eau = BABYLON.Mesh.CreatePlane("planEau", 10000, scene);
    	plan_eau.position.y = 8;
    	plan_eau.rotation.x = Math.PI/2
		plan_eau.material = new BABYLON.StandardMaterial("planEaumat", scene);
		plan_eau.material.diffuseColor = new BABYLON.Color4(0, 0, 0, 0);
		plan_eau.material.emissiveColor = new BABYLON.Color3.FromInts(57,146, 162);

		plan_eau.material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
		plan_eau.material.emissiveFresnelParameters.bias = 0.6;
		plan_eau.material.emissiveFresnelParameters.power = 4;
		plan_eau.material.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
		plan_eau.material.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();

		plan_eau.material.opacityFresnelParameters = new BABYLON.FresnelParameters();
		plan_eau.material.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
		plan_eau.material.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();

		//plan_eau.material.diffuseColor = new BABYLON.Color3.FromInts(238,245,204);

		//plan_eau.material.alpha = 0.75;

		//plan_eau.material.reflectionTexture = new BABYLON.MirrorTexture("mirror", 512, scene, true);
		//plan_eau.material.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1.0, 0, -10.0);
		//plan_eau.material.reflectionTexture.renderList = [ciel];

		//plan_eau.material.bumpTexture = new BABYLON.Texture("./assets/textures/waterbump.jpg", scene);
    	return plan_eau;
	},

	ajouterFondPlanEau: function (scene) {
		var plan_eau = BABYLON.Mesh.CreatePlane("fonPlanEau", 10000, scene);
    	plan_eau.position.y = 0.1;
    	plan_eau.rotation.x = Math.PI/2

		plan_eau.material = new BABYLON.StandardMaterial("fondPlanEaumat", scene);
		plan_eau.material.diffuseColor = new BABYLON.Color3.FromInts(57,146, 162);
    	/*
		plan_eau.material = new BABYLON.StandardMaterial("fondPlanEaumat", scene);
		plan_eau.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
		plan_eau.material.emissiveTexture  = new BABYLON.Texture("./assets/textures/emissivemap.png", scene);
		plan_eau.material.emissiveTexture .hasAlpha = false
		plan_eau.material.emissiveTexture .uScale = 640.0
		plan_eau.material.emissiveTexture .vScale = 640.0
		*/

    	return plan_eau;
	},
	


	createScene: function () {
		var scene = new BABYLON.Scene(engine)
		scene.clearColor = new BABYLON.Color3(0.0,0.0,0.0);
		scene.gravity = new BABYLON.Vector3(0, -10.0, 0)
		scene.collisionsEnabled = true
		var skybox = decor.creerSkyBoxBasique(scene);
		contexte.camera = creerCamera(scene)
		contexte.sol = decor.creerSol(scene)
		contexte.plan_eau = decor.ajouterPlanEau(scene, skybox)
		contexte.fond_plan_eau = decor.ajouterFondPlanEau(scene)

		var light0 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, -1, 0), scene);
		light0.diffuse = new BABYLON.Color3(1, 1, 1);
		light0.specular = new BABYLON.Color3(0, 0.2, 0.8);

		

		contexte.sol.checkCollisions = true
		contexte.cielEtoile = decor.creerGridParticles(scene)
		contexte.sphere = creerSphereTemp(scene)
		return scene;
	},

}