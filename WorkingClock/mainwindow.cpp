/**
*	@file mainwindow.cpp
* 	@author Quinten Wiley, Julia Drahozal, Omar Alzubbi, Kate Strombom
*	@date 2016.02.12
*
*/
#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QTime>
#include <time.h>
#include <ctime>

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
    stopWatchInit();
    timer -> start (1000);

    // create the button
    m_zoomIn = new QPushButton("Zoom In", this);
    // set size and location of the button
    m_zoomIn->setGeometry(QRect(QPoint(100, 100),
    QSize(200, 50)));
    // Connect button signal to appropriate slot
    connect(m_zoomIn, SIGNAL (released()), this, SLOT (on_zoomIn_clicked()));

    // create the button
    m_zoomOut = new QPushButton("Zoom Out", this);
    // set size and location of the button
    m_zoomOut->setGeometry(QRect(QPoint(500, 100),
    QSize(200, 50)));
    // Connect button signal to appropriate slot
    connect(m_zoomOut, SIGNAL (released()), this, SLOT (on_zoomOut_clicked()));

    connect(ui->spinBoxHr, SIGNAL (released()), this, SLOT ());
    connect(ui->spinBoxMin, SIGNAL (released()), this, SLOT ());
    connect(ui->spinBoxSec, SIGNAL (released()), this, SLOT ());

    ui->spinBoxHr->setRange(0, 23);
    ui->spinBoxMin->setRange(0, 59);
    ui->spinBoxSec->setRange(0, 59);

    //connnecting buttons for the timer
    connect(ui->startButtonTimer, SIGNAL (released()), this, SLOT (startTimer()));
    connect(ui->resetButtonTimer, SIGNAL (released()), this, SLOT (resetTimer()));
    connect(ui->pauseButtonTimer, SIGNAL (released()), this, SLOT (pauseTimer()));
    connect(ui->playButtonTimer, SIGNAL (released()), this, SLOT (playTimer()));

    //connecting buttons for the stopwatch
    connect(ui->startButtonStopwatch, SIGNAL (released()), this, SLOT (playStopwatch()));
    connect(ui->stopButtonStopwatch, SIGNAL (released()), this, SLOT (pauseStopwatch()));
    connect(ui->resetButtonStopwatch, SIGNAL (released()), this, SLOT (resetStopwatch()));

}

MainWindow::~MainWindow ()
{

    delete timer;
    delete ui;

}

// --------------------------------------------------------------------
// ------------------------------- INIT -------------------------------
// --------------------------------------------------------------------

void MainWindow::playStopwatch()
{
    m_playwatch=true;
}

void MainWindow::pauseStopwatch()
{
    m_playwatch=false;
}

void MainWindow::resetStopwatch()
{
    m_stopwatchseconds=0;
    m_stopwatchminutes=0;
    m_stopwatchhours=0;
}

void MainWindow::updateStopwatch()
{

}

void MainWindow::stopWatchInit()
{
    m_playwatch= false;
    ui->StopwatchDisplay->setSegmentStyle(QLCDNumber::Filled);
    ui->StopwatchDisplay->setDigitCount(6);

    connect (timer, SIGNAL (timeout ()), this, SLOT (updateStopwatch()));
}


//continues the timer
void MainWindow::playTimer()
{
    bPauseTime = false;
}

//pauses the timer
void MainWindow::pauseTimer()
{
    bPauseTime = true;
}

//displays a single zero if the timer is done
void MainWindow::timerDone()
{
    ui-> TimerDisplay ->display(0);
}

//updates the timer
void MainWindow::updateTimer()
{
    int minFactor = 100;
    int hrFactor = 10000;


        if(bPauseTime)
        {
            return;
        }
            if (secTime == 0)
            {
                secTime = 59;
                if (minTime == 0 * minFactor)
                {
                    minTime = 59* minFactor;
                    if(hrTime == 0*hrFactor)
                    {
                        secTime = 0;
                        minTime = 0;
                        timerDone();
                    }
                    else
                    {
                        hrTime = (hrTime - hrFactor);
                    }
                }
                else
                {
                    minTime = (minTime - minFactor);
                }

            }
            else
            {
                secTime--;
            }
            nowTime = hrTime+minTime+secTime;
            ui-> TimerDisplay ->display(nowTime);

    }


//checks the inputs of the timer to see if it is valid
void MainWindow::goodTimerInput()
{
    hrValue = ui->spinBoxHr->value();
    minValue = ui->spinBoxMin->value();
    secValue = ui->spinBoxSec->value();

}

//resets the timer and the inputs
void MainWindow::resetTimer()
{
    ui->spinBoxHr->setValue(0);
    ui->spinBoxMin->setValue(0);
    ui->spinBoxSec->setValue(0);
    secTime = 0;
    minTime = 0;
    hrTime = 0;
    ui-> TimerDisplay ->display(000000);
}

//starts the timer
void MainWindow::startTimer()
{
    bPauseTime = false;
    ui->TimerDisplay->setSegmentStyle (QLCDNumber::Filled);
    ui -> TimerDisplay -> setDigitCount (6);
    goodTimerInput();

    hrTime = hrValue*10000;
    minTime = minValue*100;
    secTime = secValue;

    nowTime = hrTime+minTime+secValue;
    ui-> TimerDisplay ->display(nowTime);
    //this function connects the Timer to the system timer.
    connect (timer, SIGNAL (timeout ()), this, SLOT (updateTimer()));
}


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

/**
  * Prototyping for new UI functionality
  * Zoom in, Zoom out, black screen
  */

