from math import sqrt
def is_prime(n):
    for i in range(2, int(sqrt(n)) + 1):
        if n % i == 0:
            return False
    return n != 0 and n != 1

def next_prime(n):
    i = n
    while True:
        i += 1
        if is_prime(i):
            return i

print(next_prime(1))