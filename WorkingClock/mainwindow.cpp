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

// updates the digital display
void MainWindow::on_update_clicked()
{

    // update time display every second

    QString timeStr = ui->timeEdit->text ();
    int hour, min, sec = 0;
    //check to make sure imput is valid
    //it automatically won't allow anymore than 6 characters and if they aren't ints it doesnt display anything
    //must make sure that the size is 6 digits and no less

    if(timeStr.count() == 6)
    {

        //parses string into digits for hhmmss
        hour = (timeStr.at(0).digitValue ()) * 10 + timeStr.at(1).digitValue ();
        min = (timeStr.at(2).digitValue ()) * 10 + timeStr.at(3).digitValue ();
        sec = (timeStr.at(4).digitValue ()) * 10 + timeStr.at(5).digitValue ();
        setTime(QTime(hour,min,sec));
    }
    else
    {
        setTime(QTime(0,0,0));
    }

    //setTime (QTime(hour, min, sec));
    timer -> start (1000);
    showTime ();

}

// clears the digital display
void MainWindow::on_reset_clicked()
{

    timer -> stop ();
    setTime (QTime (0,0,0));
    showTime ();

}

// shows time on digital display
void MainWindow::showTime ()
{

    QString textTime = currTime.toString (Qt::TextDate);
    // 12 hour
    if (currMode == 0)//24 hour
    {
        ui->Display->setDigitCount (8);
    } else if (currMode == 1) //12 hour
    {
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
    setMode (currMode); // 24 hour
    setTime (QTime(0, 0, 0)); // midnight
    showTime ();
    //set arbitrary am/pm
    ampm = 0;

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
        }
        else if (currTime.hour () == 13)
        {
            currTime = QTime (1, min, sec);

            //toggle am/pm
            if(ampm == 0)
            {
                ampm = 1;
            }
            else
            {
                ampm = 0;
            }
        }

    }
}

void MainWindow::updateTime ()
{

    currTime = currTime.addSecs (1);


//declare variables in this scope
    int sec = currTime.second ();
    int min = currTime.minute ();
    int hour = currTime.hour ();

//if the hour turns 12 the am/pm is toggled
    if(hour == 12 && min == 0 && sec == 0)
    {

        if(ampm ==1)
        {
            ampm = 0;
        }
        else
        {
            ampm = 1;
        }
    }

    // wrap for 12 hour time
    if (currMode == 1)
    {
        // midnight
        if (hour == 0)
        {
            currTime = QTime (12, min, sec);
        // noon
        } else if (hour == 12) {
        // 1 pm
        } else if (hour >= 13) {
            currTime = QTime (hour - 12, min, sec);
        }
        //IMPLEMENT: need to get everypossible change from 24 to 12. existing code will change 13:00:00 to 1:00:00 pm but if it is 14+ it will remain hour 14 in 12 hour.
    }

    //Need to set to pm if hour is 13+
    if(currMode == 0)
    {
        if(hour >= 13)
        {
            ampm = 1;//set to pm
        }
    }

}

void MainWindow::setMode(int newMode)
{

    currMode = newMode;

}


void MainWindow::on_mode_clicked()
{
    //mode_24 is true if checked, false if unchecked
    mode_24hour = ui->mode->isChecked();
    if(mode_24hour == false)
    {
        currMode = 0;//12 hour
    }
    else
    {
        currMode = 1;//24 hour
    }
}



void MainWindow::on_pushButton_clicked()
{

    //this button toggles the value of ampm on the push
    if(ampm == 0)
    {
        ampm = 1;
    }
    else
    {
        ampm = 0;
    }
}
