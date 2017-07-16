/*
 * Copyright (c) 2016 - LINSIG
 */

/*
 * Gestion de la résolution de la map en fonction du scale.
 * @params : 
 	- map <object> : map
 	- scale <decimal> : profondeur
 * @Return <decimal> resolution
 * @Auteur : abdel
 */
function splitUrlLocation(pUrl) {
	var separator = '/';
	return pUrl.split(separator);
}