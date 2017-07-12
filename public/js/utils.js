/*
 * Copyright (c) 2016 - LINSIG
 */

/*
 * Construction du template pour afficher les statistiques d'un point de raccordement.
 * @prms <object> : information lié au PointRaccordement.
 * @Return buildTemplate <string>, html code
 * @Auteur : phendji
 */
function buildPopoverPRM(pr){
	//debug : console.log("pr : ",pr);
	var buildTemplate = "";
	var labelDipole = "";
	var labelStatCmp = "";
	var labelStatTrmt = "";

	var nbrePRM = pr.prmsLinked.length;
	var nbrePRMLinky = 0;
	var dictNbrePRMStatCmp = {};
	var dictNbrePRMStatTrmt = {};
	var idSIG = pr.idSIG;
	var codeGDO = pr.codeGDO;
	var nature = pr.nature;

	for(var i in  pr.prmsLinked) {
		if (typeof pr.prmsLinked[i] == "undefined")
			continue;
		if (typeof dictNbrePRMStatCmp[pr.prmsLinked[i]['statCmp']] != "undefined"){
			dictNbrePRMStatCmp[pr.prmsLinked[i]['statCmp']]++;
		}else{
			dictNbrePRMStatCmp[pr.prmsLinked[i]['statCmp']] = 1;
		}
		if (typeof dictNbrePRMStatTrmt[pr.prmsLinked[i]['statTrmt']] != "undefined"){
			dictNbrePRMStatTrmt[pr.prmsLinked[i]['statTrmt']]++;
		}else{
			dictNbrePRMStatTrmt[pr.prmsLinked[i]['statTrmt']] = 1;
		}
		
		if(pr.prmsLinked[i]['codeGDOLigneBTCommunicante'] != null){
			nbrePRMLinky++;
		}
	}

	for (elt in pr.linsigCouleurList) {
		labelDipole = labelDipole + "<p>"+pr.linsigCouleurList[elt]['codeGDOLigneBTCommunicante'] + " ("+ pr.linsigCouleurList[elt]['nb'] + ")</p>";
	}

	for (var key in dictNbrePRMStatTrmt) {
		labelStatTrmt = labelStatTrmt + "<p>"+key + " ("+ dictNbrePRMStatTrmt[key]+")</p>";
	}

	for (var key in dictNbrePRMStatCmp) {
		labelStatCmp = labelStatCmp + "<p>"+key + " ("+ dictNbrePRMStatCmp[key]+")</p>";
	}

	buildTemplate = "<div class='feature-info pr'>"+
	                    "<table class='table table-striped' cellspacing='0'>"+
	                     	"<thead>"+
	                         	"<tr>"+
	                                "<th colspan='2'>  <a onclick=moreInfoInExplorer('"+pr.typeObjet+"',"+idSIG+") style='cursor:pointer'> Point de raccordement <b>&#10159; </b> </a>"+
	                                "<a  onclick='closerPopup()' style='cursor:pointer; font-size:16px; right: 10px;position: absolute;top: 0px;'> x </a>  </th>"+
	                            "</tr>"+
	                        "</thead>"+
	                        "<tbody>"+
	                        	"<tr>"+
                        			"<td>Nature</td>"+
                        			"<td>"+nature+"</td>"+
                        		"</tr>"+
	                        	"<tr>"+
	                            	"<td> ID SIG </td>"+
	                            	"<td>"+valueIsNull2(idSIG)+"</td>"+
	                           	"</tr>"+
	                           	"<tr>"+
	                            	"<td> Code GDO </td>"+
	                            	"<td>"+valueIsNull2(codeGDO)+"</td>"+
	                           	"</tr>"+
	                            "<tr>"+
	                            	"<td> Nombre de PRM C5</td>"+
	                            	"<td>"+nbrePRM+"</td>"+
	                           	"</tr>"+
	                           	"<tr>"+
	                            	"<td> Nombre de PRM Linky</td>"+
	                            	"<td>"+nbrePRMLinky+"</td>"+
	                           	"</tr>"+
	                           	"<tr>"+
	                            	"<td> Ligne(s) BT Communicante </td>"+
	                            	"<td>"+labelDipole+"</td>"+
	                           	"</tr>"+
	                           "<tr>"+
	                            	"<td> Statut(s) de comparaison </td>"+
	                            	"<td>"+labelStatCmp+"</td>"+
	                           	"</tr>"+
	                           	"<tr>"+
	                            	"<td> Statut(s) de traitement </td>"+
	                            	"<td>"+labelStatTrmt+"</td>"+
	                           	"</tr>"+
	                        "</tbody>"+
	                   "</table>"+
	            	"</div>";
	return buildTemplate;
}

