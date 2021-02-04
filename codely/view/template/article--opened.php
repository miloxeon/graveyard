<?php
	$id = $article['id_article'];
	$name = get_user_by_id($link, $article["id_user"])["name_user"];
	$surname = get_user_by_id($link, $article["id_user"])["surname_user"];
	$title = $article['title_article'];
	$text = $article['text_article'];
	$date = gmdate("d/m/Y", $article['date_article']);
	$likes = $article['likes_article'];
?>

<article class="article">
	<header class="article__header">
		<a class="article__user-link" href="index.php?action=user-space&id=<?=$article["id_user"] ?>&fallback=<?=$fallback?>">
			<img class="article__avatar" src="<?=get_user_by_id($link, $article["id_user"])["photo_user"] ?>" width="50" height="50">
		</a>
		<span class="article__nickname">
			<?=$name." ".$surname?>
		</span>

		<!-- Вопрос -->
		<?php if($article['is_question']): ?>
			<span class="question_tag">Вопрос</span>
		<?php endif ?>



		<!-- Редактировать -->
		<?php if(isset($_SESSION['user']) && $article['id_user'] == $_SESSION['user']): ?>
			<?php if($article['is_question']): ?>
				<a href="index.php?action=edit-question&id=<?=$id?>">
					<span class="glyphicon glyphicon-pencil article__fave-icon pencil-color"></span>
				</a>
			<?php else: ?>
				<a href="index.php?action=edit-article&id=<?=$id?>">
					<span class="glyphicon glyphicon-pencil article__fave-icon pencil-color"></span>
				</a>
			<?php endif ?>
		<?php endif ?>

		<!-- Удалить -->

		<?php if(isset($_SESSION['user']) && $article['id_user'] == $_SESSION['user']): ?>
			<a href="index.php?action=delete&id=<?=$id?>">
				<span class="glyphicon glyphicon-remove article__like-icon remove-color"></span>
			</a>
		<?php endif ?>
	</header>
	<?php if(isset($_SESSION['user']) && $article['is_question']): ?>
	<div>
		<?php if(isset($_SESSION['user']) && check_same($link, $_SESSION['user'], $id)): ?>
			<span class="hello" style="background-color: #D79B83; color: white;">Отметок &laquo;У меня похожий вопрос&raquo;: <?=get_same($link, $_GET['id'])?></span>
		<?php else: ?>
			<a class="hello" href="index.php?action=same&id=<?=$id?>">У меня похожий вопрос</a>
		<?php endif ?>
	</div>
		<?php endif ?>

	<h2 class="article__title">
		<a href="article.php?id=<?=$article['id_article'] ?>">
			<?=$title?>
		</a>
	</h2>
	<p class="article__text">
		<?=$text?>
	</p>
	<footer class="article__footer">
		<?php if(isset($_SESSION['user'])): ?>
		<a href="index.php?action=fave-article&id_article=<?=$article['id_article'] ?>">
			<?php if(isset($_SESSION['user']) && check_if_fave_article($link, $_SESSION['user'], $article['id_article'])): ?>
				<span class="glyphicon glyphicon-star article__fave-icon"></span>
			<?php else: ?>
				<span class="glyphicon glyphicon-star-empty article__fave-icon"></span>
			<?php endif ?>
		</a>
		<?php endif ?>

		<span class="article__date">
			<?=$date?>
		</span>
		<section class="article__likes">
			<span class="article__likes-count">
				<?=$likes?>
			</span>
			<?php if(isset($_SESSION['user'])): ?>
				<a class="article__like"
					href="index.php?action=like&id=<?=$article['id_article']?>">
					<?php if(check_article_likes($link, $id)): ?>	<!-- if already liked -->
					<span class="glyphicon glyphicon-heart article__like-icon"></span>
					<?php else: ?>
					<span class="glyphicon glyphicon-heart-empty article__like-icon"></span>
					<?php endif ?>
				</a>
			<?php endif ?>
		</section>
	</footer>
</article>
