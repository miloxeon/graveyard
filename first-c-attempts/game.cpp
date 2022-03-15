#include <QtCore/QCoreApplication>



#include <stdio.h>
#include <stdlib.h>
#define N 20
#define M 20
#define UP 72
#define DN 80
#define LFT 75
#define RGT 77
#define EXT 27
#define OK 0
#define ERR 1
typedef unsigned short int usi;
char *initworld(const usi ysize, const usi xsize)
{
    char **mem=(char**)malloc(ysize*sizeof(char*));
    usi i;
    for(i=0; i<N; i++)
        mem[i]=(char *)malloc(xsize*sizeof(char));
    return *mem;
}
int hits=0;
int makeworld(const usi ysize, const usi xsize, char **world, const char texture)
{
    if(!world)
        return ERR;
    usi i, j;
    for (i=0; i<ysize; i++)
        for(j=0; j<xsize; j++)
            world[i][j]=texture;
    return OK;
}

int showworld(const usi ysize, const usi xsize, char **world)
{
    if(!world)
        return ERR;
    usi i, j;

    for (i=0; i<ysize; i++)
    {
        for(j=0; j<xsize; j++)
        {
            printf("%c", world[i][j]);
        }
        printf("%c", 219);
        printf("\n");
    }
    for(i=0; i<N+1; i++)
        printf("%c", 219);
    if(hits>=10)
    {
        puts("");
        puts("Congratulations!");
        return OK;
    }
    puts("");
    printf("%d", hits);
    printf(" hits");
    return OK;
}

int sethuman(const usi y, const usi x, char **world, char texture )
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

int setenemies(const usi y, const usi x, char **world, char texture)
{
    if (!world)
        return ERR;
    world[y][x]=texture;
    return OK;
}

int main(int argc, char *argv[])
{
    QCoreApplication p(argc, argv);
    char **world=NULL, key;
    usi i=5, j=5, a=7, b=7;

    *world=initworld(N, M);
    makeworld(N, M, world, 255);
    sethuman(i, j, world, 2);
    setenemies(a, b, world, 1);
    showworld(N, M, world);

    while(key!=EXT)
    {
        int e=rand()%4;
        setenemies(a, b, world, 255);

        if(e==0) a++;
        if(e==1) a--;
        if(e==2) b++;
        if(e==3) b--;

        if(a>=10) a==--a;
        if(a<=0) a==++a;
        if(b>=10) b==--b;
        if(b<=0) b==++b;

        system("cls");

        setenemies(a, b, world, 1);

        showworld(N, M, world);

        if(hits<10){
            key=getch();

            switch(key)
            {
            case DN:
                sethuman(i, j, world, 255);
                if (checkpos(N,M, i+1, j)!=ERR)
                    i++;

                if(!checkpos(N,M,i,j))
                {
                    system("cls");
                    sethuman(i, j, world, 2);
                    showworld(N, M, world);
                }
                if(i==a&&j==b)
                    hits++;
                break;
            case UP:
                sethuman(i, j, world, 255);
                if (checkpos(N,M, i-1, j)!=ERR)
                    i--;
                if(!checkpos(N,M,i,j))
                {
                    system("cls");
                    sethuman(i, j, world, 2);
                    showworld(N, M, world);
                }
                if(i==a&&j==b)
                    hits++;
                break;
            case LFT:
                sethuman(i, j, world, 255);
                if (checkpos(N,M, i, j-1)!=ERR)
                    j--;
                if(!checkpos(N,M,i,j))
                {
                    system("cls");
                    sethuman(i, j, world, 2);
                    showworld(N, M, world);
                }
                if(i==a&&j==b)
                    hits++;
                break;
            case RGT:
                sethuman(i, j, world, 255);
                if (checkpos(N,M, i, j+1)!=ERR)
                    j++;
                if(!checkpos(N,M,i,j))
                {
                    system("cls");
                    sethuman(i, j, world, 2);
                    showworld(N, M, world);
                }
                if(i==a&&j==b)
                    hits++;
                break;
            }
        }

    }
    return p.exec();
}
