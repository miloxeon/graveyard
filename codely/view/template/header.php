<?php if(isset($_SESSION['user'])): ?>
	<?php
		$name_header = get_user_by_id($link, $_SESSION['user'])["name_user"];
		$surname_header = get_user_by_id($link, $_SESSION['user'])["surname_user"];

		$fallback = isset($_GET['fallback']) ? $_GET['fallback'] : "index.php";
	?>
	<a class="main-header__link" href="index.php?action=user-space&id=<?=$_SESSION["user"] ?>&fallback=<?=$fallback?>">
		<img class="main-header__avatar" src="<?=get_user_by_id($link, $_SESSION['user'])["photo_user"] ?>" width="50" height="50">
		<?=$name_header." ".$surname_header?>
	</a>
	
	<a class="main-header__link" href="index.php">Главная</a>
	<a class="main-header__link" href="index.php?action=bookmarks">Избранное</a>
	<a class="main-header__link" href="index.php?action=add-article">Написать статью</a>
	<a class="main-header__link" href="index.php?action=add-question">Задать вопрос</a>
	<a class="main-header__link" href="index.php?action=exit">Выход</a>
<?php else: ?>
	<a class="main-header__link" href="index.php?action=register">Регистрация</a>
	<a class="main-header__link" href="index.php?action=login">Вход</a>
<?php endif ?>
