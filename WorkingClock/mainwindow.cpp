/**
*	@file mainwindow.cpp
* 	@author Quinten Wiley, Julia Drahozal, Omar Alzubbi, Kate Strombom
*	@date 2016.02.12
*
*/
#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QTime>

// --------------------------------------------------------------------
// --------------------- CONSTRUCTOR & DESTRUCTOR ---------------------
// --------------------------------------------------------------------

MainWindow::MainWindow (QWidget *parent) :
    QMainWindow (parent),
    ui (new Ui::MainWindow)
{

    // initialize
    ui -> setupUi (this);
    clockInit ();
    timerInit ();
    timer -> start (1000);

}

MainWindow::~MainWindow ()
{

    delete timer;
    delete ui;

}

// --------------------------------------------------------------------
// ------------------------------- INIT -------------------------------
// --------------------------------------------------------------------

// initialize digital display
void MainWindow::clockInit ()
{

    ui->Display->setSegmentStyle (QLCDNumber::Filled);
    setMode (0); // 24 hour
    setTime (QTime (0, 0, 0)); // midnight
    ampm = 0;
    showTime ();

}

// intialize timer
void MainWindow::timerInit ()
{

    timer = new QTimer (this);
    //every time the timer hits 1000 ms, call update time and show time
    connect (timer, SIGNAL (timeout ()), this, SLOT (updateTime()));
    connect (timer, SIGNAL (timeout ()), this, SLOT (showTime()));

}

// --------------------------------------------------------------------
// -------------------------- EVENT HANDLERS --------------------------
// --------------------------------------------------------------------

// UPDATE: updates the digital display
void MainWindow::on_update_clicked ()
{

    // check that clock input is valid
    if (isValidInput ())
    {
        // get mode from checkbox
        // 24 hour
        if (! (ui -> mode -> isChecked ())) {
            setMode (0);
            // 12 hour
        } else {
            setMode (1);
        }


        // get time from text input
        QString timeStr = ui -> timeEdit -> text ();
        int hour = (timeStr.at (0).digitValue ()) * 10 + timeStr.at (1).digitValue ();
        int min = (timeStr.at (2).digitValue ()) * 10 + timeStr.at (3).digitValue ();
        int sec = (timeStr.at (4).digitValue ()) * 10 + timeStr.at (5).digitValue ();

        // get ampm from checkbox
        if (currMode == 1 and !(hour > 12 or hour == 0)) {
            // 12 hour
            if (currMode == 1)
            {
                if (ui -> am -> isChecked ()) {
                    ampm = 0;
                } else {
                    ampm = 1;
                }
            }
        }

        setTime (QTime (hour, min, sec));

        // 24 hour
        if (currMode == 0)
        {
            updateAMPM ();
        }
        // clear checkboxes
        ui -> mode -> setChecked (false);
        ui -> am -> setChecked (false);

    }
    // restart timer and display
    timer -> start (1000);
    showTime ();
}

// RESET: clears the digital display
void MainWindow::on_reset_clicked ()
{

    // clear set options
    ui -> mode -> setChecked (false);
    ui -> am -> setChecked (false);
    ui -> timeEdit -> setText ("000000");

    // reset time and display
    timer -> stop ();
    setMode (0);
    setTime (QTime (0,0,0));
    timer -> start (1000);
    showTime ();

}

// --------------------------------------------------------------------
// --------------------------- CLOCK METHODS --------------------------
// --------------------------------------------------------------------


// shows time on digital display
void MainWindow::showTime ()
{

    // format string for display
    wrap12hour ();
    QString textTime = currTime.toString (Qt::TextDate);

    // 24 hour
    if (currMode == 0)
    {
        ui -> Display -> setDigitCount (8);

    // 12 hour
    } else if (currMode == 1) {
        ui -> Display -> setDigitCount (11);
        // am
        if (ampm == 0)
        {
            textTime = textTime + " A ";
        // pm
        } else if (ampm == 1)
        {
            textTime = textTime + " P ";
        }
    }

    ui -> Display -> display (textTime);

}

// change currTime to new time
void MainWindow::setTime (QTime newTime)
{

    currTime = newTime;
    wrap12hour ();

}

// change currMode to new mode
void MainWindow::setMode(int newMode)
{

    currMode = newMode;
    wrap12hour ();
    updateAMPM ();

}

// update currTime by one second
void MainWindow::updateTime ()
{

    currTime = currTime.addSecs (1);
    wrap12hour ();
    updateAMPM ();

}

// update ampm to reflect new time
void MainWindow::updateAMPM ()
{

    // 24 hour
    if (currMode == 0)
    {

        // am
        if (currTime.hour () < 12)
        {
            ampm = 0;
        // pm
        } else if (currTime.hour () >= 12) {
            ampm = 1;
        }

    // 12 hour
    } else if (currMode == 1) {

        // 12:00 am or pm
        if (currTime.hour () == 12 and currTime.minute () == 00 and currTime.second () == 00)
        {

            // toggle ampm
            if (ampm == 0)
            {
                ampm = 1;
            } else if (ampm == 1) {
                ampm = 0;
            }

        }

    }

}

// in 12 hour mode, wrap for pm and midnight
void MainWindow::wrap12hour ()
{

    if (currMode == 1)
    {

        int sec = currTime.second ();
        int min = currTime.minute ();
        int hour = currTime.hour ();

        // wrap for pm
        if (hour > 12) {
            currTime = QTime (hour-12, min, sec);
            ampm = 1;
        // wrap for midnight
        } else if (hour == 0) {
            currTime = QTime (12, min, sec);
            ampm = 0;

        }

    }

}

// check that clock input is valid
bool MainWindow::isValidInput ()
{

    QString text = ui -> timeEdit -> text ();

    // wrong number characters
    if (text.length () != 6)
    {
        return false;
    }

    // not all numbers
    bool ok;
    text.toInt (&ok, 10);
    if (ok == false)
    {
        return false;
    }

    // h m or s too big
    int hour = (text.at (0).digitValue ()) * 10 + text.at (1).digitValue ();
    int min = (text.at (2).digitValue ()) * 10 + text.at (3).digitValue ();
    int sec = (text.at (4).digitValue ()) * 10 + text.at (5).digitValue ();
    if (hour < 0 or hour >= 24)
    {
        return false;
    }
    if (min < 0 or min >= 60)
    {
        return false;
    }
    if (sec < 0 or sec >= 60)
    {
        return false;
    }

    // passed all tests
    return true;
}


