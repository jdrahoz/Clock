import QtQuick 2.5
import QtQuick.Window 2.2

Window {
    property alias mouseArea1: mouseArea1
    visible: true

    MouseArea {
        id: mouseArea1
        anchors.rightMargin: 0
        anchors.bottomMargin: 0
        anchors.leftMargin: 0
        anchors.topMargin: 0
        anchors.fill: parent
        onClicked: {
            Qt.quit();
        }

        TextInput {
            id: textInput1
            x: 18
            y: 411
            width: 100
            height: 50
            text: qsTr("input here")
            font.pixelSize: 12
        }

        TextEdit {
            id: textEdit1
            x: 18
            y: 369
            width: 80
            height: 20
            text: qsTr("Enter time")
            font.pixelSize: 12
        }
    }

    Text {
        text: qsTr("Hello World")
        anchors.centerIn: parent
    }


    Rectangle {
        id: page
        width: 500; height: 200
        color: "lightgray"

        Text {
            id: helloText
            text: "hello world!"
            y: 30
            anchors.horizontalCenter: page.horizontalCenter
            font.pointSize: 24; font.bold: true
        }
    }

}
