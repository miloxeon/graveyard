#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int main(void)
{
    char *str;
    str=malloc(100*sizeof(char));
    int l_current=0; // ƒлина текущего слова
    int l_result=0;  // ƒлина наибольшего слова
    int n=0;         // »ндекс конца наибольшего слова
    int i;

    printf("Enter the string: ");
    gets(str);
    //проходим по строке, провер€€ границы слов. Ќаходим самое длинное слово, сохран€ем его длину в соответствующую переменную
    for(i=0; i<=strlen(str); i++)
    {
        if(str[i]!=' ' && str[i]!='\0')
        {
            l_current++;
        }
        else
        {
            if(l_current>l_result)
            {
                l_result=l_current;
                n=i-1;
            }
            l_current=0;
        }
    }


    // ¬ начало наибольшего слова
    i=n;
    while (i!=0 && str[i-1]!=' ')
        i--;

    while (str[i]!=' ' && str[i]!='\0')
    {
        if (str[i]!=' ')
            printf("%c" ,str[i]);
        i++;
    }

    printf("%s %d", "\nThe length of the word:", l_result);
}