/*
 * Construction du template pour afficher les informations d'un tronconBT.
 * @troncon <array> : information du troncon.
 * @Return buildTemplate <string>, html code
 * @Auteur : phendji
 */
function buildPopoverTroncon(troncon){
	var buildTemplate = "<div class='feature-info troncon' style='margin-bottom:5px; font-size:10px; min-width: 273px;'>"+
	                        "<table class='table table-striped' cellspacing='0'>"+
	                         	"<thead>"+
			                        "<tr>"+
		                                "<th> <a onclick=moreInfoInExplorer('"+troncon.typeObjet+"',"+troncon.idSIG+") style='cursor:pointer'> TronconBT <b>&#10159; </b> </a></th>"+
		                                "<th> <a onclick=callAppCaraibe('"+troncon.typeObjet+"','"+troncon.codeGDO+"') style='cursor:pointer'> Caraïbe </a>"+
		                                "<a onclick='closerPopup()' style='cursor:pointer; font-size:16px; right: 10px;position: absolute;top: 0px;'> x </a>  </th>"+
		                            "</tr>"+
	                            "</thead>"+
	                            "<tbody>"+
	                                "<tr>"+
	                                	"<td>Nature</td>"+
	                                	"<td>"+troncon.nature+"</td>"+
	                               	"</tr>"+
	                               	"<tr>"+
	                                	"<td>ID SIG</td>"+
	                                	"<td>"+valueIsNull2(troncon.idSIG)+"</td>"+
	                               	"</tr>"+
	                                "<tr>"+
	                                	"<td>Code GDO</td>"+
	                                	"<td>"+valueIsNull2(troncon.codeGDO)+"</td>"+
	                               	"</tr>"+
									"</tbody>"+
	                        "</table>"+
                   		"</div>";
                   		
    return buildTemplate;
}

/*
 * Construction du template pour afficher les informations d'un PosteDistribution.
 * @posteDistribution <object> : information du PosteDistribution.
 * @Return buildTemplate <string>, html code
 * @Auteur : phendji
 */
function buildPopoverPosteDistribution(posteDist){
	var buildTemplate = "<div class='feature-info poste' style='margin-bottom:5px; font-size:10px; min-width: 273px;'>"+
	                        "<table class='table table-striped' cellspacing='0'>"+
	                         	"<thead>"+
			                     	"<tr>"+
		                                "<th> <a onclick=moreInfoInExplorer('"+posteDist.typeObjet+"',"+posteDist.idSIG+") style='cursor:pointer'> Poste de distribution <b>&#10159;</b> </a> </th>"+
		                                "<th> <a onclick=callAppCaraibe('"+posteDist.typeObjet+"','"+posteDist.codeGDO+"') style='cursor:pointer'> Caraïbe </a> "+
		                                "<a onclick='closerPopup()' style='cursor:pointer; font-size:16px; right: 10px;position: absolute;top: 0px;'> x </a> </th>"+
		                            "</tr>"+
	                            "</thead>"+
	                            "<tbody>"+
	                                "<tr>"+
	                                	"<td>Nature</td>"+
	                                	"<td>"+posteDist.tagSource+"</td>"+
	                               	"</tr>"+
	                               	"<tr>"+
	                                	"<td>ID SIG</td>"+
	                                	"<td>"+valueIsNull2(posteDist.idSIG)+"</td>"+
	                               	"</tr>"+
	                                "<tr>"+
	                                	"<td>Code GDO</td>"+
	                                	"<td>"+valueIsNull2(posteDist.codeGDO)+"</td>"+
	                               	"</tr>"+
									"</tbody>"+
	                        "</table>"+
                   		"</div>";
                   		
    return buildTemplate;
}

/* 
 * Construction du template pour afficher les données du prm en écarts.
 * @params <object> : information lié au prm.
 * @Return buildTemplate <string>, html code
 * @Auteur : phendji
 */
