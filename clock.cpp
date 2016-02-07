// source : http://doc.qt.io/qt-5/qtwidgets-widgets-digitalclock-example.html


//#include <QtWidgets>
#include <QtGui>

#include "clock.h"

Clock::Clock(QWidget *parent)
    : QLCDNumber(parent)
{
    setSegmentStyle(Filled);

    QTimer *timer = new QTimer(this);
    connect(timer, SIGNAL(timeout()), this, SLOT(showTime()));
    timer->start(1000);

    showTime();

    setWindowTitle(tr("Clock"));
    resize(450, 60);
}

void Clock::showTime()
{

    QTime time = QTime::currentTime();//need to fix further
    setDigitCount(11);
    QString text = time.toString("hh:mm:ss:tt");
    display(text);
}