void MainWindow::on_zoomIn_clicked()
{
    ui -> Display -> resize(1.05 * ui->Display->size());
    ui -> reset -> resize(1.05 * ui->reset->size());
    ui -> update -> resize(1.05 * ui->update->size());
    ui -> am -> resize(1.05 * ui->am->size());
    ui -> mode -> resize(1.05 * ui->mode->size());
    ui -> timeEdit -> resize(1.05 * ui->timeEdit->size());
}

void MainWindow::on_zoomOut_clicked()
{
    ui -> Display -> resize(0.95 * ui->Display->size());
    ui -> reset -> resize(0.95 * ui->reset->size());
    ui -> update -> resize(0.95 * ui->update->size());
    ui -> am -> resize(0.95 * ui->am->size());
    ui -> mode -> resize(0.95 * ui->mode->size());
    ui -> timeEdit -> resize(0.95 * ui->timeEdit->size());
}

void MainWindow::on_blackScreen_clicked()
{


}

/**
  *End Prototyping
  */

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
    }
    else if (currMode == 1)
    {
        ui -> Display -> setDigitCount (11);
        // am
        if (ampm == 0)
        {
            textTime = textTime + " A ";
        // pm
        }
        else if (ampm == 1)
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
        }
        else if (currTime.hour () >= 12)
        {
            ampm = 1;
        }

    // 12 hour
    }
    else if (currMode == 1)
    {

        // 12:00 am or pm
        if (currTime.hour () == 12 and currTime.minute () == 00 and currTime.second () == 00)
        {

            // toggle ampm
            if (ampm == 0)
            {
                ampm = 1;
            }
            else if (ampm == 1)
            {
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
        if (hour > 12)
        {
            currTime = QTime (hour-12, min, sec);
            ampm = 1;
        // wrap for midnight
        }
        else if (hour == 0)
        {
            currTime = QTime (12, min, sec);
            ampm = 0;
    //TODO: put the increment day method here
    //        if(m_calendarInitialized)
    //        {
    //          wrapDayAtMidnight();
    //        }
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
/**
void MainWindow::wrapDayAtMidnight()
{
  if(m_day<29)//just incriments day if day is not at the end of the month
  {
    m_day++;
    return;
  }
  else if(m_month==2)//handles Feb case
  {
    if(m_day==29)
    {
      m_month=3;
      m_day=1;
    }
  }
  else if(m_month==1||m_month==3||m_month==5||m_month==7||m_month==8||m_month==10||m_month==12)//handles the cases with months that have 31 days
  {
    if(m_day==29||m_day==30)//On these days the month stays the same
    {
      m_day++;
      return;
    }
    else if(m_month==12)//Specific case for december, where the year wraps
    {
      m_month=1;
      m_day=1;
      return;
    }
    else//Case for all other 31 day long months
    {
      m_month++;
      m_day=1;
      return;
    }
  }
  else
  {
    if(m_day==29)//
    {
      m_day++;
      return;
    }
  }
}
    bool MainWindow::calIsValidInput ()
{
  //gets the input from the month part of the calendar
  QString monthInput=ui->calendarEnter2->text();

  //wrong number of characters
  if(monthInput.length() >2)//TODO: take care of case with one caracter input
  {
    return false;
  }

  //ensures input is all numbers
  bool ok;
  monthInput.toInt (&ok, 10);
  if(ok==false)
  {
    return false;
  }

  //sets the value of the month int to the value given by the input
  int monthInt;//the int we'll handle later
  if(monthInput.length() ==1)//handles the case with length=1
  {
    monthInt=monthInput.at(0).digitValue();
  }
  else if(monthInput.length()==2)//handles the case with length=2
  {
    int monthInt=monthInput.at(0).digitValue() * 10 + monthInput.at(1).digitValue();
  }
  else//if length != 1||2, then return false, invalid input
  {
    return false;
  }

  //ensures that the month is within the specified bounds
  if(monthInt<1)
  {
    return false;
  }
  else if(monthInt>12)
  {
    return false;
  }


  //Gets the input from the day text box in a calendar
  Qstring dayInput =ui->calendarEnter2->text();//in qstring form, need to convert to int, check

  //checks for wrong number of characters
  if(dayInput.length() >2)//TODO: take care of case with one character input
  {
    return false;
  }


  //ensures input is all numbers
  dayInput.toInt (&ok, 10);
  if(ok==false)
  {
    return false;
  }

  //sets the value of day(int) from the value given in dayInput (String)
  int dayInt;
  if(dayInput.length() ==1)//handles case where length=1
  {
    dayInt=dayInput.at(0).digitValue();
  }
  else if(dayInput.length()==2)
  {
    dayInt=dayInput.at(0).digitValue() * 10 + dayInput.at(1).digitValue();
  }
  else
  {
    return false;
  }

  //ensures that the day is witin specified bounds
  if(dayInt<1)
  {
    return false;
  }
  else if(monthInt==1 || monthInt==3 || monthInt==5 || monthInt==7 || monthInt==8 || monthInt==10 || monthInt==12)//handles January,March, May, July,August,October,and December Case
  {
    if(dayInt>31)
    {
      return false;
    }
  }
  else if(monthInt==4|| monthInt==6 || monthInt==9 || monthInt==11)
  {
    if(dayInt>30)
    {
      return false;
    }
  }
  else if(monthInt==2)
  {
    if(dayInt>29)
    {
      return false;
    }
  }
  else
  {
    return false;
  }
  m_month=monthInt;
  m_day=dayInt;
  m_calendarInitialized=true;
  return true;
}

*/
