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

//    void on_checkBox_2_clicked();
//    void on_comboBox_2_activated(const QString &arg1);

    void on_pushButton_clicked();

    void on_pushButton_2_clicked();

    // clock methods
    void clockInit ();
    void timerInit ();
    void setTime (QTime newTime);
    void setMode (int newMode);
    void showTime ();
    void updateTime ();

private:
    Ui::MainWindow *ui;

    // clock member variables
    QTime currTime;
    QTimer* timer;
    int currMode; // 0= 24, 1= 12
    int ampm; // -1= N/A, 0= am, 1= pm
};

#endif // MAINWINDOW_H



