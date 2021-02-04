<form class="search" action="index.php?action=search" method="POST">
	<label class="search__label" for="search">
		Поиск
	</label>
	<input class="search__field" type="search" name="query" <?=isset($query) ? 'value="'.$query.'"' : ""?> placeholder="Поиск" required>
	<button class="search__button" type="submit">
		Поиск
	</button>
	<div class="search__shadow"></div>
</form>