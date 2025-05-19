def mrs(a):
	print(a,"____aaaaaaaa")
	if len(a)>1:
		mid=len(a)//2
		L=a[:mid]
		R=a[mid:]
		print("a:-",a,"L:-",L,"R:-",R,"________before mrs")
		print(L,"_____LLLLLLLLL")
		print("calling mrs L")
		mrs(L)
		print(L,a,"_________same")
		print("calling mrs R",R)
		mrs(R)
		print("____________________________________________________")
		print(a,L,R,"________________a_b_c")
		print(a," ______________________aM")
		print(L,"______________________LM")
		print(R,"______________________RM")
		a.clear()
		while len(L)>0 and len(R)>0:
			print("L-> ",L," R->",R)
			if L[0]<R[0]:
				print(a,"__a__before append L")
				a.append(L[0])
				print(a," a__wL")
				L.pop(0)
				print(L,"__Lpop")
			else:
				print(a,"__a__before append R")
				a.append(R[0])
				print(a,"_a__wR")
				R.pop(0)
				print(R,"___Rpop")
		for i in L:
			print(a,"____abfL")
			a.append(i)
			print(a," a__fL")
		for x in R:
			print(a,"_____abfR")
			a.append(x)
			print(a," a__fR")
a=[9,8,7,6]
print("Unsorted :- ",a)
mrs(a)
print("Sorted   :- ",a)