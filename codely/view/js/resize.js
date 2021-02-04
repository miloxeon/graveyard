$(document).ready(function () {
	resizeDiv();
});

window.onresize = function (event) {
	resizeDiv();
}

function resizeDiv() {
	vph = $(window).height()
	$(".page").css({"height": vph + "px"})
}