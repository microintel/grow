def f(a,b):
			if a<1000:
				print(a)
				print(b)
				c=a+b
				print(c)
				a=b+c
				b=c+a
				f(a,b)
a,b,c=0,1,0
print("--The Fibbonacci Series ")
f(a,b)
