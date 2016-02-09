#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QTime>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    clockInit ();
    timerInit ();

}

MainWindow::~MainWindow()
{
    delete ui;
}

//Time updates only when button is clicked, needs to update continuously.
void MainWindow::on_update_clicked()
{

    // update time display every second
    timer -> start (1000);
    showTime ();

}

//clears the digital display
void MainWindow::on_reset_clicked()
{

    timer -> stop ();
    setTime (QTime (0,0,0));
    showTime ();

}

void MainWindow::showTime ()
{

    QString textTime = currTime.toString (Qt::TextDate);
    // 12 hour
    if (currMode == 0)
    {
        ui->Display->setDigitCount (8);
    } else if (currMode == 1) {
        ui->Display->setDigitCount (10);
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

void MainWindow::clockInit ()
{

    // set up clock display
    ui->Display->setSegmentStyle (QLCDNumber::Filled);
    setMode (1); // 24 hour
    setTime (QTime(0, 0, 0)); // midnight
    showTime ();

}

void MainWindow::timerInit ()
{

    // set up timer
    timer = new QTimer (this);
    connect (timer, SIGNAL (timeout()), this, SLOT (updateTime()));
    connect (timer, SIGNAL (timeout()), this, SLOT (showTime()));

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

