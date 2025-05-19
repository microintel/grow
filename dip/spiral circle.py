import turtle as t
t.speed(0 )
a=15
for x in range(24):
	t.circle(100,80)
	t.up()
	t.home()
	t.lt(a)
	t.down()
	a+=15
t.done()