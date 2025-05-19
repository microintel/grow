from colorama import Fore

a=int(input("enter the number:  "))
if a<=0:
	print("there is no use of this multipication")
	
for i in range(1,11):
 print(a,Fore.RED + 'x',i,Fore.GREEN + '=', a*i)