# -*- coding: UTF-8 -*-
from random import randint
from math import sqrt
import random

'''
import numpy
import pylab
'''
def make_fair_dice(sides):
    ''' Creation of game dice with SIDES sides
    >>> one_sided_dice = make_fair_dice(1)
    >>> one_sided_dice()
    1
    '''
    assert type(sides) == int and sides >= 1, 'Illegal value for sides'
    
    def f(): return randint(1, sides)

    return f



four_sided_dice = make_fair_dice(4)
six_sided_dice = make_fair_dice(6)


goal = 100


def draw_dice(c, f, b, s, dot):
    ''' Retruns ASCII painting representgin dice picture

     -------
    | b   f |
    | s c s |
    | f   b |
     -------

    c, f, b, s -- boolean values, True - put dot there, False - free space
    dot        -- string with length one
    '''
    assert len(dot) == 1, 'Dot must be a single symbol'
    border = ' -------'
    def draw(b):
        return dot if b else ' '
    c, f, b, s = map(draw, [c, f, b, s])
    top = ' '.join(['|', b, ' ', f, '|'])
    middle = ' '.join(['|', s, c, s, '|'])
    bottom = ' '.join(['|', f, ' ', b, '|'])
    return [border, top, middle, bottom]

def draw_multiple_dices(dices):
    border = '\t'
    top = '\t'   
    middle = '\t'
    bottom = '\t'
    for i in range(len(dices)):
        border += dices[i][0] + '\t'
        top += dices[i][1] + '\t'
        middle += dices[i][2] + '\t'
        bottom += dices[i][3] + '\t'

    print(border + '\n' + top + '\n' + middle + '\n' + bottom + '\n' + border + '\n')


