''' From Python Practice Book. Ch1. Working With Data ''' 

''' Problem 1: What will be the output of the following program? '''


''' Problem 2: Python has a built-in function sum to find sum of all 
elements of a list. Provide an implementation for sum.

>>> sum([1, 2, 3])
>>> 4
'''
def sum(L):
    result=0
    for i in L:
        result=result+i
    return result


''' Problem 3: What happens when the above sum function is called 
with a list of strings? Can you make your sum function work for a 
list of strings as well.

>>> sum(["hello", "world"])
"helloworld"
>>> sum(["aa", "bb", "cc"])
"aabbcc"
'''
def sumx(L):
    result1=0
    result2=""
    if type(L[0])==str:
        for i in L:
            result2+=i
        return result2
    else:
        for i in L:
            result1=result1+i
        return result1


''' Problem 4: Implement a function product, to compute product of a
list of numbers.

>>> product([1, 2, 3])
6
'''
def product(L):
    result=1
    for i in L:
        result*=i
    return result


''' Problem 5: Write a function factorial to compute factorial of a 
number. Can you use the product function defined in the previous 
example to compute factorial?

>>> factorial(4)
24
'''
def factorial(n):
    L=[]
    for i in range(1,n+1):
        L.append(i)
    print(L)
    return product(L)


''' Problem 6: Write a function reverse to reverse a list. Can you 
do this without using list slicing?

>>> reverse([1, 2, 3, 4])
[4, 3, 2, 1]
>>> reverse(reverse([1, 2, 3, 4]))
[1, 2, 3, 4]
'''
def reverse(L):
    if len(L) == 1:
        return [L[0]]
    return reverse(L[1:]) + [L[0]]



''' Problem 7: Python has built-in functions min and max to compute 
minimum and maximum of a given list. Provide an implementation for 
these functions. What happens when you call your min and max 
functions with a list of strings?'''

def max(L):
    res=L[0]
    for i in L:
        if i > res:
            res = i
    return res

def min(L):
    res=L[0]
    for i in L:
        if i < res:
            res = i
    return res



''' Problem 8: Cumulative sum of a list [a, b, c, ...] is defined 
as [a, a+b, a+b+c, ...]. Write a function cumulative_sum to compute 
cumulative sum of a list. Does your implementation work for a list 
of strings?

>>> cumulative_sum([1, 2, 3, 4])
[1, 3, 6, 10]
>>> cumulative_sum([4, 3, 2, 1])
[4, 7, 9, 10]
'''
def cum_sum(L):
    res=[]
    for i in range(1, len(L)+1):
        current_element=sum(L[:i])
        res.append(current_element)
    return res





''' Problem 9: Write a function cumulative_product to compute 
cumulative product of a list of numbers. 

>>> cumulative_product([1, 2, 3, 4])
[1, 2, 6, 24]
>>> cumulative_product([4, 3, 2, 1])
[4, 12, 24, 24]
'''
def cum_pro(L):
    res=[]
    for i in range(1, len(L)+1):
        current_element=product(L[:i])
        res.append(current_element)
    return res

''' Problem 10: Write a function unique to find all the unique 
elements of a list. 

>>> unique([1, 2, 1, 3, 2, 5])
[1, 2, 3, 5]
'''
def unique(L, key):
    for i in range(len(L)):
        L[i] = key(L[i])
    list=[]
    for i in range(len(L)):
        if L[i] not in list:
            list.append(L[i])
    return sorted(list)

''' Problem 11: Write a function dups to find all duplicates in 
the list. 

>>> dups([1, 2, 1, 3, 2, 5])
[1, 2]
'''
def dups(L):
    res = []
    for i in range(len(L)):
        if L[i] in L[:i] + L[i+1:]:
            res.append(L[i])
    return unique(res)




''' Problem 12: Write a function group(list, size) that take a list 
and splits into smaller lists of given size. 

>>> group([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)
[[1, 2, 3], [4, 5, 6], [7, 8, 9]]
>>> group([1, 2, 3, 4, 5, 6, 7, 8, 9], 4)
[[1, 2, 3, 4], [5, 6, 7, 8], [9]]
'''

