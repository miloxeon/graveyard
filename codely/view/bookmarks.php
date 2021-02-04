<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" href="view/img/favicon.ico">
	<title>Избранное &ndash; Codely</title>
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
			<h3 class="favorite--materials">Избранные авторы</h3>
			<?php if (get_fave_authors($link, $_SESSION['user'])): ?>
				<?php 
					$authors = get_fave_authors($link, $_SESSION['user']);
				?>
				<?php foreach($authors as $author): ?>
					<?php 
						$fave_author = get_user_by_id($link, $author['id_author']);

						$fave_name = $fave_author['name_user'];
						$fave_surname = $fave_author['surname_user'];
					?>
					<article class="article" style="display: flex; align-items: center; justify-content: space-between;">
						<div>
							<a class="article__user-link" href="index.php?action=user-space&id=<?=$author['id_author'] ?>">
								<img class="article__avatar" src="<?=get_user_by_id($link, $author['id_author'])["photo_user"] ?>" width="50" height="50">
							</a>
							<span class="article__nickname">
								<?=$fave_name." ".$fave_surname ?>
							</span>
						</div>
						<a href="index.php?action=unfave&id_author=<?=$author['id_author']?>">
							<span class="glyphicon glyphicon-remove article__like-icon remove-color"></span>
						</a>
					</article>
				<?php endforeach ?>

			<?php else: ?>
				<article class="article">
					У вас пока нет избранных авторов.
				</article>
			<?php endif ?>
		</div>
		<div class="container container--right">
			<h3 class="favorite--materials">Избранные материалы</h3>
			<?php if(get_fave_articles($link, $_SESSION['user'])): ?>
				<?php foreach(get_fave_articles($link, $_SESSION['user']) as $fave_article) {
					$article = get_one_article($link, $fave_article['id_article']);
					include('view/template/article--preview.php');
				}?>
			<?php else: ?>
				<article class="article">
					У вас пока нет избранных материалов.
				</article>
			<?php endif ?>
		</div>
	</main>
	<footer class="main-footer">
		<?php include('view/template/footer.php') ?>
	</footer>
	<script type="text/javascript" src="view/js/daydream.js"></script>
	<!-- <script src="view/js/semantic.min.js"></script> -->
</body>
</html>
