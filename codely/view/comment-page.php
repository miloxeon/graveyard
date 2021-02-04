<?php
	$comments = get_all_comments($link, $article["id_article"]);
?>
<!DOCTYPE html>
<html lang="ru">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
		<link rel="icon" href="view/img/favicon.ico">

		<title><?=$article['title_article']; ?></title>

		<!-- <link href="view/css/semantic.min.css" rel="stylesheet"> -->
		<link href="view/css/bootstrap.min.css" rel="stylesheet">
		<link href="view/css/ie10-viewport-bug-workaround.css" rel="stylesheet">
		<link href="view/css/article-view.css" rel="stylesheet">
		<link href="view/css/common.css" rel="stylesheet">
		<link href="view/css/comment.css" rel="stylesheet">

		<link href="view/css/main-page.css" rel="stylesheet">
	</head>
	<body class="body">
		<header class="main-header">
			<?php require_once("view/template/header.php") ?>
			<div class="main-header__border"></div>
	 	</header>
		<main class="main">
			<?php include('view/template/search.php') ?>
			<div class="article article--transparent">
				<a class="emphasis-link" href="index.php">
					<i class="glyphicon glyphicon-menu-left"></i><span class="sign"></span>
				</a>
			</div>
			<?php include('view/template/article--opened.php') ?>
			<?php include('view/template/comments.php') ?>
		</main>
		<footer class="main-footer">
			<?php require_once("view/template/footer.php"); ?> 
		</footer>
		<script type="text/javascript" src="view/js/daydream.js"></script>
	</body>
</html>
