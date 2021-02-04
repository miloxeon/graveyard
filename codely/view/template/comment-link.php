<?php 
	$comments_count = (string) $article['comment_count'];
	switch (substr($comments_count, -1)) {
		case '0':
			echo '<span class="glyphicon glyphicon-comment"></span>';
			break;
		case '1':
			echo $comments_count." комментарий";
			break;
		case '2':
		case '3':
		case '4':
			echo $comments_count." комментария";
			break;
		default:
			echo $comments_count." комментариев";
	}
?>