def draw_number(n, dot='*'):
    ''' Return picture of dice

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
    
    if n == 1:
        return draw_dice(1, 0, 0, 0, dot)
    elif n == 2:
        return draw_dice(0, 0, 1, 0, dot)
    elif n == 3:
        return draw_dice(1, 1, 0, 0, dot)
    elif n == 4:
        return draw_dice(0, 1, 1, 0, dot)
    elif n == 5:
        return draw_dice(1, 1, 1, 0, dot)
    elif n == 6:
        return draw_dice(0, 1, 1, 1, dot)

def roll_dice(num_rolls, dice=six_sided_dice, who='Grand Jedi Master Yoda'):
    ''' Calculated number of points after NUM_ROLLS rolls of DICE dice

    num_rolls:  number of throws
    dice:       function that returns number
    who:        player's name
    '''
    assert num_rolls > 0, 'Must roll at least once.'

    sum = 0
    dices = []

    for i in range(num_rolls):
        throw = dice()
        # Add dice to the whole throwing picture
        dices.append(draw_number(throw))

        if throw == 1:
            print('\tOne of the dices is equal 1')
            draw_multiple_dices(dices)
            return 1
        else:
            sum += throw

    # Draw dices
    draw_multiple_dices(dices)

    # Touchdown
    if sum % 6 == 0:
        sum += sum // 6
        print('\t!!! Touchdown! (total number of points are multiple 6) Player earned ' + str(sum) + '!!!')

    # Hogtimus Prime
    if is_prime(sum):
        print('\t!!! Hogtimus Prime (', str(sum), 'is a prime number) !!!')
        sum = next_prime(sum)
    return sum

def take_turn(num_rolls, opponent_score, dice=six_sided_dice, who='Grand Jedi Master Yoda'):
    ''' Modeling num_rolls throws dice by WHO player.

    num_rolls:      number of throws
    opponent_score: number of opponent's points
    dice:           function that return a number
    who:            player's name
    '''
    assert num_rolls >= 0, 'Cannot roll a negative number of dice.'
    print('\tI\'m going to roll', num_rolls, 'dice')
    
    if num_rolls == 0: # Player decides not to throw a dice
        res = opponent_score // 10
    else:
        res = roll_dice(num_rolls, dice, who)

    print('\t' + who, 'earned ', res, ' points ')
    return res


def is_prime(n):
    if n == 2: return False
    for i in range(2, int(sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True
    
def next_prime(n):
    i = n+1
    while True:
        if is_prime(i): return i 
        i += 1


def announce(outcome, who):
    ''' Выводит на экран описание броска who с результатом outcome.'''
    print(who, 'rolled a', outcome)
    print(draw_number(outcome))



def num_allowed_dice(score, opponent_score):
    ''' Retruns maximum number of dices that player can throw 
    
    >>> num_allowed_dice(1, 0)
    10
    >>> num_allowed_dice(5, 7)
    10
    >>> num_allowed_dice(7, 10)
    1
    >>> num_allowed_dice(13, 24)
    1
    '''
    # Hog Tied
    if (score + opponent_score) % 10 == 7:
        print('\t!!! Hog Tied (player can throw no more than one dice) !!!')
        return 1
    else: 
        return 10


def select_dice(score, opponent_score):
    ''' Выбираем 4-х сторонний кубик, если сумма очков обоих игроков является
    множителем 7, иначе выбираем 6-и сторонний кубик.

    >>> select_dice(4, 24) == four_sided_dice
    True
    >>> select_dice(16, 64) == six_sided_dice
    True
    '''
    if (score + opponent_score) % 7 == 0 and (score + opponent_score) != 0:
        print('\t!!! Hog wild (player throws four sided dices) !!!')
        return four_sided_dice
    else:
        return six_sided_dice

def always_roll(n):
    ''' Returns the strategy in which players always make same amount of rolls '''

    def strategy(player, score, opponent_score):
        # Determine maximum number of rolls
        max_rolls = num_allowed_dice(score, opponent_score)
        # Determine the dice
        dice = select_dice(score, opponent_score)
        return take_turn(n, opponent_score, dice, player)

    return strategy

def make_comeback_strategy(margin, num_rolls = 5):

    def strategy(player, score, opponent_score):
        # Determine maximum number of rolls
        max_rolls = num_allowed_dice(score, opponent_score)
        # Determine the dice
        dice = select_dice(score, opponent_score)
        if max_rolls > 1:
            if opponent_score - score > margin:
                print('\tOpponents score is much greater than mine, let\'s throw ', num_rolls + 1, ' dices')
                return take_turn(num_rolls + 1, opponent_score, dice, player)
            else:
                return take_turn(num_rolls, opponent_score, dice, player)
        else:
            print('\tUnfurtunately I\'m allowed to throw at most 1 dice')
            return take_turn(1, opponent_score, dice, player)

    return strategy

def make_mean_strategy(min_points, num_rolls=5):

    def strategy(player, score, opponent_score):
        bacon_points = opponent_score // 10 + 1

        # Determine maximum number of rolls
        max_rolls = num_allowed_dice(score, opponent_score)
        # Determine the dice
        dice = select_dice(score, opponent_score)

        if bacon_points >= min_points:
            print('\tI see that I can get ', str(bacon_points), ' if I throw no dises. Let\'s throw no dice :-(')          
            return take_turn(0, opponent_score, dice, player)
        elif score + bacon_points % 7 == 0:
            print('\tI see Hog Wild rule in future. Let\'s throw no dices and spoil him everything')
            return take_turn(0, opponent_score, dice, player)
        elif score + bacon_points % 10 == 7:
            print('\tI see that Hog Tied rule in future. Let\'s throw no dices and spoil him everything')
            return take_turn(0, opponent_score, dice, player)
        elif max_rolls == 1:
            print('\tUnfurtunately I\'m allowed to throw at most 1 dice')
            return take_turn(1, opponent_score, dice, player)
        else:
            return take_turn(num_rolls, opponent_score, dice, player)

    return strategy
    
def make_my_strategy(num_rolls = 5):
    
    def strategy(player, score, opponent_score):
        bacon_points = opponent_score // 10 + 1

        # Determine maximum number of rolls
        max_rolls = num_allowed_dice(score, opponent_score)
        # Determine the dice
        dice = select_dice(score, opponent_score)
        
        if bacon_points + score >= 100:
            print('\tI see finish nearby. Let\'s not to risk...')
            return take_turn(0, opponent_score, dice, player)
        elif score + bacon_points % 7 == 0:
            print('\tI see Hog Wild rule in future. Let\'s throw no dices and spoil him everything')
            return take_turn(0, opponent_score, dice, player)
        elif score + bacon_points % 10 == 7:
            print('\tI see that Hog Tied rule in future. Let\'s throw no dices and spoil him everything')
            return take_turn(0, opponent_score, dice, player)
        elif max_rolls == 1:
            print('\tUnfurtunately I\'m allowed to throw at most 1 dice')
            return take_turn(1, opponent_score, dice, player)
        else:
            return take_turn(num_rolls, opponent_score, dice, player)
            
    return strategy

def play(strategy0, strategy1, goal = 100):
    ''' Game '''
    score1, score2 = 0, 0

    player1 = 'Player1'
    player2 = 'Player2'
    iter = 0

    while max(score1, score2) < goal:
        print('\n\n ------------------------------ Step ', iter, '-------------------------------------\n')
        print('Player1: ')
        score1 += strategy0(player1, score1, score2)
        print('\tHis result equeals', score1, '\n')

        print()

        if score1 <= goal:
            print('Player2: ')
            score2 += strategy1(player2, score2, score1)
            print('\tHis result equals', score2, '\n')
            print()

        iter += 1

    if score1 >= goal:
        print('Player 1 win')
        return True
    else:
        print('Player 2 win')
        return False


def make_average(fn, num_samples = 100):
    ''' Returns the function that returns average value of NUM_SAMPLES results '''

    def make_average_and_return(*args):
        s = 0
        for i in range(num_samples):
            s += fn(*args)
        return s / float(num_samples)

    return make_average_and_return

def compare_strategies(strategy, baseline=always_roll(5)):
    """ Return the ratio between winning of STRATEGY against BASELINE """
    as_first = make_average(play)(strategy, baseline)
    return as_first


def eval_strategy_range(make_strategy, lower_bound, upper_bound):
    """ Return the tuple in which the first element is 
    the best number of rolls in MAKE_STRATEGY,
    against always-roll-5. The number of rolls are
    in range between LOWER_BOUND and UPPER_BOUND.
    second is x-axis for plot (range)
    thirt is y-axis for plot (values)
    """
    best_value, best_win_rate = 0, 0
    value = lower_bound
    values = []
    while value <= upper_bound:
        strategy = make_strategy(value)
        win_rate = compare_strategies(strategy)
        values.append(win_rate)
        print('Win rate against the baseline using', value, 'value:', win_rate)
        if win_rate > best_win_rate:
            best_win_rate, best_value = win_rate, value
        value += 1
    return (best_value, list(range(lower_bound, upper_bound+1)), values)


def run_experiments():
    """ Launch experiment series for strategies comparison """
    
    if False: # Always roll
        exp = eval_strategy_range(always_roll, 1, 10)
        pylab.plot(exp[1], exp[2])
        pylab.title('Always roll strategy')
        pylab.xlabel('Fixed number of rolls')
        pylab.ylabel('Ratio of winnigns with always-roll-5')
        pylab.show()

    if False: # Comeback strategy        
        exp = eval_strategy_range(make_comeback_strategy, 1, 15)
        pylab.plot(exp[1], exp[2])
        pylab.title('Comeback strategy')
        pylab.xlabel('Margin of loss')
        pylab.ylabel('Ratio of winnig')
        pylab.show()
    
    if False:
        exp = eval_strategy_range(make_mean_strategy, 1, 10)
        pylab.plot(exp[1], exp[2])
        pylab.title('Mean strategy')
        pylab.xlabel('Margin of free bacon')
        pylab.ylabel('Ratio of winnigns')
        pylab.show()
        
    if True: # Common plot
        always_val, comeback_val, mean_val, my_val = [], [], [], [] 
        always_str = always_roll(5)
        comeback_str = make_comeback_strategy(12)
        mean_str = make_mean_strategy(9)
        my_str = make_my_strategy()
        
        for i in range(20):
            always_val.append(compare_strategies(always_str))
            comeback_val.append(compare_strategies(comeback_str))
            mean_val.append(compare_strategies(mean_str))
            my_val.append(compare_strategies(my_str))
            
        pylab.plot(list(range(20)), always_val)
        pylab.plot(list(range(20)), comeback_val)
        pylab.plot(list(range(20)), mean_val)
        pylab.plot(list(range(20)), my_val)
        pylab.title('Comparison of all strategies')
        pylab.xlabel('Sets of 100 plays')
        pylab.ylabel('Ratio of winning')
        pylab.legend(('Always roll the same', 'Comeback', 'Mean strategy', 'My strategy'))
        pylab.show()

#run_experiments()
#strategy0 = make_comeback_strategy(5)
#my_strategy = make_my_strategy()
#print(compare_strategies(my_strategy))
strategy0 = make_comeback_strategy(10)
strategy1 = make_comeback_strategy(9)
play(strategy0, strategy1)