function buildPopoverPrmsEnEcart(prmsEnEcart){
	var tr;
	var prmEnEcart;
	var tmp
	var adresse;
	var app;
	var etg;
	var esc;
	var bat;

	for (var i = 0; i < prmsEnEcart.length; i++) {
		prmEnEcart = prmsEnEcart[i];
        app =  (buildAddress(prmEnEcart.appartementPrm)) ? (" APP "+prmEnEcart.appartementPrm): "";
        etg =  (buildAddress(prmEnEcart.etagePrm)) ? (" ETG "+prmEnEcart.etagePrm): "";
        esc =  (buildAddress(prmEnEcart.escalierPrm)) ? (" ESC "+prmEnEcart.escalierPrm): "";
        bat =  (buildAddress(prmEnEcart.batimentPrm)) ? (" BAT "+prmEnEcart.batimentPrm): "";

		adresse = app+etg+esc+bat+valueIsNull2(prmEnEcart.numeroVoiePrm)+" "+valueIsNull2(prmEnEcart.nomVoiePrm)+" "+valueIsNull2(prmEnEcart.inseePrm);

		tmp =	"<tr>"+
		        	"<td> <a onclick=moreInfoInExplorer('"+prmEnEcart.typeObjet+"',"+prmEnEcart.idPrm+") style='text-decoration:underline; cursor:pointer'>"+prmEnEcart.idPrm+"</a></td>"+
		        	"<td>"+valueIsNull2(prmEnEcart.idClient)+"</td>"+
		        	"<td>"+valueIsNull2(prmEnEcart.codeCentreClient)+"</td>"+
		        	"<td>"+valueIsNull2(prmEnEcart.refClient)+"</td>"+
		        	"<td>"+valueIsNull2(prmEnEcart.inseeClient)+"</td>"+
		        	"<td>"+valueIsNull2(prmEnEcart.typeClient)+"</td>"+
		        	"<td>"+valueIsNull2(prmEnEcart.statutClient)+"</td>"+
		        	"<td>"+valueIsNull2(prmEnEcart.codeGdoLigneBtRef)+"</td>"+
		        	"<td>"+valueIsNull2(prmEnEcart.nbClientTotal)+"</td>"+
		        	"<td>"+valueIsNull2(prmEnEcart.nbClientImportant)+"</td>"+
		        	"<td>"+valueIsNull2(prmEnEcart.nbxyeqiv)+"</td>"+
		        	"<td>"+valueIsNull2(prmEnEcart.ignx)+"</td>"+
		        	"<td>"+valueIsNull2(prmEnEcart.igny)+"</td>"+
		        	"<td>"+valueIsNull2(prmEnEcart.sigx)+"</td>"+
		        	"<td>"+valueIsNull2(prmEnEcart.sigy)+"</td>"+
		        	"<td>"+valueIsNull2(prmEnEcart.distanceSigign)+"</td>"+
		        	"<td>"+valueIsNull2(prmEnEcart.norcln)+"</td>"+
		        	"<td>"+valueIsNull2(prmEnEcart.typeloc)+"</td>"+
		        	"<td>"+valueIsNull2(prmEnEcart.adresseSge)+"</td>"+
		        	"<td>"+adresse+"</td>"+
		        	"<td>"+valueIsNull2(prmEnEcart.action)+"</td>"+
		       	"</tr>";

		if(typeof tr != "undefined"){
			tr = tmp+tr;
		}else{
			tr = tmp;
		}
	}

	var buildTemplate = "<div class='contener_feat_info'>"+
							"<div class='contener_head_info'>"+
								"<div>Nombre de prm en écart : "+prmsEnEcart.length+"</div>"+
								"<a onclick='closerPopup()' style='cursor:pointer; font-size:16px; right: 20px;position: absolute;top: 8px;'> x </a>"+
							"</div>"+
							"<div class='feature-info prms-ecart'>"+
			                    "<table class='table table-striped table-bordered' cellspacing='0' style='margin-bottom:0px'>"+
			                    	"<thead>"+
			                         	"<tr>"+
			                                "<th>ID_PRM</th>"+
			                                "<th>ID_CLIENT</th>"+
			                                "<th>CODE_GDO_CLT</th>"+
			                                "<th>REFERENCE_CLT</th>"+
			                                "<th>CODE_INSEE_CLT</th>"+
			                                "<th>TYPE_CLT</th>"+
			                                "<th>STATUT_CLT</th>"+
			                                "<th>CODE_GDO_LIGNE_BT</th>"+
			                                "<th>NB_CLTS_TOTAL</th>"+
			                                "<th>NB_CLTS_IMPORTANTS</th>"+
			                                "<th>NB_CLS_SUR_XY_IGN</th>"+
			                                "<th>X_IGN</th>"+
			                                "<th>Y_IGN</th>"+
			                                "<th>X_SIG</th>"+
			                                "<th>Y_SIG</th>"+
			                                "<th>DISTANCE_SIG_IGN</th>"+
			                                "<th>CODE_HEXACLE</th>"+
			                                "<th>TYPE_LOC</th>"+
			                                "<th>ADRESSE_SGE</th>"+
			                                "<th>ADRESSE</th>"+
			                                "<th>ACTION</th>"+
			                            "</tr>"+
			                        "</thead>"+
			                        "<tbody>"
			                        	+tr+
			                        "</tbody>"+
			                    "</table>"+
			                "<div>"+
	            	    "</div>";

	return buildTemplate;
}

