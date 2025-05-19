class Node:
    def __init__(self, data=None):
        self.data = data
        self.next = None


class CircularLinkedList:
    def __init__(self):
        self.prime = None

    def add(self, data):
        temp = Node(data)
        if self.prime is None:
            self.prime = temp
            self.prime.next = temp
        else:
            cur = self.prime
            while cur.next != self.prime:
                cur = cur.next
            cur.next = temp
            temp.next = self.prime

    def rem(self):
        if self.prime is None:
            print("List is empty")
        elif self.prime.next == self.prime:
            print("The deleted item is", self.prime.data)
            self.prime = None
        else:
            cur = self.prime
            while cur.next != self.prime:
                pr = cur
                cur = cur.next
            pr.next = self.prime
            print("The deleted item is", cur.data)

    def display(self):
        if self.prime is None:
            print("List is empty")
            return
        cur = self.prime
        while True:
            print(cur.data, end=" ")
            cur = cur.next
            if cur == self.prime:
                break

    def search(self, item):
        if self.prime is None:
            print("List is empty")
            return
        cur = self.prime
        while cur.next != self.prime:
            if cur.data == item:
                print("Item is present in the linked list")
                return
            else:
                cur = cur.next
        print("Item is not present in the linked list")


# Circular Linked List
cll = CircularLinkedList()

# Inserting elements
cll.add(1)
cll.add(2)
cll.add(3)
cll.add(4)

# Displaying the list
print("Linked List:")
cll.display()  # Output: 1 2 3 4

# Deleting an element
cll.rem()  # Output: The deleted item is 4

# Displaying the updated list
print("Updated Linked List:")
cll.display()  # Output: 1 2 3
