from random import randint
from math import sqrt
def make_fair_dice(sides):
    ''' Создание игральной кости с количеством сторон sides 
    >>> one_sided_dice = make_fair_dice(1)
    >>> one_sided_dice()
    1
    '''

    assert type(sides) == int and sides >= 1, 'Illegal value for sides'
    def dice():
        return randint(1, sides)
    return dice

four_sided_dice = make_fair_dice(4)
six_sided_dice  = make_fair_dice(6)

goal = 100

def roll_dice(num_rolls, dice=six_sided_dice, who='Grand Jedi Master Yoda'):
    ''' Вычисляет количество очков для игрока who после num_rolls бросков
    игральной кости dice.

    num_rolls:  Количество бросков, которое необходимо выполнить
    dice:       Функция без аргументов, которая возвращает целое число
    who:        Имя игрока
    '''
    assert type(num_rolls) == 'int', 'num_rolls must be an integer.'
    assert num_rolls > 0, 'Must roll at least once.'
    score = 0
    for i in range(num_rolls):
        score += dice()
    return score


def take_turn(num_rolls, opponent_score, dice=six_sided_dice, who='Grand Jedi Master Yoda'):
    ''' Моделирует num_rolls бросоков (возможно 0) игральной кости 
    dice игрока who.

    num_rolls:      Количество бросков, которое необходимо выполнить
    opponent_score: Количество очков у оппонента
    dice:           Функция без аргументов, которая возвращает целое число
    who:            Имя текущего игрока
    '''
    assert type(num_rolls) == int, 'num_rolls must be an integer.'
    assert num_rolls >= 0, 'Cannot roll a negative number of dice.'
    if commentary:
        print(who, 'is going to roll', num_rolls, 'dice')
    score = 0
    if num_rolls == 0:
        score = opponent_score // 10 + 7
        print(who, ' is gained ', score, ' points')
    else:
        for i in range(num_rolls):
            current_score = dice()
            score += current_score
            draw_number(current_score)
            print(who, ' is gained ', score, ' points')
    return score


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


def announce(outcome, who):
    ''' Выводит на экран описание броска who с результатом outcome.'''
    print(who, 'rolled a', outcome)
    print(draw_number(outcome))


def draw_dice(c, f, b, s, dot):
    ''' Вовзращает ASCII рисунок, представляющий бросок кубика.

     -------
    | b   f |
    | s c s |
    | f   b |
     -------

    c, f, b, s -- булевы значения; нужно или нет поместить точки 
                  в соответствующие позиции.
    dot        -- строка длиной 1, для представления точки.
    '''
    assert len(dot) == 1, 'Dot must be a single symbol'
    border = ' -------'
    def draw(b):
        return dot if b else ' '
    c, f, b, s = map(draw, [c, f, b, s])
    top = ' '.join(['|', b, ' ', f, '|'])
    middle = ' '.join(['|', s, c, s, '|'])
    bottom = ' '.join(['|', f, ' ', b, '|'])
    return '\n'.join([border, top, middle, bottom, border])


def draw_number(n, dot='*'):
    ''' Возвращает текстовое представление выпавших очков n. Если число имеет 
    несколько возможных представлений (например, 2 или 3), то выбрано может
    быть любое.

    >>> print(draw_number(3))
     -------
    |     * |
    |   *   |
    | *     |
     -------

    >>> print(draw_number(5))
     -------
    | *   * |
    |   *   |
    | *   * |
     -------

    >>> print(draw_number(6, '$'))
     -------
    | $   $ |
    | $   $ |
    | $   $ |
     -------
    '''
    return draw_dice(n % 2 != 0, n >= 4, n >= 3, n == 6 or n == 2, dot)


def num_allowed_dice(score, opponent_score):
    ''' Возвращает максимальное количество кубиков, которое может выбрать игрок.
    Максимальное число кубиков 1, если сумма очков обоих игроков оканчивается 
    на 7, в противном случае 10.

    >>> num_allowed_dice(1, 0)
    10
    >>> num_allowed_dice(5, 7)
    10
    >>> num_allowed_dice(7, 10)
    1
    >>> num_allowed_dice(13, 24)
    1
    '''
    return 1 if (score + opponent_score) % 10 == 7 else 10


def select_dice(score, opponent_score):
    ''' Выбираем 4-х сторонний кубик, если сумма очков обоих игроков является
    множителем 7, иначе выбираем 6-и сторонний кубик.

    >>> select_dice(4, 24) == four_sided_dice
    True
    >>> select_dice(16, 64) == six_sided_dice
    True
    '''
    return four_sided_dice if (score + opponent_score) % 7 == 0 else six_sided_dice


def play():
    ''' Игра '''
    pass