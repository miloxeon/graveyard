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

player_0 = "Fender"
player_1 = "Gibson"

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

commentary = True



def take_turn(num_rolls, opponent_score, dice=six_sided_dice, who='Grand Jedi Master Yoda'):
    ''' Моделирует num_rolls бросоков (возможно 0) игральной кости 
    dice игрока who.

    num_rolls:      Количество бросков, которое необходимо выполнить
    opponent_score: Количество очков у оппонента
    dice:           Функция без аргументов, которая возвращает целое число
    who:            Имя текущего игрока
    '''
    def draw_number(n, dot='*'):

        def draw_dice(c, f, b, s, dot):
            assert len(dot) == 1, 'Dot must be a single symbol'
            border = ' -------'
            def draw(b):
                return dot if b else ' '
            c, f, b, s = map(draw, [c, f, b, s])
            top = ' '.join(['|', b, ' ', f, '|'])
            middle = ' '.join(['|', s, c, s, '|'])
            bottom = ' '.join(['|', f, ' ', b, '|'])
            return '\n'.join([border, top, middle, bottom, border])
    
        return draw_dice(n % 2 != 0, n >= 4, n >= 3, n == 6 or n == 2, dot)

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

    assert type(num_rolls) == int, 'num_rolls must be an integer.'
    assert num_rolls >= 0, 'Cannot roll a negative number of dice.'
    if commentary:
        print(who, 'is going to roll', num_rolls, 'dice')

    score = 0
    pre_score = 0
    if num_rolls == 0:
        pre_score = opponent_score // 10 + 1
        #rules
        #1. Hog Tied - none
        #2. Hog Wild - none
        #3. Free Bacon - already here
        #4. Touchdown:
        if pre_score % 6 == 0: pre_score += pre_score // 6
        #5. Hogtimus Prime:
        if is_prime(pre_score): pre_score = next_prime(pre_score)
        return pre_score

    for i in range(num_rolls):
        pre_score = dice()
        print(draw_number(pre_score))
        #rules
        #1. Hog Tied - num_allowed_dice()
        #2. Hog Wild - select_dice()
        #3. Free Bacon - above
        #0. Pigout:
        if pre_score == 1: return 1
        #4. Touchdown:
        if pre_score % 6 == 0: pre_score += pre_score // 6
        #5. Hogtimus Prime:
        if is_prime(pre_score): pre_score = next_prime(pre_score)
        score += pre_score
    return score


def announce(outcome, who):
    ''' Выводит на экран описание броска who с результатом outcome.'''
    print(who, 'rolled a', outcome)
    print(draw_number(outcome))


def num_allowed_dice(score, opponent_score):
    ''' Возвращает максимальное количество кубиков, которое может выбрать игрок.
    Максимальное число кубиков 1, если сумма очков обоих игроков оканчивается 
    на 7, в противном случае 10.
    '''
    return 1 if (score + opponent_score) % 10 == 7 else 10


def select_dice(score, opponent_score):
    ''' Выбираем 4-х сторонний кубик, если сумма очков обоих игроков является
    множителем 7, иначе выбираем 6-и сторонний кубик.
    '''
    return four_sided_dice if (score + opponent_score) % 7 == 0 else six_sided_dice


def play(strategy0, strategy1, goal=100):
    score_0 = 0
    score_1 = 0

    while 1:
        num_rolls_0 = strategy0(score_0, score_1)
        if num_rolls_0 > num_allowed_dice(score_0, score_1):
            num_rolls_0 = 1
        dice_0 = select_dice(score_0, score_1)
        current_score_0 = take_turn(num_rolls_0, score_1, dice_0, player_0)
        score_0 += current_score_0
        print(score_0, 'by', score_1)
        if score_0 >= goal:
            return 0

        num_rolls_1 = strategy1(score_1, score_0)
        if num_rolls_1 > num_allowed_dice(score_1, score_0):
            num_rolls_1 = 1
        dice_1 = select_dice(score_1, score_0)
        current_score_1 = take_turn(num_rolls_1, score_0, dice_1, player_1)
        score_1 += current_score_1
        print(score_0, 'by', score_1)
        if score_1 >= goal:
            return 1







def always_roll(n):
    """ Возвращает стратегию, по которой всегда происходит N бросков.

    >>> strategy = always_roll(5)
    >>> strategy(0, 0)
    5
    >>> strategy(99, 99)
    5
    """
    def strategy(score, opponent_score):
        return n
    return strategy


def make_comeback_strategy(margin, num_rolls=5):
    ''' Если игрок проигрывает своему оппоненту MARGIN очков, то он делает
    NUM_ROLLS + 1 бросков, иначе NUM_ROLLS. '''
    def strategy(score, opponent_score):
    	return num_rolls + 1 if margin else num_rolls
    return strategy



