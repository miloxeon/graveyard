#include <stdio.h>
#include <stdlib.h>
#define N 4
#define M 10
int main()
{
    FILE *f;
    int i=0;
    char x;
    char ch;
    int val;
    int e;
    char **dict=(char **)malloc(N*sizeof(char));
    int size=0;
    for(i=0; i<N; i++)
        dict[i]=(char*)malloc(M*sizeof(char));
    dict[0]="!config_";
    dict[1]="value";
    dict[3]="progress";
    dict[4]="title";

  f=fopen("config.txt", "rb");
    while((ch=fgetc(f))!=EOF)
    {
               printf("%c", ch);

    }
    while (!feof(f))
    {
        fread(&x, sizeof(x), 1, f);
        size++;

    }
    //char *conf=(char*)malloc(sizeof(char));
    //while(i!=size)
    //{
//fread(&conf[i], sizeof(char), 1, f);
    //i++;
    //}

    return 0;
}


