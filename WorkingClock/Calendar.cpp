/**
*	@file     Calendar.cpp
* @author   Austin Bailey
*	@date     2/28/2016
*/

#include "Calendar.h"
#include <iostream>
using namespace std;

Calendar::Calendar()
{
  m_day=0;
  m_month=0;
  m_dayOfWeek=0;
}
void Calendar::switchDay()
{

}
void Calendar::setDay(int month, int day)
{
  m_month=month;
  m_day=day;
  int dowStartAt;//determines the day of the week the month began on, 0=Sunday, 1=Monday etc
  if( month==1)
  {
    dowStartAt=5;
  }
  else if(month==2)
  {
    dowStartAt=1;
  }
  else if(month==3)
  {
    dowStartAt=2;
  }
  else if(month==4)
  {
    dowStartAt=5;
  }
  else if(month==5)
  {
    dowStartAt=0;
  }
  else if(month==6)
  {
    dowStartAt=3;
  }
  else if(month==7)
  {
    dowStartAt=5;
  }
  else if(month==8)
  {
    dowStartAt=1;
  }
  else if(month==9)
  {
    dowStartAt=4;
  }
  else if(month==10)
  {
    dowStartAt=6;
  }
  else if(month==11)
  {
    dowStartAt=2;
  }
  else if(month==12)
  {
    dowStartAt=4;
  }
  else
  {
    std::cout << "ERROR! m_month quantity for calendar is outside of bounds";
  }
  if(day%7==0)
  {
    m_dayOfWeek=dowStartAt-1;
  }
  else if(day%7==1)
  {
    m_dayOfWeek=dowStartAt;
  }
  else if(day%7==2)
  {
    m_dayOfWeek=dowStartAt+1;
  }
  else if(day%7==3)
  {
    m_dayOfWeek=dowStartAt+2;
  }
  else if(day%7==4)
  {
    m_dayOfWeek=dowStartAt+3;
  }
  else if(day%7==5)
  {
    m_dayOfWeek=dowStartAt+4;
  }
  else if(day%7==6)
  {
    m_dayOfWeek=dowStartAt+5;
  }
}


int Calendar::getDay()
{
  return m_day;
}
void Calendar::setMonth(int newMonth)
{
  m_month=newMonth;
}
int Calendar::getMonth()
{
  return m_month;
}
void Calendar::setDayOfWeek(int newDOW)
{
  m_dayOfWeek=newDOW;
}
int Calendar::getDayOfWeek()
{
  return(m_dayOfWeek);
}
