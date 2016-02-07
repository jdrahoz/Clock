// source : http://doc.qt.io/qt-5/qtwidgets-widgets-digitalclock-example.html

#include <QApplication>

#include "clock.h"

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    Clock clock;
    clock.show();
    return app.exec();
}
