/* 
 * Config files Copyright (c) 2016 - LINSIG
 */

var PORT_SERVICE 		= ':8080';

//Client et serveur sur la même machine
var DOMAIN				= 'localhost';
var URL_SERVICE  		= 'http://'+DOMAIN;
	
var ROUTER_IRD			= URL_SERVICE + PORT_SERVICE + '/linsig-serveur/rest/ids/ird';
var ROUTER_MAP			= URL_SERVICE + PORT_SERVICE + '/linsig-serveur/rest/ids/map';
var ROUTER_LOCAOBJ		= URL_SERVICE + PORT_SERVICE + '/linsig-serveur/rest/ids/locaObj';
var ROUTER_LOCADDR		= URL_SERVICE + PORT_SERVICE + '/linsig-serveur/rest/ids/locaAdr';
var ROUTER_TABREF		= URL_SERVICE + PORT_SERVICE + '/linsig-serveur/rest/referentiel';
var ROUTER_AUTH		    = URL_SERVICE + PORT_SERVICE + '/linsig-serveur/rest/basicaccess/connexion';
var ROUTER_DECONNECT    = URL_SERVICE + PORT_SERVICE + '/linsig-serveur/rest/basicaccess/deconnexion';
var UPDATE_PRM    		= URL_SERVICE + PORT_SERVICE + '/linsig-serveur/rest/prms';

var ROUTER_INTRANET     = 'https://intraneterdf.fr/';

/*
 * Cookies expire time.
 *  - 24(h) * 60(min) * 60(sec) * 1000(msec) : conversion d'une journée de 24h en milliseconde
 *  - 1000 est une constante pour le milliseconde
 *  - 60*1000 = 1 min
 *  - X*60*1000 ou X designe le nbre d'heure.
 */
var cookiesTime 	= 2*60*60*1000; // init à 2h
var cookiesDomain	= DOMAIN;

//Position la couche fiab au dessus des tous les autres(zIndex)
var zIndexFiab = 1;

/*
 * Localisation par adresse correspondance précision niveau d'échelle
 */
var precisionZoom = {
	"1_PntAdressePl" : 500,
	"2_AdresseInter" : 500,
	"3_PntAdresseAu" : 500,
	"4_Voie" : 1000,
	"5_LieuDitHabite" : 1000,
	"6_ChefLieu" : 50000,
	"7_CodePostal" : 10000,
	"8_Ville" : 10000,
	"Autre" : 10000
}

var precisionZoomObjet = {
	"PRM" : 250,
	"Client" : 250,
	"PointRaccordement" : 500,
	"PointRaccordementSouterrain" : 500,
	"PointRaccordementAerien" : 500,
	"TronconBT" : 500,
	"TronconSouterrainBT"  : 500,
	"TronconsAeriensBT" : 500,
	"DipoleSourceBT" : 500,
	"PosteDistribution" : 2000,
	"Autre" : 2000
}


/*Pas utilisé pour l'instant*/
var statutComparaison = [
	{ 
		"id": 1,
		"libelle": "Cohérent ligne BT"
	},
	{
		"id": 2,
		"libelle": "Ecart ligne BT"
	},
	{ 
		"id": 3,
		"libelle": "Cohérent départ BT"
	},
	{ 
		"id": 4,
		"libelle": "Ecart départ BT"
	},
	{ 
		"id": 5,
		"libelle": "Indéterminé"
	},
	{ 
		"id": 6,
		"libelle": "Incohérent LinkyT"
	},
	{ 
		"id": 7,
		"libelle": "Autre"
	}
];

var statutTraitement = [
	{ 
		"id": 1,
		"libelle": "A instruire groupe CARTO"
	},
	{
		"id": 2,
		"libelle": "A instruire Expl./MOAD"
	},
	{ 
		"id": 3,
		"libelle": "Traitement terminé"
	},
	{ 
		"id": 4,
		"libelle": "Pas de traitement"
	},
	{ 
		"id": 5,
		"libelle": "Autre"
	},
	{ 
		"id": 6,
		"libelle": "Non exploitable"
	},
	{ 
		"id": 7,
		"libelle": "Traité Groupe CARTO"
	},
	{ 
		"id": 8,
		"libelle": "Traité Expl./MOAD"
	}
];

/*
 * Correspondantce key:libelle, utilise pour les listes deroulantes
 */
var typeEntiteIRD = 	[
	{
		"libelle": "Poste de distribution",
		"key" : "PosteDistribution"
	}, {
		"libelle": "Dipole Source BT",
		"key" : "DipoleSourceBT"
	}, {
		"libelle": "Départ BT ",
		"key" : "DepartBT"
	},{
		"libelle": "Tronçon BT",
		"key" : "TronconBT"
	}, {
		"libelle": "Point de raccordement",
		"key" : "PointRaccordement"
	}, {
		"libelle": "Branchement BT",
		"key" : "BranchementBT"
	}, {
		"libelle": "PRM",
		"key" : "PRMSIG"
	},{
		"libelle": "Client C5",
		"key" : "ClientC5"
	}, {
		"libelle": "Client C4",
		"key" : "ClientC4"
	}
];

