/**
*	@file mainwindow.cpp
* 	@author Quinten Wiley, Julia Drahozal, Omar Alzubbi, Kate Strombom
*           Edited by: Will Teeple, Michael Wang, Austin Bailey, Tim Elvart
*	@date 2016.02.12 created
*         2016.2.6 edited last
*
*/
#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QTime>
#include <time.h>
#include <ctime>

//// --------------------------------------------------------------------
//// --------------------- CONSTRUCTOR & DESTRUCTOR ---------------------
//// --------------------------------------------------------------------

MainWindow::MainWindow (QWidget *parent) :
    QMainWindow (parent),
    ui (new Ui::MainWindow)
{

    //// initialize
    ui -> setupUi (this);

    clockInit ();
    timerInit ();
    stopWatchInit();
    timer -> start (1000);

    /// create the button
    m_zoomIn = new QPushButton("Zoom In", this);
    /// set size and location of the button
    m_zoomIn->setGeometry(QRect(QPoint(100, 100),
    QSize(200, 50)));
    /// Connect button signal to appropriate slot
    connect(m_zoomIn, SIGNAL (released()), this, SLOT (on_zoomIn_clicked()));

    /// create the button
    m_zoomOut = new QPushButton("Zoom Out", this);
    /// set size and location of the button
    m_zoomOut->setGeometry(QRect(QPoint(500, 100),
    QSize(200, 50)));
    /// Connect button signal to appropriate slot
    connect(m_zoomOut, SIGNAL (released()), this, SLOT (on_zoomOut_clicked()));

    connect(ui->spinBoxHr, SIGNAL (released()), this, SLOT ());
    connect(ui->spinBoxMin, SIGNAL (released()), this, SLOT ());
    connect(ui->spinBoxSec, SIGNAL (released()), this, SLOT ());

    ui->spinBoxHr->setRange(0, 23);
    ui->spinBoxMin->setRange(0, 59);
    ui->spinBoxSec->setRange(0, 59);

    startedTimer = false;

    ///connnecting buttons for the timer
    connect(ui->startButtonTimer, SIGNAL (released()), this, SLOT (startTimer()));
    connect(ui->resetButtonTimer, SIGNAL (released()), this, SLOT (resetTimer()));
    connect(ui->pauseButtonTimer, SIGNAL (released()), this, SLOT (pauseTimer()));
    connect(ui->playButtonTimer, SIGNAL (released()), this, SLOT (playTimer()));

    ///connecting buttons for the stopwatch
    connect(ui->startButtonStopwatch, SIGNAL (released()), this, SLOT (playStopwatch()));
    connect(ui->stopButtonStopwatch, SIGNAL (released()), this, SLOT (pauseStopwatch()));
    connect(ui->resetButtonStopwatch, SIGNAL (released()), this, SLOT (resetStopwatch()));

    ///connecting buttons for calendar
    connect(ui->calendarButton, SIGNAL (released()), this, SLOT (writeCalendarString()));

    m_calendarInitialized=false;
}

MainWindow::~MainWindow ()
{

    delete timer;
    delete ui;

}

/// --------------------------------------------------------------------
/// ------------------------------- INIT -------------------------------
/// --------------------------------------------------------------------

///tells the stopwatch to continue advancing its count
void MainWindow::playStopwatch()
{
    m_playwatch=true;
}

///tells the stopwatch to stop advancing its count
void MainWindow::pauseStopwatch()
{
    m_playwatch=false;
}

///resets the stopwatch at 0:0:0
void MainWindow::resetStopwatch()
{
    m_playwatch=false;
    m_stopwatchseconds=0;
    m_stopwatchminutes=0;
    m_stopwatchhours=0;
    QString temp="0:0:0";

    ui->StopwatchDisplay->display(temp);
}

///advances time in the stopwatch and displays it
void MainWindow::updateStopwatch()
{
    if (m_playwatch==true)
    {
        m_stopwatchseconds++;

        if (m_stopwatchseconds>59)
        {
            m_stopwatchminutes++;
            m_stopwatchseconds=0;

            if (m_stopwatchminutes>59)
            {
                m_stopwatchhours++;
                m_stopwatchminutes=0;
            }
        }
          m_stopWatchString=QString::number(m_stopwatchhours) + ":" + QString::number(m_stopwatchminutes) + ":" + QString::number(m_stopwatchseconds);
          ui->StopwatchDisplay->display(m_stopWatchString);
    }
    else
    {
        return;
    }
}

