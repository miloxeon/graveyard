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

	$fallback = isset($_GET['fallback']) ? $_GET['fallback'] : "index.php";
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
	<!-- <link href="view/css/semantic.min.css" rel="stylesheet"> -->
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
			<img class="user-space-avatar" src="<?=$photo_link ?>" width="250" height="250">
			<h1 class="user-space-nickname"><?=$name?> <?=$surname?></h1>
			<?php if (isset($_SESSION['user'])): ?>
				<?php if($_GET['id'] != $_SESSION['user']): ?>
					<?php if(!check_if_fave_author($link, $_SESSION['user'], $_GET['id'])): ?>
						<a class="add-to-list" href="index.php?action=fave&id_author=<?=$_GET['id']?>&fallback=<?=$fallback?>">Добавить в избранное</a>
					<?php else: ?>
						<a class="add-to-list" href="index.php?action=fave&id_author=<?=$_GET['id']?>&fallback=<?=$fallback?>">Убрать из избранного</a>
					<?php endif ?>

					<?php if(!check_if_blacklisted($link, $_SESSION['user'], $_GET['id'])): ?>
						<a class="add-to-list" href="index.php?action=blacklist&id=<?=$_GET['id']?>">Добавить в черный список</a>
					<?php else: ?>
						<a class="add-to-list" href="index.php?action=blacklist&id=<?=$_GET['id']?>">Убрать из черного списка</a>
					<?php endif ?>
				<?php else: ?>
					<a class="add-to-list" href="index.php?action=edit-user"><i class="glyphicon glyphicon-cog pencil-color edit-list"></i>Редактировать</a>
				<?php endif ?>
			<?php endif ?>
		</div>
		<div class="container container--right">
			<div class="article article-est" style="text-align: left;">
				<p>
					<a>
						<?=get_user_by_id($link, $_GET["id"])["login_user"] ?>
					</a>
				</p>
				<p>
					<?php
						if ($birthdate == "" || $birthdate == "0000-00-00") {
							echo "Дата рождения не указана";
						} else {
							echo 'Дата рождения: '.$birthdate;
						}
					?>
				</p>
				<p>
					<?php
						if ($workplace == "") {
							echo "Место работы не указано";
						} else {
							echo 'Место работы: '.$workplace;
						}
					?>
				</p>
				<p>
					<?php
						if ($studyplace == "") {
							echo "Место учебы не указано";
						} else {
							echo 'Место учебы: '.$studyplace;
						}
					?>
				</p>
				<p>
					<?php
						if ($phone == "") {
							echo "Номер телефона не указан";
						} else {
							echo 'Номер телефона: '.'<a class="user-phone user-field" href="tel:'.$phone.'">'.$phone.'</a>';
						}
					?>
				</p>
				<p>
					Комментариев: 
					<?=count_comments($link, $_GET["id"]) ?>
				</p>
				<p>
					Рейтинг:
					<?=get_rating($link, $_GET["id"]) ?>
				</p>
				<p>
					Обо мне:
					<?=$about ?>
				</p>
			</div>
		</div>
	</main>
	<footer class="main-footer">
		<?php include('view/template/footer.php') ?>
	</footer>
	<script type="text/javascript" src="view/js/daydream.js"></script>
</body>
</html>
