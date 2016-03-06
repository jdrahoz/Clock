/**
*	@file     Timer.cpp
* @author   Michael Wang
*	@date     3/01/2016
*/
#include "timer.h"

/**
timer::timer()
QTimer (parent),
ui (new Ui::Timer)
{
	m_sec = 0;
	m_min = 0;
	m_hr = 0;
	myTime = 0;
	m_done = false;

	spinBoxHr.setRange(0,23);
	spinBoxMin.setRange(0,59);
	spinBox.setRange(0,59);
}
void timer::setTime(int hour, int minutes, int seconds)
{
	if((hour>=0)&&(hour<=23))
	{
		m_hour = hour;
	}
	if((minutes>=0)&&(minutes<=59))
	{
		m_min = minutes;
	}
	if((seconds>=0)&&(seconds<=59))
	{
		m_sec = seconds;
	}
}
void timer::countDown()
{
	myTime = (currentTime() + 1)
	while(myTime != currentTime())
	{
		currentTime();
	}
	m_sec--;

}
void timer::calculateTime()
{
	if(m_sec == 0)
	{
		m_sec = 59;
		m_min--; 
	}
	if(m_min == 0)
	{
		m_min = 59;
		m_hr--;
	}
	if((m_hr == 0)&&(m_min == 0)&&(m_sec ==0))
	{
		m_done = (true);
	}
}

int timer::currentTime()
{
	time_t currentTime;
  struct tm *localTime;

  time( &currentTime );                   // Get the current time
  localTime = localtime( &currentTime );  // Convert the current time to the local time

  int Hour   = ((localTime->tm_hour)*60*60);
  int Min    = ((localTime->tm_min)*60);
  int Sec    = localTime->tm_sec;
  int currentTimeNow = Hour + Min + Sec;
  return (currentTimeNow);
}

void timer::resetTimer()
{
    setTime(0,0,0);
}

void timer::showTimer()
{
    QString timerText = currentTime();
    ui -> TimerDisplay -> display (timerText);
}
*/
