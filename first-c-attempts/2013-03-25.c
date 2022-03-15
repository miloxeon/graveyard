#include <stdio.h>
#include <stdlib.h>

int main()
{
    menu();
}

void arrin()
{
    FILE *f;
    f=fopen("text.txt", "wb");
    int x[15], i;
    for(i=0; i<15; i++)
    {
        x[i]=rand()%50;

        fwrite(&x[i], sizeof(int), 1, f);
        printf("%d ", x[i]);
    }
    puts("Done.");

}

void textin()
{
    FILE *f;
    f=fopen("text1.txt", "w");
    int x;
    char y[255];
    while(getch(x)!=27)
    scanf("%s", &y);
    fwrite(&y, sizeof(char), 1, f);
    puts("Done.");
}

void arrsort()
{
    FILE *f;
    f=fopen("text.txt", "rb");
    int x[15], i;

    for(i=0; i<15; i++)
    {
        fread(&x[i], sizeof(int), 1, f);
        printf("%d ", x[i]);
    }

}

void menu()
{
    char x;
    puts("1. Generate random array and write it to text.txt");
    puts("2. Enter sentence ang write it to text1.txt");
    puts("3. Put array from text.txt on the screen");
    scanf("%c", &x);


    switch(x)
    {
    case '1':
        arrin();
        break;
    case '2':
        textin();
        break;
    case '3':
        arrsort();
        break;
    default:
        puts("err");

    }
}
