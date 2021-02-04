<?php
	//session_start();
	define('MYSQL_SERVER', 'localhost');
	define('MYSQL_USER', 'root');
	define('MYSQL_PASSWORD', '');
	define('MYSQL_DB', 'codely');

	function connect_to_db() {
		$link = mysqli_connect(MYSQL_SERVER, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB)
			or die("Error: ".mysqli_error($link));

		if (!mysqli_set_charset($link, "utf8")) {
			printf("Error: ".mysqli_error($link));
		}

		return $link;
	}

	$link = connect_to_db();

	function check_article_likes($link, $id_article) {
		if (!isset($_SESSION['user'])) {
			return false;
		}
		$query = "SELECT COUNT(id_user) FROM likes_article WHERE id_article=".$id_article." AND id_user=".$_SESSION['user'];
		$result = mysqli_query($link, $query);
		if (!$result) 
			die (mysql_error());

		if (mysqli_fetch_array($result)[0] == 0) {
			return false;
		} else {
			return true;
		}
	}

	function check_if_blacklisted($link, $master_id, $slave_id) {
		$query = "SELECT COUNT(id_blacklist) FROM blacklist WHERE id_master=".$master_id." AND id_slave=".$slave_id;
		$result = mysqli_query($link, $query);

		if (mysqli_fetch_array($result)[0] == 0) {
			return false;
		} else {
			return true;
		}
	}
	
	function toggle_blacklist($link, $master_id, $slave_id) {
		if (!check_if_blacklisted($link, $master_id, $slave_id)) {
			$inserting_query = "INSERT INTO blacklist (id_master, id_slave) VALUES (%d, %d)";
			$query = sprintf($inserting_query, $master_id, $slave_id);
			$result = mysqli_query($link, $query);
			if (!$result) 
				die (mysql_error());
		} else {
			$deleting_query = "DELETE FROM blacklist WHERE id_master=".$master_id." AND id_slave=".$slave_id;
			$result = mysqli_query($link, $deleting_query);
			if (!$result) 
				die (mysql_error());
		}
	}

	function like_article($link, $id_article) {
		if(!check_article_likes($link, $id_article)) {
			$inserting_query = "INSERT INTO likes_article (id_article, id_user) VALUES (%d, %d)";
			$query = sprintf( $inserting_query, $id_article, $_SESSION['user']);
			$result = mysqli_query($link, $query);
			if (!$result) 
				die (mysql_error());

			$updating_query = "UPDATE article SET likes_article=likes_article+1 WHERE id_article=".$id_article;
			$result = mysqli_query($link, $updating_query);
			if (!$result) 
				die (mysql_error());

			$updating_query = "UPDATE user SET rate_user=rate_user+1 WHERE id_user=".get_author_by_article($link, $id_article);
			$result = mysqli_query($link, $updating_query);
			if (!$result) 
				die (mysql_error());
		} else {
			$deleting_query = "DELETE FROM likes_article WHERE id_article=".$id_article." AND id_user=".$_SESSION['user'];
			$result = mysqli_query($link, $deleting_query);
			if (!$result) 
				die (mysql_error());

			$updating_query = "UPDATE article SET likes_article=likes_article-1 WHERE id_article=".$id_article;
			$result = mysqli_query($link, $updating_query);
			if (!$result) 
				die (mysql_error());

			$updating_query = "UPDATE user SET rate_user=rate_user-1 WHERE id_user=".get_author_by_article($link, $id_article);
			$result = mysqli_query($link, $updating_query);
			if (!$result) 
				die (mysql_error());
		}
	}

	function check_comment_likes($link, $id_comment) {
		$query = "SELECT * FROM likes_comment WHERE id_comment=".$id_comment." AND id_user=".$_SESSION['user'];
		$result = mysqli_query($link, $query);
		if (!$result) 
			die (mysql_error());

		return mysqli_num_rows($result) > 0;
	}

	function get_comment_likes($link, $id_comment) {
		$query = "SELECT * FROM likes_comment WHERE id_comment=".$id_comment;
		$result = mysqli_query($link, $query);
		if (!$result) 
			die (mysql_error());

		return mysqli_num_rows($result);
	}

	function get_same($link, $question_id) {
		$query = "SELECT COUNT(*) FROM same WHERE id_question=".$question_id;

		$result = mysqli_query($link, $query);

		if (!$result)
			die(mysql_error());

		return mysqli_fetch_array($result)[0];
	}

	function check_same($link, $user_id, $question_id) {
		$query = "SELECT * FROM same WHERE id_question=".$question_id." AND id_user=".$user_id;
		$result = mysqli_query($link, $query);
		if (!$result) 
			die (mysql_error());

		return mysqli_num_rows($result) > 0;
	}

	function toggle_same($link, $user_id, $question_id) {
		if (!check_same($link, $user_id, $question_id)) {
			$inserting_query = "INSERT INTO same (id_user, id_question) VALUES (%d, %d)";
			$query = sprintf($inserting_query, $user_id, $question_id);
			$result = mysqli_query($link, $query);
			if (!$result) 
				die (mysql_error());
		} else {
			$deleting_query = "DELETE FROM same WHERE id_question=".$question_id." AND id_user=".$user_id;
			$result = mysqli_query($link, $deleting_query);
			if (!$result) 
				die (mysql_error());
		}
	}

	function like_comment($link, $id_comment) {
		if(!check_comment_likes($link, $id_comment)) {
			$inserting_query = "INSERT INTO likes_comment (id_comment, id_user) VALUES (%d, %d)";
			$query = sprintf( $inserting_query, $id_comment, $_SESSION['user']);
			$result = mysqli_query($link, $query);
			if (!$result) 
				die (mysql_error());

			$updating_query = "UPDATE comment SET likes_comment=likes_comment+1 WHERE id_comment=".$id_comment;
			$result = mysqli_query($link, $updating_query);
			if (!$result) 
				die (mysql_error());

			$updating_query = "UPDATE user SET rate_user=rate_user+1 WHERE id_user=".get_author_by_comment($link, $id_comment);
			$result = mysqli_query($link, $updating_query);
			if (!$result) 
				die (mysql_error());

		} else {
			$deleting_query = "DELETE FROM likes_comment WHERE id_comment=".$id_comment." AND id_user=".$_SESSION['user'];
			$result = mysqli_query($link, $deleting_query);
			if (!$result) 
				die (mysql_error());

			$updating_query = "UPDATE comment SET likes_comment=likes_comment-1 WHERE id_comment=".$id_comment;
			$result = mysqli_query($link, $updating_query);
			if (!$result) 
				die (mysql_error());

			$updating_query = "UPDATE user SET rate_user=rate_user-1 WHERE id_user=".get_author_by_comment($link, $id_comment);
			$result = mysqli_query($link, $updating_query);
			if (!$result) 
				die (mysql_error());
		}
	}

	// function get_article_likes($link, $id_article) {
	// 	$query = "SELECT COUNT(id_user) FROM likes_article WHERE id_article=".$id_article;
	// 	$result = mysqli_query($link, $query);
	// 	if (!$result) 
	// 		die (mysql_error());
	// 	return mysqli_fetch_array($result)[0];
	// }

	

	function get_all_articles($link) {
		$query = "SELECT * FROM article ORDER BY date_article DESC";
		$result = mysqli_query($link, $query);

		if (!$result)
			die(mysql_error());
		$n = mysqli_num_rows($result);
		$articles = array();

		for($i = 0; $i < $n; $i++) {
			$row = mysqli_fetch_assoc($result);
			$articles[] = $row;
		}

		return $articles;
	}

	function search($link, $search_query) {
		$query = "SELECT * FROM article ORDER BY date_article DESC";
		$result = mysqli_query($link, $query);

		if (!$result)
			die(mysql_error());
		$n = mysqli_num_rows($result);
		$articles = array();

		for($i = 0; $i < $n; $i++) {
			$row = mysqli_fetch_assoc($result);

			if (strstr(mb_strtolower($row['title_article'].$row['text_article']), mb_strtolower($search_query)) !== false) {
				$articles[] = $row;
			}

		}

		$query = "SELECT * FROM user";
		$result = mysqli_query($link, $query);

		if (!$result)
			die(mysql_error());
		$n = mysqli_num_rows($result);
		$users = array();

		for($i = 0; $i < $n; $i++) {
			$row = mysqli_fetch_assoc($result);

			if (strstr($row['name_user'].$row['surname_user'], $search_query) !== false) {
				$users[] = $row;
			}

		}

		return [$articles, $users];
	}

	function check_if_fave_article($link, $user, $article) {
		$query = "SELECT * FROM favorite_articles WHERE id_user=".$user." AND id_article=".$article;
		$result = mysqli_query($link, $query);

		if (!$result)
			die(mysql_error());

		$n = mysqli_num_rows($result);

		return $n > 0;
	}

	function toggle_fave_article($link, $user, $article) {
		if (!check_if_fave_article($link, $user, $article)) {
			$query = "INSERT INTO favorite_articles (id_user, id_article) VALUES (".$user.", ".$article.")";
		} else {
			$query = "DELETE FROM favorite_articles WHERE id_user=".$user." AND id_article=".$article;
		}
		$result = mysqli_query($link, $query);
		if (!$result)
			die(mysql_error());
	}

	function get_rating($link, $id) {
		$query = "SELECT rate_user FROM user WHERE id_user=".$id;
		$result = mysqli_query($link, $query);

		return mysqli_fetch_array($result)[0];
	}

	function get_fave_articles($link, $user) {
		$query = "SELECT * FROM favorite_articles WHERE id_user=".$user;
		$result = mysqli_query($link, $query);
		if (!$result)
			die(mysql_error());

		$n = mysqli_num_rows($result);
		$articles = array();

		for($i = 0; $i < $n; $i++) {
			$row = mysqli_fetch_assoc($result);
			$articles[] = $row;
		}

		return $articles;
	}


	function check_if_fave_author($link, $user, $author) {
		$query = "SELECT * FROM favorite_authors WHERE id_user=".$user." AND id_author=".$author;
		$result = mysqli_query($link, $query);

		if (!$result)
			die(mysql_error());

		$n = mysqli_num_rows($result);

		return $n > 0;
	}

	function toggle_fave_author($link, $user, $author) {
		if (!check_if_fave_author($link, $user, $author)) {
			$query = "INSERT INTO favorite_authors (id_user, id_author) VALUES (".$user.", ".$author.")";
		} else {
			$query = "DELETE FROM favorite_authors WHERE id_user=".$user." AND id_author=".$author;
		}
		$result = mysqli_query($link, $query);
		if (!$result)
			die(mysql_error());
	}

	function get_fave_authors($link, $user) {
		$query = "SELECT * FROM favorite_authors WHERE id_user=".$user;
		$result = mysqli_query($link, $query);
		if (!$result)
			die(mysql_error());

		$n = mysqli_num_rows($result);
		$authors = array();

		for($i = 0; $i < $n; $i++) {
			$row = mysqli_fetch_assoc($result);
			$authors[] = $row;
		}

		return $authors;
	}

	function get_all_comments($link, $id) {
		$query = "SELECT * FROM comment WHERE id_article=".$id." ORDER BY likes_comment DESC";
		$result = mysqli_query($link, $query);

		if (!$result)
			die(mysql_error());

		$n = mysqli_num_rows($result);
		$comments = array();

		for($i = 0; $i < $n; $i++) {
			$row = mysqli_fetch_assoc($result);
			$comments[] = $row;
		}
		return $comments;
	}

	function register_user($link, $surname, $name, $login, $password) {
		$login = strip_tags(trim($login));

		$checking_query = 'SELECT * FROM user WHERE login_user="'.$login.'"';
		$checking_result = mysqli_query($link, $checking_query);
		if (!mysqli_fetch_assoc($checking_result)){
			$inserting_query = 'INSERT INTO user (surname_user, name_user, login_user, password_user) VALUES ("%s", "%s", "%s", "%s")';
			$surname = strip_tags(trim($surname));
			$name = strip_tags(trim($name));
			
			$password = strip_tags(trim($password));

			$query = sprintf( $inserting_query, 
				mysqli_real_escape_string($link, $surname),
				mysqli_real_escape_string($link, $name),
				mysqli_real_escape_string($link, $login),
				mysqli_real_escape_string($link, $password));

			$result = mysqli_query($link, $query);

			if (!$result) 
				die (mysql_error());
			return 1;
		} else {
			return 0;
		}
	}

	function login($link, $login, $password) {
		// 0 - user doesn't exist
		// 2 - wrong password
		// 1 - OK
		$login = strip_tags(trim($login));
		$password = strip_tags(trim($password));

		$checking_query = 'SELECT * FROM user WHERE login_user="'.$login.'"';
		$checking_result = mysqli_query($link, $checking_query);
		$ready_result = mysqli_fetch_assoc($checking_result);
		if ($ready_result){
			$db_password = $ready_result['password_user'];
			if ($db_password == $password) {
				$_SESSION['user'] = $ready_result['id_user'];
			} else {
				return 2;
			}
			return 1;
		} else {
			return 0;
		}
	}

	function get_user_by_id($link, $id) {
		$query = "SELECT * FROM user WHERE id_user = $id";
		$result = mysqli_query($link, $query);

		if (!$result) 
			die (mysql_error());

		$user = mysqli_fetch_assoc($result);
		return $user;
	}

	function get_author_by_article($link, $article_id) {
		$query = "SELECT * FROM article WHERE id_article=".$article_id;
		$result = mysqli_query($link, $query);

		if (!$result) 
			die (mysql_error());

		$author = mysqli_fetch_assoc($result)["id_user"];
		return $author;
	}

	function get_author_by_comment($link, $comment_id) {
		$query = "SELECT * FROM comment WHERE id_comment=".$comment_id;
		$result = mysqli_query($link, $query);

		if (!$result) 
			die (mysql_error());

		$author = mysqli_fetch_assoc($result)["id_user"];
		return $author;
	}

	function get_one_article($link, $id_article) {
		$query = "SELECT * FROM article WHERE id_article=".$id_article;
		$result = mysqli_query($link, $query);

		if (!$result) 
			die (mysql_error());

		$article = mysqli_fetch_assoc($result);
		return $article;
	}

	function add_comment($link, $id_user, $id_article, $text_comment) {
		$date_comment = time();
		$text_comment = strip_tags(trim($text_comment));

		$inserting_query = 'INSERT INTO comment (id_user, id_article, text_comment, date_comment) VALUES (%d, %d, "%s", "%s")';

		$query = sprintf( $inserting_query, 
			mysqli_real_escape_string($link, $id_user),
			mysqli_real_escape_string($link, $id_article),
			mysqli_real_escape_string($link, $text_comment),
			mysqli_real_escape_string($link, $date_comment));
		$result = mysqli_query($link, $query);
		if (!$result) 
			die (mysql_error());

		$inc_query = 'UPDATE article SET comment_count=comment_count+1 WHERE id_article='.$id_article;
		$result = mysqli_query($link, $inc_query);
		if (!$result) 
			die (mysql_error());


	}

	function delete_comment($link, $id) {
		$extracting_query = 'SELECT id_article FROM comment WHERE id_comment='.$id;
		$result = mysqli_query($link, $extracting_query);
		if (!$result) 
			die (mysql_error());

		$dec_query = 'UPDATE article SET comment_count=comment_count-1 WHERE id_article='.mysqli_fetch_assoc($result)["id_article"];
		$result = mysqli_query($link, $dec_query);
		if (!$result) 
			die (mysql_error());

		$query = 'DELETE FROM comment WHERE id_comment='.$id;
		$result = mysqli_query($link, $query);
		if (!$result) 
			die (mysql_error());
	}


	function add_article($link, $title_article, $text_article, $is_question = 0, $id_user = 1) {
		// $date_article = date('c', time());
		$date_article = time();
		$title_article = strip_tags(trim($title_article));
		$text_article = strip_tags(trim($text_article));

		$inserting_query = 'INSERT INTO article (title_article, date_article, id_user, text_article, is_question) VALUES ("%s", "%s", %d, "%s", %d)';
		$query = sprintf( $inserting_query, 
			mysqli_real_escape_string($link, $title_article),
			mysqli_real_escape_string($link, $date_article),
			$id_user,
			mysqli_real_escape_string($link, $text_article),
			$is_question);

		$result = mysqli_query($link, $query);

		if (!$result) 
			die (mysql_error());
	}

	function edit_article($link, $id_article, $article_heading_new, $article_text_new, $id_user) {
		if ($_SESSION['user'] == $id_user) {
			$article_heading_new = strip_tags(trim($article_heading_new));
			$article_text_new = strip_tags(trim($article_text_new));

			$inserting_query = 'UPDATE article SET title_article="%s", text_article="%s" WHERE id_article='.$id_article;
			$query = sprintf( $inserting_query,
				mysqli_real_escape_string($link, $article_heading_new),
				mysqli_real_escape_string($link, $article_text_new));

			$result = mysqli_query($link, $query);

			if (!$result)
				die(mysql_error());
		}
	}

	function delete_article($link, $id) {
		$query = 'DELETE FROM article WHERE id_article='.$id;
		$result = mysqli_query($link, $query);
		if (!$result) 
			die (mysql_error());
	}

	function count_comments($link, $id) {
		$query = "SELECT COUNT(*) FROM comment WHERE id_user=".$id;

		$result = mysqli_query($link, $query);

		if (!$result)
			die(mysql_error());

		return mysqli_fetch_array($result)[0];
	}

	function edit_user_space($link, $id, $surname, $name, $login, $birthdate, $work, $study, $phone, $about, $photo) {
		if ($_SESSION['user'] == $id) {
			$surname = strip_tags(trim($surname));
			$name = strip_tags(trim($name));
			$login = strip_tags(trim($login));
			$birthdate = strip_tags(trim($birthdate));
			$work = strip_tags(trim($work));
			$study = strip_tags(trim($study));
			$phone = strip_tags(trim($phone));
			$about = strip_tags(trim($about));
			$photo = strip_tags(trim($photo));

			$inserting_query = 'UPDATE user SET surname_user="%s", name_user="%s", login_user="%s", birthdate_user="%s", work_user="%s", study_user="%s", phone_user="%s", about_user="%s", photo_user="%s" WHERE id_user='.$id;
			$query = sprintf( $inserting_query,
				mysqli_real_escape_string($link, $surname),
				mysqli_real_escape_string($link, $name),
				mysqli_real_escape_string($link, $login),
				mysqli_real_escape_string($link, $birthdate),
				mysqli_real_escape_string($link, $work),
				mysqli_real_escape_string($link, $study),
				mysqli_real_escape_string($link, $phone),
				mysqli_real_escape_string($link, $about),
				mysqli_real_escape_string($link, $photo));

			$result = mysqli_query($link, $query);

			if (!$result)
				die(mysql_error());
		}
	}
?>