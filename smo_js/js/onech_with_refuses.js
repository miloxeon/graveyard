'use strict';

document.getElementById("onechannel_cancel_submit").onclick = function () {
	var lambda = parseFloat(document.getElementById("onechannel_cancel_orders").value);
	var t = parseFloat(document.getElementById("onechannel_cancel_time").value);
	var mu = 1.0 / t;

	document.getElementById("onechannel_cancel_intensity").innerHTML = mu + ' ед./мин.';
	var load = lambda * t;
	document.getElementById("onechannel_cancel_load").innerHTML = load + ' ед./мин.';
	var p_free = (mu / (lambda + mu));
	document.getElementById("onechannel_cancel_free").innerHTML = (p_free * 100.0) + ' %';
	var p_busy = 1.0 - p_free;
	document.getElementById("onechannel_cancel_busy").innerHTML = (p_busy * 100.0) + ' %';
	var width_r = p_free;
	document.getElementById("onechannel_cancel_width_r").innerHTML = width_r;
	var width_a = p_free * lambda;
	document.getElementById("onechannel_cancel_width_a").innerHTML = (width_a) + " ед./мин.";
	var idle = p_busy * t;
	document.getElementById("onechannel_cancel_idle").innerHTML = (idle) + " мин.";
	var avg_clients = load * p_free;
	document.getElementById("onechannel_cancel_clients").innerHTML = avg_clients + ' ед./мин.';
	var performance_nominal = mu;
	document.getElementById("onechannel_cancel_performance_nominal").innerHTML = performance_nominal + ' ед.';
	var performance = width_r / performance_nominal;
	document.getElementById("onechannel_cancel_performance").innerHTML = (performance * 100.0) + ' %';
};
