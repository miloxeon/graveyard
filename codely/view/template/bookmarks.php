<?php
	$user = get_user_by_id($link, $_GET['id']);
	$name = $user['name_user'];
	$surname = $user['surname_user'];
	$email = $user['login_user'];
	$birthdate = $user['birthdate_user'];
	$workplace = $user['work_user'];
	$studyplace = $user['study_user'];
	$phone = $user['phone_user'];
	$about = $user['about_user'];
	$photo_link = $user['photo_user'];
?>

<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<link rel="icon" href="view/img/favicon.ico">
	<title><?=$name?> <?=$surname?> &ndash; Codely</title>
	<link href="view/css/bootstrap.min.css" rel="stylesheet">
	<link href="view/css/ie10-viewport-bug-workaround.css" rel="stylesheet">
	<link href="view/css/main-page.css" rel="stylesheet">
	<link href="view/css/user-space.css" rel="stylesheet">
</head>
<body class="body body--night">
	<header class="main-header">
		<?php include("view/template/header.php") ?>
		<div class="main-header__border"></div>
	</header>

	<main class="main">
		<div class="container container--left">
			<article class="article">
				Александр ИЛьяшенко
			</article>
			<article class="article">
				Александр ИЛьяшенко
			</article>
			<article class="article">
				Александр ИЛьяшенко
			</article>
			<article class="article">
				Александр ИЛьяшенко
			</article>
		</div>
		<div class="container container--right">
			<article class="article">
				Александр ИЛьяшенко
			</article>
			<article class="article">
				Александр ИЛьяшенко
			</article>
			<article class="article">
				Александр ИЛьяшенко
			</article>
			<article class="article">
				Александр ИЛьяшенко
			</article>
		</div>
	</main>
	<footer class="main-footer">
		<?php include('view/template/footer.php') ?>
	</footer>
	<script type="text/javascript" src="view/js/daydream.js"></script>
</body>
</html>
