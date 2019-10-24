from random import randint
from math import sqrt

def make_fair_dice(sides):
    assert type(sides) == int and sides >= 1, 'Illegal value for sides'
    def dice():
        return randint(1, sides)
    return dice

four_sided_dice = make_fair_dice(4)
six_sided_dice  = make_fair_dice(6)

goal = 100

player_1 = "Fender"
player_2 = "Gibson"

players_score = {player_1: 0, player_2: 0}

def roll_dice(num_rolls, who):
	#rules

	#hog tied
	if players_score[player_1] + players_score[pla]