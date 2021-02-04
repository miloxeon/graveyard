<!DOCTYPE html>
<html lang="ru">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
		<link rel="icon" href="view/img/favicon.ico">

		<title>Редактирование</title>

		<link href="view/css/bootstrap.min.css" rel="stylesheet">
		<link href="view/css/ie10-viewport-bug-workaround.css" rel="stylesheet">
		<link href="view/css/fields.css" rel="stylesheet">
		<link href="view/css/common.css" rel="stylesheet">
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
					<a class="emphasis-link" href="index.php?action=user-space&id=<?=$user['id_user']?>">
						<i class="glyphicon glyphicon-menu-left"></i><span class="sign"></span>
					</a>
				</div>
				<div class="article">
					<h4>Редактировать личные данные</h4>
					<form class="form-horizontal" action="index.php?action=edit-user&id=<?=$user['id_user']?>" method="POST">
						<div class="control-group">
							<label class="control-label" for="username">Имя</label>
							<div class="controls">
								<input type="text" id="username" name="name" placeholder="Введите имя" value="<?=$user['name_user']?>" class="form-control" required autofocus>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label"  for="username">Фамилия</label>
							<div class="controls">
								<input type="text" id="username" name="surname" placeholder="Введите фамилию" value="<?=$user['surname_user']?>" class="form-control" required>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="email">E-mail</label>
							<div class="controls">
								<input type="email" id="email" name="login" placeholder="Введите адрес электронной почты" value="<?=$user['login_user']?>" class="form-control" required>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="date">Дата рождения</label>
							<div class="controls">
								<input type="date" id="date" name="birthdate" value="<?=$user['birthdate_user']?>" class="form-control" required>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="work">Место работы</label>
							<div class="controls">
								<input type="text" id="work" name="work" placeholder="Введите место работы" value="<?=$user['work_user']?>" class="form-control">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="study">Место учебы</label>
							<div class="controls">
								<input type="text" id="study" name="study" placeholder="Введите место учебы" value="<?=$user['study_user']?>" class="form-control">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="phone">Номер телефона</label>
							<div class="controls">
								<input type="text" id="phone" name="phone" placeholder="Введите номер телефона" value="<?=$user['phone_user']?>" class="form-control">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="photo">Ссылка на фото</label>
							<div class="controls">
								<input type="text" id="photo" name="photo" placeholder="Введите адрес ссылки" value="<?=$user['photo_user']?>" class="form-control">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="about">О себе</label>
							<div class="controls">
								<textarea class="form-control" rows="16" name="about" placeholder="Введите информацию о себе" style="resize:none;"><?=$user['about_user']?></textarea>
							</div>
						</div>
						<div class="control-group">
							<button type="submit" class="new-article__button btn btn-primary sand-button">
								Сохранить изменения
							</button>
						</div>
					</form>
				</div>
			</div>
		</main>
		<footer class="main-footer">
			<?php include('view/template/footer.php') ?>
		</footer>
		<script type="text/javascript" src="view/js/daydream.js"></script>
	</body>
</html>
