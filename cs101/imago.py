def open_image(filename):
	"""
	Open file and convert it to byteline
	"""
	image = open(filename, "rb")
	if not image:
		return None
	byteline = []
	while 1:
		byte = image.read(1)
		if not byte:
			image.close()
			return byteline
		byteline.append(byte)


def bmpInfo_get(byteline):
	"""
	Parses BMP-file to get an information about
	the picture
	"""
	def convert(bytes_array):
		return int.from_bytes(b''.join(bytes_array), 'little')

	bmpInfo = {
		#Bitmap file header
		'bfType' 		  : convert(byteline[0:2]),
		'bfSize' 		  : convert(byteline[2:6]),
		'bfReserved1' 	  : convert(byteline[6:8]),
		'bfReserved2' 	  :	convert(byteline[8:10]),
		'bfOffBits'		  :	convert(byteline[10:14]),
	
		#Bitmap info header
		'biSize'		  : convert(byteline[14:18]),
		'biWidth'		  : convert(byteline[18:22]),
		'biHeight'        :	convert(byteline[22:26]),
		'biPlanes'		  : convert(byteline[26:28]),
		'biBitCount'	  : convert(byteline[28:30]),
		'biCompression'	  : convert(byteline[30:34]),
		'biSizeImage'	  :	convert(byteline[34:38]),
		'biXPelsPerMeter' : convert(byteline[38:42]),
		'biYPelsPerMeter' : convert(byteline[42:46]),
		'biClrUsed'		  : convert(byteline[46:50]),
		'biClrImportant'  : convert(byteline[50:54])
	}
	return bmpInfo




def matrixr(byteline):
	"""
	Make color array matrix of bytes of byteline
	"""
	#print(byteline[:54])
	current_pixel = []
	current_line  = []
	color_array   = []
	bmpInfo = bmpInfo_get(byteline)
	
	y_size = bmpInfo['biHeight']
	x_size = bmpInfo['biWidth']
	#print(y_size, x_size)
	start  = bmpInfo['bfOffBits']

	raw_array = byteline[start:]
	raw_array_index = 0

	for y_index in range(y_size):
		for x_index in range(x_size):
			current_pixel = raw_array[raw_array_index:raw_array_index + 3]
			raw_array_index += 3
			current_line.append(tuple(current_pixel))
		color_array.append(current_line)
		current_line = []

	#print(len(color_array[0]))
	return color_array

	
def rotate(color_array, mode = 'ccw'):
	"""
	Rotates image
	"""
	def r_cw(color_array):
		"""
		Interpretites a color array matrix as turned 90 degrees cw
		"""
		y_size = len(color_array[0])
		x_size = len(color_array)
		rotated_array = []
		current_pixel = []
		current_line  = []
	
		for y_index in range(y_size):
			for x_index in range(x_size):
				current_pixel = color_array[x_index][y_size - y_index - 1]
				current_line.append(tuple(current_pixel))
			rotated_array.append(current_line)
			current_line = []
		return rotated_array

	if mode == 'cw': return r_cw(color_array)
	if mode == 'ccw' : return r_cw(r_cw(r_cw(color_array)))
	return r_cw(r_cw(color_array))


def invert_colour(color_array):
	"""
	Makes a negative image of original
	"""
	current_tuple = []
	new_array = color_array
	for y_index in range(len(new_array)):
		for x_index in range(len(new_array[0])):
			for tupler in range(3):
				current_byte = new_array[y_index][x_index][tupler]
				current_tuple.append(current_byte)
			for tupler in range(3):
				current_byte = current_tuple[tupler]
				inverted_byte = (255 - int.from_bytes(current_byte, 'little')).to_bytes(1, 'little')
				current_tuple[tupler] = inverted_byte
			new_array[y_index][x_index] = tuple(current_tuple)
			current_tuple = []
	return new_array


