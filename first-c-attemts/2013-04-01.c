#include <stdio.h>
#include <stdlib.h>

int main()
{
    int x[12][12];
    int i, j;
    for (i=0; i<24; i++)
        printf("-");
    printf("\n");
    for(i=1; i<12; i++)
    {
        printf("I");

        for(j=1; j<12; j++)
        {
            printf("%c ", ' ');

        }
        printf("I");
        printf("\n");


    }
    for (i=0; i<24; i++)
        printf("-");

}
