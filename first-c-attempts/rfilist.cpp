//#include <QtCore/QCoreApplication>
#include <stdio.h>
#include <stdlib.h>

void parse(char *text)
{
    char *ptr;   //pointer for index_begin
    char *ptr1;  //pointer for index_end

    long int index_begin=0;
    long int index_end=0;

    long int read_pos=0;    //current reading position
    long int count_entrys=0;//number of links in file

    long int length=0;      //length of links
    long int length_final=0;//length of longest link

    int list_pos=0;        //position in list matrix

    int pos=0;
    int i;

    char search_begin[6]="href=";
    char search_end[5]="</a>";


    char **list=NULL;

    char **pre_list=NULL;


    int *array=NULL;
    int *pre_array=NULL;
    puts("entering to cycle");
    do{
        for(i=0; i<5; i++)
        {
            ptr=strchr(text, search_begin[i]);
            index_begin=(ptr-text);
        }
        count_entrys++;
        puts("search_begin");
        pre_array=(int*)realloc(array, count_entrys*sizeof(int));
        if(pre_array!=NULL)
            array=pre_array;


        for(i=0; i<4; i++)
            ptr1=strchr(text, search_end[i]);
        if(index_begin>0)
           index_end=(ptr1-text);
        else
            index_end=index_begin;
        length=index_end-index_begin-3;
        if(length>0)
        {
            if(length>length_final)
               length_final=length;
        }
        puts("length, index_end");
        printf("%d", length_final);


        list=(char**)realloc(list, count_entrys*sizeof(char*));
        puts("stub");
          for(i=0; i<length_final; i++)
          {
            list[i]=(char*)realloc(list[i], length_final*sizeof(char));
          }
//        pre_list=(char**)realloc(list, count_entrys*sizeof(char*));
//        puts("stub");
//        for(i=0; i<length_final; i++)
//            pre_list[i]=(char*)realloc(list[i], length_final*sizeof(char));

        puts("prealloc");

           **list=**pre_list;
            for(i=0; i<length_final;i++)
                list[i]=pre_list[i];
            puts("list_alloc");
            if(length>0)
            {
               array[pos]=length;
               pos++;

               for(read_pos=index_begin; read_pos<index_end; read_pos++)
               {
                   list[count_entrys][list_pos]=text[read_pos];
                   list_pos++;
               }
               count_entrys++;
            }
            list_pos=0;

            puts("copy");


        for(read_pos=0; read_pos<=index_end; read_pos++)
            text[read_pos]='0';

    }while(index_begin!=index_end);

/*    read_pos=0;
    index_begin=0;
    index_end=0;    //bringing text indexes to zero for reading
    array=(int*)malloc(count_entrys*sizeof(int));

    char **list=(char**)malloc(count_entrys*sizeof(char*)); //list of links
    for(i=0; i<length_final; i++)
        list[i]=(char*)malloc(length_final*sizeof(char));
    count_entrys=0;
    do
    {
        for(i=0; i<5; i++)
        {
            ptr=strchr(text, search_begin[i]);
            index_begin=(ptr-text);
        }
        for(i=0; i<4; i++)
            ptr1=strchr(text, search_end[i]);

        if(index_begin>0)
           index_end=(ptr1-text);
        else
            index_end=index_begin;

        length=index_end-index_begin-3;
        if(length>0)
        {
           array[pos]=length;
           pos++;

           for(read_pos=index_begin+2; read_pos<index_end-1; read_pos++)
           {
               list[count_entrys][list_pos]=text[read_pos];
               list_pos++;
           }
           count_entrys++;
        }
        list_pos=0;


        for(read_pos=0; read_pos<=index_end; read_pos++)
            text[read_pos]='0';
   }
    while(index_begin!=index_end);
    */

    for(i=0; i<count_entrys; i++)
    {
        printf("%d%c ", i+1, '.');
        for(int d=0; d<array[i]; d++)
        {
           printf("%c", list[i][d]);
        }
        printf("\n");
    }
}

int main(int argc, char *argv[])
{
    FILE *f;
    char *text;
    long int fSize;

    if((f=fopen("D:\\text.txt", "r"))==NULL)
        puts("error while opening");
    fseek(f, 0, SEEK_END);
    fSize=ftell(f);
    rewind(f);

    text=(char*)malloc(sizeof(char)*fSize);
    fread(text, sizeof(char), fSize, f);

    parse(text);
    fclose(f);
    printf("\n");
    puts("End ^_^");
    QCoreApplication a(argc, argv);
    return a.exec();
}
