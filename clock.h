// source : http://doc.qt.io/qt-5/qtwidgets-widgets-digitalclock-example.html


#ifndef CLOCK_H
#define CLOCK_H

#include <QLCDNumber>

class Clock : public QLCDNumber
{
    Q_OBJECT

public:
    Clock(QWidget *parent = 0);

private slots:
    void showTime();
};

#endif
