list = [10,15, 4, 23, 0]
print("unsorted list is:", list)
for i in range(len(list)):
    m=i
    for j in range(i+1, len(list)):
        if list[j] < list[m]:  m = j
    list[i] , list[m] = list[m] , list[i]
print("sorted list is:", list)
print("This Programe developed by 'Microintel'")