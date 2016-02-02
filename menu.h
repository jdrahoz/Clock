/*
 * menu.h
 *
 *  Created on: Feb 2, 2016
 *      Author: Julia Drahozal
 */

#ifndef MENU_H_
#define MENU_H_

class Menu
{

private:

	int currTime=0;
	int currMode=0;

public:

	Menu ();

	void resetTime (int newTime);
	void changeMode (int newMode);

	~Menu ();

};

#endif /* MENU_H_ */
