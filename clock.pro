
QT += widgets

HEADERS       = clock.h
SOURCES       = clock.cpp \
                main.cpp

# install
target.path = $$[QT_INSTALL_EXAMPLES]/widgets/widgets/clock
INSTALLS += target

DISTFILES +=