///initialize stopwatch variables, connections, and ui properties
void MainWindow::stopWatchInit()
{
    m_playwatch= false;
    QString temp="0:0:0";
    m_stopwatchseconds=0;
    m_stopwatchminutes=0;
    m_stopwatchhours=0;

    ui->StopwatchDisplay->setSegmentStyle(QLCDNumber::Filled);
    ui->StopwatchDisplay->setDigitCount(8);
    ui->StopwatchDisplay->display(temp);

    connect (timer, SIGNAL (timeout ()), this, SLOT (updateStopwatch()));
}


///continues the timer
void MainWindow::playTimer()
{
    bPauseTime = false;
}

///pauses the timer
void MainWindow::pauseTimer()
{
    bPauseTime = true;
}

///displays a single zero if the timer is done
void MainWindow::timerDone()
{
    ui-> TimerDisplay ->display(0);
}

///updates the timer
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


///checks the inputs of the timer to see if it is valid
void MainWindow::goodTimerInput()
{
    hrValue = ui->spinBoxHr->value();
    minValue = ui->spinBoxMin->value();
    secValue = ui->spinBoxSec->value();

}

///resets the timer and the inputs
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

///starts the timer
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
    ///this function connects the Timer to the system timer.
    if(startedTimer == false)
    {
        startedTimer = true;
        connect (timer, SIGNAL (timeout ()), this, SLOT (updateTimer()));
    }
}


/// initialize digital display
void MainWindow::clockInit ()
{

    ui->Display->setSegmentStyle (QLCDNumber::Filled);
    setMode (0); /// 24 hour
    setTime (QTime (0, 0, 0)); /// midnight
    ampm = 0;
    showTime ();

}

/// intialize timer
void MainWindow::timerInit ()
{

    timer = new QTimer (this);
    ///every time the timer hits 1000 ms, call update time and show time
    connect (timer, SIGNAL (timeout ()), this, SLOT (updateTime()));
    connect (timer, SIGNAL (timeout ()), this, SLOT (showTime()));



}

/// --------------------------------------------------------------------
/// -------------------------- EVENT HANDLERS --------------------------
/// --------------------------------------------------------------------

