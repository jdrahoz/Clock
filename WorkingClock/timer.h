/**
*	@file     Timer.h
* @author   Michael Wang
*	@date     3/01/2016
*/
/**
#ifndef TIMER_H
#define TIMER_H

#include <QMainWindow>
#include <QTime>
#include <QTimer>

#include <ctime>

namespace Ui {
class MainWindow;
}

class timer
{
public:
	timer();
	void setTime(int hour, int minutes, int seconds);
	void countDown();
	void calculateTime();
	int currentTime();
        void resetTimer();
        void showTimer();
private:
	int m_sec;
	int m_min;
	int m_hr;
	int myTime;
	bool m_done;

};
#endif;
*/
