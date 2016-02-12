/********************************************************************************
** Form generated from reading UI file 'mainwindow.ui'
**
** Created by: Qt User Interface Compiler version 5.5.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAINWINDOW_H
#define UI_MAINWINDOW_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QCheckBox>
#include <QtWidgets/QFrame>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLCDNumber>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QMenuBar>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpacerItem>
#include <QtWidgets/QStatusBar>
#include <QtWidgets/QToolBar>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QWidget *centralWidget;
    QFrame *frame;
    QVBoxLayout *verticalLayout;
    QSpacerItem *verticalSpacer;
    QHBoxLayout *horizontalLayout_2;
    QSpacerItem *horizontalSpacer_4;
    QLCDNumber *Display;
    QSpacerItem *horizontalSpacer_5;
    QSpacerItem *verticalSpacer_2;
    QHBoxLayout *horizontalLayout;
    QPushButton *pushButton;
    QSpacerItem *horizontalSpacer;
    QCheckBox *mode;
    QSpacerItem *horizontalSpacer_2;
    QLineEdit *timeEdit;
    QSpacerItem *horizontalSpacer_3;
    QPushButton *update;
    QSpacerItem *verticalSpacer_3;
    QPushButton *reset;
    QMenuBar *menuBar;
    QToolBar *mainToolBar;
    QStatusBar *statusBar;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName(QStringLiteral("MainWindow"));
        MainWindow->resize(755, 522);
        MainWindow->setMaximumSize(QSize(1000, 1000));
        MainWindow->setStyleSheet(QStringLiteral("background-color: rgb(0, 0, 0);"));
        centralWidget = new QWidget(MainWindow);
        centralWidget->setObjectName(QStringLiteral("centralWidget"));
        frame = new QFrame(centralWidget);
        frame->setObjectName(QStringLiteral("frame"));
        frame->setGeometry(QRect(0, 0, 751, 451));
        frame->setStyleSheet(QStringLiteral("background-color: rgb(60, 60, 60);"));
        verticalLayout = new QVBoxLayout(frame);
        verticalLayout->setSpacing(6);
        verticalLayout->setContentsMargins(11, 11, 11, 11);
        verticalLayout->setObjectName(QStringLiteral("verticalLayout"));
        verticalSpacer = new QSpacerItem(20, 66, QSizePolicy::Minimum, QSizePolicy::Expanding);

        verticalLayout->addItem(verticalSpacer);

        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setSpacing(6);
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        horizontalSpacer_4 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_2->addItem(horizontalSpacer_4);

        Display = new QLCDNumber(frame);
        Display->setObjectName(QStringLiteral("Display"));
        Display->setEnabled(true);
        Display->setMinimumSize(QSize(371, 111));
        Display->setMouseTracking(false);
        Display->setStyleSheet(QLatin1String("color: rgb(255, 85, 127);\n"
"background-color: rgb(220, 220, 220);"));
        Display->setFrameShape(QFrame::Box);
        Display->setLineWidth(9);
        Display->setMidLineWidth(0);
        Display->setSmallDecimalPoint(false);

        horizontalLayout_2->addWidget(Display);

        horizontalSpacer_5 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_2->addItem(horizontalSpacer_5);


        verticalLayout->addLayout(horizontalLayout_2);

        verticalSpacer_2 = new QSpacerItem(20, 66, QSizePolicy::Minimum, QSizePolicy::Expanding);

        verticalLayout->addItem(verticalSpacer_2);

        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setSpacing(6);
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        pushButton = new QPushButton(frame);
        pushButton->setObjectName(QStringLiteral("pushButton"));
        pushButton->setStyleSheet(QStringLiteral("background-color: qlineargradient(spread:pad, x1:0, y1:0, x2:1, y2:0, stop:0 rgba(255, 0, 0, 255), stop:0.166 rgba(255, 255, 0, 255), stop:0.333 rgba(0, 255, 0, 255), stop:0.5 rgba(0, 255, 255, 255), stop:0.666 rgba(0, 0, 255, 255), stop:0.833 rgba(255, 0, 255, 255), stop:1 rgba(255, 0, 0, 255));"));

        horizontalLayout->addWidget(pushButton);

        horizontalSpacer = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout->addItem(horizontalSpacer);

        mode = new QCheckBox(frame);
        mode->setObjectName(QStringLiteral("mode"));
        mode->setStyleSheet(QLatin1String("background-color: rgb(255, 255, 255);\n"
"font: 10pt \"MS Shell Dlg 2\";"));

        horizontalLayout->addWidget(mode);

        horizontalSpacer_2 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout->addItem(horizontalSpacer_2);

        timeEdit = new QLineEdit(frame);
        timeEdit->setObjectName(QStringLiteral("timeEdit"));
        timeEdit->setStyleSheet(QLatin1String("background-color: rgb(255, 255, 255);\n"
"font: 10pt \"MS Shell Dlg 2\";"));
        timeEdit->setMaxLength(6);

        horizontalLayout->addWidget(timeEdit);

        horizontalSpacer_3 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout->addItem(horizontalSpacer_3);

        update = new QPushButton(frame);
        update->setObjectName(QStringLiteral("update"));
        QPalette palette;
        QLinearGradient gradient(0, 0, 1, 0);
        gradient.setSpread(QGradient::PadSpread);
        gradient.setCoordinateMode(QGradient::ObjectBoundingMode);
        gradient.setColorAt(0, QColor(255, 0, 0, 255));
        gradient.setColorAt(0.166, QColor(255, 255, 0, 255));
        gradient.setColorAt(0.333, QColor(0, 255, 0, 255));
        gradient.setColorAt(0.5, QColor(0, 255, 255, 255));
        gradient.setColorAt(0.666, QColor(0, 0, 255, 255));
        gradient.setColorAt(0.833, QColor(255, 0, 255, 255));
        gradient.setColorAt(1, QColor(255, 0, 0, 255));
        QBrush brush(gradient);
        palette.setBrush(QPalette::Active, QPalette::Button, brush);
        QLinearGradient gradient1(0, 0, 1, 0);
        gradient1.setSpread(QGradient::PadSpread);
        gradient1.setCoordinateMode(QGradient::ObjectBoundingMode);
        gradient1.setColorAt(0, QColor(255, 0, 0, 255));
        gradient1.setColorAt(0.166, QColor(255, 255, 0, 255));
        gradient1.setColorAt(0.333, QColor(0, 255, 0, 255));
        gradient1.setColorAt(0.5, QColor(0, 255, 255, 255));
        gradient1.setColorAt(0.666, QColor(0, 0, 255, 255));
        gradient1.setColorAt(0.833, QColor(255, 0, 255, 255));
        gradient1.setColorAt(1, QColor(255, 0, 0, 255));
        QBrush brush1(gradient1);
        palette.setBrush(QPalette::Active, QPalette::Base, brush1);
        QLinearGradient gradient2(0, 0, 1, 0);
        gradient2.setSpread(QGradient::PadSpread);
        gradient2.setCoordinateMode(QGradient::ObjectBoundingMode);
        gradient2.setColorAt(0, QColor(255, 0, 0, 255));
        gradient2.setColorAt(0.166, QColor(255, 255, 0, 255));
        gradient2.setColorAt(0.333, QColor(0, 255, 0, 255));
        gradient2.setColorAt(0.5, QColor(0, 255, 255, 255));
        gradient2.setColorAt(0.666, QColor(0, 0, 255, 255));
        gradient2.setColorAt(0.833, QColor(255, 0, 255, 255));
        gradient2.setColorAt(1, QColor(255, 0, 0, 255));
        QBrush brush2(gradient2);
        palette.setBrush(QPalette::Active, QPalette::Window, brush2);
        QLinearGradient gradient3(0, 0, 1, 0);
        gradient3.setSpread(QGradient::PadSpread);
        gradient3.setCoordinateMode(QGradient::ObjectBoundingMode);
        gradient3.setColorAt(0, QColor(255, 0, 0, 255));
        gradient3.setColorAt(0.166, QColor(255, 255, 0, 255));
        gradient3.setColorAt(0.333, QColor(0, 255, 0, 255));
        gradient3.setColorAt(0.5, QColor(0, 255, 255, 255));
        gradient3.setColorAt(0.666, QColor(0, 0, 255, 255));
        gradient3.setColorAt(0.833, QColor(255, 0, 255, 255));
        gradient3.setColorAt(1, QColor(255, 0, 0, 255));
        QBrush brush3(gradient3);
        palette.setBrush(QPalette::Inactive, QPalette::Button, brush3);
        QLinearGradient gradient4(0, 0, 1, 0);
        gradient4.setSpread(QGradient::PadSpread);
        gradient4.setCoordinateMode(QGradient::ObjectBoundingMode);
        gradient4.setColorAt(0, QColor(255, 0, 0, 255));
        gradient4.setColorAt(0.166, QColor(255, 255, 0, 255));
        gradient4.setColorAt(0.333, QColor(0, 255, 0, 255));
        gradient4.setColorAt(0.5, QColor(0, 255, 255, 255));
        gradient4.setColorAt(0.666, QColor(0, 0, 255, 255));
        gradient4.setColorAt(0.833, QColor(255, 0, 255, 255));
        gradient4.setColorAt(1, QColor(255, 0, 0, 255));
        QBrush brush4(gradient4);
        palette.setBrush(QPalette::Inactive, QPalette::Base, brush4);
        QLinearGradient gradient5(0, 0, 1, 0);
        gradient5.setSpread(QGradient::PadSpread);
        gradient5.setCoordinateMode(QGradient::ObjectBoundingMode);
        gradient5.setColorAt(0, QColor(255, 0, 0, 255));
        gradient5.setColorAt(0.166, QColor(255, 255, 0, 255));
        gradient5.setColorAt(0.333, QColor(0, 255, 0, 255));
        gradient5.setColorAt(0.5, QColor(0, 255, 255, 255));
        gradient5.setColorAt(0.666, QColor(0, 0, 255, 255));
        gradient5.setColorAt(0.833, QColor(255, 0, 255, 255));
        gradient5.setColorAt(1, QColor(255, 0, 0, 255));
        QBrush brush5(gradient5);
        palette.setBrush(QPalette::Inactive, QPalette::Window, brush5);
        QLinearGradient gradient6(0, 0, 1, 0);
        gradient6.setSpread(QGradient::PadSpread);
        gradient6.setCoordinateMode(QGradient::ObjectBoundingMode);
        gradient6.setColorAt(0, QColor(255, 0, 0, 255));
        gradient6.setColorAt(0.166, QColor(255, 255, 0, 255));
        gradient6.setColorAt(0.333, QColor(0, 255, 0, 255));
        gradient6.setColorAt(0.5, QColor(0, 255, 255, 255));
        gradient6.setColorAt(0.666, QColor(0, 0, 255, 255));
        gradient6.setColorAt(0.833, QColor(255, 0, 255, 255));
        gradient6.setColorAt(1, QColor(255, 0, 0, 255));
        QBrush brush6(gradient6);
        palette.setBrush(QPalette::Disabled, QPalette::Button, brush6);
        QLinearGradient gradient7(0, 0, 1, 0);
        gradient7.setSpread(QGradient::PadSpread);
        gradient7.setCoordinateMode(QGradient::ObjectBoundingMode);
        gradient7.setColorAt(0, QColor(255, 0, 0, 255));
        gradient7.setColorAt(0.166, QColor(255, 255, 0, 255));
        gradient7.setColorAt(0.333, QColor(0, 255, 0, 255));
        gradient7.setColorAt(0.5, QColor(0, 255, 255, 255));
        gradient7.setColorAt(0.666, QColor(0, 0, 255, 255));
        gradient7.setColorAt(0.833, QColor(255, 0, 255, 255));
        gradient7.setColorAt(1, QColor(255, 0, 0, 255));
        QBrush brush7(gradient7);
        palette.setBrush(QPalette::Disabled, QPalette::Base, brush7);
        QLinearGradient gradient8(0, 0, 1, 0);
        gradient8.setSpread(QGradient::PadSpread);
        gradient8.setCoordinateMode(QGradient::ObjectBoundingMode);
        gradient8.setColorAt(0, QColor(255, 0, 0, 255));
        gradient8.setColorAt(0.166, QColor(255, 255, 0, 255));
        gradient8.setColorAt(0.333, QColor(0, 255, 0, 255));
        gradient8.setColorAt(0.5, QColor(0, 255, 255, 255));
        gradient8.setColorAt(0.666, QColor(0, 0, 255, 255));
        gradient8.setColorAt(0.833, QColor(255, 0, 255, 255));
        gradient8.setColorAt(1, QColor(255, 0, 0, 255));
        QBrush brush8(gradient8);
        palette.setBrush(QPalette::Disabled, QPalette::Window, brush8);
        update->setPalette(palette);
        update->setAutoFillBackground(false);
        update->setStyleSheet(QStringLiteral("background-color: qlineargradient(spread:pad, x1:0, y1:0, x2:1, y2:0, stop:0 rgba(255, 0, 0, 255), stop:0.166 rgba(255, 255, 0, 255), stop:0.333 rgba(0, 255, 0, 255), stop:0.5 rgba(0, 255, 255, 255), stop:0.666 rgba(0, 0, 255, 255), stop:0.833 rgba(255, 0, 255, 255), stop:1 rgba(255, 0, 0, 255));"));
        update->setAutoRepeat(false);

        horizontalLayout->addWidget(update);


        verticalLayout->addLayout(horizontalLayout);

        verticalSpacer_3 = new QSpacerItem(20, 66, QSizePolicy::Minimum, QSizePolicy::Expanding);

        verticalLayout->addItem(verticalSpacer_3);

        reset = new QPushButton(frame);
        reset->setObjectName(QStringLiteral("reset"));
        QPalette palette1;
        QLinearGradient gradient9(0, 0, 1, 0);
        gradient9.setSpread(QGradient::PadSpread);
        gradient9.setCoordinateMode(QGradient::ObjectBoundingMode);
        gradient9.setColorAt(0, QColor(255, 0, 0, 255));
        gradient9.setColorAt(0.166, QColor(255, 255, 0, 255));
        gradient9.setColorAt(0.333, QColor(0, 255, 0, 255));
        gradient9.setColorAt(0.5, QColor(0, 255, 255, 255));
        gradient9.setColorAt(0.666, QColor(0, 0, 255, 255));
        gradient9.setColorAt(0.833, QColor(255, 0, 255, 255));
        gradient9.setColorAt(1, QColor(255, 0, 0, 255));
        QBrush brush9(gradient9);
        palette1.setBrush(QPalette::Active, QPalette::Button, brush9);
        QLinearGradient gradient10(0, 0, 1, 0);
        gradient10.setSpread(QGradient::PadSpread);
        gradient10.setCoordinateMode(QGradient::ObjectBoundingMode);
        gradient10.setColorAt(0, QColor(255, 0, 0, 255));
        gradient10.setColorAt(0.166, QColor(255, 255, 0, 255));
        gradient10.setColorAt(0.333, QColor(0, 255, 0, 255));
        gradient10.setColorAt(0.5, QColor(0, 255, 255, 255));
        gradient10.setColorAt(0.666, QColor(0, 0, 255, 255));
        gradient10.setColorAt(0.833, QColor(255, 0, 255, 255));
        gradient10.setColorAt(1, QColor(255, 0, 0, 255));
        QBrush brush10(gradient10);
        palette1.setBrush(QPalette::Active, QPalette::Base, brush10);
        QLinearGradient gradient11(0, 0, 1, 0);
        gradient11.setSpread(QGradient::PadSpread);
        gradient11.setCoordinateMode(QGradient::ObjectBoundingMode);
        gradient11.setColorAt(0, QColor(255, 0, 0, 255));
        gradient11.setColorAt(0.166, QColor(255, 255, 0, 255));
        gradient11.setColorAt(0.333, QColor(0, 255, 0, 255));
        gradient11.setColorAt(0.5, QColor(0, 255, 255, 255));
        gradient11.setColorAt(0.666, QColor(0, 0, 255, 255));
        gradient11.setColorAt(0.833, QColor(255, 0, 255, 255));
        gradient11.setColorAt(1, QColor(255, 0, 0, 255));
        QBrush brush11(gradient11);
        palette1.setBrush(QPalette::Active, QPalette::Window, brush11);
        QLinearGradient gradient12(0, 0, 1, 0);
        gradient12.setSpread(QGradient::PadSpread);
        gradient12.setCoordinateMode(QGradient::ObjectBoundingMode);
        gradient12.setColorAt(0, QColor(255, 0, 0, 255));
        gradient12.setColorAt(0.166, QColor(255, 255, 0, 255));
        gradient12.setColorAt(0.333, QColor(0, 255, 0, 255));
        gradient12.setColorAt(0.5, QColor(0, 255, 255, 255));
        gradient12.setColorAt(0.666, QColor(0, 0, 255, 255));
        gradient12.setColorAt(0.833, QColor(255, 0, 255, 255));
        gradient12.setColorAt(1, QColor(255, 0, 0, 255));
        QBrush brush12(gradient12);
        palette1.setBrush(QPalette::Inactive, QPalette::Button, brush12);
        QLinearGradient gradient13(0, 0, 1, 0);
        gradient13.setSpread(QGradient::PadSpread);
        gradient13.setCoordinateMode(QGradient::ObjectBoundingMode);
        gradient13.setColorAt(0, QColor(255, 0, 0, 255));
        gradient13.setColorAt(0.166, QColor(255, 255, 0, 255));
        gradient13.setColorAt(0.333, QColor(0, 255, 0, 255));
        gradient13.setColorAt(0.5, QColor(0, 255, 255, 255));
        gradient13.setColorAt(0.666, QColor(0, 0, 255, 255));
        gradient13.setColorAt(0.833, QColor(255, 0, 255, 255));
        gradient13.setColorAt(1, QColor(255, 0, 0, 255));
        QBrush brush13(gradient13);
        palette1.setBrush(QPalette::Inactive, QPalette::Base, brush13);
        QLinearGradient gradient14(0, 0, 1, 0);
        gradient14.setSpread(QGradient::PadSpread);
        gradient14.setCoordinateMode(QGradient::ObjectBoundingMode);
        gradient14.setColorAt(0, QColor(255, 0, 0, 255));
        gradient14.setColorAt(0.166, QColor(255, 255, 0, 255));
        gradient14.setColorAt(0.333, QColor(0, 255, 0, 255));
        gradient14.setColorAt(0.5, QColor(0, 255, 255, 255));
        gradient14.setColorAt(0.666, QColor(0, 0, 255, 255));
        gradient14.setColorAt(0.833, QColor(255, 0, 255, 255));
        gradient14.setColorAt(1, QColor(255, 0, 0, 255));
        QBrush brush14(gradient14);
        palette1.setBrush(QPalette::Inactive, QPalette::Window, brush14);
        QLinearGradient gradient15(0, 0, 1, 0);
        gradient15.setSpread(QGradient::PadSpread);
        gradient15.setCoordinateMode(QGradient::ObjectBoundingMode);
        gradient15.setColorAt(0, QColor(255, 0, 0, 255));
        gradient15.setColorAt(0.166, QColor(255, 255, 0, 255));
        gradient15.setColorAt(0.333, QColor(0, 255, 0, 255));
        gradient15.setColorAt(0.5, QColor(0, 255, 255, 255));
        gradient15.setColorAt(0.666, QColor(0, 0, 255, 255));
        gradient15.setColorAt(0.833, QColor(255, 0, 255, 255));
        gradient15.setColorAt(1, QColor(255, 0, 0, 255));
        QBrush brush15(gradient15);
        palette1.setBrush(QPalette::Disabled, QPalette::Button, brush15);
        QLinearGradient gradient16(0, 0, 1, 0);
        gradient16.setSpread(QGradient::PadSpread);
        gradient16.setCoordinateMode(QGradient::ObjectBoundingMode);
        gradient16.setColorAt(0, QColor(255, 0, 0, 255));
        gradient16.setColorAt(0.166, QColor(255, 255, 0, 255));
        gradient16.setColorAt(0.333, QColor(0, 255, 0, 255));
        gradient16.setColorAt(0.5, QColor(0, 255, 255, 255));
        gradient16.setColorAt(0.666, QColor(0, 0, 255, 255));
        gradient16.setColorAt(0.833, QColor(255, 0, 255, 255));
        gradient16.setColorAt(1, QColor(255, 0, 0, 255));
        QBrush brush16(gradient16);
        palette1.setBrush(QPalette::Disabled, QPalette::Base, brush16);
        QLinearGradient gradient17(0, 0, 1, 0);
        gradient17.setSpread(QGradient::PadSpread);
        gradient17.setCoordinateMode(QGradient::ObjectBoundingMode);
        gradient17.setColorAt(0, QColor(255, 0, 0, 255));
        gradient17.setColorAt(0.166, QColor(255, 255, 0, 255));
        gradient17.setColorAt(0.333, QColor(0, 255, 0, 255));
        gradient17.setColorAt(0.5, QColor(0, 255, 255, 255));
        gradient17.setColorAt(0.666, QColor(0, 0, 255, 255));
        gradient17.setColorAt(0.833, QColor(255, 0, 255, 255));
        gradient17.setColorAt(1, QColor(255, 0, 0, 255));
        QBrush brush17(gradient17);
        palette1.setBrush(QPalette::Disabled, QPalette::Window, brush17);
        reset->setPalette(palette1);
        reset->setStyleSheet(QStringLiteral("background-color: qlineargradient(spread:pad, x1:0, y1:0, x2:1, y2:0, stop:0 rgba(255, 0, 0, 255), stop:0.166 rgba(255, 255, 0, 255), stop:0.333 rgba(0, 255, 0, 255), stop:0.5 rgba(0, 255, 255, 255), stop:0.666 rgba(0, 0, 255, 255), stop:0.833 rgba(255, 0, 255, 255), stop:1 rgba(255, 0, 0, 255));"));

        verticalLayout->addWidget(reset);

        MainWindow->setCentralWidget(centralWidget);
        menuBar = new QMenuBar(MainWindow);
        menuBar->setObjectName(QStringLiteral("menuBar"));
        menuBar->setGeometry(QRect(0, 0, 755, 31));
        MainWindow->setMenuBar(menuBar);
        mainToolBar = new QToolBar(MainWindow);
        mainToolBar->setObjectName(QStringLiteral("mainToolBar"));
        MainWindow->addToolBar(Qt::TopToolBarArea, mainToolBar);
        statusBar = new QStatusBar(MainWindow);
        statusBar->setObjectName(QStringLiteral("statusBar"));
        MainWindow->setStatusBar(statusBar);

        retranslateUi(MainWindow);
        QObject::connect(reset, SIGNAL(clicked()), Display, SLOT(setDecMode()));
        QObject::connect(timeEdit, SIGNAL(selectionChanged()), Display, SLOT(setDecMode()));

        QMetaObject::connectSlotsByName(MainWindow);
    } // setupUi

    void retranslateUi(QMainWindow *MainWindow)
    {
        MainWindow->setWindowTitle(QApplication::translate("MainWindow", "MainWindow", 0));
#ifndef QT_NO_TOOLTIP
        Display->setToolTip(QApplication::translate("MainWindow", "<html><head/><body><p>\\</p></body></html>", 0));
#endif // QT_NO_TOOLTIP
        pushButton->setText(QApplication::translate("MainWindow", "Am/Pm", 0));
        mode->setText(QApplication::translate("MainWindow", "12 Hour", 0));
        timeEdit->setText(QApplication::translate("MainWindow", "hhmmss", 0));
        update->setText(QApplication::translate("MainWindow", "Update", 0));
        reset->setText(QApplication::translate("MainWindow", "Reset", 0));
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
