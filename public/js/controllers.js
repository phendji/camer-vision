/* home controllers*/
var app = angular.module('linsigApp.controllers', ["toggle-switch"]);

app.controller('homeCtrl', ['$scope', '$rootScope', 'homeServices', function($scope, $rootScope, homeServices) {
    /*
     * tag sur l'exitance de chaque objet ou collection d'objet dans le json (resultat de recherche)
     */
    var tokenUser = $rootScope.globals.currentUser.token;

    /*
     * Recupération des tables de reference statutsComparaison
     */
    homeServices.getTabRef(tokenUser, 'statutsComparaison', function(response){
    	//Debug : console.log("response :", response);
        switch (response.status){
            case 200:
                $scope.tabRefStatCmp = response.data.contenu;
                if(response.data.entete.code === "0000"){
                	//console.log("tabRefStatCmp", response.data.contenu);
                }else{
                	$scope.managerErrorMsgs("errormsg", "Erreur lors de la recupération de la table de référence statuts de Comparaison, veuillez contacter votre administrateur.");
                }
                break;

            default:
                $scope.managerErrorMsgs("errormsg", "Erreur lors de la recupération de la table de référence statuts de Comparaison, veuillez contacter votre administrateur.");
        }

    });
    
    /*
     * Recupération des tables de reference statutsTraitement
     */
    homeServices.getTabRef(tokenUser, 'statutsTraitement', function(response){
    	//Debug :console.log("response :", response);
        switch (response.status){
            case 200:
            	 $scope.tabRefStatTrmt = response.data.contenu;
                 if(response.data.entete.code === "0000"){
                 	//console.log("tabRefStatTrmt", response.data.contenu);
                 }else{
                 	$scope.managerErrorMsgs("errormsg", "Erreur lors de la recupération de la table de référence statuts de Comparaison, veuillez contacter votre administrateur.");
                 }
                 break;

            default:
                $scope.managerErrorMsgs("errormsg", "Erreur lors de la recupération de la table de référence statuts de traitement, veuillez contacter votre administrateur.");
        }

    });

  /* Fermeture de la fenêtre modal.
   * @Param : target <String>, id du modal
   * @Auteur phendji
   */
  $scope.closeModal = function(target){
    $("#"+target).modal("hide");
  };
     
  /* Initialisation des variables.
   * @Auteur phendji
   */
  $scope.initialise = function(){
		$scope.tagPostesPrincipauxExiste = false;
		$scope.tagPostesViaLinkyExiste = false;
		$scope.tagPostesExiste = false;
		$scope.tagPostesDistributionExiste = false;
		$scope.tagTopologieReseauExiste = false;
		$scope.tagTopologiePostesDistributionExiste = false;
		$scope.tagDipolesSourceBTExiste = false;
		$scope.tagDepartsBTExiste = false;
		$scope.tagTronconsBTExiste = false;
		$scope.tagTronconsAeriensBTExiste = false;
		$scope.tagTronconsSouterrainsBTExiste = false;
		$scope.tagBranchementsExiste = false;
		$scope.tagBranchementsBTExiste = false;
		$scope.tagPRMSExiste = false;
		$scope.tagClientsBTExiste = false;
		$scope.tagClientsBTC5Existe = false;
		$scope.tagPointsRaccordementsExiste = false;
		$scope.tagPointsRaccordementAeriensExiste = false;
		$scope.tagPointsRaccordementSouterrainsExiste = false;
		$scope.popupFilterThematique = true; //indicateur de l'existance des statuts de cmp ou de traitement dans le json.
		
		$scope.activeBtnDataAttributaire = false; //complement sur initContextModExplorer.
		closerPopup();
		$scope.initVectorLayer();
		$scope.featuresDicPosteDistribution = {};
		$scope.featuresDictEcartDePosition = {};
		$scope.featuresDictEcartPointIgn = {};
  };


  /* Remove all vectors on the map for new search.
   * @Auteur phendji
   */
  $scope.initVectorLayer = function(){
    if(typeof vectorLayerPoste != "undefined"){
      vectorSourcePoste.clear();
      map.removeLayer(vectorLayerPoste);
    }

    $scope.initVectorLayerDesEcarts();
  };

  $scope.initVectorLayerDesEcarts = function(){
     if(typeof vectorLayerEcartDePosition != "undefined"){
      vectorLine.clear();
      map.removeLayer(vectorLayerEcartDePosition);
    }

    if(typeof vectorLayerEcartPointIgn != "undefined"){
      vectorSquare.clear();
      map.removeLayer(vectorLayerEcartPointIgn);
    }
  }
	
  //Déclaration
  $scope.initContextModExplorer = function(){};
  
  $scope.filtrerListStatut = [];

	// Désactiver les checkbox #points de raccordement, #tronconsBT, #SIG-LINKY, tant qu'on a aucun resultat de recherche.
	//TODO : thematique  #SIG-IGN  n'est pas implementé. voir avec tristan
	$scope.activeBtnDataAttributaire = false;
	$scope.isDisabledPR = true;
  $scope.isDisabledTBT = true;
  $scope.isDisabledPoste = true;
  $scope.isDisabledEcartDePosition = true;
	$scope.isDisabledEcartPointIgn = true;
    
  $scope.pointsRaccordementIsChecked = false;
  $scope.posteDistributionIsChecked = false;
  
  $scope.tronconIsChecked = false;
  $scope.mapIsChecked = 'franceRaster';    // Fond de carte coché par défaut

	$scope.ifBtnReseauChecked	= false;
  $scope.ifBtnFiabChecked		= false;

  $scope.firstLayer	= 'franceRaster';
  //  $scope.secondLayer	= 'scan25';
  $scope.thirdLayer	= 'scan100';

  $scope.dataTypeReseau	= 'reseau';
  $scope.dataTypeFiab		= 'fiab';
    
  $scope.btnOptionNav = {
    dataTypeFiabColl : 'fiabColl',
    dataTypeFiabInd : 'fiabInd',
    
    dataEcartDePosition : 'ecartDePosition',
    dataEcartPointIgn : 'ecartPointIgn',

    dataTypeReseauHTA : 'RESEAU_HTA',
    dataTypeReseauBT : 'RESEAU_BT',
    dataTypePosteElec : 'POSTE_ELEC',
    dataTypePosteSource : 'POSTE_SOURCE',
    
	ifBtnReseauHTAChecked : false,
	ifBtnReseauBTChecked : false,
	ifBtnPosteElecChecked : false,
	ifBtnPosteSourceChecked : false,
	
    ifBtnFiabClientsCollChecked : false,
	ifBtnFiabClientsIndChecked : false,

    ifBtnEcartPositionChecked : false,
    ifBtnEcartPointIgnChecked : false,
	
	statusSigIgn : false,
	statusSigLinky : false,
    statusSigLinkyIgn : false
  };   
    
  $scope.ifBtnFiabClientsCollChecked = false
  $scope.ifBtnFiabClientsIndChecked = false;
  $scope.dataTypeBT	= 'tronconBT';
  $scope.dataTypePR   = 'pointsRaccordement';
  $scope.dataTypePosteDist = 'posteDistribution';

  $scope.currentCodeGDOPostePrincipal = "";//codeGDO à afficher dans la popin de confirmation d'une prochaine recherche
  $scope.listCurrentCodeGDOPosteViaLinky = [];
  
  $scope.featuresDicPosteDistribution = {};
  $scope.featuresDictEcartDePosition = {};
  $scope.featuresDictEcartPointIgn = {};

  $scope.allMsgsUser = [];

  $scope.libelle = {
		resBt : true,
		resHta : true,
		posteS: true
  }

  var container = document.getElementById('popup');
  
  $scope.currentLayerWMS = null;
  $rootScope.getGetFeatureInfo = false;

	/*
	 * Create overlay pour anchor de la popover sur la map.
	 * @Auteur : phendji
	 */
	var overlay = new ol.Overlay({
	  	element: container,
	  	positioning: 'bottom-center',
       	stopEvent: true
	});

  /*
   * Gestion des messages d'erreur.
   * @Params : 
   *  - typeError <String>: errormsg, sucessmsg, infomsg, class css. 
   *  - comment : <String>le commentaire à afficher pour ce type d'erreur.
   * @Return void
   * @Auteur : phendji
   */
  $scope.managerErrorMsgs = function(typeError, comment){
    //success-color et error-color couleur maj prm.
    if(typeError != "initmsg" && typeError != "success-color" && typeError != "error-color" && typeError != "info-color"){
      $('.viewerErrorMsg').notify(comment, {
        style: 'managermsgs',
        className: typeError,
        showAnimation: "slideDown",
        autoHideDelay: 7000,
        autoHide: true
      });
    }

    $scope.allMsgsUser[$scope.allMsgsUser.length] = {"message" : comment, "classCss": typeError};
};
     
  /*
	 * Ajoutez un handler de clic pour cacher/detruire la popover .
	 * @return <boolean> n'est pas connecté au href.
	 * @Auteur : phendji
	 */
	closerPopup = function() {
  	overlay.setPosition(undefined);
  	$(container).popover('destroy');
  	return false;
	};
	
  $scope.updateFilter = function(pTypeFiltre){
    if(pTypeFiltre === "SIGIGN"){
      var filter = document.getElementById('filter').value;
      var filter = "DISTANCE_SIG_IGN>"+filter;
      var filterParams = {
        'CQL_FILTER': filter
      };

      tabLayers[4].getSource().updateParams(filterParams);
      tabLayers[3].getSource().updateParams(filterParams);
    }

    if(pTypeFiltre === "SIGLINKYIGN"){
      var prmEcart;
      var dictPrmsEnEcartFilter = {};
      var filterSigLinkyIgn = document.getElementById('filterSigLinkyIgn').value;

      for (var indIdPrm in $scope.getOriginalDictPrmsEnEcart) {
        prmEnEcart = $scope.getOriginalDictPrmsEnEcart[indIdPrm];
        if(prmEnEcart.distanceSigign > filterSigLinkyIgn){
          dictPrmsEnEcartFilter[indIdPrm] = prmEnEcart;
        }
      }

      $scope.initVectorLayerDesEcarts();
      $scope.getDictPrmsEnEcart = dictPrmsEnEcartFilter;
      $scope.buildFeatureTabDesEcarts(dictPrmsEnEcartFilter); // construire feature sur les prms filtrés;

      if(!$scope.isDisabledEcartDePosition){  //si un prm en ecart de position existe
        if($scope.btnOptionNav.ifBtnEcartPositionChecked){
          $scope.choiceDataVector($scope.btnOptionNav.dataEcartDePosition, true);
        }else{
          $scope.choiceDataVector($scope.btnOptionNav.dataEcartDePosition, false);
        }
      }

      if(!$scope.isDisabledEcartPointIgn){  // si un prm en ecart de point existe
        if($scope.btnOptionNav.ifBtnEcartPointIgnChecked){
          $scope.choiceDataVector($scope.btnOptionNav.dataEcartPointIgn, true);
        }else{
          $scope.choiceDataVector($scope.btnOptionNav.dataEcartPointIgn, false);
        }
      }

      $scope.filtrerParStatut(); // applique le filtre sur les status.
    }
  };

	/*
	 * Gestion des checkbox du bloc Fonds de carte et l'affichage de layers sur la map.
	 * @params <string>:  type d'objet, Service agrégé France Raster IGN(franceRaster), Scan 25 IGN(scan25) et Scan 100 IGN(scan100)
	 * @Return void
	 * @Auteur : phendji
	 */
    $scope.choiceLayers = function(params){
    	if(params === $scope.firstLayer){
    		tabLayers[0].set('visible', true);
    		tabLayers[1].set('visible', false);
          	$scope.currentLayerWMS = tabLayers[0].getSource();
    	}
/*    	if(params === $scope.secondLayer){
          	tabLayers[1].set('visible', true);
          	tabLayers[0].set('visible', false);
          	$scope.currentLayerWMS = tabLayers[1].getSource();
    	}
        */
    	if(params === $scope.noneLayer){
          	tabLayers[1].set('visible', false);
          	tabLayers[0].set('visible', false);
          	$scope.currentLayerWMS = null;
    	}
    }
    
    $scope.choiceDataRasterLibelle = function(params){
    	
 	   if(params === $scope.btnOptionNav.dataTypeReseauHTA){
     		if (!$scope.libelle.resHta)
 				tabLayers[5].setSource(sourceReseauFRA_RESEAU_HTA_LIBELLE);
 			else
 				tabLayers[5].setSource(sourceReseauFRA_RESEAU_HTA);
     	}
     	
 	   if(params === $scope.btnOptionNav.dataTypeReseauBT){
     		if (!$scope.libelle.resBt)
 				tabLayers[6].setSource(sourceReseauFRA_RESEAU_BT_LIBELLE);
 			else
 				tabLayers[6].setSource(sourceReseauFRA_RESEAU_BT);
     	}
     	
     	
     	if(params === $scope.btnOptionNav.dataTypePosteSource){
     		if (!$scope.libelle.posteS)
 				tabLayers[8].setSource(sourceReseauFRA_POSTE_SOURCE_LIBELLE);
 			else
 				tabLayers[8].setSource(sourceReseauFRA_POSTE_SOURCE);
     	}
     	
     };
    
 

    /*
	 * Gestion des checkbox du bloc Données vectorielles, thematique et affichage des vectors sur la map.
	 * @params1 <string> : le type d'objet, tronconBT ou pointsRaccordement.
	 * @params2 <string> : params2 = auto si l'appel se fais après une recherche.
	 * @Return void
	 * @Auteur : phendji
	 */
    $scope.choiceDataVector = function(params1, params2){
    	//Gestion affichage des tronçons BT
    	if(params1 === $scope.dataTypeBT){
    		if(params2 === 'auto'){
    			$scope.tronconIsChecked = true;
    			$scope.TronconBTThematiqueSIGLINKY($scope.btnOptionNav.statusSigLinky);
    			vectorLayer.set('visible', true);
    		}else{
    			if(!$scope.tronconIsChecked){
	    			$scope.tronconIsChecked = true;
	    			$scope.TronconBTThematiqueSIGLINKY($scope.btnOptionNav.statusSigLinky, true);
	    			vectorLayer.set('visible', true);
		        }else{
		        	$scope.tronconIsChecked = false;
		        	vectorLayer.set('visible', false);
		        	closerPopup();
	        	}
    		}
    	}

    	//Gestion de l'affichage des points de raccordement
    	if(params1 === $scope.dataTypePR){
    		if(params2 === 'auto'){
    			$scope.pointsRaccordementIsChecked = true;
    			$scope.pointsRattachementThematiqueSIGLINKY($scope.btnOptionNav.statusSigLinky);
    			vectorLayerPR.set('visible', true);
    		}else{
	    		if(!$scope.pointsRaccordementIsChecked){
					$scope.pointsRaccordementIsChecked = true;
					$scope.pointsRattachementThematiqueSIGLINKY($scope.btnOptionNav.statusSigLinky, true);
					vectorLayerPR.set('visible', true);
					if($scope.popupFilterThematique){
						$scope.filtrerParStatut();
					}
				}else{
					$scope.pointsRaccordementIsChecked = false;
	    			vectorLayerPR.set('visible', false);
	    			closerPopup();
				}
			}
	    }

        //Gestion de l'affichage des postes de distribution.
        if(params1 === $scope.dataTypePosteDist){
            if(params2 === 'auto'){
                $scope.posteDistributionIsChecked = true;
                $scope.displayAllPosteDistributionInMap();
                vectorLayerPoste.set('visible', true);
            }else{
                if(!$scope.posteDistributionIsChecked){
                    $scope.posteDistributionIsChecked = true;
                    vectorLayerPoste.set('visible', true);
                }else{
                    $scope.posteDistributionIsChecked = false;
                    vectorLayerPoste.set('visible', false);
                    closerPopup(); // delete popover
                }
            }
        }

        //Gestion de l'affichage des écarts de position.
        if(params1 === $scope.btnOptionNav.dataEcartDePosition){
          if($scope.btnOptionNav.ifBtnEcartPositionChecked){
            $scope.displayAllEcartDePositionInMap();
            $scope.btnOptionNav.statusSigLinkyIgn = true;
            vectorLayerEcartDePosition.set('visible', true);
          }else{
            if($scope.btnOptionNav.ifBtnEcartPointIgnChecked){
              $scope.btnOptionNav.statusSigLinkyIgn = true;
            }else{
              $scope.btnOptionNav.statusSigLinkyIgn = false;
            }

            if(typeof vectorLayerEcartDePosition != "undefined")
              vectorLayerEcartDePosition.set('visible', false);
          }
            
        }

        //Gestion de l'affichage des écarts de position réprésentés par des points ign.
        if(params1 === $scope.btnOptionNav.dataEcartPointIgn){
          if($scope.btnOptionNav.ifBtnEcartPointIgnChecked){
            $scope.displayAllEcartPointIgnInMap();
            $scope.btnOptionNav.statusSigLinkyIgn = true;
            vectorLayerEcartPointIgn.set('visible', true);
          }else{
            if($scope.btnOptionNav.ifBtnEcartPositionChecked){
              $scope.btnOptionNav.statusSigLinkyIgn = true;
            }else{
              $scope.btnOptionNav.statusSigLinkyIgn = false;
            }
            if(typeof vectorLayerEcartPointIgn != "undefined")
              vectorLayerEcartPointIgn.set('visible', false);
          }  
        }
    };

	/* Cette function permet de gerer l'affichage de la thematique SIGLINKY
     * lorqu'on clic sur le bouton SIG-LINKY
     * @Return void
     * @Auteur : Tristan
     */
    $scope.activeThematiqueSIGLINKY = function(){
    	//debug : console.log("$scope.statusSigLinky : ", $scope.statusSigLinky);
    	$scope.TronconBTThematiqueSIGLINKY($scope.btnOptionNav.statusSigLinky, false);
		$scope.pointsRattachementThematiqueSIGLINKY($scope.btnOptionNav.statusSigLinky, false);
		// on ne peut faire de filtre sur les statuts que si ces derniérs existent.
		if($scope.popupFilterThematique){
			$scope.filtrerParStatut();
		}
		
    };
    
    
    /*
     * Cette fonction de récupérer les info WMS
     * http://openlayers.org/en/v3.1.1/examples/getfeatureinfo-tile.html?q=popup
     * GetFeatureInfo
     * pcyyydgd.adam.adroot.edf.fr:8280/linsig-serveur/rest/idsressourceimpl/map?url=https://ids-recette.erdf.fr/geoserver/FDP/wms&Token=cXE6Y1hFPQ==&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=FDP%3AFrance_Raster&LAYERS=FDP%3AFrance_Raster&SRS=EPSG%3A2154&INFO_FORMAT=text%2Fhtml&X=50&Y=50&STYLES&WIDTH=101&HEIGHT=101&BBOX=354862.7634548257%2C6688275.947169969%2C354870.29421415465%2C6688283.477929298
     * @Auteur : Abdel
     */
   
    $scope.getInfoWMS = function(e) {
		$("#mod-search").css({"width":"800px"});	
		$rootScope.getGetFeatureInfo = true;
    };
   
    
    /* 
	 * Contruction du model html utilise sur les popover.
	 * @params <array> : information liée a la feature.
	 * @Return void
	 * @Auteur : template html <string>
	 */
    function getcontentHTML(params){
      //debug : console.log("params : ", params);
      var template;
      if(typeof params != "undefined"){
        if(!Array.isArray(params)){
        	if(params.typeObjet == "PointRaccordementSouterrain" || params.typeObjet == "PointRaccordementAerien" || params.typeObjet == 'PointRacoordementAerien'){
    	    	template = buildPopoverPRM(params);  //utils.js
        	}else if(params.typeObjet == "PosteDistribution"){
            var posteDistribution = params;
            template = buildPopoverPosteDistribution(posteDistribution);
          }else if(params.typeObjet == "TronconSouterrainBT" || params.typeObjet == "TronconAerienBT"){
        		var troncon = params;
        		template = buildPopoverTroncon(troncon);
        	}else{
            // ne rien afficher.
            console.log("ne rien afficher");
          }
        }else{ //prmsEnEcart
          template = buildPopoverPrmsEnEcart(params);
        }
      return template;
    }
  }

  /* 
   * Fonction qui permet d'appliquer les thématiques sur les pointsRattachement
   * @activateThematique <boolean> : permettant de savoir si le 
   * bouton thématique est actif ou pas et appliquer le style correspondant aux features
   * @Auteur : Tristan
   * TODO : a optimiser par @phendji, l'ideal serait de contruire son featuresTab lors
   * traitement du json dans le searchCtrl, fonction : treatmentJson(params)
   */
  $scope.pointsRattachementThematiqueSIGLINKY = function(activateThematique, zoom){
  	//debug : console.log("getAllPointRaccordement : ", $scope.getAllPointRaccordement);
  	/* Traitement des points de raccordement */
  	featuresTab = []; 
  	
  	featuesPointRaccordement = {};
  	
  	var pointsRaccordement = $scope.getAllPointRaccordement;
    	
		for (var j = 0; j < pointsRaccordement.length; j++) {
      if((pointsRaccordement[j].hasOwnProperty('mePosition')) && (pointsRaccordement[j].mePosition != null)){
        if(pointsRaccordement[j].mePosition.type == 'Point') {
          if((pointsRaccordement[j].mePosition.hasOwnProperty('coordinates')) && (pointsRaccordement[j].mePosition['coordinates'].length > 0 )) {   	
            var styleFeature;
            var dataCoordinates = pointsRaccordement[j].mePosition['coordinates'];
            var idSIG = pointsRaccordement[j].idSIG;

            //styleFeature = getStyleFeature('symbologieParticuliereStyle', '', ''); //pas utilisé.

            styleFeature = getStyleFeature('pointStyleDefault', '#000000', '#ffffff');
                        
	          if (typeof pointsRaccordement[j].linsigCouleurList != "undefined"){
                        	
            	/** Construction de la symbologie complexe */
            	var slices = [];
              var label = "";
            	nombreDeCouleurs =pointsRaccordement[j].linsigCouleurList.length;
            	
          	  for (key in pointsRaccordement[j].linsigCouleurList) {
          		  var objet = pointsRaccordement[j].linsigCouleurList[key];
               	var color = objet['color'];
               	label= label + " " +objet['codeGDOLigneBTCommunicante'] + "("+ objet['nb'] + ")";
               	slices.push({percent: 100/nombreDeCouleurs, color: color});                       	
              }
                      	 
        	    var feature = new ol.Feature({
                geometry: new ol.geom.Point(dataCoordinates),
                data: pointsRaccordement[j],
                name: label
              });
	                          
                        	
            	var feature;
            	feature.setStyle(styleFeature);
            	if(activateThematique){
              	if(nombreDeCouleurs>1){
              		var canvas = document.createElement('canvas');
                  var sideLength = 20;
                  canvas.width = canvas.height = sideLength;
                  var lineWidth = 1;
                  var radius = (sideLength - lineWidth) / 2;
                  
                  var drawChart = new DrawChart(canvas, radius, lineWidth, slices, label);
                  drawChart.render();
                  feature = new ol.Feature({
                    geometry: new ol.geom.Point(dataCoordinates),
                    data: pointsRaccordement[j],
                    name: label
                  });
                              
									feature.setStyle( createStyle(undefined, canvas) );
              	}else if(nombreDeCouleurs == 1){
              		if(pointsRaccordement[j].linsigCouleurList[0].color != null){
                		styleFeature = getStyleFeature('pointStyleSIGLINKY', '#000000', pointsRaccordement[j].linsigCouleurList[0].color);
                		feature.setStyle(styleFeature);
              		}
                }
              }
              
              pointsRaccordement[j].styleGeo = feature.getStyle();
              featuesPointRaccordement[idSIG] = feature;
              featuresTab.push(feature);
              
              if($scope.filtrerListStatut.indexOf(pointsRaccordement[j]['statCmp']) != -1 || $scope.filtrerListStatut.indexOf(pointsRaccordement[j]['statTrmt']) != -1){
                styleFeature = getStyleFeature('pointStyleNonVisible', 'rgba(0,0,0,0)', '');
                feature.setStyle(styleFeature);
              }else if( typeof pointsRaccordement[j].visible != "undefined"){
              	if(pointsRaccordement[j].visible){
              		styleFeature = getStyleFeature('pointStyleNonVisible', 'rgba(0,0,0,0)', '');
                  feature.setStyle(styleFeature);
                }
              }
            }
          }
        }
      }
		  $scope.featuesPointRaccordement = featuesPointRaccordement;
    }

  
  /* TODO : optimisation, devrais deplacer ce code ailleurs (conception)?
   * Display popup on click.
   */
	map.on('click', function(evt) {

        var features = [];
        var firstPixelFeatureInMap;
        var typeObjectFeature;
        var dataObjectFeature;
        var contentHtml;

        map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
            features.push(feature);
        });

        overlay.setPosition(undefined);
        $(container).popover('destroy');

        if(features.length > 0 ){            

            firstPixelFeatureInMap = features[0]; //features[0] : la première feature.
           
            if(typeof firstPixelFeatureInMap.get('data') !=  "undefined"){ // si on clic sur le bout de la fèche par exple, typeObjectFeature = undefined car data n'existe pas.
                
                typeObjectFeature = firstPixelFeatureInMap.get('data').typeObjet;

                if((typeObjectFeature == 'PosteDistribution') || (typeObjectFeature.includes("PointRac")) || (typeObjectFeature.includes("Troncon"))){
            
                    dataObjectFeature = firstPixelFeatureInMap.get('data');
                    contentHtml = getcontentHTML(dataObjectFeature);
                   
                    setTimeout(function (){
                      overlay.setPosition(evt.coordinate);
                      $(container).popover({
                          'placement': dynamicPlacement(container),
                          'html': true,
                          'content': contentHtml
                      });
                      $(container).popover('show');
                    }, 200);
                }else if(typeObjectFeature == 'PrmsEnEcart'){
                  var tabDataObjectFeature = [];
                  for (var i = 0; i < features.length; i++) {
                    if(typeof features[i].get('data') !=  "undefined"){
                      if(features[i].get('data').typeObjet == "PrmsEnEcart"){
                        tabDataObjectFeature[i] = features[i].get('data');
                      }
                    }
                  }

                  contentHtml = getcontentHTML(tabDataObjectFeature);

                  setTimeout(function (){
                    overlay.setPosition(evt.coordinate);
                    $(container).popover({
                        'placement': dynamicPlacement(container),
                        'html': true,
                        'content': contentHtml
                    });
                    $(container).popover('show');
                  }, 200);
                }else{
                  closerPopup();
                  if ($("#viewerFormSearchInfoWMS").css("display") == "block")
                    $scope.getInfoWMS(evt); 
                }
            }
        }else{
          closerPopup();
          if ($("#viewerFormSearchInfoWMS").css("display") == "block")
            $scope.getInfoWMS(evt); 
        }

	});

    map.on('pointermove', function(evt) {
        var target = map.getTarget(),
        jTarget = typeof target === "string" ? $("#" + target) : $(target);

        if (evt.dragging) {
          // closer.onclick();  destroy popover lors d'un drag and drop sur la map.
          return;
        }
        var pixel = map.getEventPixel(evt.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        if (hit) {
            jTarget.css("cursor", "pointer");
        } else {
            jTarget.css("cursor", "");
        }
    });

		/*
		 * Création / modification du layer pr
		 */
		if(featuresTab.length > 0){
			if(typeof vectorLayerPR == 'undefined'){

				var vectorSourcePR = new ol.source.Vector({
	              	features: featuresTab
	          	});

				vectorLayerPR = new ol.layer.Vector({
		      		visible: true,
		          	source: vectorSourcePR
		      	});
				if (typeof zoom == "undefined")
					map.getView().fit(vectorSourcePR.getExtent(), map.getSize());
		      	map.addLayer(vectorLayerPR);
		    
		      	
			}else{
				var vectorSourcePR = new ol.source.Vector({features: featuresTab});
				vectorLayerPR.setSource(vectorSourcePR);
				if (typeof zoom == "undefined")
					map.getView().fit(vectorSourcePR.getExtent(), map.getSize());
				
			}
		}
    };

    /* 
     * Fonction qui permet d'appliquer les thématiques sur les tronconBT
     * @activateThematique <boolean> : permettant de savoir si le 
     * bouton thématique est actif ou pas et appliquer le style correspondant aux features
     * @Auteur : Tristan
     * TODO : a optimiser par @phendji, l'ideal serait de contruire son featuresTab lors
     * traitement du json dans le searchCtrl, fonction : treatmentJson(params)
     */
    $scope.TronconBTThematiqueSIGLINKY = function(activateThematique, zoom){
    	// debug : console.log("$scope.getAllDipoleSourceBT : ", $scope.getAllDipoleSourceBT);

    	var widthTr = 4;
    	var tronconBTColor = {};
    	var featuesTronconBT = {};
    	/* Traitement des troncon BT*/
    	featuresTab = [];
    	var dipolesSourceBT = $scope.getAllDipoleSourceBT;
		for (var h = 0; h < dipolesSourceBT.length; h++) {
			var colorTronconBT =  dipolesSourceBT[h].couleurLinsig;
			var DepartsBT = dipolesSourceBT[h]['DepartsBT'];
			for (var i = 0; i < DepartsBT.length; i++) {
				if(DepartsBT[i]['TronconsBT'] != null) {
					/* Tronçons sous terrain */
                    if((DepartsBT[i]['TronconsBT'].hasOwnProperty('TronconsSouterrainsBT')) && (DepartsBT[i]['TronconsBT']['TronconsSouterrainsBT'].length > 0)) {
                        var tronconBT = DepartsBT[i]['TronconsBT'].TronconsSouterrainsBT;
                        for (var j = 0; j < tronconBT.length; j++) {
                            if((tronconBT[j].hasOwnProperty('mePosition')) && (tronconBT[j].mePosition != null )){
                                if(tronconBT[j].mePosition.type == 'MultiLineString') {
                                    if((tronconBT[j].mePosition.hasOwnProperty('coordinates'))  && (tronconBT[j].mePosition['coordinates'].length > 0 )) {
                                        
                                        var styleFeature;
                                        var dataCoordinates = tronconBT[j].mePosition['coordinates'];
                                        
                                        /*
                                         * Création des features
                                         */
                                        var multiLineString = new ol.geom.MultiLineString(dataCoordinates);
                                        
                                        var multiLineStyleSIGLINKY  = new ol.style.Style({
                                            stroke: new ol.style.Stroke({
                                                color: colorTronconBT,
                                                width: widthTr
                                            })
                                        });

                                        var multiLineStyleDefault  = new ol.style.Style({
                                            stroke: new ol.style.Stroke({
                                                color: 'black',
                                                width: 2
                                            })
                                        });

                                        var feature = new ol.Feature({
                                            geometry: multiLineString,
                                            data: tronconBT[j]
                                        });
                                          
                                        
                                        if(activateThematique){
                                            feature.setStyle(multiLineStyleSIGLINKY);
                                            tronconBTColor[dipolesSourceBT[h].codeGDO]={"color": colorTronconBT};
                                        }else{
                                            feature.setStyle(multiLineStyleDefault);
                                            tronconBTColor[dipolesSourceBT[h].codeGDO]={"color": "#000000"};
                                        }
                                        
                                        featuresTab.push(feature);
                                        var idSIG = tronconBT[j].idSIG;
                                        featuesTronconBT[idSIG] = feature;
                                        tronconBT[j].styleGeo = feature.getStyle();
                                        
                                        if ($scope.filtrerListStatut.indexOf(tronconBT[j]['statCmp']) != -1 || $scope.filtrerListStatut.indexOf(tronconBT[j]['statTrmt']) != -1){
                                          styleFeature = getStyleFeature('multiLineStyleNonVisible', 'rgba(0,0,0,0)', '');
                                          feature.setStyle(styleFeature);
                                        }else if ( typeof tronconBT[j].visible != "undefined"){
                                        	if (tronconBT[j].visible){
                                        		styleFeature = getStyleFeature('multiLineStyleNonVisible', 'rgba(0,0,0,0)', '');
                                            feature.setStyle(styleFeature);
                                          }
                                        }
                                    }
                                }
                            }
                        }
                    }
		          	/* Tronçons aériens BT*/
		          	if((DepartsBT[i]['TronconsBT'].hasOwnProperty('TronconsAeriensBT')) && (DepartsBT[i]['TronconsBT']['TronconsAeriensBT'].length > 0)) {
		          		var tronconBT = DepartsBT[i]['TronconsBT'].TronconsAeriensBT;
			            for (var j = 0; j < tronconBT.length; j++) {
			                if((tronconBT[j].hasOwnProperty('mePosition')) && (tronconBT[j].mePosition != null )){
		                      	if(tronconBT[j].mePosition.type == 'MultiLineString') {
			                        if((tronconBT[j].mePosition.hasOwnProperty('coordinates')) && (tronconBT[j].mePosition['coordinates'].length > 0 ))  {
		                                var dataCoordinates = tronconBT[j].mePosition['coordinates'];
		                                /*
				        				 * Création des features
				        				 */

		                                var multiLineString = new ol.geom.MultiLineString(dataCoordinates);
		                                var multiLineStyleSIGLINKY  = new ol.style.Style({
						                  	stroke: new ol.style.Stroke({
						                      	color: colorTronconBT,
						                      	width: widthTr
						                  	})
						              	});
		                                var multiLineStyleDefault  = new ol.style.Style({
						                  	stroke: new ol.style.Stroke({
						                      	color: 'black',
						                      	width: 2
						                  	})
						              	});
		                                
		                                var feature = new ol.Feature({
		                                    geometry: multiLineString,
		                                    data: tronconBT[j]
		                                });
		                                
		                                if(activateThematique){
		                                	feature.setStyle(multiLineStyleSIGLINKY);
		                                	tronconBTColor[dipolesSourceBT[h].codeGDO]={"color": colorTronconBT};
		                                }else{
		                                	feature.setStyle(multiLineStyleDefault);
		                                	tronconBTColor[dipolesSourceBT[h].codeGDO]={"color": "#000000"};
		                                }
		                                
		                                featuresTab.push(feature);
		                                var idSIG = tronconBT[j].idSIG;
		                                featuesTronconBT[idSIG] = feature;
		                                tronconBT[j].styleGeo = feature.getStyle();
		                                
		                                if ($scope.filtrerListStatut.indexOf(tronconBT[j]['statCmp']) != -1 || $scope.filtrerListStatut.indexOf(tronconBT[j]['statTrmt']) != -1){
		                                	styleFeature = getStyleFeature('multiLineStyleNonVisible', 'rgba(0,0,0,0)', '');
                                      feature.setStyle(styleFeature);
		                                }else if ( typeof tronconBT[j].visible != "undefined"){
		                                	if (tronconBT[j].visible){
		                                		styleFeature = getStyleFeature('multiLineStyleNonVisible', 'rgba(0,0,0,0)', '');
                                        feature.setStyle(styleFeature);
                                      }
                                    }
		                                
			                        }
			                    }
				            }
			        	}
	          		}
          		}
  			}
    	}
		
		$scope.getAlltronconBTColor = tronconBTColor;
		$scope.featuesTronconBT = featuesTronconBT;
		
		if(featuresTab.length > 0){
			/*
			 * Création / modification du layer. 
			 */
			if(typeof vectorLayer == 'undefined'){
				var vectorSource = new ol.source.Vector({
	              	features: featuresTab
	          	});
				
				vectorLayer = new ol.layer.Vector({
					visible: true,
		          	source: vectorSource
		      	});
				
				if (typeof zoom == "undefined")
					map.getView().fit(vectorSource.getExtent(), map.getSize());
	          	map.addLayer(vectorLayer);
	        
	          	
			}else{
				var vectorSource = new ol.source.Vector({features: featuresTab});
				vectorLayer.setSource(vectorSource);
				if (typeof zoom == "undefined")
					map.getView().fit(vectorSource.getExtent(), map.getSize());
				
			}	
		}
    };

  /*
   * @param
   * @Return void
   * @Auteur : phendji
   */
  $scope.activateThematiqueSigLinkyIgn = function(value){
    if(value){
      if(!$scope.isDisabledEcartDePosition){
        $scope.btnOptionNav.ifBtnEcartPositionChecked = value;
        $scope.choiceDataVector($scope.btnOptionNav.dataEcartDePosition, value);
      }
      if(!$scope.isDisabledEcartPointIgn){
        $scope.btnOptionNav.ifBtnEcartPointIgnChecked = value;
        $scope.choiceDataVector($scope.btnOptionNav.dataEcartPointIgn, value);
      }
      //rendre visible les layers...
    }else{
      //rendre invisible les layers...
      $scope.btnOptionNav.ifBtnEcartPositionChecked = value;
      $scope.btnOptionNav.ifBtnEcartPointIgnChecked = value;
      $scope.choiceDataVector($scope.btnOptionNav.dataEcartDePosition, value);
      $scope.choiceDataVector($scope.btnOptionNav.dataEcartPointIgn, value);
    }
  };
    
	/* Cette function permet de gerer l'affichage de le thématique SIGIGN lorqu'on clique
   * le bouton SIG-IGN, cette fonction est synchronisé également avec le checkbox Fiabilisation client C5
   * @param value <boolean>: l'état du bouton au moment su click
   * @Return void
   * @Auteur : phendji
   */
  $scope.activeThematiqueSIGIGN = function(value){
  	$scope.btnOptionNav.ifBtnFiabClientsCollChecked = value;
    $scope.btnOptionNav.ifBtnFiabClientsIndChecked = value;
  	$scope.choiceDataRaster($scope.btnOptionNav.dataTypeFiabColl, value);
  	$scope.choiceDataRaster($scope.btnOptionNav.dataTypeFiabInd, value);
  };
  	
    
  /*
	 * Gestion des checkbox du bloc Données Raster et l'affichage de layers sur la map.
	 * @params:
	 * 	- params <string>: identifier sur quel checkbox l'envent a été fait.
	 * 	- value  <boolean>: l'état du bouton au moment su click.
	 * @Return void
	 * @Auteur : phendji
	 */
 	$scope.choiceDataRaster = function(params, value){

 		if(params === $scope.btnOptionNav.dataTypeFiabColl){
 			tabLayers[3].set('visible', value);
 			if (value){
 				$scope.btnOptionNav.statusSigIgn = value;
 				$scope.updateFilter();
 			}else {
 				if (!$scope.btnOptionNav.ifBtnFiabClientsIndChecked)
	          		$scope.btnOptionNav.statusSigIgn = value;
 			}
    	}

 		if(params === $scope.btnOptionNav.dataTypeFiabInd){
 			tabLayers[4].set('visible', value);
 			if (value){
 				$scope.btnOptionNav.statusSigIgn = value;
 				$scope.updateFilter();
 			}else {
 				if (!$scope.btnOptionNav.ifBtnFiabClientsCollChecked)
	          		$scope.btnOptionNav.statusSigIgn = value;
 			}
 			
    	}
 		
 		if(params === $scope.btnOptionNav.dataTypeReseauHTA){
 			tabLayers[5].set('visible', value);
 			$scope.currentLayerWMS = tabLayers[5].getSource();
 		}
	        
 		
 		if(params === $scope.btnOptionNav.dataTypeReseauBT){
 			tabLayers[6].set('visible', value);
 			$scope.currentLayerWMS = tabLayers[6].getSource();
 		}
			

 		if(params === $scope.btnOptionNav.dataTypePosteElec){
 			tabLayers[7].set('visible', value);
 			$scope.currentLayerWMS = tabLayers[7].getSource();
 		}
			
 		
 		if(params === $scope.btnOptionNav.dataTypePosteSource){
 			tabLayers[8].set('visible', value);
 			$scope.currentLayerWMS = tabLayers[8].getSource();
 		}
			
    };
    
    /*
     * Gestion de l'affichage des écarts de position.
     * @params <null>
     * @Return void
     * @Auteur : phendji
     */
    $scope.displayAllEcartDePositionInMap = function (){
      vectorLine = new ol.source.Vector({});

      for(var indIdPrm in $scope.featuresDictEcartDePosition){
          var featureLine =  $scope.featuresDictEcartDePosition[indIdPrm].feature;
          var iconFeature =  $scope.featuresDictEcartDePosition[indIdPrm].icon;
          vectorLine.addFeature(featureLine);
          vectorLine.addFeature(iconFeature);
      }

      vectorLayerEcartDePosition = new ol.layer.Vector({
          source: vectorLine
      });

      vectorLayerEcartDePosition.setZIndex(2);   
      map.addLayer(vectorLayerEcartDePosition);
    };

    /*
     * Gestion de l'affichage des points IGN (qui représentent des prms non rattachés pour la thématique sig ign).
     * @params <null>
     * @Return void
     * @Auteur : phendji
     */
    $scope.displayAllEcartPointIgnInMap = function (){
      vectorSquare = new ol.source.Vector({});

      for(var indIdPrm in $scope.featuresDictEcartPointIgn){
          var feature =  $scope.featuresDictEcartPointIgn[indIdPrm];
          vectorSquare.addFeature(feature);
      }

      vectorLayerEcartPointIgn = new ol.layer.Vector({
          source: vectorSquare
      });

      vectorLayerEcartPointIgn.setZIndex(2);   
      map.addLayer(vectorLayerEcartPointIgn);
    };


    /*
     * Gestion de l'affichage des postes de distribution.
     * @params <null>
     * @Return void
     * @Auteur : phendji
     */
    $scope.displayAllPosteDistributionInMap = function (){
    	var featuresTab = [];
        for(var idSIG in $scope.featuresDicPosteDistribution){
            featuresTab.push($scope.featuresDicPosteDistribution[idSIG]);
        }
        if(featuresTab.length > 0){
            vectorSourcePoste = new ol.source.Vector({
                features: featuresTab
            });

            vectorLayerPoste = new ol.layer.Vector({
                source: vectorSourcePoste
            });

            vectorLayerPoste.setZIndex(1);   
            map.addLayer(vectorLayerPoste);
        }
    };
    

    /*
	 * Gestion ouverture/fermeture de la vue des données attributaires.
	 * @params <boolean>
	 * @Return void
	 * @Auteur : phendji
	 */
	$scope.listData = function (params){
		if(params){
			$('#btn-list-data').hide();
			$('#data-tab').show();
		}else{
			$('#data-tab').hide(); 
			$('#btn-list-data').show();
		}
	};


  homeServices.buildAllLayers(tokenUser);

	/*
	 * Initialisation de la map lors du chargement de la page.
	 * Appel du service init() src: service.js
	 * @setting <object>: paramètre de configuration, src: options.js
	 * @layers <array>: tableau des fonds de plan.
	 * @Return void
	 * @Auteur : phendji
	 */
	homeServices.init({
  	setting: mapSettings,
    layers: tabLayers
  });
	
	
	if (typeof tabLayers[0] != "undefined") {
		$scope.currentLayerWMS = tabLayers[0].getSource();
		
		setTimeout(function() {
			 $('#ex1').bootstrapSlider({
		            formatter: function(value) {
		                $scope.opacity = value/100;
		                for (var i = 0; i < $rootScope.fondsDeCarte.length; i++) { //parcours les fonds de carte
		                    if(tabLayers[$rootScope.fondsDeCarte[i]].getVisible()) {// return true or false
		                        tabLayers[$rootScope.fondsDeCarte[i]].setOpacity($scope.opacity);
		                    }
		                }
		                return value+"%";
		            }
		        });
			
		}, 1000)
	}
	
	map.addOverlay(overlay);
   // console.log("HomeCtrl : ", $scope);
}]);