#-------------------------------------------------
#
# Project created by QtCreator 2016-02-07T13:55:58
#
#-------------------------------------------------

QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = WorkingClock
TEMPLATE = app


SOURCES += main.cpp\
        mainwindow.cpp \
    Calendar.cpp \
    timer.cpp

HEADERS  += mainwindow.h \
    Calendar.h \
    timer.h

FORMS    += mainwindow.ui
