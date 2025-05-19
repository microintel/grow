class leapcal:
	def __init__(self,a,b,c):
		self.d=a
		self.m=b
		self.y=c
	def date(self): print("input date:- ",self.d)
	def month(self): print("input month:- ",self.m)
	def year(self): print("input year:- ",self.y)
	def mn(self):
		mn=["","jan","feb","'mar'","apr","may","june","july","aug","sep","oct","nov","dec"]
		print("Month Name is : ",mn[self.m])
	def leap(self):
		if self.y%4==0:
			print(self.y,"is leap year")
		else: print(self.y,"is not a leap year")
d1=leapcal(1,7,2024)
d1.date()
d1.month()
d1.year()
d1.mn()
d1.leap()