'use strict';

document.getElementById("onechannel_limit_submit").onclick = function () {
	var lambda = document.getElementById("onechannel_limit_intensity").value;
	var t = document.getElementById("onechannel_limit_time").value;
	var m = parseFloat(document.getElementById("onechannel_limit_number").value);
	if ( lambda * t >= 1.0 ) {
		document.getElementById("onechannel_limit_table").innerHTML = 'Очередь будет расти бесконечно.';
	} else {
		var intensity = 1.0 / t;
		document.getElementById("onechannel_limit_obs").innerHTML = intensity + ' ед./мин.';
		var load = lambda * t;
		document.getElementById("onechannel_limit_load").innerHTML = load + ' ед./мин.';
		var p_free = (1.0 - load) / (1.0 - Math.pow(load, m + 2));
		document.getElementById("onechannel_limit_free").innerHTML = p_free * 100.0 + ' %';
		var pred_ver_field = document.getElementById("onechannel_limit_queue");
		pred_ver_field.innerHTML = '';
		for ( var i = 1; i <= m; i++ ) {
			var value = (Math.pow(load, i) * load * 100.0).toString();
			pred_ver_field.innerHTML += (i + ' заявка(и): ' + value.slice(0, 5) + ' %<br>');
		}
		var p_busy = (Math.pow(load, parseFloat(m) + 1) * p_free);
		console.log(p_busy, load, p_free, m);
		document.getElementById("onechannel_limit_busy").innerHTML = (p_busy * 100.0) + ' %';
		var width_r = (1.0 - p_busy);
		document.getElementById("onechannel_limit_width_r").innerHTML = (width_r * 100.0) + ' %';
		var width_a = width_r * lambda;
		document.getElementById("onechannel_limit_width_a").innerHTML = width_a  + ' заявок/мин.';
		var long_queque = Math.pow(load, 2) * p_free * ((1.0 - Math.pow(load, m) * (m - m * load + 1)) / Math.pow(1 - load, 2));
		document.getElementById("onechannel_limit_idle").innerHTML = long_queque + ' ед.';
		var t_prostoya = long_queque / width_a;
		document.getElementById("onechannel_limit_idlel").innerHTML = t_prostoya + ' мин.';
		var obs_zayavki = load * width_r;
		document.getElementById("onechannel_limit_clients").innerHTML = obs_zayavki;
		var k = long_queque / parseFloat(m);
		document.getElementById("onechannel_limit_koef").innerHTML = k;
		var system_zayavki = long_queque + obs_zayavki;
		document.getElementById("onechannel_limit_idle_total").innerHTML = system_zayavki + ' ед.';
		var t_prebiv = t_prostoya + parseFloat(t);
		document.getElementById("onechannel_limit_idlel_total").innerHTML = t_prebiv + ' мин.';
		var nom = 1.0 / load;
		document.getElementById("onechannel_limit_performance_nominal").innerHTML = nom + ' заявок/мин.';	
		var fact = width_a / nom;
		document.getElementById("onechannel_limit_performance").innerHTML = fact * 100.0 + ' %';	
	}
};