var typeCodeIRD = [
	{
		"libelle": "Identifiant (ID SIG, ID PRM ou ID Client)",
		"key": "ID"
	}, {
		"libelle": "Code (Code GDO, Centre|Référence client)",
		"key":"CODE_GDO"
	}
];

//correspondance entre l'IHM et les paramètres IRD 
var correspondanceIDIRD ={
		   "PosteDistribution" : "ID_SIG",
		   "DipoleSourceBT" : "ID_SIG",
		   "DepartBT" : "ID_SIG",
		   "TronconBT" : "ID_SIG",
		   "PointRaccordement" : "ID_SIG",
		   "BranchementBT" : "ID_SIG",
		   "PRMSIG" : "ID_PRM",
		   "ClientC5" : "ID_SIG",
		   "ClientC4" : "ID_SIG"
		};

/*
 * Correspondantce key:libelle, utilise pour les listes deroulantes
 * TODO : optimisation avec le precedent car identique.
 */
var typeEntiteLocalisation = 	[
	{
		"libelle": "Poste de distribution",
		"key" : "PosteDistribution"
	}, {
		"libelle": "Dipole Source BT",
		"key" : "DipoleSourceBT"
	}, {
		"libelle": "Départ BT ",
		"key" : "DepartBT"
	}, {
		"libelle": "Tronçon BT",
		"key" : "TronconBT"
	}, {
		"libelle": "Point de raccordement",
		"key" : "PointRaccordement"
	}, {
		"libelle": "Branchement BT",
		"key" : "BranchementBT"
	}, {

		"libelle": "PRM",
		"key" : "PRM"
	},{
		"libelle": "ClientC5",
		"key" : "Client"
	},
	{
		"libelle": "ClientC4",
		"key" : "Client"
	}
];

var typeCodeLocalisation = [
	{
		"libelle": "Code (Code GDO, Centre|Référence client)",
		"key":"CODE_GDO"
	}, {
		"libelle": "Identifiant (ID SIG, ID PRM ou ID Client)",
		"key":"ID"
	}
];

//correspondance entre l'IHM et les paramètres du service de localisation par objet
var correspondanceIDLocalsiation ={
   "PosteDistribution" : "ID_SIG",
   "DipoleSourceBT" : "ID_SIG",
   "DepartBT" : "ID_SIG",
   "TronconBT" : "ID_SIG",
   "PointRaccordement" : "ID_SIG",
   "BranchementBT" : "ID_SIG",
   "PRM" : "ID_PRM",
   "Client" : "REFERENCE_CLIENT"
};



var tabElement= [
	{
		"libelle": "Code GDO du poste", "value" : ""
	}, {
		"libelle": "Taux de déploiement Linky", "value" : ""
	},{
		"libelle": "Nombre de PRM du poste", "value" : ""
	}, {
		"libelle": "Nombre de PRM Linky du poste", "value" : ""
	}, {
		"libelle": "Nombre de PRM vus de Linky", "value" : ""
	},{
		"libelle": "Nombre de PRM Linky à rattacher", "value" : ""
	}
];

//Liste des codes IRD dans l’entête.
var tabCodeRetourIRD = [
	"0000",  //status : "SUCCESS", Succès de la requête
	"0001",  //status : "SUCCESS", Objet métier ou identifiant inconnu 
	"0002"	 //status : "SUCCESS", Erreur de structuration JSON
];

// Déclaration des variables pour la gestion des status
var tabStatutComp = [];
var tabStatutTraitment = [];


proj4.defs("EPSG:2154","+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

var projection = ol.proj.get('EPSG:2154');

var control = ol.control.defaults().extend([ new ol.control.ScaleLine({
	units : 'metric'
}) ]);

var resolutionsGeoWebcache = [2000.0000000000002, 1000.0000000000001, 500.00000000000006, 250.00000000000003, 100.0, 50.0, 25.0, 9.9999470832275, 5.000105833545001, 2.5000529167725003, 1.0001270002540006, 0.5000635001270003, 0.26458386250105836];

//use if source is new ol.source.TileWMS
var matrixIds = new Array(13);
for (var z = 0; z < 13; ++z) {
	matrixIds[z] = '' + z;
};

var bbox = [70000, 6030000, 1270000, 7130000];

/* Config options of the map */
var mapSettings = {
	projection : projection,
	extent : bbox,
	control : control,
	center : [ (bbox[0]+bbox[2])/2, (bbox[1]+bbox[3])/2 ],
	zoom : 7
};

// Config style for type of geometry
var image = new ol.style.Circle({
	radius : 6,
	stroke : new ol.style.Stroke({
		color : '#000000',
		width : 1
	}),
	fill : new ol.style.Fill({
		color : 'rgba(255, 0, 0, 1)'
	})
});