'use strict';

document.getElementById("onechannel_infinite_submit").onclick = function () {
	var lambda = document.getElementById("onechannel_infinite_intensity").value;
	var t = document.getElementById("onechannel_infinite_time").value;
	var m = document.getElementById("onechannel_infinite_number").value;
	if ( lambda * t >= 1.0 ) {
		document.getElementById("onechannel_infinite_table").innerHTML = 'Очередь будет расти бесконечно.';
	} else {
		var intensity = 1.0 / t;
		document.getElementById("onechannel_infinite_obs").innerHTML = intensity + ' ед./мин.';
		var load = lambda * t;
		document.getElementById("onechannel_infinite_load").innerHTML = load + ' ед./мин.';
		var p_free = 1.0 - load;
		document.getElementById("onechannel_infinite_free").innerHTML = p_free * 100.0 + ' %';
		var pred_ver_field = document.getElementById("onechannel_infinite_queue");
		pred_ver_field.innerHTML = '';
		for ( var i = 1; i <= m; i++ ) {
			var value = ((Math.pow(load, i) * (1.0 - load)) * 100.0).toString();
			pred_ver_field.innerHTML += (i + ' заявка(и): ' + value.slice(0, 5) + ' %<br>');
		}
		document.getElementById("onechannel_infinite_busy").innerHTML = '0 %';
		document.getElementById("onechannel_infinite_width_r").innerHTML = '100 %';
		var abs = lambda;
		document.getElementById("onechannel_infinite_width_a").innerHTML = abs + ' заявок/мин.';
		var long_queque = Math.pow(load, 2) / (1.0 - load);
		document.getElementById("onechannel_infinite_idle").innerHTML = long_queque;
		var t_prostoya = long_queque / abs;
		document.getElementById("onechannel_infinite_idlel").innerHTML = t_prostoya + ' мин.';
		var obs_zayavki = load;
		document.getElementById("onechannel_infinite_clients").innerHTML = obs_zayavki;
		var system_zayavki = load / (1.0 - load);
		document.getElementById("onechannel_infinite_idle_total").innerHTML = system_zayavki + ' ед.';
		var t_prebiv = system_zayavki / abs;
		document.getElementById("onechannel_infinite_idlel_total").innerHTML = t_prebiv + ' ед.';
		var nom = 1.0 / load;
		document.getElementById("onechannel_infinite_performance_nominal").innerHTML = nom + ' заявок/мин.';	
		var fact = 1.0 / nom;
		document.getElementById("onechannel_infinite_performance").innerHTML = fact * 100.0 + ' %';	
	}
};
