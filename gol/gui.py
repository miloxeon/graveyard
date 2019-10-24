import pygame
import mouse
import font 
from os import listdir
from os.path import isfile, join
import random
import time

pygame.init()

BLACK = (  0,   0,   0)
WHITE = (255, 255, 255)
BLUE =  (  0,   0, 255)
GREEN = (  0, 255,   0)
RED =   (255,   0,   0)
CYAN =  (  0, 255, 255)
#colours are marked as GAY because it's not real rainbow
GAY_GREEN  =   (  0, 214,  86)
GAY_YELLOW =   (255, 234,   0)
GAY_ORANGE =   (255, 174,   1)
GAY_RED    =   (255,   1,  73)
GAY_PURPLE =   (173,   0, 179)
GAY_BLUE   =   (  1, 145, 255)
SURF_GREEN =   (  0, 228, 155)

RAINBOW = [GAY_GREEN, GAY_YELLOW, GAY_ORANGE, GAY_RED, GAY_PURPLE, GAY_BLUE, SURF_GREEN]
size = [600, 600] 
screen = pygame.display.set_mode(size)
pygame.display.set_caption("Game of Life")
icon = pygame.image.load('icon.ico')
label_font = pygame.font.Font('font.ttf', 14)
pygame.display.set_icon(icon)

ALIVE = (  173,   0, 179)
DEAD =  (  180, 180, 255)
colours = [DEAD] + RAINBOW + [BLACK] + [WHITE] + [CYAN]
colours_names = ['Sky', 'Green', 'Yellow', 'Orange', 'Red', 'Purple', 'Blue', 'Surf', 'Black', 'White', 'Cyan']


def group(list, n):
    new_list = []
    current_row = []
    index = 0
    for row in range(n):
        for col in range(n):
            current_row.append(list[index])
            index += 1
        new_list.append(current_row)
        current_row = []
    return new_list


def file_to_field(filename):
    array = open(filename).read()
    line = []
    field = []
    current_row = []
    new_field = []
    for c in array:
        if c in 'o.':
            line.append(c)
    field = group(line, 50)
    for row in range(len(field)):
        for col in range(len(field[row])):
            if field[row][col] == 'o':
                current_row.append(0)
            else:
                current_row.append(1)
        new_field.append(current_row)
        current_row = []
    return new_field


def show(field, mode, colour_dead, colour_alive):
    i = 50
    leng = 600 // i
    current_colour = colour_dead
    if mode == 'acid_party':
        current_colour = RAINBOW[random.randint(0, 6)]
    screen.fill(current_colour)
    for row in range(i):
        for col in range(i):
            rect = pygame.Rect(row*leng, col*leng, leng, leng)
            if field[col][row] == 0:
                if mode == 'normal':
                    colour = colour_alive
                elif mode =='rainbow':
                    colour = RAINBOW[random.randint(0, 6)]
                elif mode == 'acid_party':
                    colour = RAINBOW[6]
                pygame.draw.rect(screen, colour, rect, 0)

            
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
    if field[row][col] == 0:
        self = -1
    else:
        self = 0
    for now_row in range(-1, 2):
        for now_col in range(-1, 2):
            current_row = fix(row + now_row, field)
            current_col = fix(col + now_col, field)
            if field[current_row][current_col] == 0:
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
            if field[y][x] == 0:
                hype += 1
    return hype


def next_gen(field):
    """
    returns next generation of field
    """
    new_row = []
    new_field = []
    for row in range(len(field)):
        for col in range(len(field[row])):
            if is_living(row, col, field):
                new_row.append(0)
            else:
                new_row.append(1)
        new_field.append(new_row)
        new_row = []
    return new_field


def create_new(colour_dead, colour_alive):
    """
    allow user to create his own pattern from scratch
    """
    field = file_to_field('empty.txt')
    clock = pygame.time.Clock()
    done = False
    while not done:
        clock.tick(40)
        show(field, 'normal', colour_dead, colour_alive)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                exit(0)
            if event.type == pygame.KEYDOWN and event.key == pygame.K_RETURN:
                done = True
            if event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE:
                done = True  
            if event.type == pygame.MOUSEBUTTONDOWN:
                row = pygame.mouse.get_pos()[1] // 12
                col = pygame.mouse.get_pos()[0] // 12
                if field[row][col] == 1:
                    field[row][col] = 0
                else:
                    field[row][col] = 1
        pygame.display.flip()
    return field


