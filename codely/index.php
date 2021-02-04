<?php
	session_start();
	require_once("model/database.php");

	if(isset($_GET["action"])) {
		$action = $_GET["action"];
	} else {
		$action = "";
	}

	if ($action == "like") {
		$id_article = $_GET["id"];
		like_article($link, $id_article);
		header("Location: article.php?id=".$id_article);


	} else if ($action == "search") {
		$query = $_POST["query"];
		$articles = search($link, $query);

		include("view/search-results.php");

	} else if ($action == "same") {
		if (isset($_SESSION['user'])) {
			$user = $_SESSION['user'];
			$question = $_GET['id'];

			toggle_same($link, $user, $question);

			header("Location: article.php?id=".$question);
		}
		
	} else if ($action == "add-question") {
		if(!empty($_POST)) {
			add_article($link, $_POST["title"], $_POST["text"], 1, $_SESSION["user"]);
			header("Location: index.php");
		}
		include("view/create-question.php");



	} else if ($action == "add-article") {
		if(!empty($_POST)) {
			add_article($link, $_POST["title"], $_POST["text"], 0, $_SESSION["user"]);
			header("Location: index.php");
		}
		include("view/create-article.php");

	} else if ($action == "blacklist") {
		toggle_blacklist($link, $_SESSION['user'], $_GET['id']);
		header("Location: index.php?action=user-space&id=".$_GET['id']);
		
	} else if ($action == "edit-article") {
		$article_id = $_GET['id'];
		$article = get_one_article($link, $_GET['id']);

		if(empty($_POST)) {
			$title = $article['title_article'];
			$text =  $article['text_article'];
			$id = $article['id_article'];
			include("view/edit-article.php");
		} else {
			edit_article($link, $article['id_article'], $_POST["title"], $_POST["text"], $_SESSION["user"]);
			header("Location: article.php?id=".$article['id_article']);
		}

	} else if ($action == "edit-question") {
		$article_id = $_GET['id'];
		$article = get_one_article($link, $_GET['id']);

		if(empty($_POST)) {
			$title = $article['title_article'];
			$text =  $article['text_article'];
			$id = $article['id_article'];
			include("view/edit-question.php");
		} else {
			edit_article($link, $article['id_article'], $_POST["title"], $_POST["text"], $_SESSION["user"]);
			header("Location: article.php?id=".$article['id_article']);
		}


	} else if ($action == "delete") {
		if(isset($_GET["id"])) {
			$article_id = $_GET["id"];
			if (isset($_SESSION["user"])) {
				if (get_author_by_article($link, $article_id) == $_SESSION["user"]) {
					delete_article($link, $article_id);
				}
			}
			header("Location: index.php");
		}


	} else if ($action == "get_article") {
		if (isset($_GET["id"])) {
			header("Location: article.php?id=".$_GET["id"]);
		}

	/*

	} else if ($action == "edit") {
		if(!isset($_GET["id"])
			$article_id = $_GET["id"];
			if(isset($_SESSION["user"])) {
				if (get_author_by_article($link, $article_id) == $_SESSION["user"]) {
					include(view/create-article.php);
					edit_article($link, $_POST["title"], $_POST["text"], 0, $_SESSION["user"]);

				}
			}
		}

	 */

	} else if ($action == "edit-user") {
		$id = $_SESSION['user'];
		$user = get_user_by_id($link, $id);

		if(empty($_POST)) {
			include("view/edit-user.php");
		} else {
			$surname = $_POST['surname'];
			$name = $_POST['name'];
			$login = $_POST['login'];
			$birthdate = $_POST['birthdate'];
			$work = $_POST['work'];
			$study = $_POST['study'];
			$phone = $_POST['phone'];
			$about = $_POST['about'];
			$photo = $_POST['photo'];
			edit_user_space($link, $id, $surname, $name, $login, $birthdate, $work, $study, $phone, $about, $photo);
			header("Location: index.php?action=user-space&id=".$id);
		}


	} else if ($action == "register") {
		if(!empty($_POST)) {
			$success = register_user($link, 
				$_POST["surname"], 
				$_POST["name"], 
				$_POST["login"], 
				hash("sha256", $_POST["password"]));
			if ($success == 0) {
				header("Location: index.php?action=reg-fail");
			} else {
				header("Location: index.php?action=reg-success");
			}
			
		}
		include("view/reg-page.php");


	} else if ($action == "login") {
		if(!empty($_POST)) {
			$status = login($link, 
				$_POST["login"], 
				hash("sha256", $_POST["password"]));
			if ($status == 1) {
				header("Location: index.php");
			} else if ($status == 0) {
				header("Location: index.php?action=no-user");
			} else if ($status == 2) {
				header("Location: index.php?action=wrong-password");
			} else {
				echo "Error!";
			}
			
		}
		include("view/login-page.php");

	} else if ($action == "user-space") {
		if (isset($_GET["id"])) {
			include("view/user-space.php");
		}

	} else if ($action == "bookmarks") {
		if (isset($_SESSION["user"])) {
			include("view/bookmarks.php");
		}

	} else if ($action == "fave") {
		if (isset($_SESSION['user'])) {
			$user = $_SESSION['user'];
			$author = $_GET['id_author'];
			$fallback = $_GET['fallback'];

			toggle_fave_author($link, $user, $author);

			header("Location: index.php?action=user-space&id=".$author."&fallback=".$fallback);
		}

	} else if ($action == "unfave") {
		if (isset($_SESSION['user'])) {
			$user = $_SESSION['user'];
			$author = $_GET['id_author'];

			toggle_fave_author($link, $user, $author);

			header("Location: index.php?action=bookmarks");
		}

	} else if ($action == "fave-article") {
		if (isset($_SESSION['user'])) {
			$user = $_SESSION['user'];
			$article = $_GET['id_article'];

			toggle_fave_article($link, $user, $article);

			header("Location: article.php?id=".$article);
		}

	} else if ($action == "unfave-article") {
		if (isset($_SESSION['user'])) {
			$user = $_SESSION['user'];
			$article = $_GET['id_article'];

			toggle_fave_article($link, $user, $article);

			header("Location: index.php?action=bookmarks");
		}

	} else if ($action == "exit") {
		unset($_SESSION['user']);
		header("Location: index.php");
	} else {
		$articles = get_all_articles($link);
		include("view/main-page.php");
	}
?>
