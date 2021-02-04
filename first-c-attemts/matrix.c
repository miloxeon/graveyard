#include <stdio.h>
#include <stdlib.h>

int main()

{
    char c;
    puts("1. Enter values");
    puts("2. Exit");
    c=getch();
    menu(c);
    return 0;
}

void getmatrix(int i, int j, char a)
{
    int d[10][10], x, y;
    for(x=0; x<j; x++)
    {
        for(y=0; y<i; y++)
        {
            d[x][y]=a;
            printf("%c ", d[x][y]);
        }
        printf("\n");
    }
}

void menu(char c)
{
    switch(c)
    {
        case '1':
            val();
            break;
        case '2':
            exit(0);
            break;
        case 'default':
            puts("Error");
    }
}

void val()
{
    int i, j, a;
    puts("Enter X");
    scanf("%d", &i);
    puts("Enter Y");
    scanf("%d", &j);
    puts("Enter value");
    scanf("%d", &a);
    getmatrix(i, j, a);

    return 0;
}
