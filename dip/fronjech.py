import turtle as t

t.pensize(5)
t.speed(0)
t.begin_fill()
t.lt(30)
t.fd(150)
t.lt(60)
t.fd(300)
t.lt(120)
t.fd(150)
t.lt(60)
t.fd(300)
t.fillcolor("black")
t.end_fill()



t.begin_fill()
t.rt(120)
t.fd(150)
t.rt(60)
t.fd(300)
t.rt(120)
t.fd(150)
t.fillcolor("brown")
t.end_fill()

t.begin_fill()
t.bk(150)
t.lt(60)
t.fd(150)

t.rt(60)
t.fd(150)


t.rt(120)
t.fd(150)
t.fillcolor("brown")
t.end_fill()


for c in range(15):
	t.color("white")
	t.bk(10)
	t.lt(60)
	t.fd(300)
	t.bk(300)
	t.rt(60)


t.lt(60)
t.fd(300)

for v in range(30):
	t.bk(10)
	t.rt(60)
	t.fd(150)
	t.bk(150)
	t.lt(60)
	
t.fd(120)
t.rt(60)
t.fd(125)


t.begin_fill()
t.rt(120)
t.fd(30+30+30)
t.rt(60)
t.fd(100)
t.rt(120)
t.fd(90)
t.rt(60)
t.fd(100)

t.rt(120)
t.fd(60)
t.rt(60)
t.up()
t.fd(25)
t.lt(120)
t.down()
t.write("Fron")
t.fillcolor("black")
t.end_fill()




t.done()