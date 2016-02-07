
QT += widgets

HEADERS       = clock.h \
    menu.h
SOURCES       = clock.cpp \
                main.cpp \
    menu.cpp

# install
target.path = $$[QT_INSTALL_EXAMPLES]/widgets/widgets/clock
INSTALLS += target

DISTFILES +=

FORMS += \
    clock.ui
