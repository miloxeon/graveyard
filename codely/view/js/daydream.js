var time = new Date().getHours();
var body = document.querySelector(".body");

function removeClass(obj, cls) {
	var classes = obj.className.split(' ');
	for (var i = 0; i < classes.length; i++) {
		if (classes[i] == cls) {
			classes.splice(i, 1);
			i--;
		}
	}
	obj.className = classes.join(' ');
}

removeClass(body, "body--morning");
removeClass(body, "body--day");
removeClass(body, "body--evening");
removeClass(body, "body--night");

if (time >= 8 && time <= 12) {
	// morning
	body.className += " body--morning";

} else if (time > 12 && time <= 16) {
	// day
	body.className += " body--day";

} else if (time > 16 && time <= 20) {
	// evening
	body.className += " body--evening";

} else if (time > 20 || time < 8) {
	// night
	body.className += " body--night";
}
