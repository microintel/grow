from colorama import Fore, Back
a=int(input("enter your scored marks in exam:  "))
b=a/5
if a>=501:
	print(Fore.RED + "invalid" , ",   please enter your sum of 5 subject marks")

elif b==100:
	print(Fore.GREEN + "grade of persentage : ",b)
	print("grade of pass       : out of out")
	print("Congradulation")
elif b>=75:
	print("grade of persentage : ",b)
	print("grade of pass       :  distintion")
elif b>=60:
	print("grade of persentage : ",b)
	print("grade of pass       :  first class")
elif b>=50:
	print("grade of persentage : ",b)
	print("grade of pass       :  second class")
elif b>= 40:
	print("grade of persentage : ",b)
	print("grade of pass       :  third class")
elif b>=1:
	print("grade of persentage : ",b)
	print("sorry for the message , you are failed , remember , a single pieace of paper does'nt decide your life ")