#include <stdio.h>
#include <stdlib.h>

int main()
{


    int i, j;
    int **x=(int**)malloc(10*sizeof(int));
    for(i=0; i<10; i++)
        x[i]=(int*)malloc(10*sizeof(int));


    for (i=0; i<10; i++)
    {
        for(j=0; j<10; j++)
        {
            x[i][j]=rand()%2;
            printf("%d ", x[i][j]);
        }
        printf("\n");
    }

}

