/**
*	@file mainwindow.h
* 	@author Quinten Wiley, Julia Drahozal, Omar Alzubbi, Kate Strombom
*       edited by Austin Bailey, Tim Elvart, Will Teeple, Michael Wang
*	@date 2016.02.12 created
*         2016.03.06 edited last
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

    ///EVENT HANDLERS

    void playStopwatch();
    /**
     * @pre none
     * @post tells the stopwatch to start advancing again
     * @return none
     */
    void pauseStopwatch();
    /**
     * @pre none
     * @post pauses the stopwatch advancement
     * @return none
     */
    void resetStopwatch();
    /**
     * @pre none
     * @post the stopwatch is reset to 0:0:0 and paused
     * @return none
     */
    void updateStopwatch();
    /**
     * @pre none
     * @post called after 1 second has passed in system timer.
     *  updates according member variables and displays the current time count
     * @return none
     */
    void stopWatchInit();
    /**
     * @pre none
     * @post stopwatch member variables are initialized, QT ui connections established. "0:0:0" is displayed
     * @return none
     */
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
       *  @post Zooms in on display (increases widget size)
       *  @return none
       */

    void on_zoomOut_clicked();
    /**
       *  @pre none
       *  @post Zooms out of display (decreases widget size)
       *  @return none
       */

    /// INIT
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

    /// CLOCK METHODS
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

    void wrapDayAtMidnight();
    /**
      *  @pre date set;
      *  @post changes m_month and m_day accordingly
      *  @return void
      */

    bool calIsValidInput();
    /**
      * @pre inputs in calendar textboxes
      * @post ensures that inputs are valid
      * @return True if valid false else
      */

    void writeCalendarString();
    /**
      * @pre month/day data set properly
      * @post outputs a string to textbox
      * @return void
      */
private:
    Ui::MainWindow *ui;

    /// clock member variables
    QTime currTime;
    int currMode; /// 0= 24, 1= 12
    int ampm; /// 0= am, 1= pm
    QTimer* timer;

    ///prototype button additions
    QPushButton *m_zoomIn;
    QPushButton *m_zoomOut;
    QPushButton *m_startTimer;

    ///additional timer variables
    int hrTime;
    int minTime;
    int secTime;
    int hrValue;
    int minValue;
    int secValue;
    int nowTime;
    bool bPauseTime;
    bool startedTimer;

    ///calendar variables
    int m_month;
    int m_day;
    bool m_calendarInitialized;
    ///stopwatch variables
    bool m_playwatch;
    int m_stopwatchseconds;
    int m_stopwatchminutes;
    int m_stopwatchhours;
    QString m_stopWatchString;

};

#endif /// MAINWINDOW_H