function DrawChart(canvas, radius, lineWidth, arraySlices, label) {
    this._radius = radius;
    this._lineWidth = lineWidth; //px
    this._arraySlices = arraySlices;
    this._label = label;
    this._x_center =  canvas.width / 2;
    this._y_center = canvas.height / 2;
    this._context = canvas.getContext("2d");
    
    
    this.drawPie = function () {
    	
        var context = this._context;
        context.lineWidth = this._lineWidth;
        var radius = this._radius;
        var offset_radians =  -0.1 * Math.PI;
        var start_radians = 0;
        var counterClockwise = false;
        var self = this;
     
        this._arraySlices.forEach(function (slice) {
        	context.beginPath();
            context.fillStyle = slice.color;
           
            context.moveTo(self._x_center, self._y_center);
            var end_radians = start_radians+ (Math.PI * 2) * slice.percent / 100;
            context.arc(canvas.width / 2, canvas.height / 2, radius, start_radians, end_radians, counterClockwise);
            context.lineTo(self._x_center, self._y_center);
            context.fill();
            start_radians = end_radians;
            
        });
        
    }
    
    
    this.drawCircle = function () {
        var context = this._context;
        context.lineWidth = this._lineWidth;
        var radius = this._radius;
        var offset_radians =  -0.1 * Math.PI;
        var start_radians = offset_radians;
        var counterClockwise = true;
        var self = this;
        this._arraySlices.forEach(function (slice) {
            context.beginPath();
            context.strokeStyle = slice.color;
            var end_radians = start_radians - (Math.PI * 2) * slice.percent / 100;
            
            context.arc(self._x_center, self._y_center, radius, start_radians, end_radians, counterClockwise);
            context.stroke();
            start_radians = end_radians;
        });
    };



    this.render = function () {
        //this.drawCircle();
    	
    	this.drawPie();
   
    };

};

function createStyle(src, img) {
    return new ol.style.Style({
      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 0.96],
        src: src,
        img: img,
        imgSize: img ? [img.width, img.height] : undefined
      }))
    });
}

/*
 * Gestion de la résolution de la map en fonction du scale.
 * @params : 
 	- map <object> : map
 	- scale <decimal> : profondeur
 * @Return <decimal> resolution
 * @Auteur : abdel
 */
function getResolution(map, scale) {
	var view = map.getView();  
	var units = map.getView().getProjection().getUnits();
	var dpi = 25.4 / 0.28;
	var mpu = ol.proj.METERS_PER_UNIT[units];
	return resolution = scale / ( mpu * 39.37 * dpi )
}

// TODO : deplacer dans le fichier de config
document.getElementsByTagName("BODY")[0].onresize = function() {
	resizeMap();
    resizeNav();
}

/*
 * Redimensionnement de la map.
 * @Return void
 * @Auteur : abdel
 */  
function resizeMap(){
	if (document.getElementsByTagName("BODY")[0] === "undefined") {
		setTimeout(resizeMap, 300);
		return;
	}	
	var heightHeader = document.getElementsByTagName('header')[0].offsetHeight;
	var heightMap = document.getElementsByTagName("BODY")[0].offsetHeight - heightHeader;
	var mapDiv = document.getElementById('map');
	mapDiv.style.height = heightMap + "px";
}

/*
 * Redimentionner le bloc de navigation a chaque re dimentionnement de la page.
 * viewerDiv : target du bloc de navigation (src: nav/templates/home.html)
 * @Auteur : phendji
 */
function resizeNav(){
    var heightHeader = document.getElementsByTagName('header')[0].offsetHeight;
    var heightBody = document.getElementsByTagName("BODY")[0].offsetHeight - heightHeader;
    var viewerDiv = document.getElementById('viewer-bloc');
    var heightViewer = heightBody - 75;
    viewerDiv.style.height = heightViewer + "px"; 
}

