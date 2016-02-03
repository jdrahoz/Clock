/*
 * menu.h
 *
 *  Created on: Feb 2, 2016
 *      Author: Julia Drahozal and Kate Strombom
 */

#ifndef MENU_H_
#define MENU_H_

class Menu
{
    
private:
    
    int hour;
    int minute;
    int second;
    int ampm;
    int currTime=0;
    int currMode=0;
    
public:
    
    Menu ();
    
    void callMenu ();
    void resetTime (int oldTime);
    void changeMode ();
    
    ~Menu ();
    
};

#endif /* MENU_H_ */
