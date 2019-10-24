#testline = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
filename = 'hog_description.txt'

def open_file(filename):
	f = open(filename)
	line = ''
	for l in f:
		line += l
	return line

testline = open_file(filename)


def make_table(line):
	"""
	Makes an analysis table contains all of unique symbols
	in line and number of how many times do each symbol
	repeats in line
	"""
	vocabulary = {}
	for symbol in line:
		if symbol not in vocabulary:
			vocabulary[symbol] = 1
		else:
			vocabulary[symbol] += 1
	return [(a[1], a[0]) for a in sorted(vocabulary.items(), key = lambda entry: entry[1])]


def make_tree(table):
	"""
	Makes Huffman's binary tree from analysis table
	"""
	def tree_maker(table):
		if len(table) == 1:
			return table
	
		new_table = sorted([(table[0][0] + table[1][0], table[0], table[1])] + table[2:], key = lambda entry: entry[0])
		return tree_maker(new_table)
	return tree_maker(table)[0]


def seek_tree(tree, key = '', vocabulary = {}):
	"""
	Makes a vocabulary of Huffman's codes of tree elements
	"""
	if len(tree) == 2:
		vocabulary[tree[1]] = key
		return 0
	seek_tree(tree[1], key + '0', vocabulary)
	seek_tree(tree[2], key + '1', vocabulary)
	return vocabulary

voc = seek_tree(make_tree(make_table(testline)))
#print(voc)
print('Original length of file is', len(testline), 'symbols, which is', len(testline) * 8, 'bits.')

newline = ''
len_counter = 0
for c in testline:
	newline += voc[c]
	len_counter += len(voc[c])

table_size = 0
for c in voc:
	table_size += len(voc[c]) + 8

print('Size of archived file is', len_counter + table_size, 'bits (', len_counter, 'bits is data and', table_size, 'bits is table ).')
print('Shrinking ratio is', ((len(testline) * 8) / (len_counter + table_size)) )


