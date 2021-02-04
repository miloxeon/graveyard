<!DOCTYPE html>
<html lang="ru">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
		<link rel="icon" href="view/img/favicon.ico">

		<title>Вход</title>
		<link href="view/css/bootstrap.min.css" rel="stylesheet">
		<!-- <link href="view/css/semantic.min.css" rel="stylesheet"> -->
		<link href="view/css/ie10-viewport-bug-workaround.css" rel="stylesheet">
		<link href="view/css/fields.css" rel="stylesheet">
		<!-- <link href="view/css/common.css" rel="stylesheet"> -->
		<link href="view/css/main-page.css" rel="stylesheet">
	</head>
	<body class="body body--night">
		<header class="main-header">
			<?php include("view/template/header.php") ?>
			<div class="main-header__border"></div>
		</header>
		<main class="main">
			<div class="container">
				<div class="article article--transparent">
					<a class="emphasis-link" href="index.php">
						<i class="glyphicon glyphicon-menu-left"></i><span class="sign"></span>
					</a>
				</div>
				<div class="article">
					<h4>Вход</h4>
					<form class="form-horizontal" action="index.php?action=login" method="POST">
						<div class="control-group">
							<label class="control-label" for="email">E-mail</label>
							<div class="controls">
								<input type="text" id="email" name="login" placeholder="Введите адрес электронной почты" class="form-control" required autofocus>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="password">Пароль</label>
							<div class="controls">
								<input type="password" id="password" name="password" placeholder="Введите пароль" class="form-control" required>
							</div>
						</div>
						<div class="control-group">
							<button type="submit" class="new-article__button btn btn-primary sand-button">
								Войти
							</button>
						</div>
					</form>
				</div>
			</div>
		</main>
		<footer class="main-footer">
			<?php require_once('view/template/footer.php'); ?> 
		</footer>
		<script type="text/javascript" src="view/js/daydream.js"></script>
	</body>
</html>

						
						
						
						