def pos_to_index(mouse_col, mouse_row, labels_positions):
    """
    convert label's position to it's index
    """
    if 550 <= mouse_row <= 600 and 0 <= mouse_col <= 200:
        return 'mode_changed'

    if 580 <= mouse_row <= 600 and 430 <= mouse_col <= 440:
        return 'back_changed-'
    if 580 <= mouse_row <= 600 and 550 <= mouse_col <= 560:
        return 'back_changed+'

    if 560 <= mouse_row < 580 and 430 <= mouse_col <= 440:
        return 'life_changed-'
    if 560 <= mouse_row < 580 and 550 <= mouse_col <= 560:
        return 'life_changed+'

    if 198 <= mouse_col <= 388:
        for i in range(len(labels_positions)):
            if labels_positions[i] <= mouse_row <= labels_positions[i] + 13:
                return i
    return 'new_chosen'


def searcher(list, element):
    for current_index in range(len(list)):
        if list[current_index] == element:
            return current_index


def menu(prev_mode, prev_back, prev_life):
    """
    choose the pattern to draw
    please forgive me my rough coding style, once i said " 'tis but a scratch ", it's very difficult to code without hands
    """
    done = False
    pygame.font.init()
 #   label_font = pygame.font.Font(pygame.font.match_font('pressstart2p'), 14)   #get some maitenance things done
    clock = pygame.time.Clock()
    mode = prev_mode
    mode_array = ['normal', 'rainbow', 'acid_party']   #mode changer
    colour_dead = prev_back 
    colour_alive = prev_life
    mode_iter = searcher(mode_array, mode)
    back_colour_iter = searcher(colours, prev_back)
    life_colour_iter = searcher(colours, prev_life)  
    files_path = 'c:/gol/patterns'
    files_list = [f for f in listdir(files_path) if isfile(join(files_path,f))]   #get all the presets to make a files list
    labels_list = []
    labels_positions = []  #for filenames

    if len(files_list) > 0:
        is_files = True
        back_size = [233, len(files_list) * 19 + 17]    #dynamical list length O_o
        back_pos  = [(600 - back_size[0]) // 2, (600 - back_size[1] - 50) // 2]
        back = pygame.Rect(back_pos[0], back_pos[1], back_size[0], back_size[1])
        back_fill = pygame.Rect(back_pos[0] + 3, back_pos[1] + 3, back_size[0] - 5, back_size[1] - 5) 
    else:
        return ['new', mode, colour_dead, colour_alive]

    load_button_size = [back_size[0], 40]
    load_button_pos  = [back_pos[0], back_pos[1] + back_size[1] + 8]
    load_button = pygame.Rect(load_button_pos[0], load_button_pos[1], load_button_size[0], load_button_size[1])
    load_button_fill = pygame.Rect(load_button_pos[0] + 3, load_button_pos[1] + 3, load_button_size[0] - 5, load_button_size[1] - 5)
    load_button_label = label_font.render('Create new', 0, BLACK)   # make create button
    arrow_inc = label_font.render('>', 0, BLACK)
    arrow_dec = label_font.render('<', 0, BLACK)

    for current_file in files_list:
        label = label_font.render(current_file, 0, BLACK)
        labels_list.append(label)      #fill our list with filenames
    for i in range(len(labels_list)): 
        labels_positions.append(back_pos[1] + 10 + i * 17)     #fill special list with filenames' positions to draw them
    background = pygame.Surface((600, 600))
    background.fill(DEAD)

    screen.fill(BLACK)
    for alpha_iter in range(0, 255, 4):
        background.set_alpha(alpha_iter)
        screen.fill(BLACK)
        screen.blit(background, (0, 0))
        pygame.display.update()          #cool fade-in

    while not done:
        clock.tick(40)
        for event in pygame.event.get():
            if event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE:
                done = True
            if event.type == pygame.QUIT:
                exit(0)
            if event.type == pygame.MOUSEBUTTONDOWN:
                row = pygame.mouse.get_pos()[1]
                col = pygame.mouse.get_pos()[0]
                z = pos_to_index(col, row, labels_positions)  #check what preset have you chosen 
                if type(z) == type(str()):
                    if z == 'new_chosen':  #if you want to create new
                        return ['new', mode_array[mode_iter], colour_dead, colour_alive]

                    elif z == 'mode_changed':  #if you changed mode
                        if mode_iter == 2:
                            mode_iter = 0
                        else:
                            mode_iter += 1
                        mode = mode_array[mode_iter]

                    elif z == 'back_changed+':
                        if back_colour_iter >= len(colours_names) - 1:
                            back_colour_iter = 0
                        else:
                            back_colour_iter += 1
                        colour_dead = colours[back_colour_iter]

                    elif z == 'back_changed-':
                        if back_colour_iter <= 0:
                            back_colour_iter = len(colours_names) - 1
                        else:
                            back_colour_iter -= 1
                        colour_dead = colours[back_colour_iter]

                    elif z == 'life_changed+':
                        if life_colour_iter >= len(colours_names) - 1:
                            life_colour_iter = 0
                        else:
                            life_colour_iter += 1
                        colour_alive = colours[life_colour_iter]

                    elif z == 'life_changed-':
                        if life_colour_iter <= 0:
                            life_colour_iter = len(colours_names) - 1
                        else:
                            life_colour_iter -= 1
                        colour_alive = colours[life_colour_iter]

                elif type(z) == type(int()):  #basic case, start playing with some preset and your mode
                    return ['patterns//' + files_list[z], mode, colour_dead, colour_alive]

        screen.fill(DEAD)
        pygame.draw.rect(screen, BLACK, back, 4)              
        pygame.draw.rect(screen, WHITE, back_fill, 0)          #draw and fill list's back
        pygame.draw.rect(screen, BLACK, load_button, 4)
        pygame.draw.rect(screen, WHITE, load_button_fill, 0)    #draw create button
        screen.blit(load_button_label, (load_button_pos[0] + 42, load_button_pos[1] + 13))  #spawn words "Create new"

        mode_label = label_font.render('Mode: ' + mode, 0, BLACK)   
        screen.blit(mode_label, (10, 580))            #mode changing engine

        life_colour_label = label_font.render('Life colour: ', 0, BLACK)
        life_colour_name = label_font.render(colours_names[life_colour_iter], 0, BLACK)
        screen.blit(life_colour_label, (250, 560))
        screen.blit(arrow_dec, (430, 560))
        screen.blit(life_colour_name, (450, 560))
        screen.blit(arrow_inc, (550, 560))

        background_colour_label = label_font.render('Back colour: ', 0, BLACK)
        background_colour_name = label_font.render(colours_names[back_colour_iter], 0, BLACK)
        screen.blit(background_colour_label, (250, 580))
        screen.blit(arrow_dec, (430, 580))
        screen.blit(background_colour_name, (450, 580))
        screen.blit(arrow_inc, (550, 580))
        for i in range(len(labels_list)):
            screen.blit(labels_list[i], (back_pos[0] + 10, labels_positions[i]))  #spawn list

        pygame.display.flip()


def start_live(field, mode, colour_dead, colour_alive):
    """
    makes it
    """
    done = False
    pause = False
    clock = pygame.time.Clock()
    while not done:
        clock.tick(40)
        for event in pygame.event.get():
            if event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE:
                done = True
            if event.type == pygame.QUIT:
                exit(0)
            if event.type == pygame.KEYDOWN and event.key == pygame.K_RETURN:
                if pause:
                    pause = False
                else:
                    pause = True
            if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
                field = next_gen(field)
        hype_count = life_counter(field)
        if hype_count == 0:
            done = True
        if not pause:
            field = next_gen(field)
        show(field, mode, colour_dead, colour_alive)
        pygame.display.update()
    pygame.display.flip()


def start_screen():
    done = False
    pygame.font.init()
    clock = pygame.time.Clock()
    start_font = pygame.font.Font('font.ttf', 28)
    background = pygame.image.load('menu.png')
    screen.blit(background, (0, 0))
    colour_iter = 0
    while not done:
        clock.tick(40)
        screen.blit(background, (0, 0))
        screen.blit(start_font.render('Press any key', 0, RAINBOW[colour_iter]), (130, 470))   
        if colour_iter > 5:
            colour_iter  = 0
        colour_iter += 1
        pygame.display.update()
        for event in pygame.event.get():
            if event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE:
                exit(0)
            if event.type == pygame.QUIT:
                exit(0)
            if event.type == pygame.KEYDOWN:
                screen.fill(BLACK)
                for alpha_iter in range(255, 0, -4):
                    background.set_alpha(alpha_iter)
                    screen.fill(BLACK)
                    screen.blit(background, (0, 0))
                    pygame.display.update()                    
                done = True
    pygame.display.flip()



def game_init():
    done = False
    start_screen()
    current_mode = 'normal'
    current_dead_colour = DEAD
    current_alive_colour = ALIVE
    while not done:
        parametres = menu(current_mode, current_dead_colour, current_alive_colour)
        if not parametres:
            exit(0)
        current_mode = parametres[1]
        current_dead_colour = parametres[2]
        current_alive_colour = parametres[3]
        if parametres[0] == 'new':
            start_live(create_new(parametres[2], parametres[3]), parametres[1], parametres[2], parametres[3])
        else:
            start_live(file_to_field(parametres[0]), parametres[1], parametres[2], parametres[3])
        for event in pygame.event.get():
            if event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE:
                done = True
            if event.type == pygame.QUIT:
                exit(0)


game_init()