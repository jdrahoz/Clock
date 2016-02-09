#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QTime>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    ui->Display->setSegmentStyle (QLCDNumber::Filled);
    ui->Display->setDigitCount (11);
    setMode (0); // 24 hour
    setTime (QTime(0, 0, 0)); // midnight


}

MainWindow::~MainWindow()
{
    delete ui;
}

//void MainWindow::on_checkBox_2_clicked()
//{

//}



//void MainWindow::on_comboBox_2_activated(const QString &arg1)
//{

//}


//Time updates only when button is clicked, needs to update continuously.
void MainWindow::on_pushButton_clicked()
{

    // update time display every second
    QTimer *timer = new QTimer (this);
    connect (timer, SIGNAL (timeout()), this, SLOT (updateTime()));
    connect (timer, SIGNAL (timeout()), this, SLOT (showTime()));
    timer -> start (1000);
    showTime ();

//    QTime time = QTime::currentTime();
//    int seconds = QTime(0,0,0).secsTo(time);

//    //begin calculations for time_string
//    int minutes = seconds/60;
//    int hours = minutes/60;
//    minutes = minutes%60;
//    seconds = seconds%60;
//    QString hours_string = QString::number(hours);
//    QString minutes_string = QString::number(minutes);
//    QString seconds_string = QString::number(seconds);
//    QString time_string = hours_string + ":" + minutes_string + ":" + seconds_string;
//    //time_string is a string that displays hh:mm:ss of current time.

//    ui->Display->setDigitCount(8);
//    ui->Display->digitCount();
//    ui->Display->display(time_string);//displays time in form of a string.

}

////clears the digital display
void MainWindow::on_pushButton_2_clicked()
{
    ui->Display->display(000000);
}

void MainWindow::showTime ()
{

    QString textTime = currTime.toString (Qt::TextDate);
    // 12 hour
    if (currMode == 0)
    {
        ui->Display->setDigitCount (8);
    } else if (currMode == 1) {
        ui->Display->setDigitCount (11);
        if (ampm == 0)
        {
            textTime = textTime + " A";
        } else if (ampm == 1)
        {
            textTime = textTime + " P";
        }
    }
    ui->Display->display (textTime);

}

void MainWindow::setTime (QTime newTime)
{

    currTime = newTime;

    // wrap for 12 hour time
    if (currMode == 1)
    {

        int sec = currTime.second ();
        int min = currTime.minute ();
        // midnight
        if (currTime.hour () == 0)
        {
            currTime = QTime (12, min, sec);
        // 1 pm
        } else if (currTime.hour () == 13) {
            currTime = QTime (1, min, sec);
        }

    }
}

void MainWindow::updateTime ()
{

    currTime = currTime.addSecs (1);

    // wrap for 12 hour time
    if (currMode == 1)
    {

        int sec = currTime.second ();
        int min = currTime.minute ();
        int hour = currTime.hour ();
        // midnight
        if (hour == 0)
        {
            currTime = QTime (12, min, sec);
        // noon
        } else if (hour == 12) {
        // 1 pm
        } else if (hour == 13) {
            currTime = QTime (1, min, sec);
        }

    }

}

void MainWindow::setMode(int newMode)
{

    currMode = newMode;

}

