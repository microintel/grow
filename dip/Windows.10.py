import turtle as t
t.speed(0)
t.hideturtle()
for x in ["blue","white","red","green","grey","yellow","gold","silver","purple","pink","brown","skyblue","lightblue","lightgreen","lightblue"]:
	t.bgcolor("black"),t.pencolor("black"),t.penup(),t.begin_fill(),t.bk(250)
	t.pendown(),t.rt(10),t.fd(500),t.lt(100),t.fd(500),t.lt(100),t.fd(500)
	t.lt(80),t.fd(325),t.fillcolor(x),t.end_fill(),t.pencolor("black"),t.bk(325/2)
	t.lt(90),t.pensize(21),t.fd(500),t.lt(90),t.fd(250),t.pensize(0),t.lt(100)
	t.fd(280),t.pensize(21),t.lt(80),t.fd(400),t.penup(),t.fd(200),t.pendown()
	t.lt(90),t.bk(200),t.pencolor("black"),t.pencolor(x)
	
	t.write("Windows 10",font=("Arial",20)),t.penup(),t.goto(0,0),t.rt(0)
t.clear()
t.penup(),t.pencolor("gold"),t.pensize(13),t.bk(100)
t.pendown()
t.write("Developed By",font=("Arial",10)),t.penup(),t.rt(90),t.fd(80),t.lt(90),t.bk(20)
t.pendown()
t.write("Vignesh",font=("Timesnewroman",20))
t.done()