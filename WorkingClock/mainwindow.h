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
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

private slots:


    // EVENT HANDLERS
    void on_update_clicked();
    void on_reset_clicked();

    // INIT
    void clockInit ();
    void timerInit ();

    // CLOCK METHODS
    void setTime (QTime newTime);
    void setMode (int newMode);
    void showTime ();
    void updateTime ();
    void updateAMPM ();
    void wrap12hour ();
    bool isValidInput ();

private:
    Ui::MainWindow *ui;

    // clock member variables
    QTime currTime;
    int currMode; // 0= 24, 1= 12
    int ampm; // 0= am, 1= pm
    QTimer* timer;

};

#endif // MAINWINDOW_H



