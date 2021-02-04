<?php
	$id = $user['id_user'];
	$name = $user["name_user"];
	$surname = $user["surname_user"];
	$photo = $user["photo_user"];
?>

<article class="article">
	<header class="article__header">
		<a class="article__user-link" href="index.php?action=user-space&id=<?=$id ?>">
			<img class="article__avatar" src="<?=$photo ?>" width="50" height="50">
		</a>
		<span class="article__nickname">
			<?=$name." ".$surname?>
		</span>
	</header>
</article>