// TODO : commenter
var highlightFeatures = {};
function highlightFeature(id, feature, nb, newStyle, oldStyle){
			
	var style = oldStyle
	if (nb === 0) {
		highlightFeatures[id] = undefined;
		feature.setStyle(style);
		return;
	}
	
	if((nb % 2) === 1)
		style = newStyle;
	nb = nb - 1;
	setTimeout(function() {
		feature.setStyle(style);
		highlightFeature(id, feature, nb, newStyle, oldStyle)
		}, 1000);
}

/*
 * Définir la position du popover au moment du click.
 * @element <target> : sur la popup(popover).
 * @Return placement <string>, top, left, bottom or right
 * @Auteur : phendji
 */
function dynamicPlacement(element) {
    var offset = $(element).offset();
    height = $(document).outerHeight();
    width = $(document).outerWidth();
    vert = 0.5 * height - offset.top;
    vertPlacement = vert > 0 ? 'bottom' : 'top';
    horiz = 0.5 * width - offset.left;
    horizPlacement = horiz > 0 ? 'right' : 'left';
    placement = Math.abs(horiz) > Math.abs(vert) ?  horizPlacement : vertPlacement;
    return placement;
}

/*
 * Check sur la valeur de la variable. Objectif ne pas afficher les valeurs null sur l'ihm
 * @params:
 *  - value <string>
 * @return <string>
 * @Auteur : phendji 
 */

function valueIsNull1(value){
    if (value)
        return ' - '+value;

    return ' ';
}

function valueIsNull2(value){
	if (value != "null"){
	    if (value || value == 0)
	        return value;

	    return ' ';
	}else{
		return ' ';
	}
}

function buildAddress(value){
	if (value != "null"){
	    if (value || value == 0)
	        return true;

	    return false;
	}else{
		return false;
	}
}

function valueIsNullAddress(value){
    if (value)
        return value;

    return ' ';
}


/*
 * Initialisation des options proposés par la librairie DataTable.
 */
labelSearch = "Filtre : ";
emptyEntrie = "0 element";
emptyTable =  "Aucune données disponible ...";
labelInfoTable =  "Total : _TOTAL_ element(s)";
sInfoFiltered =  "/ _MAX_";
sZeroRecords =  "Aucune donnée trouvée";
labelPaginate = { "sNext": "Suivant", "sPrevious": "Précédent" };
templateMenu = 'Afficher : '+
						'<span class="datatable-select custom-select">'+
				        	'<select>'+
						        '<option value="10">10</option>'+
						        '<option value="20">20</option>'+
						        '<option value="30">30</option>'+
						        '<option value="40">40</option>'+
						        '<option value="-1">toutes</option>'+
					        '</select>'+
					    '</span> '+
					    ' Lignes';
/*
 * Fonction d'initialisation.
 * L'appel de la fonction se fait(dans explorCtrl.js) au moment du clic sur le bouton #données attributaire
 * @return <void>
 * @Auteur : phendji 
 */
function initDataTablePoste(json){

	var dataTable = $('#tableListPosteDistribution').dataTable({
       	"oLanguage": {
        	"sSearch": labelSearch,
		    "oPaginate": labelPaginate,
	        "sLengthMenu":templateMenu,
	        "sInfoEmpty": emptyEntrie,
	        "sEmptyTable": emptyTable,
	        "sInfo": labelInfoTable,
	        "sInfoFiltered": sInfoFiltered,
	        "sZeroRecords": sZeroRecords
       	}
	});
	
	dataTable.fnClearTable();
	
	$.fn.dataTableExt.sErrMode = 'function';

	for (var i = 0; i < json.length; i++) {
		dataTable.fnAddData([
    		json[i].idSIG,
    		json[i].codeGDO,
    		json[i].nomPoste,
    		json[i].statut,
    		json[i].statutDepuis,
    		json[i].commentaire,
    		json[i].centre,
    		json[i].uniteExploitation,
    		json[i].ueBT
    	]);
	} 
}

