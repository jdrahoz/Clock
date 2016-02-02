/*
 * menu.cpp
 *
 *  Created on: Feb 2, 2016
 *      Author: Julia Drahozal
 */

#include <iostream>
using namespace std;
#include "menu.h"

// constructor
Menu::Menu ()
{

	cout<< "welcome to clock\n";
	cout<< "set current time: ";
	cin>> currTime;
	cout<< "set mode: ";
	cin>> currMode;

};

void Menu::resetTime (int newTime)
{
	currTime = newTime;
	return;

};

void Menu::changeMode(int newMode)
{

};


// destructor
Menu::~Menu ()
{


};


