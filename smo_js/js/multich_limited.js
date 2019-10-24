'use strict';

function fact(n) {
	return n === 0 ? 1 : n * fact(n - 1);
}

document.getElementById('multich_limit_submit').onclick = function () {

	var n = parseFloat(document.getElementById('multich_limit_n').value);
	var m = parseFloat(document.getElementById('multich_limit_m').value);
	var lambda = parseFloat(document.getElementById('multich_limit_lambda').value);
	var t = parseFloat(document.getElementById('multich_limit_t').value);

	var mu = 1.0 / t;
	document.getElementById('multich_limit_mu').innerHTML = mu;

	var p = lambda * t;
	document.getElementById('multich_limit_p').innerHTML = p;


	var _footer = 1.0;
	for ( var i = 0; i <= n; i++ ) {
		_footer += Math.pow(p, i) / fact(i);
	}
	_footer += (Math.pow(p, n + 1) / (fact(n) * (n - p))) * (1.0 - Math.pow(p / n, m));
	var p0 = 1.0 / _footer;
	document.getElementById('multich_limit_p0').innerHTML = (p0 * 100.0).toString().slice(0, 5) + ' %';

	var pn = document.getElementById('multich_limit_pn');
	pn.innerHTML = '';
	for ( var i = 1; i <= n; i++ ) {
		pn.innerHTML += i + 'канал(ов): ' + ((Math.pow(p, i) / fact(i)) * p0 * 100.0).toString().slice(0, 5) + ' %<br>';
	}

	var p_otk = (Math.pow(p, n + m) / fact(n) * Math.pow(n, m)) * p0;
	document.getElementById('multich_limit_p_otk').innerHTML = (p_otk * 100.0).toString().slice(0, 5) + ' %';

	document.getElementById('multich_limit_p_obs').innerHTML = '100 %';

	var p_obs = 1.0 - p_otk;

	var q = p_obs;
	document.getElementById('multich_limit_q').innerHTML = q;

	var n_z = p * p_obs;
	document.getElementById('multich_limit_n_z').innerHTML = n_z;

	var n_pr = n - n_z;
	document.getElementById('multich_limit_n_pr').innerHTML = n_pr;

	var k_z = n_z / n;
	document.getElementById('multich_limit_k_z').innerHTML = k_z * 100.0 + ' %';

	var a = p_obs * lambda;
	document.getElementById('multich_limit_a').innerHTML = a + ' ед./мин.';

	var t_pr = p_otk * t;
	document.getElementById('multich_limit_t_pr').innerHTML = t_pr + ' мин.';

	var t_p_k = t * ((1.0 - p_otk) / (p_otk));
	document.getElementById('multich_limit_t_p_k').innerHTML = t_p_k + ' мин.';

	var p_och = ((Math.pow(p, n) * (1.0 - Math.pow(p / n, m))) / (fact(n) * (1.0 - p / n))) * p0;
	document.getElementById('multich_limit_p_och').innerHTML = (p_och * 100.0).toString().slice(0, 5) + ' %';

	var p_ots_och = 1.0 - p_och;
	document.getElementById('multich_limit_p_ots_och').innerHTML = (p_ots_och * 100.0).toString().slice(0, 5) + ' %';

	var l_och = (Math.pow(p, n + 1) / (n * fact(n))) * (((1.0 - Math.pow(p / n, m)) * (m + 1.0 - (m * p) / n)) / Math.pow(1.0 - (p / n), 2)) * (p0);
	document.getElementById('multich_limit_l_och').innerHTML = l_och;

	var t_och = l_och / a;
	document.getElementById('multich_limit_t_och').innerHTML = t_och + ' мин.';

	var l_obs = p * q;
	document.getElementById('multich_limit_l_obs').innerHTML = l_obs + ' ед.';

	var l_smo = l_och + l_obs;
	document.getElementById('multich_limit_l_smo').innerHTML = l_smo + ' ед.';

	var t_smo = l_smo / a;
	document.getElementById('multich_limit_t_smo').innerHTML = t_smo + ' мин.';

	var perf_nominal = n / t;
	document.getElementById('multich_limit_perf_nominal').innerHTML = perf_nominal + ' ед./мин.';

	var perf_fact = a / perf_nominal;
	document.getElementById('multich_limit_perf_fact').innerHTML = Math.ceil((perf_fact * 100.0)) + ' %';
}
