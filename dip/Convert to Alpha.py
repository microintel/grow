#------------------------ Inputing -------------------
a=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

A=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
char=input(":- ")
s=[]
for x in char:
						if x in a or x in A:
											for i in range(len(a)):
												if i==a[x]:
													index=i
											if m>='a' and m<='z':
											      print("Convertion of small ",m," to Big is:- ",A[index])
											      s.append(A[index])
											if m>='A' and m<='Z':
											     print("Convertion of Big ",m," to small is:- ",a[index])
											     s.append((a[index]))

print(s)
