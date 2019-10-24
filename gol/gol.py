def generate_field():
	field = [['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
			 ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
			 ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
			 ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
			 ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
			 ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
			 ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
			 ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
			 ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
			 ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
			 ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
			 ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
			 ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
			 ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
			 ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.']]
	return field





def seed(seed, row, col, field):
	"""
	place life in some square or empty it
	"""
	new_row = [field[row][:col] + [seed] + field[row][col + 1:]]
	new_field = field[:row] + new_row + field[row + 1:]
	return new_field


def show(field):
	"""
	draw field
	"""
	for j in range(len(field)):
		for i in range(len(field[j])):
			print(field[j][i], end=' ')
		print(' ')
	print(' ')



def fix(x, field):
	"""
	makes square field feels like Thor
	"""
	a = len(field)
	if x >= a:
		return x - a
	if x < 0:
		return x + a
	return x


def is_living(row, col, field):
	"""
	check if some square should live in next generation using Moore's neighbourhood
	"""
	hype_count = 0
	if field[row][col] == 'o':
		self = -1
	else:
		self = 0
	for now_row in range(-1, 2):
		for now_col in range(-1, 2):
			current_row = fix(row + now_row, field)
			current_col = fix(col + now_col, field)
			if field[current_row][current_col] == 'o':
				hype_count += 1
	hype_count += self	
	if self == 0 and hype_count == 3:
		return True
	elif self == -1:
		 if hype_count == 3 or hype_count == 2:
		 	return True
	return False


def life_counter(field):
	"""
	returns quanity of living squares
	"""
	hype = 0
	for y in range(len(field)):
		for x in range(len(field[y])):
			if field[y][x] == 'o':
				hype += 1
	return hype


def place_ui():
	"""
	allow user to create his own field
	"""
	field = generate_field()
	show(field)
	while True:
		seed_row = int(input("Enter row"))
		if seed_row == -1:
			return field
		seed_row = fix(seed_row - 1, field)
		seed_col = fix(int(input("Enter column")) - 1, field)
		if field[seed_row][seed_col] == '.':
			field = seed('o', seed_row, seed_col, field)
		else:
			field = seed('.', seed_row, seed_col, field)
		show(field)



def next_gen(field):
	"""
	returns next generation of field
	"""
	new_row = []
	new_field = []
	for row in range(len(field)):
		for col in range(len(field[row])):
			if is_living(row, col, field):
				new_row.append('o')
			else:
				new_row.append('.')
		new_field.append(new_row)
		new_row = []
	return new_field


def group(list, n):
    new_list = []
    current_row = []
    index = 0
    if n*n != len(list):
    	return False
    for row in range(n):
    	for col in range(n):
    		current_row.append(list[index])
    		index += 1
    	new_list.append(current_row)
    	current_row = []
    return new_list




def read_field(filename):
	array = open(filename).read()
	field = []
	for c in array:
		if c in 'o.':
			field.append(c)
	new_field = group(field, 15)
	return new_field



def game():
	"""
	makes it
	"""
	where = int(input("Open existing or create new?"))
	if where == 1:
		field = place_ui()
	else:
		path = input("Enter path: ")
		field = read_field(path)
		show(field)
		input()
	while 1:
		hype_count = life_counter(field)
		if hype_count == 0:
			return False
		field = next_gen(field)
		show(field)


game()
