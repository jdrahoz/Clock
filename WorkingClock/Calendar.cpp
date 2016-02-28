/**
*	@file     Calendar.cpp
* @author   Austin Bailey
*	@date     2/28/2016
*/
Calendar:Calendar()
{
  m_day=0;
  m_month=0;
  m_dayOfWeek=0;
}
Calendar:setDay(int month, int day)
{
  m_month=month;
  m_day=day;
  int dowStartsAt;//determines the day of the week the month began on, 0=Sunday, 1=Monday etc
  if(Month==1)
  {
    dowStartAt=5;
  }
  else if(Month==2)
  {
    dowStartAt=1;
  }
  else if(Month==3)
  {
    dowStartAt=2;
  }
  else if(Month==4)
  {
    dowStartAt=5;
  }
  else if(Month==5)
  {
    dowStartAt=0;
  }
  else if(Month==6)
  {
    dowStartAt=3;
  }
  else if(Month==7)
  {
    dowStartAt=5;
  }
  else if(Month==8)
  {
    dowStartAt=1;
  }
  else if(Month==9)
  {
    dowStartAt=4;
  }
  else if(Month==10)
  {
    dowStartAt=6;
  }
  else if(Month==11)
  {
    dowStartAt=2;
  }
  else if(Month==12)
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
