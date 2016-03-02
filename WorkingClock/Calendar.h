/**
*	@file     Calendar.h
* @author   Austin Bailey
*	@date     2/28/2016
*/
#ifndef CALENDAR_H
#define CALENDAR_H

#include <QMainWindow>
#include <QTime>
#include <QTimer>

#include <ctime>

class Calendar
{
  public:
     Calendar();
     void switchDay();
     void setDay(int Month, int Day);

  private:
     int m_day;
     int m_month;
     int m_dayOfWeek;
};
#endif