function initDataTableLigneBT(json){

	var dataTable = $('#tableListLigneBT').dataTable({
  		"oLanguage": {
        	"sSearch": labelSearch,
		    "oPaginate": labelPaginate,
	        "sLengthMenu":templateMenu,
	        "sInfoEmpty": emptyEntrie,
	        "sEmptyTable": emptyTable,
	        "sInfo": labelInfoTable,
	        "sInfoFiltered": sInfoFiltered,
	        "sZeroRecords": sZeroRecords
       	}
  	});

  	dataTable.fnClearTable();
  	$.fn.dataTableExt.sErrMode = 'function';

	for (var i = 0; i < json.length; i++) {
		dataTable.fnAddData([
    		json[i].idSIG,
    		json[i].codeGDO,
    		json[i].nomPoste,
    		json[i].statut,
    		json[i].statutDepuis,
    		json[i].commentaire,
    		json[i].centre,
    		json[i].ueBT
    	]);
	}
}

function initDataTableDepartBT(json){

	var dataTable =	$('#tableListDepartBT').dataTable({
  		"oLanguage": {
        	"sSearch": labelSearch,
		    "oPaginate": labelPaginate,
	        "sLengthMenu":templateMenu,
	        "sInfoEmpty": emptyEntrie,
	        "sEmptyTable": emptyTable,
	        "sInfo": labelInfoTable,
	        "sInfoFiltered": sInfoFiltered,
	        "sZeroRecords": sZeroRecords
       	}
  	});

  	dataTable.fnClearTable();
  	$.fn.dataTableExt.sErrMode = 'function';

	for (var i = 0; i < json.length; i++) {
		dataTable.fnAddData([
    		json[i].idSIG,
    		json[i].codeGDO,
    		json[i].statut,
    		json[i].statutDepuis,
    		json[i].centre
    	]);
	}
}

function initDataTableTronconBT(json){

	var dataTable = $('#tableListTronconBT').dataTable({
  		"oLanguage": {
        	"sSearch": labelSearch,
		    "oPaginate": labelPaginate,
	        "sLengthMenu":templateMenu,
	        "sInfoEmpty": emptyEntrie,
	        "sEmptyTable": emptyTable,
	        "sInfo": labelInfoTable,
	        "sInfoFiltered": sInfoFiltered,
	        "sZeroRecords": sZeroRecords
       	}
  	});

  	dataTable.fnClearTable();
  	$.fn.dataTableExt.sErrMode = 'function';

	for (var i = 0; i < json.length; i++) {
		dataTable.fnAddData([
    		json[i].nature,
    		json[i].idSIG,
    		json[i].codeGDO,
    		json[i].statut,
    		json[i].statutDepuis,
    		json[i].dossierCreation,
    		json[i].dossierModification,
    		json[i].commentaire,
    		json[i].centre,
    		json[i].uniteExploitation
    	]);
	}
}

function initDataTableBranchementBT(json){

	var dataTable = $('#tableListBranchementBT').dataTable({
  		"oLanguage": {
        	"sSearch": labelSearch,
		    "oPaginate": labelPaginate,
	        "sLengthMenu":templateMenu,
	        "sInfoEmpty": emptyEntrie,
	        "sEmptyTable": emptyTable,
	        "sInfo": labelInfoTable,
	        "sInfoFiltered": sInfoFiltered,
	        "sZeroRecords": sZeroRecords
       	}
  	});

  	dataTable.fnClearTable();
  	$.fn.dataTableExt.sErrMode = 'function';

	for (var i = 0; i < json.length; i++) {
		dataTable.fnAddData([
    		json[i].idSIG,
    		json[i].statut,
    		json[i].statutDepuis,
    		json[i].modeRattachement,
    		json[i].codeDipoleRattachement,
    		json[i].distanceRattachement,
    		json[i].commentaire,
    		json[i].centre    		
    	]);
	}
}

function initDataTablePointBranchement(json){
	var dataTable = $('#tableListPointBranchement').dataTable({
  		"oLanguage": {
        	"sSearch": labelSearch,
		    "oPaginate": labelPaginate,
	        "sLengthMenu":templateMenu,
	        "sInfoEmpty": emptyEntrie,
	        "sEmptyTable": emptyTable,
	        "sInfo": labelInfoTable,
	        "sInfoFiltered": sInfoFiltered,
	        "sZeroRecords": sZeroRecords
       	}
  	});

  	dataTable.fnClearTable();
  	$.fn.dataTableExt.sErrMode = 'function';

	for (var i = 0; i < json.length; i++) {
		dataTable.fnAddData([
    		json[i].nature,
    		json[i].idSIG,
    		json[i].statut,
    		json[i].eBranchementBT,
    		json[i].centre    		
    	]);
	}
}

