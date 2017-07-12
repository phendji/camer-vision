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

/*SOUS RUBRIQUES*/
var LIST_DES_SOUS_RUBRIQUES = [
	{ 
		"id": 1,
		"libelle": "Tourisme / Promotion Culturelle"
	},
	{
		"id": 2,
		"libelle": "Climat des affaires / IDE / Entrepreneuriat"
	},
	{ 
		"id": 3,
		"libelle": "Pétrole / Gaz / Exploitation minière"
	},
	{ 
		"id": 4,
		"libelle": "Système politique / Institutions / Administration / Société civile"
	},
	{ 
		"id": 5,
		"libelle": "Sécurité / Défense / Lutte contre le terrorisme"
	},
	{ 
		"id": 6,
		"libelle": "Construire le Vivre-ensemble / Mémoire / Modèle de société / Nationalité"
	},
	{ 
		"id": 7,
		"libelle": "Education / Enseignement supérieur / Formation professionnelle"
	},
	{ 
		"id": 8,
		"libelle": "Jeunesse / Femmes / Personnes vulnérables"
	},
	{ 
		"id": 9,
		"libelle": "Innovation / Numérique / Technologies / Développement industriel"
	},
	{ 
		"id": 10,
		"libelle": "Transports / Infrastructures de transports : route-rail-air-mer"
	},
	{ 
		"id": 11,
		"libelle": "Ethique / Lutte contre détournements et la corruption"
	},
	{ 
		"id": 12,
		"libelle": "Elevage / Agriculture / Agroalimentaire"
	},
	{ 
		"id": 13,
		"libelle": "Energie électrique / Energies renouvelables / Infrastructures énergétiques"
	},
	{ 
		"id": 14,
		"libelle": "Réchauffement climatique / Développement durable / RSE / Entrepreneuriat social"
	},
	{ 
		"id": 15,
		"libelle": "Intégration CEMAC-CEEAC / Coopération internationale / Diplomatie"
	},
	{ 
		"id": 16,
		"libelle": "Système économique et financier / Monnaie (FCFA) / Stratégie économique"
	}
];

//Liste des codes IRD dans l’entête.
var tabCodeRetourIRD = [
	"0000",  //status : "SUCCESS", Succès de la requête
	"0001",  //status : "SUCCESS", Objet métier ou identifiant inconnu 
	"0002"	 //status : "SUCCESS", Erreur de structuration JSON
];