def group(L, size):
    res = []
    current_res = []
    step_count = (len(L)//size) if len(L)%size == 0 else len(L)//size + 1
    for current_step in range(step_count):
        current_res = L[current_step*size:(current_step+1)*size]
        res.append(current_res)
    return res


''' Problem 13: Write a function lensort to sort a list of strings 
based on length. 

>>> lensort(['python', 'perl', 'java', 'c', 'haskell', 'ruby'])
['c', 'perl', 'java', 'ruby', 'python', 'haskell']
'''
def lensort(L):

    def nickolay_sort(sort_list):
        for i in range(len(sort_list)):
            for j in range(len(sort_list) - i - 1):
                if sort_list[j][1] > sort_list[j + 1][1]:
                    sort_list[j], sort_list[j + 1] = sort_list[j + 1], sort_list[j]
        return sort_list
    names_list = []
    current_res = []
    res = []
    for current_element in L:
        current_res.append(current_element)
        current_res.append(len(current_element))
        names_list.append(current_res)
        current_res = []

    names_list = nickolay_sort(names_list)
    for current_element in names_list:
        res.append(current_element[0])
    return res


#print(lensort(['python', 'perl', 'java', 'c', 'haskell', 'ruby']))


''' Problem 14: Improve the unique function written in previous 
problems to take an optional key function as argument and use the 
return value of the key function to check for uniqueness.

>>> unique(["python", "java", "Python", "Java"], key=lambda s: s.lower())
["python", "java"] nailed it
'''
#print(unique(["python", "java", "Python", "Java"], key=lambda s: s.lower()))

''' Problem 15: Reimplement the unique function implemented in 
the earlier examples using sets. '''

def unique_set(L):
    return list(set(L))


''' Problem 16: Write a function extsort to sort a list of files 
based on extension. 

>>> extsort(['a.c', 'a.py', 'b.py', 'bar.txt', 'foo.txt', 'x.c'])
['a.c', 'x.c', 'a.py', 'b.py', 'bar.txt', 'foo.txt']
'''
def extsort(L):

    def sort(sort_list):
        for i in range(len(sort_list)):
            for j in range(len(sort_list) - i - 1):
                if len(sort_list[j][1]) > len(sort_list[j + 1][1]):
                    sort_list[j], sort_list[j + 1] = sort_list[j + 1], sort_list[j]
        return sort_list
    pre_res = []
    list_res = []
    for current_element in L:
        for index in range(len(current_element)):
            if current_element[index] == '.':
                pre_res.append(current_element[:index])
                pre_res.append(current_element[index+1:])
                list_res.append(pre_res)
                pre_res = []
    return(sort(list_res))


#print(extsort(['a.c', 'a.py', 'b.py', 'bar.txt', 'foo.txt', 'x.c']))


''' Problem 17: Write a program reverse.py to print lines of a 
file in reverse order. 

$ cat she.txt
She sells seashells on the seashore;
The shells that she sells are seashells I'm sure.
So if she sells seashells on the seashore,
I'm sure that the shells are seashore shells.

$ python reverse.py she.txt
I'm sure that the shells are seashore shells.
So if she sells seashells on the seashore,
The shells that she sells are seashells I'm sure.
She sells seashells on the seashore;
'''
###


''' Problem 18: Write a program to print each line of a file in 
reverse order. '''

###

''' Problem 19: Implement unix commands head and tail. The head 
and tail commands take a file as argument and prints its first 
and last 10 lines of the file respectively. '''

###

''' Problem 20: Implement unix command grep. The grep command takes 
a string and a file as arguments and prints all lines in the file 
which contain the specified string.

$ python grep.py she.txt sure
The shells that she sells are seashells I'm sure.
I'm sure that the shells are seashore shells.
'''
###


''' Problem 21: Write a program wrap.py that takes filename and 
width as aruguments and wraps the lines longer than width. 

$ python wrap.py she.txt 30
I'm sure that the shells are s
eashore shells.
So if she sells seashells on t
he seashore,
The shells that she sells are
seashells I'm sure.
She sells seashells on the sea
shore;
'''
###
''' Problem 22: The above wrap program is not so nice because it 
is breaking the line at middle of any word. Can you write a new 
program wordwrap.py that works like wrap.py, but breaks the line 
only at the word boundaries? 

$ python wordwrap.py she.txt 30
I'm sure that the shells are
seashore shells.
So if she sells seashells on
the seashore,
The shells that she sells are
seashells I'm sure.
She sells seashells on the
seashore;
'''
###


''' Problem 23: Write a program center_align.py to center align 
all lines in the given file. 

$ python center_align.py she.txt
  I'm sure that the shells are seashore shells.
    So if she sells seashells on the seashore,
The shells that she sells are seashells I'm sure.
       She sells seashells on the seashore
'''
###

''' Problem 24: Provide an implementation for zip function using 
list comprehensions. 

>>> zip([1, 2, 3], ["a", "b", "c"])
[(1, "a"), (2, "b"), (3, "c")]
'''
def zip(list_1, list_2):
    out_list = []
    length = min((len(list_1), len(list_2)))
    for i in range(length):
        out_list.append([list_1[i], list_2[i]])
    return out_list

#print(zip([1, 2, 3], ["a", "b", "c"]))


''' Problem 25: Python provides a built-in function map that 
applies a function to each element of a list. Provide an 
implementation for map using list comprehensions. 

>>> def square(x): return x * x
...
>>> map(square, range(5))
[0, 1, 4, 9, 16]
'''
def square(x): return x * x

def map(func, count):
    out_list = []
    for i in count:
        out_list.append(func(i))
    return out_list

#print(map(square, range(5)))

''' Problem 26: Python provides a built-in function filter(f, a) 
that returns items of the list a for which f(item) returns true. 
Provide an implementation for filter using list comprehensions.

>>> def even(x): return x %2 == 0
...
>>> filter(even, range(10))
[0, 2, 4, 6, 8]
'''
def even(x): return x % 2 == 0

def filter(func, count):
    out_list = []
    for i in count:
        if func(i):
            out_list.append(i)
    return out_list

#print(filter(even, range(10)))


''' Problem 27: Write a function triplets that takes a number n 
as argument and returns a list of triplets such that sum of first 
two elements of the triplet equals the third element using numbers 
below n. Please note that (a, b, c) and (b, a, c) represent same 
triplet. 

>>> triplets(5)
[(1, 1, 2), (1, 2, 3), (1, 3, 4), (2, 2, 4)]
'''
def triplets(n):
    triplets_list = []
    for value_1 in range(1, n):
        for value_2 in range(1, n):
            for value_3 in range(1, n):
                if value_1 + value_2 == value_3:
                    if sorted((value_1, value_2, value_3)) not in triplets_list:
                        triplets_list.append(sorted((value_1, value_2, value_3)))
    return triplets_list

#print(triplets(5))

''' Problem 28: Write a function enumerate that takes a list and 
returns a list of tuples containing (index,item) for each item in 
the list. 

>>> enumerate(["a", "b", "c"])
[(0, "a"), (1, "b"), (2, "c")]
>>> for index, value in enumerate(["a", "b", "c"]):
...     print index, value
0 a
1 b
2 c
'''
def enumerate(L):
    enumerated_list = []
    for index in range(len(L)):
        value = L[index]
        enumerated_list.append((index, value))
    return enumerated_list

''' Problem 29: Write a function array to create an 2-dimensional 
array. The function should take both dimensions as arguments. 
Value of each element can be initialized to None: 

>>> a = array(2, 3)
>>> a
[[None, None, None], [None, None, None]]
>>> a[0][0] = 5
[[5, None, None], [None, None, None]]
'''
def array(dim_y, dim_x):
    out_list = []
    current_list = []
    for y in range(dim_y):
        for x in range(dim_x):
            current_list.append(None)
        out_list.append(current_list)
        current_list = []
    return out_list


''' Problem 30: Write a python function parse_csv to parse csv 
(comma separated values) files. 

>>> print open('a.csv').read()
a,b,c
1,2,3
2,3,4
3,4,5
>>> parse_csv('a.csv')
[['a', 'b', 'c'], ['1', '2', '3'], ['2', '3', '4'], ['3', '4', '5']]
'''
def parse_csv(filename):
    f = open(filename)
    if not f:
        print("No file")
        return 1

    out_list     = []
    current_list = []

    for line in f:
        for symbol in line:
            if symbol != '\n' and symbol != ',':
                current_list.append(symbol)
        out_list.append(current_list)
        current_list = []
    return out_list

#print(parse_csv('a.csv'))



''' Problem 31: Generalize the above implementation of csv parser 
to support any delimiter and comments. 

>>> print open('a.txt').read()
# elements are separated by ! and comment indicator is #
a!b!c
1!2!3
2!3!4
3!4!5
>>> parse('a.txt', '!', '#')
[['a', 'b', 'c'], ['1', '2', '3'], ['2', '3', '4'], ['3', '4', '5']]
'''
def parse(filename, separator_key, comment_key):
    f = open(filename)
    if not f:
        print("No file")
        return 1

    out_list     = []
    current_list = []
    lines = []
    lines_to_parse = []
    current_line = ''

    symbol_index = 0
    line_index = 0

    for line in f:
        lines.append(line)

    while line_index < len(lines):
        while symbol_index < len(lines[line_index]):
            current_symbol = lines[line_index][symbol_index]
            if current_symbol == '#':
#                if line_index + 1 == len(lines):
#                    symbol_index = len(lines[line_index])
                symbol_index = 0
                line_index += 1 
            else:
                current_line += current_symbol
                symbol_index += 1
        lines_to_parse.append(current_line)
        current_line = ''
        line_index += 1
        symbol_index = 0

    for line in lines_to_parse:
        for symbol in line:
            if symbol != '\n' and symbol != separator_key:
                current_list.append(symbol)
        out_list.append(current_list)
        current_list = []
    return out_list

#print(parse('a.csv', '!', '#'))

''' Problem 32: Write a function mutate to compute all words 
generated by a single mutation on a given word. A mutation is 
defined as inserting a character, deleting a character, replacing 
a character, or swapping 2 consecutive characters in a string. 
For simplicity consider only letters from a to z. 

>>> words = mutate('hello')
>>> 'helo' in words
True
>>> 'cello' in words
True
>>> 'helol' in words
True
'''
def mutate(word):
    out_list = []

    letters = 'abcdefghijklmnopqrstuvwxyz'
    #insert a character
    for i in range(len(word) + 1):
        for j in range(26):
            out_list.append(word[:i] + letters[j] + word[i:])

    #deleting a character
    for i in range(len(word)):
        out_list.append(word[:i] + word[i + 1:])

    #replace a character
    for i in range(len(word)):
        for j in range(26):
           out_list.append(word[:i] + letters[j] + word[i + 1:])

    #swapping a characters
    current_word = []
    out_word = ''
    for i in range(len(word) - 1):
        for j in range(i + 1, len(word)):
            current_word = []
            for symbol in word:
                current_word.append(symbol)
            current_word[i], current_word[j] = current_word[j], current_word[i]
            for symbol in current_word:
                out_word += symbol
            out_list.append(out_word)
            out_word = ''

    return out_list

''' Problem 33: Write a function nearly_equal to test whether two 
strings are nearly equal. Two strings a and b are nearly equal when 
a can be generated by a single mutation on b. 

>>> nearly_equal('python', 'perl')
False
>>> nearly_equal('perl', 'pearl')
True
>>> nearly_equal('python', 'jython')
True
>>> nearly_equal('man', 'woman')
False
'''
def nearly_equal(word1, word2):
    return word1 in mutate(word2)

def word_frequency(words):
    """Returns frequency of each word given a list of words.

        >>> word_frequency(['a', 'b', 'a'])
        {'a': 2, 'b': 1}
    """
    frequency = {}
    for w in words:
        frequency[w] = frequency.get(w, 0) + 1
    return frequency

def read_words(filename):
    return open(filename).read().split()

def main(filename):
    frequency = word_frequency(read_words(filename))
    for word, count in frequency.items():
        print (word, count)

'''if __name__ == "__main__":
    import sys
    main(sys.argv[1])
'''
''' Problem 34: Improve the above program to print the words in 
the descending order of the number of occurrences. '''
###

''' Problem 35: Write a program to count frequency of characters 
in a given file. Can you use character frequency to tell whether 
the given file is a Python program file, C program file or a text 
file? '''
###


''' Problem 36: Write a program to find anagrams in a given list 
of words. Two words are called anagrams if one word can be formed 
by rearranging letters of another. For example ‘eat’, ‘ate’ and 
‘tea’ are anagrams. 

>>> anagrams(['eat', 'ate', 'done', 'tea', 'soup', 'node'])
[['eat', 'ate', 'tea], ['done', 'node'], ['soup']]
'''
        
def some_swap(word):
    

#def anagrams(words):
print(comb([1, 2, 3]))

''' Problem 37: Write a function valuesort to sort values of a 
dictionary based on the key. 

>>> valuesort({'x': 1, 'y': 2, 'a': 3})
[3, 1, 2]
'''


''' Problem 38: Write a function invertdict to interchange keys 
and values in a dictionary. For simplicity, assume that all values 
are unique. 

>>> invertdict({'x': 1, 'y': 2, 'z': 3})
{1: 'x', 2: 'y', 3: 'z'}
'''