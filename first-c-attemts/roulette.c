#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

int main()
{
    int x;
    puts("Welcome to notorious Russian Roulette.");
    puts("Press any key to spin the revolver");
    if (getch())
        puts("Spinning");
    for(x=0; x<10; x++)
    {
        printf(".");
        Sleep(100);
    }
    judge();
    return 0;
}


void judge()
{
    int a;
    srand(time(NULL));
    a=rand()%2;
    if (a==0)
    {
        puts("");
        puts("Ouch! You're dead.");
    }

    else


    {
        puts("");
        puts("Congratulations! You're alive!");
        getch();
    }

    return 0;
}


