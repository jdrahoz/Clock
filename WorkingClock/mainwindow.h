/**
*	@file mainwindow.h
* 	@author Quinten Wiley, Julia Drahozal, Omar Alzubbi, Kate Strombom
*	@date 2016.02.12
*/
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
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

};

#endif // MAINWINDOW_H



