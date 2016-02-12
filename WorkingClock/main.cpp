/**
*	@file main.cpp
* 	@author Quinten Wiley, Julia Drahozal, Omar Alzubbi, Kate Strombom
*	@date 2016.02.12
*
*/
#include "mainwindow.h"
#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    MainWindow w;
    w.show();

    return a.exec();
}
