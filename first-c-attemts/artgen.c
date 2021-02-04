#include <stdio.h>
#include <stdlib.h>

void art(int x, int y)
{
    int i, a, b;

    int **z=(int**)malloc(10*sizeof(int));
    for(i=0; i<10; i++)
        z[i]=(int*)malloc(10*sizeof(int));




    system("cls");
    printf("%c", 201);
    for(a=0; a<y; a++)
    printf("%c", 205);
    printf("%c", 187);
    printf("\n");

    for(a=0; a<x; a++)
    {
        printf("%c", 186);
        for(b=0; b<y; b++)
        {
            z[a][b]=rand()%3+176;
            printf("%c", z[a][b]);
        }
        printf("%c", 186);
        printf("\n");
    }

    printf("%c", 200);
    for(a=0; a<x; a++)
    printf("%c", 205);
    printf("%c", 188);

    printf("\n");
    printf("Bellissimo!");






}

int main()
{
    while(getch()!=27)
        {
            art(10, 10);
        }

    return 0;







}