/// UPDATE: updates the digital display
void MainWindow::on_update_clicked ()
{

    /// check that clock input is valid
    if (isValidInput ())
    {
        /// get mode from checkbox
        /// 24 hour
        if (! (ui -> mode -> isChecked ())) {
            setMode (0);
            /// 12 hour
        } else {
            setMode (1);
        }


        /// get time from text input
        QString timeStr = ui -> timeEdit -> text ();
        int hour = (timeStr.at (0).digitValue ()) * 10 + timeStr.at (1).digitValue ();
        int min = (timeStr.at (2).digitValue ()) * 10 + timeStr.at (3).digitValue ();
        int sec = (timeStr.at (4).digitValue ()) * 10 + timeStr.at (5).digitValue ();

        /// get ampm from checkbox
        if (currMode == 1 and !(hour > 12 or hour == 0)) {
            /// 12 hour
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

        /// 24 hour
        if (currMode == 0)
        {
            updateAMPM ();
        }
        /// clear checkboxes
        ui -> mode -> setChecked (false);
        ui -> am -> setChecked (false);

    }
    /// restart timer and display
    timer -> start (1000);
    showTime ();
}

/// RESET: clears the digital display
void MainWindow::on_reset_clicked ()
{

    /// clear set options
    ui -> mode -> setChecked (false);
    ui -> am -> setChecked (false);
    ui -> timeEdit -> setText ("000000");

    /// reset time and display
    timer -> stop ();
    setMode (0);
    setTime (QTime (0,0,0));
    timer -> start (1000);
    showTime ();
}

/**
  * Prototyping for new UI functionality
  * Zoom in, Zoom out, black screen (implemented in ui file)
  */

void MainWindow::on_zoomIn_clicked()
{
    ui -> Display -> resize(1.05 * ui->Display->size()); ///increase size of main display
    ///ui -> reset -> resize(1.05 * ui->reset->size()); ///increase size of reset button
    ///ui -> update -> resize(1.05 * ui->update->size()); ///increase size of update button
    ///ui -> am -> resize(1.05 * ui->am->size()); ///increase size of AM checkbox
    ///ui -> mode -> resize(1.05 * ui->mode->size()); ///increase size of mode checkbox
    ///ui -> timeEdit -> resize(1.05 * ui->timeEdit->size()); ///increase size of time edit box
    ui -> TimerDisplay -> resize(1.05 * ui->TimerDisplay->size()); ///increase size of timer display
    ui -> StopwatchDisplay -> resize(1.05 * ui->StopwatchDisplay->size()); ///increase size of stopwatch display
}

void MainWindow::on_zoomOut_clicked()
{
    ui -> Display -> resize(0.95 * ui->Display->size()); ///decrease size of main display
    ///ui -> reset -> resize(0.95 * ui->reset->size()); ///decrease size of reset button
    ///ui -> update -> resize(0.95 * ui->update->size()); ///decrease size of update button
    ///ui -> am -> resize(0.95 * ui->am->size()); ///decrease size of AM checkbox
    ///ui -> mode -> resize(0.95 * ui->mode->size()); ///decrease size of mode checkbox
    ///ui -> timeEdit -> resize(0.95 * ui->timeEdit->size()); ///decrease size of time edit box
    ui -> TimerDisplay -> resize(0.95 * ui->TimerDisplay->size()); ///decrease size of timer display
    ui -> StopwatchDisplay -> resize(0.95 * ui->StopwatchDisplay->size()); ///decrease size of stopwatch display
}

/**
  *End Prototyping
  */

/// --------------------------------------------------------------------
/// --------------------------- CLOCK METHODS --------------------------
/// --------------------------------------------------------------------


/// shows time on digital display
void MainWindow::showTime ()
{

    /// format string for display
    ///wrap12hour ();
    QString textTime = currTime.toString (Qt::TextDate);

    /// 24 hour
    if (currMode == 0)
    {
        ui -> Display -> setDigitCount (8);

    /// 12 hour
    }
    else if (currMode == 1)
    {
        ui -> Display -> setDigitCount (11);
        /// am
        if (ampm == 0)
        {
            textTime = textTime + " A ";
        /// pm
        }
        else if (ampm == 1)
        {
            textTime = textTime + " P ";
        }
    }

    ui -> Display -> display (textTime);

}

/// change currTime to new time
void MainWindow::setTime (QTime newTime)
{

    currTime = newTime;
    wrap12hour ();

}

/// change currMode to new mode
void MainWindow::setMode(int newMode)
{

    currMode = newMode;
    wrap12hour ();
    updateAMPM ();

}

/// update currTime by one second
void MainWindow::updateTime ()
{

    currTime = currTime.addSecs (1);
    wrap12hour ();
    updateAMPM ();

}

/// update ampm to reflect new time
void MainWindow::updateAMPM ()
{

    /// 24 hour
    if (currMode == 0)
    {

        /// am
        if (currTime.hour () < 12)
        {
            ampm = 0;
        /// pm
        }
        else if (currTime.hour () >= 12)
        {
            ampm = 1;
        }

    /// 12 hour
    }
    else if (currMode == 1)
    {

        /// 12:00 am or pm
        if (currTime.hour () == 12 and currTime.minute () == 00 and currTime.second () == 00)
        {

            /// toggle ampm
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

/// in 12 hour mode, wrap for pm and midnight

void MainWindow::wrap12hour ()
{
       int sec = currTime.second ();
       int min = currTime.minute ();
       int hour = currTime.hour ();

    if (currMode == 1)
    {


        /// wrap for pm
        if (hour > 12)
        {
            currTime = QTime (hour-12, min, sec);
            ampm = 1;
        /// wrap for midnight
        }
        else if (hour == 0)
        {
            currTime = QTime (12, min, sec);
            ampm = 0;
            ///addittion for calendar

        }
    }

    if((hour==0)&&(min==0)&&(sec==0))
    {
        if(m_calendarInitialized)
        {
            wrapDayAtMidnight();
            writeCalendarString();
        }
    }
}

/// check that clock input is valid
bool MainWindow::isValidInput ()
{

    QString text = ui -> timeEdit -> text ();

    /// wrong number characters
    if (text.length () != 6)
    {
        return false;
    }

    /// not all numbers
    bool ok;
    text.toInt (&ok, 10);
    if (ok == false)
    {
        return false;
    }

    /// h m or s too big
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

    /// passed all tests
    return true;
}

void MainWindow::wrapDayAtMidnight()
{
  if(m_day<29)///just incriments day if day is not at the end of the month
  {
    m_day++;
    return;
  }
  else if(m_month==2)///handles Feb case
  {
///     ui->CalendarEdit->setText("Got here");///debugging
    if(m_day==29)
    {
      m_month=3;
      m_day=1;
    }
  }
  else if(m_month==1||m_month==3||m_month==5||m_month==7||m_month==8||m_month==10||m_month==12)///handles the cases with months that have 31 days
  {
    if(m_day==29||m_day==30)///On these days the month stays the same
    {
      m_day++;
      return;
    }
    else if(m_month==12)///Specific case for december, where the year wraps
    {
      m_month=1;
      m_day=1;
      return;
    }
    else///Case for all other 31 day long months
    {
      m_month++;
      m_day=1;
      return;
    }
  }
  else if(m_month=4||m_month==6||m_month==9||m_month==11)
  {
      if(m_day==29)
      {
          m_day++;
      }
      else if(m_day==30)
      {
          m_month++;
          m_day=1;
      }
  }
  else
  {
    if(m_day==29)///
    {
      m_day++;
      return;
    }
  }
}

bool MainWindow::calIsValidInput ()
{
  ///gets the input from the month part of the calendar
  QString monthInput=ui->monthEnter->text();

  ///wrong number of characters
  if(monthInput.length() >2)///TODO: take care of case with one caracter input
  {
    return false;
  }

  ///ensures input is all numbers
  bool ok;
  monthInput.toInt (&ok, 10);
  if(ok==false)
  {
    return false;
  }

  ///sets the value of the month int to the value given by the input
  int monthInt=0;///the int we'll handle later
  if(monthInput.length() ==1)///handles the case with length=1
  {
    monthInt=monthInput.at(0).digitValue();
  }
  else if(monthInput.length()==2)///handles the case with length=2
  {
    monthInt=(monthInput.at(0).digitValue() * 10) + (monthInput.at(1).digitValue());
  }
  else///if length != 1||2, then return false, invalid input
  {
    return false;
  }

  ///ensures that the month is within the specified bounds
  if(monthInt<1)
  {
    return false;
  }
  else if(monthInt>12)
  {
    return false;
  }


  ///Gets the input from the day text box in a calendar
  QString dayInput =ui->dayEnter->text();///in qstring form, need to convert to int, check

  ///checks for wrong number of characters
  if(dayInput.length() >2)///TODO: take care of case with one character input
  {
    return false;
  }


  ///ensures input is all numbers
  dayInput.toInt (&ok, 10);
  if(ok==false)
  {
    return false;
  }

  ///sets the value of day(int) from the value given in dayInput (String)
  int dayInt;
  if(dayInput.length() ==1)///handles case where length=1
  {
    dayInt=dayInput.at(0).digitValue();
  }
  else if(dayInput.length()==2)
  {
    dayInt= ((dayInput.at(0).digitValue()) * 10) + (dayInput.at(1).digitValue());
  }
  else
  {
    return false;
  }

  ///ensures that the day is witin specified bounds
  if(dayInt<1)
  {
    return false;
  }
  else if(monthInt==1 || monthInt==3 || monthInt==5 || monthInt==7 || monthInt==8 || monthInt==10 || monthInt==12)///handles January,March, May, July,August,October,and December Case
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

  if(!m_calendarInitialized)
  {
  m_month=monthInt;
  m_day=dayInt;
  m_calendarInitialized=true;
  }

  return true;
}


void MainWindow::writeCalendarString()
{
    if(MainWindow::calIsValidInput())
    {
        QString s ="Today is ";
        QString s2;

        int dayOfWeekStart=0;
        int dayOfWeek=0;///0 represents Sunday, 1->Monday 2->Tuesday 3->Wednesday etc

        if(m_month==1)
        {
            s2="January ";
            dayOfWeekStart=4;///5 represents friday
        }
        else if(m_month==2)
        {
            s2="Feburary ";
            dayOfWeekStart=0;
        }
        else if(m_month==3)
        {
            s2="March ";
            dayOfWeekStart=1;
        }
        else if(m_month==4)
        {
            s2="April ";
            dayOfWeekStart=4;
        }
        else if(m_month==5)
        {
            s2="May ";
            dayOfWeekStart=6;
        }
        else if(m_month==6)
        {
            s2="June ";
            dayOfWeekStart=2;
        }
        else if(m_month==7)
        {
            s2="July ";
            dayOfWeekStart=4;
        }
        else if(m_month==8)
        {
            s2="August ";
            dayOfWeekStart=0;
        }
        else if(m_month==9)
        {
            s2="September ";
            dayOfWeekStart=3;
        }
        else if(m_month==10)
        {
            s2="October ";
            dayOfWeekStart=5;
        }
        else if(m_month==11)
        {
            s2="November ";
            dayOfWeekStart=1;
        }
        else if(m_month==12)
        {
            s2="December ";
            dayOfWeekStart=3;
        }
        else
        {
            s2="Invalid Month ";
        }
        QString s3;
        if(m_day==1)///After searching for an hour online to convert an int to a string in QT, a brute force approach was used
        {
            s3="1 ";
        }
        else if(m_day==2)
        {
            s3="2 ";
        }
        else if(m_day==3)
        {
            s3="3 ";
        }
        else if(m_day==4)
        {
            s3="4 ";
        }
        else if(m_day==5)
        {
            s3="5 ";
        }
        else if(m_day==6)
        {
            s3="6 ";
        }
        else if(m_day==7)
        {
            s3="7 ";
        }
        else if(m_day==8)
        {
            s3="8 ";
        }
        else if(m_day==9)
        {
            s3="9 ";
        }
        else if(m_day==10)
        {
            s3="10";
        }
        else if(m_day==11)
        {
            s3="11 ";
        }
        else if(m_day==12)
        {
            s3="12 ";
        }
        else if(m_day==13)
        {
            s3="13 ";
        }
        else if(m_day==14)
        {
            s3="14 ";
        }
        else if(m_day==15)
        {
            s3="15 ";
        }
        else if(m_day==16)
        {
            s3="16 ";
        }
        else if(m_day==17)
        {
            s3="17 ";
        }
        else if(m_day==18)
        {
            s3="18 ";
        }
        else if(m_day==19)
        {
            s3="19 ";
        }
        else if(m_day==20)
        {
            s3="20 ";
        }
        else if(m_day==21)
        {
            s3="21 ";
        }
        else if(m_day==22)
        {
            s3="22 ";
        }
        else if(m_day==23)
        {
            s3="23 ";
        }
        else if(m_day==24)
        {
            s3="24 ";
        }
        else if(m_day==25)
        {
            s3="25 ";
        }
        else if(m_day==26)
        {
            s3="26 ";
        }
        else if(m_day==27)
        {
            s3="27 ";
        }
        else if(m_day==28)
        {
            s3="28 ";
        }
        else if(m_day==29)
        {
            s3="29 ";
        }
        else if(m_day==30)
        {
            s3="30 ";
        }
        else if(m_day==31)
        {
            s3="31 ";
        }
        else
        {
            s3="Invalid Day";
        }

        QString s4;
        int dayOfWeekStagger=m_day%7;
        dayOfWeek= dayOfWeekStart+dayOfWeekStagger;
        dayOfWeek= dayOfWeek%7;

        if(dayOfWeek==0)
        {
            s4="Sunday ";
        }
        else if(dayOfWeek==1)
        {
            s4="Monday ";
        }
        else if(dayOfWeek==2)
        {
            s4="Tuesday ";
        }
        else if(dayOfWeek==3)
        {
            s4="Wednesday ";
        }
        else if(dayOfWeek==4)
        {
            s4="Thursday ";
        }
        else if(dayOfWeek==5)
        {
            s4="Friday ";
        }
        else if(dayOfWeek==6)
        {
            s4="Saturday ";
        }
        else if(dayOfWeek==7)
        {
            s4="Sunday ";
        }

        ui-> calendarEdit -> setText(s +  s4 + s2 + s3 + "2016");
    }
    else
    {
        ///QString myQstring=QString::number(m_month); ///Debugging
        ui->calendarEdit->setText("Calendar Input Invalid");
    }
}

