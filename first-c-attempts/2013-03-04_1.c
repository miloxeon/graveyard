#include <stdio.h>
#include <stdlib.h>
typedef unsigned short int usi;
usi** initmatrix(usi n, usi m)
{
    usi **tmp=(usi**)malloc(n*sizeof(usi));
    usi i;
    for(i=0; i<n; i++)
        tmp[i]=(usi *)malloc(m*sizeof(usi));
    return tmp;
}

void initvalues(usi **matrix, usi n, usi m, usi _rand)
{
    usi i, j;
    for(i=0; i<n; i++)
        for(j=0; j<m; j++)
        matrix[i][j]=rand()%_rand;
}


void showmatrix(usi **matrix, usi n, usi m)
{
    usi i, j;
    for(i=0; i<n; i++)
    {
        for(j=0; j<m; j++)
            printf("%d ", matrix[i][j]);
        printf("\n");

    }
}

void writematrix(usi **matrix, usi n, usi m)
{
    usi i, j;
    FILE *f;

    f=fopen("file.bin", "wb");
    for(i=0; i<n; i++)
    {
        for(j=0; j<m; j++){
            printf("%d ", matrix[i][j]);
            fwrite(&matrix[i][j], sizeof(usi), 1, f);
        }
        printf("\n");

    }
}

 int main()
 {
     usi **m;
     m=initmatrix(20, 20);
    initvalues(m, 10, 10, 50);
     showmatrix(m, 10, 10);
     writematrix(m, 10, 10);
     return 0;
 }