def make_mean_strategy(min_points, num_rolls=5):
    ''' Игрок выбрает сделать 0 бросков если:
    - количество очков, полученное по правилу Free Bacon Rule (см. файл
      с описанием правил игры) не меньше MIN_POINTS.
    - сумма очков после выбора 0 бросков будет множителем 7 или оканчиваться
      на 7 (в соответствии с правилами игры) '''
    def strategy(score, opponent_score):
    	gain = opponent_score  // 10 + 1
    	return 0 if gain >= min_points or gain == 7 or gain == 1 or gain % 10 == 7 else num_rolls
    return strategy


def make_average(fn, num_samples=100):
    ''' Принимает функцию FN как аргумент и возвращает другую функцию FOO
    (имя FOO дано для простоты, назовите свою функцию иначе), которая
    принимает такое же количество аргументов как и FN. Разница между FN и FOO
    заключается в том, что FOO возвращает среднее арифметическое от NUM_SAMPLES
    вызовов функции FN.

    >>> avg_score = make_average(roll_dice)
    >>> avg_score(2, dice)
    6.0

    Для реализации этой функции вам нужно понять как работать с переменным
    числом аргументов. Ниже приведен пример, который вам нужно разобрать:
    >>> def printed(fn):
    ...     def print_and_return(*args):
    ...         result = fn(*args)
    ...         print('Result:', result)
    ...         return result
    ...     return print_and_return
    >>> printed_pow = printed(pow)
    >>> printed_pow(2, 8)
    Result: 256
    256
    '''
    def func(*args, **kvargs):
    	for a in range(num_samples): a += fn(*args, **kvargs)
    	return a // num_samples 
    return func


def compare_strategies(strategy, baseline=always_roll(5)):
    """ Вернуть среднее отношение побед STRATEGY против BASELINE """
    as_first = 1 - make_average(play)(strategy, baseline)
    as_second = make_average(play)(baseline, strategy)
    return (as_first + as_second) / 2


def eval_strategy_range(make_strategy, lower_bound, upper_bound):
    """ Возвращает лучшее число бросков для MAKE_STRATEGY, которое нужно
    использовать против стратегии always-roll-5. Число бросков находится
    в диапазоне между LOWER_BOUND и UPPER_BOUND.
    """
    best_value, best_win_rate = 0, 0
    value = lower_bound
    while value <= upper_bound:
        strategy = make_strategy(value)
        win_rate = compare_strategies(strategy)
        print('Win rate against the baseline using', value, 'value:', win_rate)
        if win_rate > best_win_rate:
            best_win_rate, best_value = win_rate, value
        value += 1
    return best_value

def run_experiments():
    """ Запускает серию экспериментов для сравнения стратегий. """
    if True: # Change to False when done testing always_roll
        result = eval_strategy_range(always_roll, 1, 10)
        print('Best always_roll strategy:', result)

    if False: # Change to True when ready to test make_comeback_strategy
        result = eval_strategy_range(make_comeback_strategy, 5, 15)
        print('Best comeback strategy:', result)

    if False: # Change to True when ready to test make_mean_strategy
        result = eval_strategy_range(make_mean_strategy, 1, 10)
        print('Best mean strategy:', result)


def final_strategy(score, opponent_score):
    ''' Ваша задача реализовать такую стратегию игры, чтобы побеждать как минимум
    в 60% случаев. Вы можете использовать идеи из предыдущих стратегий и 
    добавлять свои. Например, можно ввести такое правило:
    
    Если вы близки к набору 100 очков, возможно не нужно бросать большое
    количество костей '''
    return 0 if opponent_score > 80 else 5


def interactive_strategy(score, opponent_score):
    """ Пример интерактивной стратегии """
    print('Current score:', score, 'to', opponent_score)
    while True:
        response = input('How many dice will you roll? ')
        try:
            result = int(response)
        except ValueError:
            print('Please enter a positive number')
            continue
        if result < 0:
            print('Please enter a non-negative number')
        else:
            return result


def play_interactively():
    """ Играть с использованием интерактивной стратегии. """
    global commentary
    commentary = True
    print("Shall we play a game?")
    winner = play(interactive_strategy, always_roll(5))
    if winner == 0:
        print("You win!")
    else:
        print("The computer won.")


def play_basic():
    """ Обе стратегии являются базовыми."""
    global commentary
    commentary = True
    winner = play(always_roll(5), always_roll(6))
    if winner == 0:
        print("Player 1, who always wants to roll 5, won.")
    else:
        print("Player 2, who always wants to roll 6, won.")

#play(always_roll(5), always_roll(3))
play_interactively()
#compare_strategies(final_strategy)