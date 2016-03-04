/**
*	@file mainwindow.h
* 	@author Quinten Wiley, Julia Drahozal, Omar Alzubbi, Kate Strombom
*       edited by Austin Bailey, Tim Elvart, Will Teeple, Michael Wang
*	@date 2016.02.12 created
*         2016.03.03 edited last
*/
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QPushButton>
#include <QTime>
#include <QTimer>

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    /**
       *  @pre none
       *  @post set timer to fire every 1000 ms, call clock and timer init
       *  @return none
       */
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

private slots:


    // EVENT HANDLERS
    void playTimer();
    /**
       *  @pre none
       *  @post continues the timer
       *  @return none
       */
    void pauseTimer();
    /**
       *  @pre none
       *  @post pauses the timer
       *  @return none
       */
    void timerDone();
    /**
       *  @pre none
       *  @post outputs a 0 to the string
       *  @return none
       */
    void updateTimer();
    /**
       *  @pre none
       *  @post updates the timer
       *  @return none
       */
    void goodTimerInput();
    /**
       *  @pre none
       *  @post checks the spinboxes for valid input
       *  @return none
       */
    void resetTimer();
    /**
       *  @pre none
       *  @post resets the timerdisplay and function to 0
       *  @return none
       */
    void startTimer();
    /**
       *  @pre none
       *  @post starts the timer
       *  @return none
       */

    //bool calIsValidInput();
    //void wrapDayAtMidnight();

    void on_update_clicked();
    /**
       *  @pre Input from user is valid
       *  @post Time displayed is changed to the input
       *  @return none
       */
    void on_reset_clicked();
    /**
       *  @pre none
       *  @post Time displayed is reverted to 0000000
       *  @return none
       */
    void on_zoomIn_clicked();
    /**
       *  @pre none
       *  @post Zooms in on display (increases font)
       *  @return none
       */

    void on_zoomOut_clicked();
    /**
       *  @pre none
       *  @post Zooms out of display (decreases font)
       *  @return none
       */

    void on_blackScreen_clicked();
    /**
       *  @pre none
       *  @post Turns off the display, leaving a black screen
       *  @return none
       */

    // INIT
    void clockInit ();
    /**
       *  @pre none
       *  @post LCD display is shown, 24 hour mode is set, time set to 000000
       *  @return none
       */
    void timerInit ();
    /**
       *  @pre none
       *  @post LCD display is shown, 24 hour mode is set, time set to 000000
       *  @return none
       */

    // CLOCK METHODS
    void setTime (QTime newTime);
    /**
       *  @pre none
       *  @post change time to newTime
       *  @return none
       */
    void setMode (int newMode);
    /**
       *  @pre none
       *  @post change mode to newMode
       *  @return none
       */
    void showTime ();
    /**
       *  @pre none
       *  @post display time string on LCD string
       *  @return none
       */
    void updateTime ();
    /**
       *  @pre currTime is valid
       *  @post add one second to current time
       *  @return none
       */
    void updateAMPM ();
    /**
       *  @pre currTime is valid
       *  @post change AM/PM status if time rolls past noon or midnight
       *  @return none
       */
    void wrap12hour ();
    /**
       *  @pre currTime is valid
       *  @post in 12 hour mode, change time back to 1 AM or PM instead of 13:00, etc.
       *  @return none
       */
    bool isValidInput ();
    /**
       *  @pre none
       *  @post none
       *  @return true if input is only integers within bounds
       */

private:
    Ui::MainWindow *ui;

    // clock member variables
    QTime currTime;
    int currMode; // 0= 24, 1= 12
    int ampm; // 0= am, 1= pm
    QTimer* timer;

    //prototype button additions
    qreal scale;
    QPushButton *m_zoomIn;
    QPushButton *m_zoomOut;
    QPushButton *m_blackScreen;
    QPushButton *m_startTimer;

    //additional timer variables
    int hrTime;
    int minTime;
    int secTime;
    int hrValue;
    int minValue;
    int secValue;
    int timeDone;
    int nowTime;

    int m_month;
    int m_day;
};

#endif // MAINWINDOW_H



