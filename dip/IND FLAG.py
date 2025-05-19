import turtle
turtle.bgcolor("IndianRed")
#for creating turtle in variable v
v=turtle.Turtle()
v.hideturtle(),v.speed(0)
v.width(50),
#pipe start point
v.up(),v.goto(-260,600),v.down(),v.pensize(3)
#pipe and pipe color
for i in range(2):
	v.begin_fill(),v.fd(30),v.rt(90),v.fd(1000),v.rt(90),v.fillcolor("gold"),v.end_fill()
#circle in at the too of pipe
v.begin_fill(),v.fd(15),v.circle(15),v.fillcolor("silver"),v.end_fill(),v.fd(15)
for x in ["orange","white","green"]:
      v.begin_fill(),v.fd(470),v.rt(90),v.fd(100),v.rt(90),v.fd(470),v.rt(90),v.fd(100),v.bk(100),v.rt(90),v.fillcolor(x),v.end_fill()
#for ashoka chakra position
v.lt(90),v.fd(200),v.rt(90),v.fd(470/2)
#creating ashoka chakra circle
v.lt(180),v.color("blue"),v.circle(50),v.up(),v.lt(90),v.fd(50),v.down()
#for 24 a c lines
for m in range(24):
    v.fd(50),v.bk(50),v.lt(15)
v.penup()
#end
v.goto(-190,650)
v.write("We Are Indians",font=("Arial",15))
turtle.done()