function initDataTablePRM(json){

	var dataTable = $('#tableListPRM').dataTable({
  		"oLanguage": {
        	"sSearch": labelSearch,
		    "oPaginate": labelPaginate,
	        "sLengthMenu":templateMenu,
	        "sInfoEmpty": emptyEntrie,
	        "sEmptyTable": emptyTable,
	        "sInfo": labelInfoTable,
	        "sInfoFiltered": sInfoFiltered,
	        "sZeroRecords": sZeroRecords
       	}
  	});

  	dataTable.fnClearTable();
  	$.fn.dataTableExt.sErrMode = 'function';

	for (var i = 0; i < json.length; i++) {
		dataTable.fnAddData([
    		json[i].idPrm,
    		json[i].codeGDOLigneBTRef,
    		json[i].codeGDOLigneBTRefID,
    		json[i].codeGDOLigneBTCommunicante,
    		json[i].codeGDOLigneBTCommunicaID,    		
    		json[i].dateRattachemCommunicante,    		
    		json[i].phaseRattachement,    		
    		json[i].dateModificationPhase,    		
    		json[i].statCmp,    		
    		json[i].dateStatCmp,    		
    		json[i].statTrmt,    		
    		json[i].dateStatTrmt,    		
    		json[i].consoClientCourantBT,    		
    		json[i].consoClientImportantBT,    		
    		json[i].branchProvisoire,    		
    		json[i].etatPrm,    		
    		json[i].typePrm,    		
    		json[i].codeInsee,    		
    		json[i].codePostal,    		
    		json[i].nomVoie,    		
    		json[i].numeroVoie,    		
    		json[i].batiment,    		
    		json[i].etage,    		
    		json[i].appartement,    		
    		json[i].escalier,
    		json[i].dateAdresse
    	]);
	}
}

function initDataTableClientBT(json){
	
	var dataTable = 	$('#tableListClientBT').dataTable({
  		"oLanguage": {
        	"sSearch": labelSearch,
		    "oPaginate": labelPaginate,
	        "sLengthMenu":templateMenu,
	        "sInfoEmpty": emptyEntrie,
	        "sEmptyTable": emptyTable,
	        "sInfo": labelInfoTable,
	        "sInfoFiltered": sInfoFiltered,
	        "sZeroRecords": sZeroRecords
       	}
  	});

  	dataTable.fnClearTable();
  	$.fn.dataTableExt.sErrMode = 'function';

	for (var i = 0; i < json.length; i++) {
		dataTable.fnAddData([
    		json[i].id,
    		json[i].prmSIG
    	]);
	}
}

/*
 * Effectue une animation flash sur le feature 
 *  @params:
 *  - feature <feature>
 * @return <void>
 */

function flash(feature) {
	var duration = 5000;
    var start = new Date().getTime();
    var listenerKey;

    function animate(event) {
      var vectorContext = event.vectorContext;
      var frameState = event.frameState;
      var flashGeom = feature.getGeometry().clone();
      var elapsed = frameState.time - start;
      var elapsedRatio = elapsed / duration;
      // radius will be 5 at start and 30 at end.
      var radius = ol.easing.easeOut(elapsedRatio) * 25 + 5;
      var opacity = ol.easing.easeOut(1 - elapsedRatio);

      var style = new ol.style.Style({
        image: new ol.style.Circle({
          radius: radius,
          snapToPixel: false,
          stroke: new ol.style.Stroke({
            color: 'rgba(255, 0, 0, ' + opacity + ')',
            width: 0.25 + opacity
          })
        })
      });

      vectorContext.setStyle(style);
      vectorContext.drawGeometry(flashGeom);
      if (elapsed > duration) {
        ol.Observable.unByKey(listenerKey);
        return;
      }
      // tell OL3 to continue postcompose animation
      map.render();
    }
    listenerKey = map.on('postcompose', animate);
  }

// model tree pour afficher les prm non rattachés. dodo
tabTreeNA = 
	[	
		{	
			"libelle": "POSTE",
			"info":"NA",
			"keySearch":"",
			'children':	[
				{
					"libelle": "DIPOLE SOURCE",
					"info":"NA",
					"keySearch":"",
					'children':	[
						{
							"libelle": "DEPART BT",
							"info":"NA",
							"keySearch":"",
							'children':	[
								{
									"libelle": "TRONCON BT",
									"info":"NA",
									"keySearch":"",
									'children':	[]
								}
							]
						}
					]
				}
			]
		}
	];

itemObjectPRNA = {
    "libelle": "",
    "info":"NA",
    "keySearch":"",
    'children': []
};

