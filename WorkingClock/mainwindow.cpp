#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QTime>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::on_checkBox_2_clicked()
{

}



void MainWindow::on_comboBox_2_activated(const QString &arg1)
{

}


//Time updates only when button is clicked, needs to update continuously.
void MainWindow::on_pushButton_clicked()
{
    QTime time = QTime::currentTime();
    int seconds = QTime(0,0,0).secsTo(time);

    //begin calculations for time_string
    int minutes = seconds/60;
    int hours = minutes/60;
    minutes = minutes%60;
    seconds = seconds%60;
    QString hours_string = QString::number(hours);
    QString minutes_string = QString::number(minutes);
    QString seconds_string = QString::number(seconds);
    QString time_string = hours_string + ":" + minutes_string + ":" + seconds_string;
    //time_string is a string that displays hh:mm:ss of current time.

    ui->Display->setDigitCount(8);
    ui->Display->digitCount();
    ui->Display->display(time_string);//displays time in form of a string.

}

//clears the digital display
void MainWindow::on_pushButton_2_clicked()
{
    ui->Display->display(000000);
}

void MainWindow::on_lineEdit_windowIconTextChanged(const QString &iconText)
{
    QString capture = ui->lineEdit->displayText();
    ui->Display->display(capture);
}

//void MainWindow::showTime()
//{
//    QTime time=QTime::currentTime();
//    QString time_text=time.toString("hh : mm : ss");
//    ui->Digital_Clock->setText(time_text);
//}
