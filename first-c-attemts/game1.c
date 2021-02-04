#include <stdio.h>
#include <stdlib.h>
#define N 20
#define M 20
#define UP 72
#define DN 80
#define LFT 75
#define RGT 77
#define EXT 27
#define ACT 32
#define OK 0
#define ERR 1
typedef unsigned short int usi;


char *initworld(const usi ysize, const usi xsize)
{
    char **mem=(char**)malloc(N*sizeof(char*));
    usi i;
    for(i=0; i<N; i++)
        mem[i]=(char *)malloc(M*sizeof(char));
    return  mem;
}

int makeworld(const usi ysize, const usi xsize, char **world, const char texture)
{
    if(!world)
        return ERR;
    usi i, j;
    for (i=0; i<N; i++)
        for(j=0; j<M; j++)
            world[i][j]=texture;
    return OK;
}
void border(int w)
{
    usi i;
    switch(w)
    {
    case 0:
        printf("%c", 201);
        for(i=0; i<N; i++)
            printf("%c", 205);
        printf("%c", 187);
        printf("\n");
        break;
    case 1:
        printf("%c", 200);
        for(i=0; i<N; i++)
            printf("%c", 205);
        printf("%c", 188);
        break;
    }
}
int showworld(char **world)
{
    if(!world)
        return ERR;
    usi i, j;
    border(0);
    for (i=0; i<N; i++)
    {

        printf("%c", 186);
        for(j=0; j<M; j++)
        {
            printf("%c", world[i][j]);

        }
        printf("%c", 186);
        printf("\n");
    }
    border(1);
    return OK;
}

int sethuman(const usi y, const usi x, char **world, char texture)
{
    if (!world)
        return ERR;
    world[y][x]=texture;
    return OK;
}

int setenemy(const usi y, const usi x, char **world, char texture)
{
    if (!world)
        return ERR;
    world[y][x]=texture;
    return OK;
}

int setshoot(const usi y, const usi x, char **world, char texture)
{
    if (!world)
        return ERR;
    world[y][x]=texture;
    return OK;
}

int checkpos(const usi xworld, const usi yworld, const usi xpos, const usi ypos)
{
    if(ypos>=yworld||xpos>=xworld||ypos<=-1||xpos<=-1)
        return ERR;
    return OK;
}
int randmove()
{
    int i, z;
    z=rand()&3;
    i=rand()%2;
    switch(z)
    {
    case 0:
        i=-i;
        break;
    case 1:
        i=0;
        break;
    case 2:
        i=i;
        break;
    }
    return i;
}

int game(usi ec)
{
    int try;
    char **world=NULL, key;
    usi i=5, j=5, si, sj, z, shoot=0, counter=0;
    usi *ex=(usi *)malloc(ec*sizeof(usi)),*ey=(usi *)malloc(ec*sizeof(usi));  //enemy x and y
    int rx=0, ry=0; //random move generator
    world=initworld(N, M);
    makeworld(N, M, world, 255);
    for(z=0; z<ec; z++)  //spawn enemies
    {
        ex[z]=rand()%5;
        ey[z]=rand()%8;
        setenemy(ex[z], ey[z], world, 1);
    }
    sethuman(i, j, world, 2);
    showworld(world);

    while(key!=EXT)
    {
        if(ec==0)
        {
            try++;
            return try;
        }
        key=getch();
        for(z=0; z<ec; z++)
        {
            rx=randmove();
            ry=randmove();
            if(counter<=5)
            {

                if(checkpos(N, M, ex[z]+rx, ey[z]+ry)!=ERR)
                {
                    setenemy(ex[z], ey[z], world, 255);
                    ex[z]=ex[z]+rx;
                    ey[z]=ey[z]+ry;
                    setenemy(ex[z], ey[z], world, 1);
                    counter++;
                }
            }
            if(counter>5)
            {
                if(checkpos(N, M, ex[z]-rx, ey[z]-ry)!=ERR)
                {
                    setenemy(ex[z], ey[z], world, 255);
                    ex[z]=ex[z]-rx;
                    ey[z]=ey[z]-ry;
                    setenemy(ex[z], ey[z], world, 1);
                    counter++;
                }
            }

            if(counter>=10)
            {
                counter=0;
            }
        }
        switch(key)
        {
        case UP:
            sethuman(i, j, world, 255);
            if (checkpos(N,M, i-1, j)!=ERR)
                i--;
            sethuman(i, j, world, 2);
            system("cls");
            showworld(world);
            break;
        case DN:
            sethuman(i, j, world, 255);
            if (checkpos(N,M, i+1, j)!=ERR)
                i++;

            sethuman(i, j, world, 2);
            system("cls");
            showworld(world);
            break;
        case LFT:
            sethuman(i, j, world, 255);
            if (checkpos(N,M, i, j-1)!=ERR)
                j--;

            sethuman(i, j, world, 2);
            system("cls");
            showworld(world);
            break;
        case RGT:
            sethuman(i, j, world, 255);
            if (checkpos(N,M, i, j+1)!=ERR)
                j++;

            sethuman(i, j, world, 2);
            system("cls");
            showworld(world);
            break;
        case ACT:
            shoot=1;
            si=i-1;
            sj=j;
            while(shoot==1)
            {
                if(checkpos(N, M, si-1, sj)!=ERR)
                {
                    system("cls");
                    si--;
                    setshoot(si, sj, world, 186);
                    for(z=0; z<ec; z++)
                    {
                        if(ex[z]==si&&ey[z]==sj)
                        {
                            setenemy(ex[z], ey[z], world, 255);
                            ec--;
                        }
                    }
                    setshoot(si+1, sj, world, 255);
                    showworld(world);
                }
                else
                {
                    shoot=0;
                    system("cls");
                    setshoot(si, sj, world, 255);
                    showworld(world);
                }

            }

        }
    }


}
int main()
{
    int try=0;
    srand(time(NULL));
    usi ec=2;


    return 0;
}
