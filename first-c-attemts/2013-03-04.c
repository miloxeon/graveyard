#include <stdio.h>
#include <stdlib.h>

#define N 10
#define M 50
typedef unsigned short int usi;
usi** initmatrix(usi n, usi m)
{
    usi **tmp=(usi**)malloc(n*sizeof(usi));
    usi i;
    for(i=0; i<n; i++)
        tmp[i]=(usi *)malloc(m*sizeof(usi));
    return tmp;
}

