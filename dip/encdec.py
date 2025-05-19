inp=input("enter msg:- ") #hi
xc,xz,ax,dy,="","","",[chr(x) for x in range(33,126)]
dy.append(" ")
en=dy[::-1]
for i in inp: ax=ax+str(en[dy.index(i)])
f=dy.index(inp[0])
for c in en[f+19:f+23]: xc=xc+c
for c in dy[f+9:f+13]: xz=xz+c
xg=xz[0:2]+xc[0:2]+ax+xz[2:]+xc[2:]
print("The Encrypt MSG of ","'",inp,"'"," is ")
print()
print(xg)
print()
ab=input(" DobU Want to dcpt Y/N:- ")
if ab=="Y":
	for i in ax: print(dy[en.index(i)],end="")
else:
	print("existed")