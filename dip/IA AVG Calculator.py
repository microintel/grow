from colorama import Fore
s,k="The SUM Of","The Average Of"
a,b,m,w,A,S="Enter Your","Score:- ",0,0,0,0
for x in ["W1","W2","W3","S1","S2","Activity"]:
			print(Fore.GREEN+a,x,b,end="")
			m=float(input())
			if x=="W1" or x=="W2" or x=="W3": w=w+m
			elif x=="Activity": A=m 
			else:  S=S+m
avg=float(w/3+S/2+A)
if avg<23: print(Fore.WHITE+"You are not eligible to attend Exam:- ",avg,"%","The minimum marks is 24")
elif avg>24: print(Fore.RED+"Gangrats You are able to attend Exam")
print(Fore.CYAN+s,"Theory",b,w)
print(k,"Theory is:- ",w/3)
print(Fore.YELLOW+s,"Skill",b,S)
print(k,"Skill is:- ",S/2)
print(Fore.MAGENTA+"The Average of Score:- ",avg,"of 60")