tabPrefixProfilUser = [
	"LSG_ADMIN", "LSG_MAJ"
];

/*
 * @Params : 
 * 	- pTypeGeo : type de géométrie
 *  - pCodeColor : le code couleur a appliquer au style
 *  - pOther : troisième paramètre pour des configurations spécifiques en fonction du style
 * @Auteur : phendji
 */
function getStyleFeature(pTypeGeo, pCodeColor, pOther){

	var style;
	if(pTypeGeo == "squareEcart"){
		style =  new ol.style.Style({
		    image: new ol.style.RegularShape({
		        stroke: new ol.style.Stroke({
		    		color: pCodeColor,
		    		width: 2
		    	}),
		      	points: 4,
		      	radius: 10,
		      	angle: Math.PI / 4
		    })
	   });
	}

	if(pTypeGeo == "squareEcartNonVisible"){
		style =  new ol.style.Style({
		    image: new ol.style.RegularShape({
		        stroke: new ol.style.Stroke({
		    		color: pCodeColor,
		    		width: 2
		    	}),
		      	points: 4,
		      	radius: 10,
		      	angle: Math.PI / 4
		    })
	   });
	}

	if(pTypeGeo == "lineEcart"){
		style = new ol.style.Style({
	        stroke: new ol.style.Stroke({
	            color: pCodeColor,
	            width: 2
	        })
	    });
	}

	if(pTypeGeo == "iconStyle"){
		style = new ol.style.Style({
	        image: new ol.style.Icon(({
	            color: pCodeColor,
	            src: 'assets/images/arrow.png',
	            anchor: [0.75, 0.5],
	            rotateWithView: false,
	            rotation: -pOther
	        }))
	    });
	}

	if(pTypeGeo == "iconStyleNonVisible"){
		style = new ol.style.Style({
	        image: new ol.style.Icon(({
	            color: pCodeColor,
	            src: 'assets/images/arrow-transparent.png',
	            anchor: [0.75, 0.5],
	            rotateWithView: false,
	            rotation: -pOther
	        }))
	    });
	}

	if(pTypeGeo == "multiLineStyleNonVisible"){

		style = new ol.style.Style({
		  	stroke: new ol.style.Stroke({
		      	color: pCodeColor,
		      	width: 2
		  	})
		});
	}

	if(pTypeGeo == "pointStyleNonVisible"){
		style = new ol.style.Style({
			image: new ol.style.Circle({
			    radius: 4,
			    stroke: new ol.style.Stroke({
			    	color: pCodeColor, 
			    	width: 1
			    }),
				fill: new ol.style.Fill({
			    	color: pCodeColor
			  	})
			})
		});
	}

	if(pTypeGeo == "pointStyle"){
		var diametre = pOther;
		style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 15,
                stroke: new ol.style.Stroke({
                    color: pCodeColor, 
                    width: diametre
                }),
                fill: null
            })
        });
	}

	if(pTypeGeo == "symbologieParticuliereStyle"){
		style = new ol.style.Style({
	        image: new ol.style.Icon({
	          	anchor: [0.5, 0.5],
	          	size: [52, 52],
	          	opacity: 1,
	          	scale: 0.25,
	          	src: 'assets/images/tagcodedipolenull.png'
	        })
	    });
	}

	if(pTypeGeo == "pointStyleDefault"){
		style = new ol.style.Style({
		  	image: new ol.style.Circle({
			    radius: 4,
			    stroke: new ol.style.Stroke({
			    	color: pCodeColor, 
			    	width: 1
			    }),
				fill: new ol.style.Fill({
			    	color: pOther
			  	})
			})
		});
	}

	if(pTypeGeo == "pointStyleSIGLINKY"){
		style = new ol.style.Style({
		  	image: new ol.style.Circle({
			    radius: 6,
			    stroke: new ol.style.Stroke({
			    	color: pCodeColor, 
			    	width: 1
			    }),
				  fill: new ol.style.Fill({
			    	color: pOther
			  	})
			})
		});
    }

    if(pTypeGeo == "newStyle"){
    	style = new ol.style.Style({
		    stroke: new ol.style.Stroke({
		      	color: pCodeColor,
		     	width: 4
		    }),
		    image: new ol.style.Circle({
		      	radius: 5.5,
		      	stroke: new ol.style.Stroke({
		        	color: pCodeColor,
			        width: 4
			    })
		    })
		});
    }
	return style;
}