def write_image(filename, color_array):
	"""
	Save the changes you done with image
	"""
	#print(color_array)
	def break_array(color_array):
		"""
		Convert any n-dimensional array to a line
		"""
		line = []
		for y_index in range(len(color_array)):
			for x_index in range(len(color_array[0])):
				line.append(b''.join(color_array[y_index][x_index]))
		return line

	def bmpInfo_gen(color_array):
		"""
		Generate bmpInfo for new image
		"""
		image_size = (len(color_array) * len(color_array[0]) * 3) + 2
		zero = b'\x00\x00\x00\x00'

		bfType			= b'\x42\x4D'
		bfReserved1		= b'\x00\x00'
		bfReserved2		= b'\x00\x00'
		bfOffBits		= b'\x36\x00\x00\x00'
		
		biSize			= b'\x28\x00\x00\x00'
		biWidth			= len(color_array[0]).to_bytes(4, 'little')
		biHeight		= len(color_array).to_bytes(4, 'little')
		biPlanes		= b'\x01\x00'
		biBitCount		= b'\x18\x00'
		biCompression	= zero
		biSizeImage		= image_size.to_bytes(4, 'little')
		biXPelsPerMeter = b'\x12\x0B\x00\x00'
		biYPelsPerMeter = b'\x12\x0B\x00\x00'
		biClrUsed		= zero
		biClrImportant	= zero

		bfSize			= (54 + image_size - 2).to_bytes(4, 'little')

		return [bfType, bfSize, bfReserved1, bfReserved2, bfOffBits, biSize, biWidth, biHeight, biPlanes, biBitCount, biCompression, \
				biSizeImage, biXPelsPerMeter, biYPelsPerMeter, biClrUsed, biClrImportant]

	toWrite_array = bmpInfo_gen(color_array) + break_array(color_array) + [b'\x00', b'\x00']
	toWrite_file = open(filename, "wb")

	for write_index in range(len(toWrite_array)):
		toWrite_file.write(toWrite_array.pop(0))
	toWrite_file.close()


def merge(image_names, mode = 'merge_v'):
	"""
	Merge three images in one, vertically or horisontally
	"""
	images 				  = []
	resulting_color_array = []

	for current_filename in image_names:
		image = ready_image(current_filename + '.bmp')
		if not image: return None
		images.append(image)

	if mode == 'merge_v':
		for image in images:
			for scanline in image:
				resulting_color_array.append(scanline)

	elif mode == 'merge_h':
		for y_index in range(len(images[0])):
			scanline = []
			for image_count in range(len(images)):
				for x_index in range(len(images[0][0])):
					scanline.append(images[image_count][y_index][x_index])
			resulting_color_array.append(scanline)
	return resulting_color_array


def ready_image(filename):
	"""
	Convert an image to color array matrix
	"""
	image = open_image(filename)
	return matrixr(image) if image else None


def dialog():
	"""
	User interface
	"""
	commands = ['help', 'exit', 'cw', 'ccw', 'flip', 'invert', 'merge_h', 'merge_v']

	def modify(filename, mode):
		"""
		Makes all the modifications with single image
		"""
		image = ready_image(filename + '.bmp')
		if mode == 'cw' or mode == 'ccw' or mode == 'flip':
			write_image(filename, rotate(image, mode))
			return 1
		elif mode == 'invert':
			write_image(filename, invert_colour(image))
			return 1
		return None


	def merger(image_names, mode = 'merge_h'):
		color_array = merge(image_names, mode)
		if not color_array: return None
		write_image(image_names[-1][:-4] + '_merged.bmp', color_array)
		return 1


	while 1:
		line = (input("Ready. Type 'help' if you don't know what to do\n")).split()
		check = len(line)
		if   check == 1:
			if line[0] == 'exit': exit(0)
			print('\n', ' '.join(commands), "\n<command> <filename>\nExample: 'cw test', 'merge_h file1 file2 file3'")
		elif check == 2:
			if not modify(line[1], line[0]): print("Something went wrong. Check what you type")
			else: print("Edited successfully.")
		elif check == 4:
			if not merger(line[1:], line[0]): print("Something went wrong. Check what you type")
			else: print("Edited successfully.")

dialog()