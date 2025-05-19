ipt=int(input("Enter the elements of comparison:- "))
list=[int(input("Enter the Elements:- ")) for x in range(ipt)]
for x in range(len(list)):
	for i in range(len(list)-1):
		if list[i]>list[i+1]:
			list[i],list[i+1]=list[i+1],list[i]
print("The largest Element is:- ",list[-1])
print("The Smallest Element is:-",list[0])
	
