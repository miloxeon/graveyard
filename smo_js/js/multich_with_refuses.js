'use strict';

function fact(n) {
	return n === 0 ? 1 : n * fact(n - 1);
}

document.getElementById('multich_cancel_submit').onclick = function () {

	var n = parseFloat(document.getElementById('multich_cancel_n').value);
	var lambda = parseFloat(document.getElementById('multich_cancel_lambda').value);
	var t = parseFloat(document.getElementById('multich_cancel_t').value);

	var mu = 1.0 / t;
	document.getElementById('multich_cancel_mu').innerHTML = mu;

	var p = lambda * t;
	document.getElementById('multich_cancel_p').innerHTML = p;


	var _footer = 1.0;
	for ( var i = 0; i <= n; i++ ) {
		_footer += Math.pow(p, i) / fact(i);
	}
	var p0 = 1.0 / _footer;
	document.getElementById('multich_cancel_p0').innerHTML = (p0 * 100.0).toString().slice(0, 5) + ' %';

	var pn = document.getElementById('multich_cancel_pn');
	pn.innerHTML = '';
	for ( var i = 1; i < n; i++ ) {
		pn.innerHTML += i + 'канал(ов): ' + ((Math.pow(p, i) / fact(i)) * p0 * 100.0).toString().slice(0, 5) + ' %<br>';
	}

	var p_otk = (Math.pow(p, n) / fact(n)) * p0;
	document.getElementById('multich_cancel_p_otk').innerHTML = (p_otk * 100.0).toString().slice(0, 5) + ' %';

	document.getElementById('multich_cancel_p_obs').innerHTML = '100 %';

	var p_obs = 1.0 - p_otk;

	var q = p_obs;
	document.getElementById('multich_cancel_q').innerHTML = q;

	var n_z = p * p_obs;
	document.getElementById('multich_cancel_n_z').innerHTML = n_z;

	var n_pr = n - n_z;
	document.getElementById('multich_cancel_n_pr').innerHTML = n_pr;

	var k_z = n_z / n;
	document.getElementById('multich_cancel_k_z').innerHTML = k_z * 100.0 + ' %';

	var a = p_obs * lambda;
	document.getElementById('multich_cancel_a').innerHTML = a + ' ед./мин.';

	var t_pr = p_otk * t;
	document.getElementById('multich_cancel_t_pr').innerHTML = t_pr + ' мин.';

	var t_p_k = t * ((1.0 - p_otk) / (p_otk));
	document.getElementById('multich_cancel_t_p_k').innerHTML = t_p_k + ' мин.';

	var l_obs = p * q;
	document.getElementById('multich_cancel_l_obs').innerHTML = l_obs + ' ед.';

	var t_smo = q / mu;
	document.getElementById('multich_cancel_t_smo').innerHTML = t_smo + ' мин.';

	var refused_per_hour = lambda * p * p0;
	document.getElementById('multich_cancel_refused_per_hour').innerHTML = refused_per_hour;

	var perf_nominal = n / t;
	document.getElementById('multich_cancel_perf_nominal').innerHTML = perf_nominal + ' ед./мин.';

	var perf_fact = a / perf_nominal;
	document.getElementById('multich_cancel_perf_fact').innerHTML = Math.ceil((perf_fact * 100.0)) + ' %';
}
