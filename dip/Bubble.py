list = [9,8,7,6,5,4]
print("unsorted list is:", list)
for j in range(len(list)-1):
    for x in range(len(list)-1):
            if list[x]>list[x+1]:
            	list[x],list[x+1]=list[x+1],list[x]
print("sorted list is:", list)
print("This Programe developed by 'Microintel'")