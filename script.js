var canvas = document.getElementById('sandbox')
var context = canvas.getContext('2d'),
    division, circle, hoursAngle, minuteAngle, secondsAngle, seconds, minutes, hours, now_time

context.lineCap = 'round'

var R = 300 / 2, d, angle, pX, pY, qX, qY


drawDivisions = () => {

    for (d = 0; d < 60; ++d) {

        division = new Path2D()

        angle = (d / 60) * (2*Math.PI)
        pX = Math.cos(angle) * R
        pY = -Math.sin(angle)* R

        if (d % 5) {
            qX = 0.9 * pX
            qY = 0.9 * pY
        }
        else {
            qX = 0.8 * pX
            qY = 0.8 * pY
        }

        pX += R; pY += R
        qX += R; qY += R

        division.moveTo(pX, pY)
        division.lineTo(qX, qY)

        context.lineWidth = 3
        context.strokeStyle = 'white'
        context.stroke(division)
    }
}


getTime = () => {

    var date = new Date()

    hours = date.getHours()
    minutes = date.getMinutes()
    seconds = date.getSeconds()

    secondsAngle = seconds / 60 * 2 * Math.PI
    minutesAngle = minutes / 60 * 2 * Math.PI
    hoursAngle = hours % 12 / 12 * 2 * Math.PI

    secondsAngle = Math.PI / 2 - secondsAngle
    minutesAngle = Math.PI / 2 - minutesAngle
    hoursAngle = Math.PI / 2 - hoursAngle

    return [secondsAngle, minutesAngle, hoursAngle]
}


drawString = (angleType, color_of_stroke) => {

    var timeStr
    timeStr = new Path2D()
    
    var StX, StY, EnX, EnY

    StX = Math.cos(angleType)*R
    StY = -Math.sin(angleType)*R

    StX += R; StY += R
    EnX = R; EnY = R 

    timeStr.moveTo(StX, StY)
    timeStr.lineTo(EnX, EnY)

    context.lineWidth = 4
    context.strokeStyle = color_of_stroke
    context.stroke(timeStr)

}


drawInternalCircle = () => {

    circle = new Path2D()
    circle.arc(150, 150, 150, 0, 2*Math.PI)

    context.strokeStyle = 'white'
    context.lineCap = 1
    context.stroke(circle)
}


drawExternalCircle = () => {

    circle = new Path2D()
    circle.arc(150, 150, 5, 0, 2*Math.PI)

    context.fillStyle = 'white'
    context.lineCap = 1
    context.fill(circle)
}


drawClock = (params) =>  {

    context.clearRect(0, 0, 300, 300)

    drawInternalCircle()
    drawDivisions()

    now_time = getTime()
    console.log(now_time)

    drawString(now_time[0], 'red')
    drawString(now_time[1], 'green')
    drawString(now_time[2], 'blue')

    drawExternalCircle()
    setTimeout(drawClock, 1000)
}

drawClock()
