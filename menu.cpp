/*
 * menu.cpp
 *
 *  Created on: Feb 2, 2016
 *      Author: Julia Drahozal and Kate Strombom
 */

#include <iostream>
using namespace std;
#include "menu.h"

// constructor
Menu::Menu ()
{
    
    cout<< "welcome to clock\n";
    callMenu();
    
}

void Menu::callMenu ()
{
    
    changeMode ();
    resetTime (currTime);
    
    
}

void Menu::resetTime (int oldTime)
{
    
    cout<< "set current time: ";
    
    if (currMode == 1)
    {
        while (1)
        {
            cout<< "\nenter hour: ";
            cin>> hour;
            if (hour >= 0 and hour <= 23)
            {
                break;
            } else
            {
                cout << "\nenter hour between 0 and 23";
            }
            
        }
        
        while (1)
        {
            cout<< "\nenter minute: ";
            cin>> minute;
            if (minute >= 0 and minute <= 59)
            {
                break;
            } else
            {
                cout << "\nenter minute between 0 and 59";
            }
            
        }
        
        while (1)
        {
            cout<< "\nenter second: ";
            cin>> second;
            if (second >= 0 and second <= 59)
            {
                break;
            } else
            {
                cout << "\nenter second between 0 and 59";
            }
            
        }
        
    }
    
    if (currMode == 2)
    {
        while (1)
        {
            cout<< "\nenter hour: ";
            cin>> hour;
            if (hour >= 1 and hour <= 12)
            {
                break;
            } else
            {
                cout << "\nenter hour between 1 and 12";
            }
            
        }
        
        while (1)
        {
            cout<< "\nenter minute: ";
            cin>> minute;
            if (minute >= 0 and minute <= 59)
            {
                break;
            } else
            {
                cout << "\nenter minute between 0 and 59";
            }
            
        }
        
        while (1)
        {
            cout<< "\nenter second: ";
            cin>> second;
            if (second >= 0 and second <= 59)
            {
                break;
            } else
            {
                cout << "\nenter second between 0 and 59";
            }
            
        }
        
        while (1)
        {
            
            cout << "\nchoose mode: \n  (1) am \n  (2) pm \n";
            cin >> ampm;
            
            if (ampm == 1 || ampm ==2)
            {
                break;
            } else
            {
                cout << "\n choose 1 or 2";
            }
        }
        
    }
    
}

void Menu::changeMode()
{
    
    while (1)
    {
        
        cout << "choose mode: \n  (1) 24 hour \n  (2) 12 hour \n";
        cin >> currMode;
        
        if (currMode == 1 || currMode ==2)
        {
            break;
        } else
        {
            cout << "\nchoose 1 or 2";
        }
    }
    
}


// destructor
Menu::~Menu ()
{
}


