<?php
	session_start();
	include("model/database.php");
	if (isset($_GET['id'])) {
		$article = get_one_article($link, $_GET["id"]);
	}


	if(isset($_GET["action"])) {
		$action = $_GET["action"];
	} else {
		$action = "";
	}


	if($action == "like-comment") {
		$id_article = $_GET['article'];
		$id_comment = $_GET['comment'];
		like_comment($link, $id_comment);
		header("Location: article.php?id=".$id_article);


	} else if($action == "like-article") {
		$id_article = $_GET['article'];
		like_article($link, $id_article);
		header("Location: article.php?id=".$id_article);



	} else if ($action == "add-comment") {
		$id_user = $_SESSION["user"];
		$id_article = $_GET["id"];
		$text = $_POST["comment-text"];
		add_comment($link, $id_user, $id_article, $text);
		header("Location: article.php?id=".$id_article);


	} else if($action == "delete") {
		$id_comment = $_GET["id"];

		$id_article = $_GET["id-article"];
		delete_comment($link, $id_comment);
		echo "hi".$article;
		header("Location: article.php?id=".$id_article);


	} else {
		
		require_once("view/comment-page.php");
	}

	
?>
