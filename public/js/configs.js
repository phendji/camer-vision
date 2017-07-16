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

var remoteApi = location.origin + '/api';

/*SOUS RUBRIQUES*/
var LIST_DES_SOUS_RUBRIQUES = [
	{ 
		"id": 1,
		"titre": "Tourisme / Promotion Culturelle",
		"description": "Le tourisme et la promotion du patrimoine culturel sont-ils suffisamment organisés au Cameroun pour devenir un levier de développement ? Les prestations hôtelières sont-elles à la hauteur ? La politique des visas est-elle adaptée ? Comment mettre en valeur les atouts naturels et culturels du Cameroun auprès des Camerounais et des étrangers ?"
	},
	{
		"id": 2,
		"titre": "Climat des affaires / IDE / Entrepreneuriat",
		"description": "La coopération entre l’Etat et le secteur privé est-elle à la hauteur des enjeux économiques du Cameroun ? Quelle stratégie de promotion des opportunités d’investissement (notamment des obligations) auprès des Camerounais du pays et de la diaspora, et de facilitation des investissements directs étrangers (IDE) ? Comment susciter et soutenir l’entrepreneuriat des jeunes et des femmes ? Comment associer la diaspora camerounaise au développement du pays ?"
	},
	{ 
		"id": 3,
		"titre": "Pétrole / Gaz / Exploitation minière",
		"description": "Quelles places pour le pétrole et le gaz dans le développement du pays au cours des prochaines décennies, dans la perspective de la diversification ? Comment développer le secteur minier camerounais largement sous-exploité aujourd’hui sachant qu’avec le pétrole et le gaz, il présente un risque de malédiction des ressources naturelles pour le pays ? Quelle place pour l’artisanat minier ?"
	},
	{ 
		"id": 4,
		"titre": "Système politique / Institutions / Administration / Société civile",
		"description": "Il s’agit ici de questionner la pertinence de l’organisation et du fonctionnement de l’Etat, à savoir les institutions qui le composent : le gouvernement, le conseil des ministres, le Sénat, l’Assemblée nationale, la Cour suprême, le Conseil économique et social, les régions, etc. Ces institutions sont-elles nécessaires, pertinentes, efficaces ? Il s’agit également d’interroger le fonctionnement de notre constitution, de système de décentralisation, de notre administration publique, l’accès aux postes de hauts fonctionnaires, fonctionnaires ou contractuels et l’efficacité de la gestion des agents de l’Etat et de leur productivité. En clair, l’organisation de l’Etat permet-il de rendre à chaque Camerounais le service public d’une manière équitable et diligente. La société civile participe-t-elle à améliorer l’efficacité de l’action de l’Etat ? Que manque-t-il pour que les organisations de la société civile (associations, syndicats, presse, etc.) jouent leur rôle au service de l’intérêt général ?"
	},
	{ 
		"id": 5,
		"titre": "Sécurité / Défense / Lutte contre le terrorisme",
		"description": "Le terrorisme frappe le Cameroun depuis plusieurs années. La réponse du gouvernement et des Camerounais est-elle à la hauteur des enjeux ? La politique de défense du pays et de protection des Camerounais est-elle adéquate ? Les Camerounais sont-ils en sécurité dans leurs frontières et dans leurs lieux de vie ? Que faut-il absolument changer dans l’organisation et le fonctionnement de la police et des armées au Cameroun ?"
	},
	{ 
		"id": 6,
		"titre": "Construire le Vivre-ensemble / Mémoire / Modèle de société / Nationalité",
		"description": "Les Camerounais sont-ils heureux de vivre ensemble ? Depuis les indépendances, le Cameroun a-t-il créé les conditions du vivre ensemble entre les ethnies, les groupes linguistiques, les régions ? Les langues nationales occupent-elles la place qui doit être la leur ? Qui sont les héros du Cameroun ? Comment les Camerounais entretiennent-ils leur mémoire collective ? Quel modèle de société pour le Cameroun ? Quelles règles du jeu pour favoriser la cohésion nationale ? Quelles conditions pour que le Cameroun vive un bilinguisme FR/EN respectueux de chacun ? La loi sur la nationalité, notamment l’interdiction de la double nationalité, est-elle favorable à la cohésion nationale ? La diaspora fait-elle partie de la communauté nationale ?"
	},
	{ 
		"id": 7,
		"titre": "Education / Enseignement supérieur / Formation professionnelle",
		"description": "Quel système éducatif pour les Camerounais ? Le système éducatif national forme les Camerounais dans quel but ? Le système éducatif camerounais est-il performant ? Que cache la tendance à l’émigration des étudiants Camerounais ? Quelle est la valeur du BAC camerounais ? Quelle place pour les langues nationales ? Les enseignants camerounais sont-ils heureux ? Le recrutement, la formation, le traitement et l’organisation de la carrière des enseignants sont-ils adaptés ? Le recrutement et la formation des élèves et étudiants sont-ils efficaces ? Les recrutements sur concours sont-ils équitables ? La recherche universitaire est-elle suffisamment encouragée et mise en valeur ? La coopération entre l’école/l’université et le secteur privé est-elle de nature à favoriser l’employabilité ?"
	},
	{ 
		"id": 8,
		"titre": "Jeunesse / Femmes / Personnes vulnérables",
		"description": "La croissance économique au Cameroun est-elle inclusive des jeunes, des femmes et des personnes vulnérables ? Ces groupes sociaux se sentent-elles prise en compte dans les politiques publiques ? Les programmes et projets en faveur de la jeunesse et des femmes sont-ils adaptés et efficaces ? La jeunesse formant l’essentiel de la population camerounaise et représentant dans certaines conditions un risque d’instabilité sociale, le pays s’est-il suffisamment organisé pour tirer profit du « dividende démographique » ?"
	},
	{ 
		"id": 9,
		"titre": "Innovation / Numérique / Technologies / Développement industriel",
		"description": "L’innovation est le maître-mot de toute société qui vise le progrès, notamment industriel. Le Cameroun est-il engagé dans cette dynamique ? L’environnement institutionnel favorise-t-il les inventions et découvertes ? Quelle place pour la recherche et développement ? Les Camerounais inventent-ils et découvrent-ils ? Comment identifier et valoriser les initiatives endogènes ? Que manque-t-il pour exploiter les innombrables opportunités du numérique ? Le Cameroun a-t-il vraiment envie de s’industrialiser ? Investit-il suffisamment dans la formation des ingénieurs ? Quelle politique de développement technologique et industriel ? "
	},
	{ 
		"id": 10,
		"titre": "Transports / Infrastructures de transports : route-rail-air-mer",
		"description": "Le système de transports au Cameroun est-il adapté au trafic et aux besoins ? Les infrastructures de transport (routes, aéroports, ports) sont-elles bien gérées ? Que révèlent du système de transports les accidents routiers et ferroviaires tragiques que le Cameroun a connus en 2016 ? Le Cameroun investit-il suffisamment pour développer et entretenir ses infrastructures de transport ? Quid des autoroutes ? Le transport aérien est-il à la hauteur des enjeux ? Quid du transport urbain ? Faudrait-il un métro ou un tramway à Yaoundé ou Douala ? Le permis de conduire camerounais est-il fiable ?"
	},
	{ 
		"id": 11,
		"titre": "Ethique / Lutte contre détournements et la corruption",
		"description": "Le Camerounais est-il honnête et intègre ? Le système de gouvernance au Camerounais est-il équitable ? Le service public est-il rendu à chacun de la même manière ? L’accès aux marchés publics, aux concours de l’Etat et aux postes de responsabilité se fait-il de manière transparente et équitable ? La fortune publique est-elle bien protégée contre les détournements de fonds publics ? Les mesures et sanctions contre la corruption et les détournements sont-elles à la hauteur des enjeux ? Le secteur privé est-il exemplaire en matière d’éthique et de gouvernance ?"
	},
	{ 
		"id": 12,
		"titre": "Elevage / Agriculture / Agroalimentaire",
		"description": "Le secteur agricole (+élevage) emploie l’essentiel de la population camerounaise, en particulier les femmes. Est-il suffisamment organisé pour générer de la valeur ? Le Cameroun peut-il être autosuffisant en produits agricoles ? Les bassins de production sont-ils suffisamment reliés aux zones de consommation et de commercialisation ? Quels appuis aux porteurs de projets et entrepreneurs agricoles ? Quelles ambitions du Cameroun pour le marché international, notamment nigérian ? Quelles places pour l’agriculture familiale et les grandes exploitations agroindustrielles ? Quelle place de l’agroalimentaire camerounais dans l’industrialisation ?"
	},
	{ 
		"id": 13,
		"titre": "Energie électrique / Energies renouvelables / Infrastructures énergétiques",
		"description": "Le Cameroun est-il sorti des délestages d’électricité ? Le modèle d’affermage d’électricité et d’eau est-il adapté ? Que faut-il pour que les besoins des Camerounais en eau et en énergie électrique soient satisfaits ? Comment couvrir les besoins en zones rurales ? Quel rôle pour les collectivités territoriales décentralisées ? Comment l’entrepreneuriat privé peut-il contribuer à satisfaire les besoins ? Comment soutenir les investissements individuels ?"
	},
	{ 
		"id": 14,
		"titre": "Réchauffement climatique / Développement durable / RSE / Entrepreneuriat social",
		"description": "Le réchauffement climatique impose au monde et au Cameroun de développer des stratégies d’adaptation et d’atténuation. Que peut envisager le Cameroun pour favoriser un développement durable ? Quelle stratégie nationale de développement durable, et de responsabilité sociétale des entreprises (RSE) ? Quel soutien aux initiatives d’entrepreneuriat social ? Comment contribuer à la stratégie continentale pour une croissance verte et inclusive ?"
	},
	{ 
		"id": 15,
		"titre": "Intégration CEMAC-CEEAC / Coopération internationale / Diplomatie",
		"description": "Comment le Cameroun envisage-t-il sa place en Afrique et la place de l’Afrique dans le monde ? Que pensent les Camerounais du panafricanisme qui a sous-tendu la fondation de l’Organisation de l’Unité Africaine en 1963 ? Quelle position en matière de libre circulation des Africains en Afrique, au sein de la CEMAC voire de la CEEAC ? Quel rôle au sein de l’UA ? Quelle stratégie régionale en Afrique centrale pour mettre avantage en valeur les ressources communes (notamment l’énergie et les bassins forestiers) mais aussi assurer la sécurité de tous ? Quelles relations avec les puissances continentales et internationales ? Quelle place pour la France ? Quelles relations avec les organisations internationales d’appui au développement ?"
	},
	{ 
		"id": 16,
		"titre": "Système économique et financier / Monnaie (FCFA) / Stratégie économique",
		"description": "Quel modèle économique pour le Cameroun ? Le Franc CFA est-elle la monnaie qu’il faut pour notre pays, faut-il en sortir ? La politique monétaire (actions de la BEAC sur les taux d’intérêt et la masse monétaire, régulation des banques commerciales). Plus largement, la politique économique, c’est-à-dire l’ensemble des politiques publiques destinées à générer la croissance et l’emploi, est-elle adaptée ? Les politiques d’endettement (bons de trésor, obligations, emprunts concessionnels, endettement intérieur, etc.), d’investissements publics, budgétaire (budgets-programmes) sont-elles adaptées ? Que manque-t-il pour rendre le système économique et financier camerounais plus performant ? Le Cameroun a-t-il suffisamment diversifié son économie et s’est-il suffisamment protégé du syndrome hollandais (malédiction des ressources naturelles) ?"
	},
	{ 
		"id": 17,
		"titre": "Santé / Infrastructures sanitaires / Accès aux soins",
		"description": "Qu’ont révélé les affaires Vanessa et Koumatéké ces dernières années du système sanitaire camerounais ? Que révèlent les grèves des médecins de ces derniers mois ? Les Camerounais ont-ils confiance en leur système hospitalier ? Le personnel hospitalier et les formations sanitaires au Cameroun ont-ils les moyens de prendre soin des Camerounais ?"
	}
];

//Liste des codes IRD dans l’entête.
var tabCodeRetourIRD = [
	"0000",  //status : "SUCCESS", Succès de la requête
	"0001",  //status : "SUCCESS", Objet métier ou identifiant inconnu 
	"0002"	 //status : "SUCCESS", Erreur de structuration JSON
];
