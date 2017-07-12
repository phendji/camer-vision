var app = angular.module('linsigApp.services', []);


app.factory('homeServices', ['$http', '$rootScope',  function($http, $rootScope) {
  	return {

  		/*
		 * Service de contruction des layers utilisés sur la map.
		 * By default, only map France Raster set visibility is true.
		 * @Params :
		 *  -	tokenUser <String>: identifiant unique de l'utilisateur connecté.
		 * @Return void
		 * @Auteur : phendji
		 */
  		buildAllLayers: function(tokenUser){
  			//debug : console.log("tokenUser :", tokenUser);
			tabLayers = [];

			var contatenatedLayers = new ol.layer.Image({
				visible : false,
				extent : mapSettings.extent,
				source : new ol.source.ImageWMS({
					ratio : 1,
					url : ROUTER_MAP
							+ '?Token='+tokenUser,
						params : {
							  'LAYERS' : 'FBC:FiabClientsCollectifs,FBC:FiabClientsIndividuels,RESEAU_FRA:RESEAU_HTA,RESEAU_FRA:RESEAU_BT,RESEAU_FRA:POSTE_ELEC,RESEAU_FRA:POSTE_SOURCE',
							  'VERSION' : '1.1.1',
							  'SRS': 'EPSG:2154'
					},
					serverType : 'geoserver'
				})
			});
			
			var layerFranceRaster = new ol.layer.Image({
				visible : true,
				extent : mapSettings.extent,
				source : new ol.source.ImageWMS({
					ratio : 1,
					url : ROUTER_MAP + '?Token='+tokenUser,
					params : {
						'LAYERS' : 'FDP:France_Raster',
						'FORMAT' : 'image/png',
						'VERSION' : '1.1.1',
						'SRS': 'EPSG:2154'
					},
					serverType : 'geoserver'
				})
			});

			//pas utilisé
			var layerScan = new ol.layer.Image({
				visible : false,
				extent : mapSettings.extent,
				source : new ol.source.ImageWMS({
					ratio : 1,
					url : ROUTER_MAP + '?Token='+tokenUser,
					params : {
						'LAYERS' : 'FDP:SC25_TOPO_TIF_LAMB93_FRA,FDP:SC100_TIF_LAMB93_FRANCE',
						'FORMAT' : 'image/jpeg',
						'VERSION' : '1.1.1',
						'SRS': 'EPSG:2154'
					},
					serverType : 'geoserver'
				})
			});
		

			var layerFiabClientsCollectifs = new ol.layer.Image({
				visible : false,
				extent : mapSettings.extent,
				source : new ol.source.ImageWMS({
					ratio : 1,
					url : ROUTER_MAP
							+ '?Token='+tokenUser,
					params : {
						'LAYERS' : 'FBC:FiabClientsCollectifs',
						'STYLES' : 'FBC:FiabClientsCollectifs',
						'FORMAT' : 'image/png',
						'VERSION' : '1.1.1',
						'SRS': 'EPSG:2154'
					},
					serverType : 'geoserver'
				})
			});

			var layerFiabClientsIndividuels = new ol.layer.Image({
				visible : false,
				extent : mapSettings.extent,
				source : new ol.source.ImageWMS({
					ratio : 1,
					url : ROUTER_MAP
							+ '?Token='+tokenUser,
					params : {
						'LAYERS' : 'FBC:FiabClientsIndividuels',
						'STYLES' : 'FBC:FiabClientsIndividuels',
						'FORMAT' : 'image/png',
						'VERSION' : '1.1.1',
						 'SRS': 'EPSG:2154'
					},
					serverType : 'geoserver'
				})
			});

			/**
			 * RESEAU_HTA
			 */
			
			sourceReseauFRA_RESEAU_HTA_LIBELLE = new ol.source.ImageWMS({
				ratio : 1,
				url : ROUTER_MAP
						+ '?Token='+tokenUser,
				params : {
					'LAYERS' : 'RESEAU_FRA:RESEAU_HTA',
					'FORMAT' : 'image/png',
					'VERSION' : '1.1.1',
					'SRS': 'EPSG:2154'
				},
				serverType : 'geoserver'
			});
			
			
			sourceReseauFRA_RESEAU_HTA = new ol.source.ImageWMS({
				ratio : 1,
				url : ROUTER_MAP
						+ '?Token='+tokenUser,
				params : {
					'LAYERS' : 'RESEAU_FRA:RESEAU_HTA',
					'STYLES' : 'RESEAU_FRA:RESEAU_HTA_SSTXT',
					'FORMAT' : 'image/png',
					'VERSION' : '1.1.1',
					'SRS': 'EPSG:2154'
				},
				serverType : 'geoserver'
			});

			var layerReseauFRA_RESEAU_HTA  = new ol.layer.Image({
				visible : false,
				extent : mapSettings.extent,
				source : sourceReseauFRA_RESEAU_HTA_LIBELLE
			});
			
			/**
			 * RESEAU_BT
			 */

			sourceReseauFRA_RESEAU_BT_LIBELLE   = new ol.source.ImageWMS({
				ratio : 1,
				url : ROUTER_MAP
						+ '?Token='+tokenUser,
				params : {
					'LAYERS' : 'RESEAU_FRA:RESEAU_BT',
					'FORMAT' : 'image/png',
					'VERSION' : '1.1.1',
					'SRS': 'EPSG:2154'
				},
				serverType : 'geoserver'
			});
			
			sourceReseauFRA_RESEAU_BT   = new ol.source.ImageWMS({
				ratio : 1,
				url : ROUTER_MAP
						+ '?Token='+tokenUser,
				params : {
					'LAYERS' : 'RESEAU_FRA:RESEAU_BT',
					'STYLES' : 'RESEAU_FRA:RESEAU_BT_SSTXT',
					'FORMAT' : 'image/png',
					'VERSION' : '1.1.1',
					'SRS': 'EPSG:2154'
				},
				serverType : 'geoserver'
			});
			
			var layerReseauFRA_RESEAU_BT   = new ol.layer.Image({
				visible : false,
				extent : mapSettings.extent,
				source : sourceReseauFRA_RESEAU_BT_LIBELLE
			});

			/**
			 * POSTE ELEC
			 */
			
			var layerReseauFRA_POSTE_ELEC   = new ol.layer.Image({
				visible : false,
				extent : mapSettings.extent,
				source : new ol.source.ImageWMS({
					ratio : 1,
					url : ROUTER_MAP
							+ '?Token='+tokenUser,
					params : {
						'LAYERS' : 'RESEAU_FRA:POSTE_ELEC',
						'FORMAT' : 'image/png',
						'VERSION' : '1.1.1',
						'SRS': 'EPSG:2154'
					},
					serverType : 'geoserver'
				})
			});

			/**
			 * POSTE_SOURCE
			 */

			sourceReseauFRA_POSTE_SOURCE_LIBELLE = new ol.source.ImageWMS({
				ratio : 1,
				url : ROUTER_MAP
						+ '?Token='+tokenUser,
				params : {
					'LAYERS' : 'RESEAU_FRA:POSTE_SOURCE',
					'FORMAT' : 'image/png',
					'VERSION' : '1.1.1',
					'SRS': 'EPSG:2154'
				},
				serverType : 'geoserver'
			});
			
			sourceReseauFRA_POSTE_SOURCE = new ol.source.ImageWMS({
				ratio : 1,
				url : ROUTER_MAP
						+ '?Token='+tokenUser,
				params : {
					'LAYERS' : 'RESEAU_FRA:POSTE_SOURCE',
					'STYLES' : 'RESEAU_FRA:POSTE_SOURCE_SSTXT',
					'FORMAT' : 'image/png',
					'VERSION' : '1.1.1',
					'SRS': 'EPSG:2154'
				},
				serverType : 'geoserver'
			});
			
			layerReseauFRA_POSTE_SOURCE  = new ol.layer.Image({
				visible : false,
				extent : mapSettings.extent,
				source : sourceReseauFRA_POSTE_SOURCE_LIBELLE
			});

			$rootScope.fondsDeCarte = [0,1];
			
			tabLayers[0] = layerFranceRaster;
			tabLayers[1] = layerScan;
			tabLayers[2] = contatenatedLayers;
			tabLayers[3] = layerFiabClientsCollectifs;
			tabLayers[4] = layerFiabClientsIndividuels;
			tabLayers[5] = layerReseauFRA_RESEAU_HTA;
			tabLayers[6] = layerReseauFRA_RESEAU_BT;
			tabLayers[7] = layerReseauFRA_POSTE_ELEC;
			tabLayers[8] = layerReseauFRA_POSTE_SOURCE;
			
			
			/*
	         * Config zIndex layers fiab, init variable dans configs.js
			 */

			tabLayers[3].setZIndex(zIndexFiab);
			tabLayers[4].setZIndex(zIndexFiab);			
		},

  		/*
		 * Service initialisation de la map.
		 * @config <objet>: paramètre de conf transmis par le controllers.js 
		 * @Return void
		 * @Auteur : phendji
		 */
	  	init: function(config){
	  		//debug : console.log(" configs : ", config);
	  		this.getHeightElement();

	  		map = new ol.Map({
	  			
				target : 'map',
				layers : [
				 	config.layers[0],
				 	config.layers[1],
				 	//config.layers[2],
				 	config.layers[3],
				 	config.layers[4],
				 	config.layers[8],
				 	config.layers[7],
				 	config.layers[6],
				 	config.layers[5]
				],		
				//controls: config.setting.control,
				view : new ol.View({
					controls: [], // config.setting.control,
					center : config.setting.center,  //center: ol.proj.transform([-1.8118500054456526, 52.4431409750608], 'EPSG:4326', 'EPSG:3857'),
					zoom : config.setting.zoom,
					projection : config.setting.projection,
					//extent: config.setting.extent,
					interactions: ol.interaction.defaults().extend([ new ol.interaction.PinchZoom()])
				})
			});
	  		
	  		var scaleLineControl = new ol.control.ScaleLine({});
	  		map.addControl(scaleLineControl);
	  		
	  		var mousePositionControl = new ol.control.MousePosition({
	  	        coordinateFormat: ol.coordinate.createStringXY(1),
	  	        projection: 'EPSG:2154',
	  	        // comment the following two lines to have the mouse position
	  	        // be placed within the map.
	  	        className: 'custom-mouse-position',
	  	        target: document.getElementById('mouse-position'),
	  	        undefinedHTML: '&nbsp;'
	  	      });
	  		//console.log("coordinateFormat :",  ol.coordinate.createStringXY(4));
	  		map.addControl(mousePositionControl);
	  		
	  		//update pour le WIDTH et HEIGHT du service WMS
	  		map.updateSize();
	  		
	  		 map.on('singleclick', function(evt) {
				 if($rootScope.getGetFeatureInfo){ 		
			   		var view = map.getView();
					var viewResolution = view.getResolution() * 2.5;
					var viewProjection =  view.getProjection();

			   		if (typeof evt != "undefined"){
			   			coordinate = evt.coordinate;
			   		  	var url = tabLayers[2].getSource().getGetFeatureInfoUrl(
			   		                coordinate, viewResolution, viewProjection,
			   		                {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50});
			 
			   			if (url) {
			   		    	document.getElementById('bc-searh-info').innerHTML =
			   		        '<iframe seamless style="height: 100%;width: 100%;" src="' + url + '"></iframe>';
			   		  	}
				    }
				 }
		});

	  	},

	  	/* Get height element #map availibilty
	  	 * @Return void
		 * @Auteur : phendji
		 */
	  	getHeightElement: function() {
	  		resizeMap();
		},
		
		/* get all tab ref
		 * @Params :
		 * 	-	tokenUser<String> 	: clé autorisant l'utilisateur a accèder à la ressource
		 *  -	typeStatuts<String> : la tab de ref à indexer (statutsComparaison/statutsTraitement)
		 *  -	callback<Function>	: function de retour.
	  	 * @Return data<json>
		 * @Auteur : phendji
		 */
	  	getTabRef: function(tokenUser, typeStatuts, callback) {
	  		
	  		if(typeStatuts == "statutsComparaison") var url = ('js/geojson/tabRefStatutsComparaison.json');
	  		if(typeStatuts == "statutsTraitement") var url = ('js/geojson/tabRefStatutsTraitement.json');
	  		
	  		//var url = ROUTER_TABREF+'/'+typeStatuts+'?Token='+tokenUser;
	  		$http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
                    callback(response);
                }, function errorCallback(response) {
                    callback(response);
               });
		}
				
 	}

}]);